drop database if exists riskmanager with (force);
create database riskmanager;
grant all privileges on database riskmanager to postgres;
\c riskmanager;

drop table if exists users cascade;
create table users (
    userid      serial not null,
    email       varchar(50) not null unique,
    firstname   varchar(50) not null,
    lastname    varchar(50) not null,
    password    varchar(100) not null,
    pfppath     varchar(300) default null,
    githubtoken varchar(100) default null,
    bio         varchar(300) default null,
    guideseen   boolean not null default false,
    primary key (userid)
);

drop table if exists projects cascade;
create table projects (
    projectid   serial not null,
    projectname varchar(50) not null unique,
    closed      boolean not null default false,
    opened      timestamp not null check (opened >= current_date),
    deadline    timestamp not null,
    check (deadline > opened),
    brief       varchar(300) not null,
    budget      integer not null check (budget > 0),
    currentrisk integer not null default 0,
    check (currentrisk >= 0 and currentrisk <= 100),
    primary key (projectid)
);

drop table if exists risks;
create table risks (
    projectid integer not null,
    riskdate  timestamp not null,
    risk      integer not null check (currentrisk >= 0 and currentrisk <= 100),
    risktype  integer not null check (risktype >= 1 and risktype <= 20),

    primary key (projectid, riskdate),
    foreign key (projectid) references projects(projectid) on delete cascade
);

drop table if exists userproject;
create table userproject (
    userid    integer not null,
    projectid integer not null,
    role      varchar(50) not null,
    ismanager boolean not null default false,
    primary key (userid, projectid),
    foreign key (userid) references users(userid) on delete cascade,
    foreign key (projectid) references projects(projectid) on delete cascade
);

drop table if exists features cascade;
create table features (
    featureid   serial not null,
    projectid   integer not null,
    featurename varchar(50) not null,
    unique (projectid, featurename),
    featuredesc varchar(300),
    starttime   timestamp not null check (starttime >= current_date),
    endtime     timestamp not null,
    check (endtime > starttime),
    completed   boolean not null default false,
    difficulty  integer not null check (difficulty >=1 and difficulty <= 10),
    priority    integer not null check (priority >= 1 and priority <= 3),
    currentrisk integer not null check (currentrisk >= 0 and currentrisk <= 100),
    progress    integer not null check (progress >= 0 and progress <= 100),
    members     integer not null check (members >= 0) default 0,
    primary key (featureid),
    foreign key (projectid) references projects(projectid) on delete cascade
);

drop table if exists tasks;
create table tasks (
    taskid      serial not null,
    featureid   integer not null,
    devid       integer default null,
    taskname    varchar(50) not null,
    description varchar(300) default null,
    starttime   timestamp not null check (starttime >= current_date),
    endtime     timestamp not null,
    check (endtime > starttime),
    completed   boolean not null default false,
    primary key (taskid),
    foreign key (featureid) references features(featureid) on delete cascade,
    foreign key (devid) references users(userid)
);

drop table if exists featuredep;
create table featuredep (
    featureid integer not null,
    depid     integer not null,
    primary key (featureid, depid),
    foreign key (featureid) references features(featureid) on delete cascade,
    foreign key (depid) references features(featureid)
);

drop table if exists bugs;
create table bugs (
    bugid     serial not null,
    featureid integer not null,
    devid     integer default null,
    bugname   varchar(50) not null,
    bugdesc   varchar(300),
    priority  integer not null check (priority >= 1 and priority <= 3),
    severity  integer not null check (severity >= 1 and severity <= 3),
    primary key (bugid),
    foreign key (featureid) references features(featureid) on delete cascade,
    foreign key (devid) references users(userid)
);

drop table if exists notifications;
create table notifications (
    notifid   serial not null,
    location  integer not null check (location >= 0 and location <= 5),
    userid    integer not null,
    projectid integer not null,
    notiftype integer not null check (notiftype = 1 or notiftype = 2), -- 1 = regular notification, 2 = warning
    title     varchar(50) not null,
    message   varchar(300) not null,
    seen      boolean not null default false,
    primary key (notifid),
    foreign key (userid) references users(userid) on delete cascade,
    foreign key (projectid) references projects(projectid) on delete cascade
);

drop table if exists feedback;
create table feedback (
    fbid       serial not null,
    userid     integer not null,
    projectid  integer not null,
    fbdate     timestamp not null,
    fbquestion varchar(200) not null,
    fbscore    integer not null check (fbscore >= 0 and fbscore <= 100),
    primary key (fbid),
    foreign key (userid) references users(userid) on delete cascade,
    foreign key (projectid) references projects(projectid) on delete cascade
);

