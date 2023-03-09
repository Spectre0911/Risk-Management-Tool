INSERT INTO projects (projectname, closed, opened, deadline, brief, budget, currentrisk)
 VALUES ('Fake Project', false, current_timestamp, '2023-08-30 23:59:59', 'This is a brief for a fake project', 10000, 50);

INSERT INTO projectskill (projectid, skill) VALUES
(1, 'Java'),
(1, 'Python'),
(1, 'C++'),
(1, 'JavaScript'),
(1, 'C#'),
(1, 'Ruby'),
(1, 'Swift'),
(1, 'Go'),
(1, 'Kotlin'),
(1, 'PHP'),
(1, 'TypeScript'),
(1, 'Scala'),
(1, 'Assembly'),
(1, 'R'),
(1, 'HTML'),
(1, 'CSS'),
(1, 'JavaScript frameworks'),
(1, 'Node.js');


INSERT INTO users (userid, email, firstname, lastname, password, pfppath, githubtoken, bio, guideseen)
VALUES
(1,'johndoe@example.com', 'John', 'Doe', 'password123', null, null, 'I am a software developer with 5 years of experience.', true),
(2,'janedoe@example.com', 'Jane', 'Doe', 'password456', null, null, 'I am a front-end developer with experience in React and Angular.', false),
(3,'bobsmith@example.com', 'Bob', 'Smith', 'password789', null, null, 'I am a full-stack developer with experience in Node.js and MongoDB.', true),
(4,'amandajones@example.com', 'Amanda', 'Jones', 'passwordabc', null, null, 'I am a software engineer with experience in Java and Python.', false),
(5,'michaelbrown@example.com', 'Michael', 'Brown', 'passworddef', null, null, 'I am a data scientist with experience in R and SQL.', true),
(6,'sarahwilliams@example.com', 'Sarah', 'Williams', 'passwordghi', null, null, 'I am a web developer with experience in HTML, CSS, and JavaScript.', false),
(7,'peterjackson@example.com', 'Peter', 'Jackson', 'passwordjkl', null, null, 'I am a software developer with experience in C++ and Python.', true),
(8,'laurasmith@example.com', 'Laura', 'Smith', 'passwordmno', null, null, 'I am a full-stack developer with experience in Java and Angular.', false),
(9,'jimmynguyen@example.com', 'Jimmy', 'Nguyen', 'passwordpqr', null, null, 'I am a software engineer with experience in Python and Flask.', true),
(10,'andrewdavis@example.com', 'Andrew', 'Davis', 'passwordstu', null, null, 'I am a front-end developer with experience in React and Redux.', false);

INSERT INTO userskill (userid, skill, sklevel) VALUES
(1, 'Java', 8),
(1, 'Python', 7),
(1, 'C++', 6),
(1, 'JavaScript', 9),
(1, 'C#', 7),
(2, 'Ruby', 5),
(2, 'Swift', 8),
(2, 'Go', 4),
(2, 'Kotlin', 6),
(2, 'PHP', 7),
(3, 'TypeScript', 9),
(3, 'Scala', 6),
(3, 'Assembly', 4),
(3, 'R', 8),
(4, 'HTML', 9),
(4, 'CSS', 8),
(4, 'JavaScript frameworks', 9),
(4, 'Node.js', 7),
(5, 'Java', 6),
(5, 'Python', 7),
(5, 'C++', 8),
(5, 'JavaScript', 6),
(5, 'C#', 5),
(6, 'Ruby', 6),
(6, 'Swift', 9),
(6, 'Go', 5),
(6, 'Kotlin', 7),
(6, 'PHP', 8),
(7, 'TypeScript', 8),
(7, 'Scala', 5),
(7, 'Assembly', 4),
(7, 'R', 7),
(8, 'HTML', 8),
(8, 'CSS', 7),
(8, 'JavaScript frameworks', 9),
(8, 'Node.js', 6),
(9, 'Java', 7),
(9, 'Python', 8),
(9, 'C++', 7),
(9, 'JavaScript', 7),
(9, 'C#', 6),
(10, 'Ruby', 7),
(10, 'Swift', 8),
(10, 'Go', 5),
(10, 'Kotlin', 7),
(10, 'PHP', 7);


INSERT INTO userproject (userid, projectid, role, ismanager) VALUES
(1, 1, 'Developer', false),
(2, 1, 'Designer', false),
(3, 1, 'Developer', true),
(4, 1, 'Project Manager', true),
(5, 1, 'Developer', false),
(6, 1, 'Developer', false),
(7, 1, 'QA Tester', false),
(8, 1, 'Developer', false),
(9, 1, 'Developer', false),
(10, 1, 'Developer', false);

