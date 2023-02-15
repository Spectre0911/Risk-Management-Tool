drop database if exists riskmanager with (force);
create database riskmanager;
GRANT ALL PRIVILEGES ON DATABASE riskmanager TO postgres;
\c riskmanager;

drop table if exists users cascade;
create table users (
    userid      serial not null,
    email       varchar(50) not null unique,
    firstname   varchar(50) not null,
    lastname    varchar(50) not null,
    password    varchar(100) not null,
    pfppath     varchar(100),
    githubtoken varchar(50) not null,
    bio         varchar(300),
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
    primary key (projectid)
);

drop table if exists userproject;
create table userproject (
    userid    integer not null,
    projectid integer not null,
    role      varchar(50) not null,
    ismanager boolean not null default false,
    primary key (userid, projectid),
    foreign key (userid) references users(userid),
    foreign key (projectid) references projects(projectid)
);

drop table if exists features cascade;
create table features (
    featureid   serial not null,
    projectid   integer not null,
    featurename varchar(50) not null,
    starttime   timestamp not null check (starttime >= current_date),
    earlytime   timestamp not null,
    latetime    timestamp not null,
    check (earlytime > starttime and latetime > earlytime),
    completed   boolean not null default false,
    priority    integer not null check (priority >= 1 and priority <= 3),
    currentrisk integer not null check (currentrisk >= 0 and currentrisk <= 100),
    primary key (featureid),
    foreign key (projectid) references projects(projectid)
);

drop table if exists tasks;
create table tasks (
    taskid      serial not null,
    featureid   integer not null,
    devid       integer not null,
    taskname    varchar(50) not null,
    description varchar(300),
    earlytime   timestamp not null check (earlytime >= current_date),
    latetime    timestamp not null,
    check (latetime > earlytime),
    completed   boolean not null default false,
    primary key (taskid),
    foreign key (featureid) references features(featureid),
    foreign key (devid) references users(userid)
);

drop table if exists featuredep;
create table featuredep (
    featureid integer not null,
    depid     integer not null,
    primary key (featureid, depid),
    foreign key (featureid) references features(featureid),
    foreign key (depid) references features(featureid)
);

drop table if exists bugs;
create table bugs (
    bugid     serial not null,
    featureid integer not null,
    devid     integer not null,
    bugname   varchar(50) not null,
    bugdesc   varchar(300),
    priority    integer not null check (priority >= 1 and priority <= 3),
    severity    integer not null check (severity >= 1 and severity <= 3),
    primary key (bugid),
    foreign key (featureid) references features(featureid),
    foreign key (devid) references users(userid)
);

drop table if exists notifications;
create table notifications (
    notifid   serial not null,
    userid    integer not null,
    projectid integer not null,
    data      varchar(300) not null,
    seen      boolean not null default false,
    primary key (notifid),
    foreign key (userid) references users(userid),
    foreign key (projectid) references projects(projectid)
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
    foreign key (userid) references users(userid),
    foreign key (projectid) references projects(projectid)
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
    foreign key (userid) references users(userid),
    foreign key (skill) references skills(skill) on delete cascade
);

drop table if exists projectskill;
create table projectskill (
    projectid integer not null,
    skill     varchar(50) not null,
    primary key (projectid, skill),
    foreign key (projectid) references projects(projectid),
    foreign key (skill) references skills(skill) on delete cascade
);
