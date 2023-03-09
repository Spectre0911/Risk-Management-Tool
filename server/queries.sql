-- Active projects
select count(*) from userproject where userid = <userid here>; -- Tasks to complete
select count(*) from tasks where devid = <userid here>;

-- Notifications
select count(*) from notifications where userid = <userid here> and not seen and notiftype = 1;

-- Warnings
select count(*) from notifications where userid = <userid here> and not seen and notiftype = 2;

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

-- Number of bugs for a particular project (critical)
select count(*) from bugs inner join features on bugs.featureid = features.featureid where projectid = <projectid here> and priority = 1;

-- Number of bugs for a particular project (major)
select count(*) from bugs inner join features on bugs.featureid = features.featureid where projectid = <projectid here> and priority = 2;

-- Number of bugs for a particular project (minor)
select count(*) from bugs inner join features on bugs.featureid = features.featureid where projectid = <projectid here> and priority = 3;

-- Total tasks (for individual user)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where devid = <userid here>) as totaltasks;

-- Total tasks (for whole project)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here>) as totaltasks;

-- Tasks to be completed (for particular user and project)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here> and devid = <userid here> and not completed) as tasksleft;

-- Tasks to be completed (for whole project)
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here> and not completed) as tasksleft;

-- List completed tasks (for particular user and project)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and devid = <userid here> and completed;

-- List uncompleted tasks (for particular user and project)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and devid = <userid here> and not completed;

-- List completed tasks (for whole project)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and completed;

-- List uncompleted tasks (for whole project)
select taskname, description, starttime, endtime from tasks where projectid = <projectid here> and not completed;

-- Tasks summary for user
select projectname, featurename, taskname, priority, status, extract(day from (endtime - current_date)) as daysleft from projects inner join ((select featureid, featurename, projectid from features) as featureinfo inner join tasks on featureinfo.featureid = tasks.featureid) as featuretask on projects.projectid = featuretask.projectid where devid = <userid here>;

select managers.projectid, projectname, firstname, lastname, opened, taskstodo, deadline, extract(day from (deadline - current_date)) as daysleft from (select * from users natural join userproject natural join projects where ismanager) as managers left outer join (select projectid, count(taskid) as taskstodo from tasks inner join features on tasks.featureid = features.featureid group by projectid) as featuretask on managers.projectid = featuretask.projectid;

-- Project info for user
select projectinfo.projectid, projectname, firstname, lastname, opened, taskstodo, deadline, extract(day from (deadline - current_date)) as daysleft from (((select projectid from userproject where userid = <userid here> and not ismanager) as userprojects natural join (select userid, projectid from userproject where ismanager) as managers) as projectmanagers natural join projects inner join users on projectmanagers.userid = users.userid) as projectinfo inner join (select projectid, count(taskid) as taskstodo from features inner join tasks on features.featureid = tasks.featureid group by projectid) as projecttasks on projectinfo.projectid = projecttasks.projectid;
