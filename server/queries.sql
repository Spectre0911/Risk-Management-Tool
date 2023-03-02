-- Active projects
select count(*) from userproject where userid = <userid here>;

-- Tasks to complete
select count(*) from tasks where devid = <userid here>;

-- Notifications
select count(*) from notifications where userid = <userid here> and not seen;

-- Warnings
-- TODO

-- Project summary
select projectname, firstname as managerfn, lastname as managerln, deadline, currentrisk from ((select projectid, projectname, deadline from projects natural join userproject where userid = <userid here>) as projectinfo natural left join userproject where ismanager) as projectdata natural join users;

-- Features
select featurename, progress, starttime, endtime, currentrisk from features natural join userproject where userid = <userid here> and projectid = <projectid here>;

-- Total tasks
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here>) as totaltasks;

-- Tasks to be completed
select count(*) from (select * from tasks inner join features on tasks.featureid = features.featureid where projectid = <projectid here> and not completed) as tasksleft;
