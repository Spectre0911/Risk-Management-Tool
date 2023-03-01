-- Active projects
select count(*) from userproject where userid = <userid here>;

-- Tasks to complete
select count(*) from tasks where devid = <userid here>;

-- Notifications
select count(*) from notifications where userid = <userid here> and not seen;

-- Warnings
-- TODO

-- TODO Project summary
select projectname, deadline, currentrisk from (select * from projects natural join userproject where userid = <userid here>);

-- Features
select featurename, progress, starttime, endtime, currentrisk from features natural join userproject where userid = <userid here>;
