-- Active projects
select count(*) from userproject where userid = <userid here>;

-- Tasks to complete
select count(*) from tasks where devid = <userid here>;

-- Notifications
select count(*) from notifications where userid = <userid here> and not seen;

-- Warnings
-- TODO

-- Projects participated in by user
select projectname, firstname as managerfn, lastname as managerln, deadline, currentrisk from ((select projectid, projectname, deadline from projects natural join userproject where userid = <userid here>) as projectinfo natural left join userproject where ismanager) as projectdata natural join users;

-- Projects managed by user
select projectname, deadline, currentrisk from projects natural join userproject where userid = <userid here> and ismanager;

-- Team members
select firstname, lastname, email, pfppath, bio from users natural join userproject where projectid = <projectid here>;

-- User's skills
select skill, sklevel from userskill where userid = <userid here>;

-- Features
select featurename, progress, starttime, endtime, currentrisk from features natural join userproject where userid = <userid here> and projectid = <projectid here>;

-- Bugs for particular feature
select bugname, bugdesc, priority, severity, devid from bugs where featureid = <featureid here>;

-- Total tasks (for individual user)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here> and devid = <userid here>) as totaltasks;

-- Total tasks (for whole project)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here>) as totaltasks;

-- Tasks to be completed (for individual user)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here> and devid = <userid here> and not completed) as tasksleft;

-- Tasks to be completed (for whole project)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here> and not completed) as tasksleft;

-- List completed tasks (for individual user)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and devid = <userid here> and completed;

-- List uncompleted tasks (for individual user)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and devid = <userid here> and not completed;

-- List completed tasks (for whole project)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and completed;

-- List uncompleted tasks (for whole project)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and not completed;