drop table if exists sktypes cascade;
create table sktypes (
    sktype varchar(50) not null,
    primary key (sktype)
);

drop table if exists skills cascade;
create table skills (
    skill  varchar(50) not null,
    sktype varchar(50) not null,
    primary key (skill),
    foreign key (sktype) references sktypes(sktype) on delete cascade
);

drop table if exists userskill;
create table userskill (
    userid  integer not null,
    skill   varchar(50) not null,
    sktype  varchar(50) not null,
    sklevel integer not null check (sklevel > 0 and sklevel <= 10),
    primary key (userid, skill),
    foreign key (userid) references users(userid) on delete cascade,
    foreign key (skill) references skills(skill) on delete cascade,
    foreign key (sktype) references skills(sktype) on delete cascade
);

drop table if exists projectskill;
create table projectskill (
    projectid integer not null,
    skill     varchar(50) not null,
    sktype    varchar(50) not null,
    primary key (projectid, skill),
    foreign key (projectid) references projects(projectid) on delete cascade,
    foreign key (skill) references skills(skill) on delete cascade,
    foreign key (sktype) references skills(sktype) on delete cascade
);


create or replace function nullifyuser() returns trigger as $$
begin
    update tasks set devid = null where devid = old.userid;
    update bugs set devid = null where devid = old.userid;
    return old;
end;
$$ language plpgsql;

create trigger userdeleted after delete on users
for each statement
    execute procedure nullifyuser();

-- Check that feature's start times and deadlines compatible with those of the project
create or replace function featuretimes() returns trigger as $$
declare
    projectstart timestamp; -- Start time of project
    projectend timestamp;   -- Project deadline
begin
    select opened from projects where projectid = new.projectid into projectstart;
    select deadline from projects where projectid = new.projectid into projectend;

    -- Project start time cannot be later than feature start time
    if (projectstart > new.starttime) then
        raise exception 'Feature start time too early for this project';
    end if;

    -- Project deadline cannot be before feature deadline
    if (projectend < new.endtime) then
        raise exception 'Feature deadline too late for this project';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger newfeature before insert on features
for each statement
    execute procedure featuretimes();

-- Check that task's start times and deadlines compatible with those of the feature
create or replace function tasktimes() returns trigger as $$
declare
    featurestart timestamp; -- Start time of feature
    featureend timestamp;   -- Feature deadline
begin
    select starttime from features where featureid = new.featureid into featurestart;
    select endtime from features where featureid = new.featureid into featureend;

    -- Feature start time cannot be after task start time
    if (featurestart > new.starttime) then
        raise exception 'Task start time too early for this feature';
    end if;

    -- Feature deadline cannot be before task deadline
    if (featureend < new.endtime) then
        raise exception 'Task deadline too late for this feature';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger newtask before insert on tasks
for each statement
    execute procedure tasktimes();

-- Check that dependency deadlines are compatible
create or replace function checkdep() returns trigger as $$
declare
    featurestart timestamp; -- Start time of feature
    depdeadline timestamp;  -- Deadline of feature's dependency
begin
    select starttime from features where featureid = new.featureid into featurestart;
    select endtime from features where featureid = new.depid into depdeadline;

    -- Feature start time cannot be before its dependency's deadline
    if (featurestart < depdeadline) then
        raise exception 'Feature cannot start before its dependency is completed';
    end if;
    
    return new;
end;
$$ language plpgsql;

create trigger newdep before insert on featuredep
for each statement
    execute procedure checkdep();

-- Update project's current risk in projects when new data added to risks
create or replace function newrisk() returns trigger as $$
begin
    update projects set currentrisk = new.risk where projectid = new.projectid;
    return new;
end;
$$ language plpgsql;

create trigger addrisk after insert on risks
for each statement
    execute procedure newrisk();

insert into sktypes (sktype) values
    ('Programming languages'), ('Web development'), ('Database management'), ('Software development methodologies'), ('Version control'), ('Cloud computing'), ('Operating systems'), ('Networking and security'), ('Mobile app development'), ('AI and machine learning');