INSERT INTO features (featureid, projectid, featurename, featuredesc, starttime, endtime, completed, difficulty, priority, status, currentrisk, progress, members) VALUES
(1,1, 'Login Page', 'Add a login page to the project', '2023-03-10 09:00:00', '2023-03-12 18:00:00', false, 3, 2, 1, 10, 0, 2),
(2,1, 'User Dashboard', 'Add a user dashboard page to the project', '2023-03-13 09:00:00', '2023-03-15 18:00:00', false, 5, 1, 2, 30, 0, 3),
(3,1, 'Settings Page', 'Add a settings page to the project', '2023-03-15 09:00:00', '2023-03-17 18:00:00', false, 4, 2, 1, 20, 0, 2),
(4,1, 'User Profiles', 'Add user profiles to the project', '2023-03-18 09:00:00', '2023-03-22 18:00:00', false, 7, 1, 3, 50, 0, 4),
(5,1, 'Search Functionality1', 'Add search functionality to the project', '2023-03-23 09:00:00', '2023-03-25 18:00:00', false, 6, 3, 1, 40, 0, 2),
(6,1, 'Payment Processing', 'Add payment processing to the project', '2023-03-26 09:00:00', '2023-03-30 18:00:00', false, 9, 1, 2, 70, 0, 3),
(7,1, 'ML Chat Functionality', 'Add chat functionality to the project', '2023-04-01 09:00:00', '2023-04-03 18:00:00', false, 5, 2, 3, 30, 0, 2),
(8,1, 'Email Notifications1', 'Add email notifications to the project', '2023-04-04 09:00:00', '2023-04-06 18:00:00', false, 4, 1, 1, 20, 0, 2),
(9,1, 'Export Data', 'Add ability to export data to the project', '2023-04-07 09:00:00', '2023-04-09 18:00:00', false, 3, 3, 2, 10, 0, 1),
(10,1, 'Import Data', 'Add ability to import data to the project', '2023-04-10 09:00:00', '2023-04-12 18:00:00', false, 6, 1, 3, 40, 0, 3),
(11,1, 'Data Visualization', 'Add data visualization to the project', '2023-04-13 09:00:00', '2023-04-17 18:00:00', false, 8, 2, 1, 60, 0, 4),
(12,1, 'Feature 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo magna eget lacus vehicula, ut convallis erat rhoncus.', '2023-04-20 09:00:00', '2023-04-25 17:00:00', false, 5, 1, 1, 20, 60, 2),
(13,1, 'Feature 2', 'Nulla dapibus, ipsum vel consectetur vulputate, nulla velit convallis sapien, sit amet lacinia lectus magna vel nisi.', '2023-04-25 13:00:00', '2023-05-02 16:00:00', false, 8, 2, 1, 50, 20, 1),
(14,1, 'Feature 3', 'Donec sit amet vestibulum turpis. Sed eget purus in magna sodales egestas.', '2023-05-03 10:00:00', '2023-05-08 14:00:00', false, 3, 1, 2, 70, 40, 3),
(15,1, 'Feature 4', 'Curabitur ut ante vitae dolor finibus interdum eget eu justo. Suspendisse ut luctus nibh, et consequat felis.', '2023-05-10 08:00:00', '2023-05-16 18:00:00', false, 6, 2, 1, 30, 80, 2),
(16,1, 'Feature 5', 'Phasellus rhoncus ante in lorem congue, vel consequat sapien tincidunt.', '2023-05-17 09:00:00', '2023-05-23 15:00:00', false, 2, 1, 1, 10, 100, 1),
(17,1, 'Feature 6', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent consequat ipsum ac dapibus rhoncus.', '2023-05-25 12:00:00', '2023-06-01 14:00:00', false, 9, 3, 2, 60, 20, 2),
(18,1, 'Feature 7', 'Aliquam sagittis enim id mi commodo commodo. Sed rutrum odio vel luctus fringilla.', '2023-05-02 09:00:00', '2023-05-09 12:00:00', false, 4, 1, 3, 90, 10, 3),
(19,1, 'Feature 8', 'Integer bibendum sollicitudin purus, eu facilisis libero vehicula eu. Sed quis felis dui.', '2023-05-10 14:00:00', '2023-05-16 18:00:00', false, 7, 2, 2, 40, 50, 1),
(20,1, 'User Login', 'Implement user login functionality', '2023-05-10 10:00:00', '2023-05-15 12:00:00', false, 7, 2, 1, 20, 30, 3),
(21,1, 'User Registration', 'Implement user registration functionality', '2023-05-12 14:00:00', '2023-05-17 16:00:00', false, 5, 2, 1, 10, 50, 4),
(22,1, 'Homepage Design', 'Design and implement homepage UI', '2023-06-15 09:00:00', '2023-06-22 12:00:00', false, 6, 2, 1, 30, 20, 2),
(23,1, 'Database Schema', 'Design database schema for the project', '2023-05-18 10:00:00', '2023-05-25 12:00:00', false, 8, 1, 1, 15, 10, 2),
(24,1, 'Payment Gateway Integration1', 'Integrate payment gateway into the project', '2023-05-20 11:00:00', '2023-05-27 13:00:00', false, 9, 3, 1, 25, 10, 3),
(25,1, 'Search Functionality2', 'Implement search functionality for the project', '2023-05-23 15:00:00', '2023-05-30 18:00:00', false, 6, 2, 1, 20, 60, 3),
(26,1, 'User Profile Page to AI', 'Design and implement user profile page UI', '2023-05-26 09:00:00', '2023-06-02 12:00:00', false, 7, 2, 1, 30, 25, 2),
(27,1, 'Admin Dashboard1', 'Design and implement admin dashboard UI', '2023-05-29 14:00:00', '2023-06-05 16:00:00', false, 8, 1, 1, 10, 30, 2),
(28,1, 'Bug Fixes old', 'Fix all the known bugs in the project', '2023-04-01 11:00:00', '2023-04-08 13:00:00', false, 4, 3, 1, 5, 80, 4),
(29,1, 'Code Review', 'Perform code review and fix issues', '2023-05-04 15:00:00', '2023-05-11 18:00:00', false, 5, 2, 1, 10, 60, 3),
(30,1, 'Documentation', 'Create user and developer documentation', '2023-05-07 09:00:00', '2023-05-14 12:00:00', false, 3, 3, 1, 5, 40, 2),
(31,1, 'User Authentication', 'Allow users to create accounts and log in.', '2023-04-10 12:00:00', '2023-04-20 12:00:00', false, 3, 1, 1, 20, 10, 3),
(32,1, 'Admin Dashboard2', 'Create a dashboard for admins to manage the site.', '2023-06-15 12:00:00', '2023-07-05 12:00:00', false, 6, 2, 1, 50, 20, 2),
(33,1, 'Search Functionality3', 'Add search functionality to the site.', '2023-05-18 12:00:00', '2023-06-02 12:00:00', false, 4, 1, 1, 30, 30, 1),
(34,1, 'Mobile Responsive Design', 'Make the site responsive for mobile devices.', '2023-06-12 12:00:00', '2023-06-25 12:00:00', false, 5, 2, 1, 40, 50, 2),
(35,1, 'Payment Gateway Integration2', 'Integrate a payment gateway for accepting payments.', '2023-06-20 12:00:00', '2023-07-01 12:00:00', false, 8, 3, 1, 60, 10, 3),
(36,1, 'Email Notifications2', 'Set up email notifications for users.', '2023-05-17 12:00:00', '2023-05-20 12:00:00', false, 3, 1, 1, 10, 40, 2),
(37,1, 'Social Media Sharing', 'Add social media sharing buttons to the site.', '2023-07-22 12:00:00', '2023-07-28 12:00:00', false, 2, 1, 1, 5, 80, 1),
(38,1, 'File Uploads', 'Allow users to upload files to the site.', '2023-06-25 12:00:00', '2023-07-05 12:00:00', false, 5, 2, 1, 30, 60, 1),
(39,1, 'User Profile Pages', 'Create pages for users to view and edit their profiles.', '2023-07-14 12:00:00', '2023-07-27 12:00:00', false, 4, 1, 1, 20, 70, 3),
(40,1, 'Bug Fixes new', 'Fix bugs and issues on the site.', '2023-07-11 12:00:00', '2023-08-16 12:00:00', false, 2, 1, 2, 5, 90, 0),
(41,1, 'Login page UI', 'Improve the UI design of the login page', '2023-03-11 09:00:00', '2023-03-15 17:00:00', false, 4, 2, 1, 30, 40, 2),
(42,1, 'Registration form validation', 'Implement validation on registration form', '2023-03-16 10:00:00', '2023-03-20 17:00:00', false, 6, 1, 1, 50, 60, 3),
(43,1, 'Password reset functionality', 'Implement password reset functionality', '2023-03-21 09:00:00', '2023-03-26 17:00:00', false,8, 2, 2, 40, 20, 1),
(44,1, 'User profile page to ML', 'Create user profile page with basic information', '2023-03-27 09:00:00', '2023-03-31 17:00:00', false,5, 1, 1, 20, 70, 4),
(45,1, 'Admin dashboard3', 'Create admin dashboard with user statistics', '2023-04-01 09:00:00', '2023-04-05 17:00:00',false, 9, 3, 2, 70, 30, 2),
(46,1, 'Social media sharing', 'Add social media sharing feature', '2023-04-06 09:00:00', '2023-04-10 17:00:00', false,3, 1, 1, 10, 50, 1),
(47,1, 'Email notifications3', 'Implement email notifications for user events', '2023-04-11 09:00:00', '2023-04-15 17:00:00',false,7, 2, 2, 60, 80, 3),
(48,1, 'Chat feature', 'Add chat feature for user communication', '2023-04-16 09:00:00', '2023-04-20 17:00:00', false,8, 3, 3, 90, 10, 4),
(49,1, 'Bug fixes', 'Fix reported bugs and errors', '2023-04-21 09:00:00', '2023-04-25 17:00:00', false,2, 1, 1, 5, 100, 2),
(50,1, 'Performance optimization', 'Optimize website performance for faster load times', '2023-04-26 09:00:00', '2023-04-30 17:00:00', false,10, 3, 2, 80, 60, 4),
(51,1, 'User feedback feature', 'Add user feedback feature for users to give feedback', '2023-05-01 09:00:00', '2023-05-05 17:00:00', false,6, 2, 1, 30, 40, 1),
(52,1, 'Login Page UI Design', 'Design a new login page UI for the website', '2023-03-15 09:00:00', '2023-03-20 18:00:00',false, 5, 2, 1, 25, 60,1),
(53,1, 'Add Login Authentication', 'Implement login authentication for users', '2023-03-20 09:00:00', '2023-03-25 18:00:00',false, 7, 1, 1, 50, 20,2),
(54,1, 'Implement User Registration', 'Add functionality for user registration', '2023-03-25 09:00:00', '2023-04-01 18:00:00',false, 6, 1, 1, 30, 40,3),
(55,1, 'User Profile Page to Robotics', 'Design and implement user profile page', '2023-04-01 09:00:00', '2023-04-10 18:00:00', false,8, 2, 2, 40, 30,1),
(56,1, 'Add Friends List', 'Add a friends list functionality for users', '2023-04-10 09:00:00', '2023-04-20 18:00:00', false,4, 3, 1, 10, 80,2),
(57,1, 'AI Chat Functionality', 'Add chat functionality for users', '2023-04-20 09:00:00', '2023-05-05 18:00:00', false,9, 1, 2, 80, 10,1),
(58,1, 'Add Search Functionality', 'Add search functionality for users to search for other users', '2023-05-05 09:00:00', '2023-05-20 18:00:00',false, 6, 2, 1, 20, 50,2),
(59,1, 'Add Post Functionality', 'Add functionality for users to create and post content', '2023-05-20 09:00:00', '2023-06-05 18:00:00', false,7, 1, 2, 50, 20,3),
(60,1, 'Add Comment Functionality', 'Add functionality for users to comment on posts', '2023-06-05 09:00:00', '2023-06-20 18:00:00', false,5, 3, 1, 30, 60,4);

INSERT INTO bugs (featureid, devid, bugname, bugdesc, priority, severity) VALUES
(1, 2, 'Null pointer exception', 'Program crashes when attempting to access null object', 2, 3),
(2, 4, 'Incorrect calculation', 'Results are off by 10%', 1, 2),
(3, null, 'Database connection error', 'Unable to connect to database', 3, 3),
(4, 5, 'Login failure', 'Unable to login with correct credentials', 2, 1),
(5, null, 'Missing data', 'Required data not present in form submission', 1, 2),
(6, 3, 'Server timeout', 'Server times out when attempting to load page', 3, 3),
(7, 4, 'Invalid input', 'Program does not handle invalid input correctly', 1, 1),
(8, 2, 'Formatting issue', 'Text is not displayed correctly on page', 2, 2),
(9, null, 'Database query error', 'Incorrect data returned from database query', 3, 2),
(10, 1, 'Memory leak', 'Program uses too much memory and crashes', 1, 3),
(11, null, 'Broken link', 'Link on page does not work', 2, 1),
(12, 3, 'Data corruption', 'Data is corrupted when saved to database', 3, 3),
(13, null, 'Missing functionality', 'Required functionality not present', 1, 2),
(14, 5, 'Inconsistent behavior', 'Program behaves inconsistently in certain situations', 2, 3),
(15, 1, 'Access control issue', 'User is able to access unauthorized data', 3, 1),
(16, null, 'Server error', '500 error returned from server', 1, 3),
(17, 4, 'Validation issue', 'Form validation does not work correctly', 2, 2),
(18, 2, 'Incorrect sorting', 'Data is not sorted correctly on page', 3, 1),
(19, null, 'Duplicate data', 'Duplicate data present in database', 1, 2),
(20, 3, 'Slow performance', 'Program is slow to respond', 2, 3),
(21, 5, 'Invalid output', 'Program output is incorrect', 3, 1),
(22, null, 'Broken image', 'Image on page is not displayed correctly', 1, 3),
(23, 1, 'Login validation issue', 'Validation for login form does not work', 2, 2),
(24, null, 'Data inconsistency', 'Inconsistent data returned from API', 3, 2),
(25, 4, 'Input validation issue', 'Validation for input field does not work', 1, 1),
(26, 2, 'Database migration error', 'Data is lost during database migration', 2, 3),
(27, null, 'Access denied', 'User is denied access to resource', 3, 1),
(28, 3, 'Compatibility issue', 'Program does not work on certain operating systems', 1, 2),
(29, 5, 'Inaccessible feature', 'Feature is not accessible to user', 2, 1),
(30, 1, 'UI issue', 'UI element does not work correctly', 3, 3);

INSERT INTO replacements (projectid, dateChanged, changeType) VALUES 
    (1, '2023-04-01 10:00:00', 1),
    (1, '2023-05-02 11:00:00', 1),
    (1, '2023-04-10 12:00:00', 1),
    (1, '2023-04-15 13:00:00', 0),
    (1, '2023-04-22 14:00:00', 0),
    (1, '2023-04-26 15:00:00', 0),
    (1, '2023-05-01 16:00:00', 1),
    (1, '2023-04-29 17:00:00', 1),
    (1, '2023-05-09 18:00:00', 1),
    (1, '2023-05-10 19:00:00', 0);

INSERT INTO featureChange (projectid, priority, dateChanged)
VALUES (1, 1, '2023-03-20 15:30:00'),
       (1, 3, '2023-03-22 12:45:00'),
       (1, 2, '2023-03-24 09:15:00'),
       (1, 1, '2023-03-26 16:20:00'),
       (1, 3, '2023-03-28 13:00:00'),
       (1, 2, '2023-03-30 10:30:00'),
       (1, 1, '2023-04-01 14:15:00'),
       (1, 3, '2023-04-03 11:45:00'),
       (1, 2, '2023-04-05 08:30:00'),
       (1, 1, '2023-04-07 17:00:00');

INSERT INTO feedback (userid, projectid, fbdate, fbquestion, fbscore)
VALUES 
    (1, 1, '2023-03-07 10:00:00', 'How satisfied are you with the project progress?', 85),
    (2, 1, '2023-03-08 12:30:00', 'Were all your requirements met?', 70),
    (3, 1, '2023-03-09 09:45:00', 'Did you face any issues during the project?', 90),
    (4, 1, '2023-03-07 14:00:00', 'How would you rate the communication with the team?', 80),
    (5, 1, '2023-03-08 16:20:00', 'Were the project deliverables on time?', 75),
    (6, 1, '2023-03-09 11:15:00', 'Did you find the project useful?', 95),
    (7, 1, '2023-03-07 09:00:00', 'Were the team members cooperative?', 90),
    (8, 1, '2023-03-08 11:30:00', 'Were you satisfied with the quality of work?', 85),
    (9, 1, '2023-03-09 10:15:00', 'Was the project completed within the specified budget?', 80),
    (10, 1, '2023-03-07 13:00:00', 'Did you receive timely updates on project status?', 75),
    (1, 1, '2023-03-08 15:20:00', 'Were the project goals clearly defined?', 90),
    (2, 1, '2023-03-09 12:15:00', 'Were there any delays during the project?', 70),
    (3, 1, '2023-03-07 08:30:00', 'Did the project meet your expectations?', 80),
    (4, 1, '2023-03-08 10:45:00', 'Were you satisfied with the testing process?', 85),
    (5, 1, '2023-03-09 11:30:00', 'Were you satisfied with the documentation provided?', 90),
    (6, 1, '2023-03-07 14:30:00', 'Were there any changes to the project scope?', 75),
    (7, 1, '2023-03-08 16:45:00', 'Did you face any technical difficulties during the project?', 80),
    (8, 1, '2023-03-09 13:15:00', 'Were there any issues with the project management?', 70),
    (9, 1, '2023-03-07 09:30:00', 'Were the project objectives achieved?', 90),
    (10, 1, '2023-03-08 12:15:00', 'Were there any conflicts during the project?', 75);