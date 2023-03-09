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
    risk      integer not null check (risk >= 0 and risk <= 100),
    risktype  integer not null check (risktype >= 1 and risktype <= 20),
    primary key (projectid, riskdate),
    foreign key (projectid) references projects(projectid) on delete cascade
);

drop table if exists userproject;
create table userproject (
    userid    integer not null,
    projectid integer not null,
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
    featuredesc varchar(300),
    starttime   timestamp not null check (starttime >= current_date),
    endtime     timestamp not null,
    check (endtime > starttime),
    completed   boolean not null default false,
    difficulty  integer not null check (difficulty >=1 and difficulty <= 10),
    priority    integer not null check (priority >= 1 and priority <= 3),
    -- 1 = core, 2 = optional, 3 = aesthetic
    status      integer not null check (status >= 1 and status <= 3),
    -- 1 = completed, 2 = in progress, 3 = delayed
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
    priority    integer not null check (priority >= 1 and priority <= 3),
    -- 1 = core, 2 = optional, 3 = aesthetic
    status      integer not null check (status >= 1 and status <= 3),
    -- 1 = completed, 2 = in progress, 3 = delayed
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
    location  varchar(50) not null,
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
    userid    integer not null,
    projectid integer not null,
    location  integer not null check (location >= 1 and location <= 5),
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

drop table if exists skills cascade;
create table skills (
    skill varchar(50) not null,
    primary key (skill)
);

drop table if exists userskill;
create table userskill (
    userid  integer not null,
    skill   varchar(50) not null,
    sklevel integer not null check (sklevel > 0 and sklevel <= 10),
    primary key (userid, skill),
    foreign key (userid) references users(userid) on delete cascade,
    foreign key (skill) references skills(skill) on delete cascade
);

drop table if exists projectskill;
create table projectskill (
    projectid integer not null,
    skill     varchar(50) not null,
    primary key (projectid, skill),
    foreign key (projectid) references projects(projectid) on delete cascade,
    foreign key (skill) references skills(skill) on delete cascade
);

create or replace function nullifyuser() returns trigger as $$
begin
    update tasks set devid = null where devid = old.userid;
    update bugs set devid = null where devid = old.userid;
    return old;
end;
$$ language plpgsql;

create trigger userdeleted after delete on users
for each row
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
for each row
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
for each row
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
for each row
    execute procedure checkdep();

-- Create a notification when a member is added to the team for a project
create or replace function membernotif() returns trigger as $$
declare
    name varchar(50);
    counter integer := 1;
begin
    select projectname from projects where projectid = new.projectid into name;
    if not (new.ismanager) then
        insert into notifications (notifid, userid, projectid, location, notiftype, title, message, seen) values (default, new.userid, new.projectid, 1, 1, 'Added to project', name, default);
    end if;
    return new;
end;
$$ language plpgsql;

create trigger addmember after insert on userproject
for each row
    execute procedure membernotif();

-- Update project's current risk in projects when new data added to risks
create or replace function newrisk() returns trigger as $$
begin
    update projects set currentrisk = new.risk where projectid = new.projectid;
    return new;
end;
$$ language plpgsql;

create trigger addrisk after insert on risks
for each row
    execute procedure newrisk();

insert into skills (skill) values
    ('Java'), ('Python'), ('C++'), ('JavaScript'), ('C#'), ('Ruby'), ('Swift'), ('Go'), ('Kotlin'), ('PHP'), ('TypeScript'), ('Scala'), ('Assembly'), ('R'),
    ('HTML'), ('CSS'), ('JavaScript frameworks'), ('Node.js'), ('RESTful API design and development'), ('Database integration'), ('Web security'), ('Responsive design and cross-browser compatibility'), ('Server-side languages'), ('Deployment and hosting'), ('CMS'), ('Debugging and problem-solving'),
    ('SQL'), ('NoSQL databases'), ('Data modelling and normalization'), ('Database administration'), ('Data warehousing'), ('Indexing and query optimization'), ('Backup and recovery'), ('Security and access control'), ('Data migration'), ('ETL processes'),
    ('Agile'), ('Waterfall'), ('Lean'), ('DevOps'), ('Test-Driven Development (TDD)'), ('Behaviour-Driven Development (BDD)'), ('Feature-Driven Development (FDD)'), ('Spiral'), ('Rapid Application Development (RAD)'), ('Extreme Programming (XP)'), ('Hybrid'),
    ('Git'), ('SVN (Apache subversion)'), ('Mercurial'), ('Source control management concepts'), ('Command line interface usage'), ('Distributed version control systems'), ('Collaborative development practices'), ('Code reviews and issue tracking'), ('Conflict resolution'),
    ('Cloud platforms'), ('Virtualization technologies'), ('Infrastructure as Code (IAC) tools'), ('Container orchestration'), ('Serverless computing'), ('Networking and security'), ('Database and storage services'), ('Monitoring and logging'), ('Automation and configuration management'), ('Cost optimization and management'),
    ('Windows administration'), ('Linux administration'), ('MacOS administration'), ('Command line usage'), ('Network configuration and troubleshooting'), ('User and group management'), ('File system management and backup'), ('Security and acccess control'), ('Process and resource management'), ('Virtualization'), ('Package management and software installation'), ('Scripting and automation'),
    ('Networking protocols'), ('Router and switch configuration'), ('Firewall administration'), ('VPN setup'), ('Network security'), ('Web application security'), ('Intrusion detection and prevention'), ('Security information and event management'), ('Disaster recovery'), ('Compliance and regulatory requirements'),
    ('iOS development'), ('Android development'), ('Cross-platform development frameworks'), ('Mobile UI and UX design'), ('RESTful API integration'), ('Database design and integration'), ('Mobile security'), ('Push notifications'), ('In-app purchases'), ('Compatibility and testing'),
    ('Mathematical foundations'), ('Deep learning frameworks'), ('Natural language processing (NLP)'), ('Computer vision'), ('Reinforcement learning'), ('Model selection and evaluation'), ('Data pre-processing and feature engineering'), ('Cloud computing for AI and ML'), ('Experimentation and iteration in model development');