insert into skills (skill, sktype) values
    ('Java', 'Programming languages'), ('Python', 'Programming languages'), ('C++', 'Programming languages'), ('JavaScript', 'Programming languages'), ('C#', 'Programming languages'), ('Ruby', 'Programming languages'), ('Swift', 'Programming languages'), ('Go', 'Programming languages'), ('Kotlin', 'Programming languages'), ('PHP', 'Programming languages'), ('TypeScript', 'Programming languages'), ('Scala', 'Programming languages'), ('Assembly', 'Programming languages'), ('R', 'Programming languages'),
    ('HTML', 'Web development'), ('CSS', 'Web development'), ('JavaScript frameworks', 'Web development'), ('Node.js', 'Web development'), ('RESTful API design and development', 'Web development'), ('Database integration', 'Web development'), ('Web security', 'Web development'), ('Responsive design and cross-browser compatibility', 'Web development'), ('Server-side languages', 'Web development'), ('Deployment and hosting', 'Web development'), ('CMS', 'Web development'), ('Debugging and problem-solving', 'Web development'),
    ('SQL', 'Database management'), ('NoSQL databases', 'Database management'), ('Data modelling and normalization', 'Database management'), ('Database administration', 'Database management'), ('Data warehousing', 'Database management'), ('Indexing and query optimization', 'Database management'), ('Backup and recovery', 'Database management'), ('Security and access control', 'Database management'), ('Data migration', 'Database management'), ('ETL processes', 'Database management'),
    ('Agile', 'Software development methodologies'), ('Waterfall', 'Software development methodologies'), ('Lean', 'Software development methodologies'), ('DevOps', 'Software development methodologies'), ('Test-Driven Development (TDD)', 'Software development methodologies'), ('Behaviour-Driven Development (BDD)', 'Software development methodologies'), ('Feature-Driven Development (FDD)', 'Software development methodologies'), ('Spiral', 'Software development methodologies'), ('Rapid Application Development (RAD)', 'Software development methodologies'), ('Extreme Programming (XP)', 'Software development methodologies'), ('Hybrid', 'Software development methodologies'),
    ('Git', 'Version control'), ('SVN (Apache subversion)', 'Version control'), ('Mercurial', 'Version control'), ('Source control management concepts', 'Version control'), ('Command line interface usage', 'Version control'), ('Distributed version control systems', 'Version control'), ('Collaborative development practices', 'Version control'), ('Code reviews and issue tracking', 'Version control'), ('Conflict resolution', 'Version control'),
    ('Cloud platforms', 'Cloud computing'), ('Virtualization technologies', 'Cloud computing'), ('Infrastructure as Code (IAC) tools', 'Cloud computing'), ('Container orchestration', 'Cloud computing'), ('Serverless computing', 'Cloud computing'), ('Networking and security', 'Cloud computing'), ('Database and storage services', 'Cloud computing'), ('Monitoring and logging', 'Cloud computing'), ('Automation and configuration management', 'Cloud computing'), ('Cost optimization and management', 'Cloud computing'),
    ('Windows administration', 'Operating systems'), ('Linux administration', 'Operating systems'), ('MacOS administration', 'Operating systems'), ('Command line usage', 'Operating systems'), ('Network configuration and troubleshooting', 'Operating systems'), ('User and group management', 'Operating systems'), ('File system management and backup', 'Operating systems'), ('Security and acccess control', 'Operating systems'), ('Process and resource management', 'Operating systems'), ('Virtualization', 'Operating systems'), ('Package management and software installation', 'Operating systems'), ('Scripting and automation', 'Operating systems'),
    ('Networking protocols', 'Networking and security'), ('Router and switch configuration', 'Networking and security'), ('Firewall administration', 'Networking and security'), ('VPN setup', 'Networking and security'), ('Network security', 'Networking and security'), ('Web application security', 'Networking and security'), ('Intrusion detection and prevention', 'Networking and security'), ('Security information and event management', 'Networking and security'), ('Disaster recovery', 'Networking and security'), ('Compliance and regulatory requirements', 'Networking and security'),
    ('iOS development', 'Mobile app development'), ('Android development', 'Mobile app development'), ('Cross-platform development frameworks', 'Mobile app development'), ('Mobile UI and UX design', 'Mobile app development'), ('RESTful API integration', 'Mobile app development'), ('Database design and integration', 'Mobile app development'), ('Mobile security', 'Mobile app development'), ('Push notifications', 'Mobile app development'), ('In-app purchases', 'Mobile app development'), ('Compatibility and testing', 'Mobile app development'),
    ('Mathematical foundations', 'AI and machine learning'), ('Deep learning frameworks', 'AI and machine learning'), ('Natural language processing (NLP)', 'AI and machine learning'), ('Computer vision', 'AI and machine learning'), ('Reinforcement learning', 'AI and machine learning'), ('Model selection and evaluation', 'AI and machine learning'), ('Data pre-processing and feature engineering', 'AI and machine learning'), ('Cloud computing for AI and ML', 'AI and machine learning'), ('Experimentation and iteration in model development', 'AI and machine learning');
