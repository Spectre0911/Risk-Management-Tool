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


INSERT INTO users (email, firstname, lastname, password, pfppath, githubtoken, bio, guideseen)
VALUES
('johndoe@example.com', 'John', 'Doe', 'password123', null, null, 'I am a software developer with 5 years of experience.', true),
('janedoe@example.com', 'Jane', 'Doe', 'password456', null, null, 'I am a front-end developer with experience in React and Angular.', false),
('bobsmith@example.com', 'Bob', 'Smith', 'password789', null, null, 'I am a full-stack developer with experience in Node.js and MongoDB.', true),
('amandajones@example.com', 'Amanda', 'Jones', 'passwordabc', null, null, 'I am a software engineer with experience in Java and Python.', false),
('michaelbrown@example.com', 'Michael', 'Brown', 'passworddef', null, null, 'I am a data scientist with experience in R and SQL.', true),
('sarahwilliams@example.com', 'Sarah', 'Williams', 'passwordghi', null, null, 'I am a web developer with experience in HTML, CSS, and JavaScript.', false),
('peterjackson@example.com', 'Peter', 'Jackson', 'passwordjkl', null, null, 'I am a software developer with experience in C++ and Python.', true),
('laurasmith@example.com', 'Laura', 'Smith', 'passwordmno', null, null, 'I am a full-stack developer with experience in Java and Angular.', false),
('jimmynguyen@example.com', 'Jimmy', 'Nguyen', 'passwordpqr', null, null, 'I am a software engineer with experience in Python and Flask.', true),
('andrewdavis@example.com', 'Andrew', 'Davis', 'passwordstu', null, null, 'I am a front-end developer with experience in React and Redux.', false);

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


INSERT INTO userproject (userid, projectid, ismanager) VALUES
(1, 1, true),
(2, 1, false),
(3, 1, true),
(4, 1, true),
(5, 1, false),
(6, 1, false),
(7, 1, false),
(8, 1, false),
(9, 1, false),
(10, 1, false);

INSERT INTO features ( projectid, featurename, featuredesc, starttime, endtime, completed, difficulty, priority, status, currentrisk, progress, members) VALUES
(1, 'Login Page', 'Add a login page to the project', '2023-03-25 09:00:00', '2023-03-30 18:00:00', false, 3, 2, 1, 10, 0, 2),
(1, 'User Dashboard', 'Add a user dashboard page to the project', '2023-03-25 09:00:00', '2023-03-31 18:00:00', false, 5, 1, 2, 30, 0, 3),
(1, 'Settings Page', 'Add a settings page to the project', '2023-03-25 09:00:00', '2023-03-29 18:00:00', false, 4, 2, 1, 20, 0, 2),
(1, 'User Profiles', 'Add user profiles to the project', '2023-03-26 09:00:00', '2023-04-01 18:00:00', false, 7, 1, 3, 50, 0, 4),
(1, 'Search Functionality1', 'Add search functionality to the project', '2023-03-23 09:00:00', '2023-03-25 18:00:00', false, 6, 3, 1, 40, 0, 2),
(1, 'Payment Processing', 'Add payment processing to the project', '2023-03-26 09:00:00', '2023-03-30 18:00:00', false, 9, 1, 2, 70, 0, 3),
(1, 'ML Chat Functionality', 'Add chat functionality to the project', '2023-04-01 09:00:00', '2023-04-03 18:00:00', false, 5, 2, 3, 30, 0, 2),
(1, 'Email Notifications1', 'Add email notifications to the project', '2023-04-04 09:00:00', '2023-04-06 18:00:00', false, 4, 1, 1, 20, 0, 2),
(1, 'Export Data', 'Add ability to export data to the project', '2023-04-07 09:00:00', '2023-04-09 18:00:00', false, 3, 3, 2, 10, 0, 1),
(1, 'Import Data', 'Add ability to import data to the project', '2023-04-10 09:00:00', '2023-04-12 18:00:00', false, 6, 1, 3, 40, 0, 3),
(1, 'Data Visualization', 'Add data visualization to the project', '2023-04-13 09:00:00', '2023-04-17 18:00:00', false, 8, 2, 1, 60, 0, 4),
(1, 'Feature 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo magna eget lacus vehicula, ut convallis erat rhoncus.', '2023-04-20 09:00:00', '2023-04-25 17:00:00', false, 5, 1, 1, 20, 60, 2),
(1, 'Feature 2', 'Nulla dapibus, ipsum vel consectetur vulputate, nulla velit convallis sapien, sit amet lacinia lectus magna vel nisi.', '2023-04-25 13:00:00', '2023-05-02 16:00:00', false, 8, 2, 1, 50, 20, 1),
(1, 'Feature 3', 'Donec sit amet vestibulum turpis. Sed eget purus in magna sodales egestas.', '2023-05-03 10:00:00', '2023-05-08 14:00:00', false, 3, 1, 2, 70, 40, 3),
(1, 'Feature 4', 'Curabitur ut ante vitae dolor finibus interdum eget eu justo. Suspendisse ut luctus nibh, et consequat felis.', '2023-05-10 08:00:00', '2023-05-16 18:00:00', false, 6, 2, 1, 30, 80, 2),
(1, 'Feature 5', 'Phasellus rhoncus ante in lorem congue, vel consequat sapien tincidunt.', '2023-05-17 09:00:00', '2023-05-23 15:00:00', false, 2, 1, 1, 10, 100, 1),
(1, 'Feature 6', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent consequat ipsum ac dapibus rhoncus.', '2023-05-25 12:00:00', '2023-06-01 14:00:00', false, 9, 3, 2, 60, 20, 2),
(1, 'Feature 7', 'Aliquam sagittis enim id mi commodo commodo. Sed rutrum odio vel luctus fringilla.', '2023-05-02 09:00:00', '2023-05-09 12:00:00', false, 4, 1, 3, 90, 10, 3),
(1, 'Feature 8', 'Integer bibendum sollicitudin purus, eu facilisis libero vehicula eu. Sed quis felis dui.', '2023-05-10 14:00:00', '2023-05-16 18:00:00', false, 7, 2, 2, 40, 50, 1),
(1, 'User Login', 'Implement user login functionality', '2023-05-10 10:00:00', '2023-05-15 12:00:00', false, 7, 2, 1, 20, 30, 3),
(1, 'User Registration', 'Implement user registration functionality', '2023-05-12 14:00:00', '2023-05-17 16:00:00', false, 5, 2, 1, 10, 50, 4),
(1, 'Homepage Design', 'Design and implement homepage UI', '2023-06-15 09:00:00', '2023-06-22 12:00:00', false, 6, 2, 1, 30, 20, 2),
(1, 'Database Schema', 'Design database schema for the project', '2023-05-18 10:00:00', '2023-05-25 12:00:00', false, 8, 1, 1, 15, 10, 2),
(1, 'Payment Gateway Integration1', 'Integrate payment gateway into the project', '2023-05-20 11:00:00', '2023-05-27 13:00:00', false, 9, 3, 1, 25, 10, 3),
(1, 'Search Functionality2', 'Implement search functionality for the project', '2023-05-23 15:00:00', '2023-05-30 18:00:00', false, 6, 2, 1, 20, 60, 3),
(1, 'User Profile Page to AI', 'Design and implement user profile page UI', '2023-05-26 09:00:00', '2023-06-02 12:00:00', false, 7, 2, 1, 30, 25, 2),
(1, 'Admin Dashboard1', 'Design and implement admin dashboard UI', '2023-05-29 14:00:00', '2023-06-05 16:00:00', false, 8, 1, 1, 10, 30, 2),
(1, 'Bug Fixes old', 'Fix all the known bugs in the project', '2023-04-01 11:00:00', '2023-04-08 13:00:00', false, 4, 3, 1, 5, 80, 4),
(1, 'Code Review', 'Perform code review and fix issues', '2023-05-04 15:00:00', '2023-05-11 18:00:00', false, 5, 2, 1, 10, 60, 3),
(1, 'Documentation', 'Create user and developer documentation', '2023-05-07 09:00:00', '2023-05-14 12:00:00', false, 3, 3, 1, 5, 40, 2),
(1, 'User Authentication', 'Allow users to create accounts and log in.', '2023-04-10 12:00:00', '2023-04-20 12:00:00', false, 3, 1, 1, 20, 10, 3),
(1, 'Admin Dashboard2', 'Create a dashboard for admins to manage the site.', '2023-06-15 12:00:00', '2023-07-05 12:00:00', false, 6, 2, 1, 50, 20, 2),
(1, 'Search Functionality3', 'Add search functionality to the site.', '2023-05-18 12:00:00', '2023-06-02 12:00:00', false, 4, 1, 1, 30, 30, 1),
(1, 'Mobile Responsive Design', 'Make the site responsive for mobile devices.', '2023-06-12 12:00:00', '2023-06-25 12:00:00', false, 5, 2, 1, 40, 50, 2),
(1, 'Payment Gateway Integration2', 'Integrate a payment gateway for accepting payments.', '2023-06-20 12:00:00', '2023-07-01 12:00:00', false, 8, 3, 1, 60, 10, 3),
(1, 'Email Notifications2', 'Set up email notifications for users.', '2023-05-17 12:00:00', '2023-05-20 12:00:00', false, 3, 1, 1, 10, 40, 2),
(1, 'Social Media Sharing', 'Add social media sharing buttons to the site.', '2023-07-22 12:00:00', '2023-07-28 12:00:00', false, 2, 1, 1, 5, 80, 1),
(1, 'File Uploads', 'Allow users to upload files to the site.', '2023-06-25 12:00:00', '2023-07-05 12:00:00', false, 5, 2, 1, 30, 60, 1),
(1, 'User Profile Pages', 'Create pages for users to view and edit their profiles.', '2023-07-14 12:00:00', '2023-07-27 12:00:00', false, 4, 1, 1, 20, 70, 3),
(1, 'Bug Fixes new', 'Fix bugs and issues on the site.', '2023-07-11 12:00:00', '2023-08-16 12:00:00', false, 2, 1, 2, 5, 90, 0),
(1, 'Login page UI', 'Improve the UI design of the login page', '2023-05-11 09:00:00', '2023-05-15 17:00:00', false, 4, 2, 1, 30, 40, 2),
(1, 'Registration form validation', 'Implement validation on registration form', '2023-04-16 10:00:00', '2023-04-20 17:00:00', false, 6, 1, 1, 50, 60, 3),
(1, 'Password reset functionality', 'Implement password reset functionality', '2023-05-21 09:00:00', '2023-05-26 17:00:00', false,8, 2, 2, 40, 20, 1),
(1, 'User profile page to ML', 'Create user profile page with basic information', '2023-04-27 09:00:00', '2023-04-30 17:00:00', false,5, 1, 1, 20, 70, 4),
(1, 'Admin dashboard3', 'Create admin dashboard with user statistics', '2023-04-01 09:00:00', '2023-04-05 17:00:00',false, 9, 3, 2, 70, 30, 2),
(1, 'Social media sharing', 'Add social media sharing feature', '2023-04-06 09:00:00', '2023-04-10 17:00:00', false,3, 1, 1, 10, 50, 1),
(1, 'Email notifications3', 'Implement email notifications for user events', '2023-04-11 09:00:00', '2023-04-15 17:00:00',false,7, 2, 2, 60, 80, 3),
(1, 'Chat feature', 'Add chat feature for user communication', '2023-04-16 09:00:00', '2023-04-20 17:00:00', false,8, 3, 3, 90, 10, 4),
(1, 'Bug fixes', 'Fix reported bugs and errors', '2023-04-21 09:00:00', '2023-04-25 17:00:00', false,2, 1, 1, 5, 100, 2),
(1, 'Performance optimization', 'Optimize website performance for faster load times', '2023-04-26 09:00:00', '2023-04-30 17:00:00', false,10, 3, 2, 80, 60, 4),
(1, 'User feedback feature', 'Add user feedback feature for users to give feedback', '2023-05-01 09:00:00', '2023-05-05 17:00:00', false,6, 2, 1, 30, 40, 1),
(1, 'Login Page UI Design', 'Design a new login page UI for the website', '2023-04-15 09:00:00', '2023-04-20 18:00:00',false, 5, 2, 1, 25, 60,1),
(1, 'Add Login Authentication', 'Implement login authentication for users', '2023-04-20 09:00:00', '2023-04-25 18:00:00',false, 7, 1, 1, 50, 20,2),
(1, 'Implement User Registration', 'Add functionality for user registration', '2023-04-25 09:00:00', '2023-05-01 18:00:00',false, 6, 1, 1, 30, 40,3),
(1, 'User Profile Page to Robotics', 'Design and implement user profile page', '2023-04-01 09:00:00', '2023-04-10 18:00:00', false,8, 2, 2, 40, 30,1),
(1, 'Add Friends List', 'Add a friends list functionality for users', '2023-04-10 09:00:00', '2023-04-20 18:00:00', false,4, 3, 1, 10, 80,2),
(1, 'AI Chat Functionality', 'Add chat functionality for users', '2023-04-20 09:00:00', '2023-05-05 18:00:00', false,9, 1, 2, 80, 10,1),
(1, 'Add Search Functionality', 'Add search functionality for users to search for other users', '2023-05-05 09:00:00', '2023-05-20 18:00:00',false, 6, 2, 1, 20, 50,2),
(1, 'Add Post Functionality', 'Add functionality for users to create and post content', '2023-05-20 09:00:00', '2023-06-05 18:00:00', false,7, 1, 2, 50, 20,3),
(1, 'Add Comment Functionality', 'Add functionality for users to comment on posts', '2023-06-05 09:00:00', '2023-06-20 18:00:00', false,5, 3, 1, 30, 60,4);

INSERT INTO bugs (featureid, devid, bugname, location, bugdesc, priority, severity) VALUES
(1, 2, 'Broken link', 'Homepage', 'Link to About page is broken', 2, 1),
(1, 3, 'Missing image', 'Homepage', 'Image of product is missing', 1, 2),
(2, 4, 'Typo in headline', 'Pricing page', 'There is a typo in the main headline', 3, 1),
(3, 5, 'Login error', 'Login page', 'Unable to log in with correct credentials', 1, 3),
(4, 6, 'Slow loading', 'Search results page', 'Page takes too long to load search results', 2, 2),
(4, 7, 'Incorrect search results', 'Search results page', 'Search results are not relevant to the search term', 3, 3),
(5, null, 'Broken video', 'Video page', 'Video does not play and shows an error message', 2, 1),
(6, 8, 'Formatting issue', 'Blog post', 'Text formatting is not consistent throughout the post', 1, 2),
(7, 9, 'Wrong price', 'Checkout page', 'The price of the product is different than advertised', 3, 3),
(8, null, 'Database error', 'Admin panel', 'Unable to access database to view user information', 1, 1),
(9, 10, 'Image alignment', 'Gallery page', 'Images in the gallery are not aligned properly', 2, 2),
(10, null, 'Page not found', '404 page', 'Page does not exist and shows a 404 error', 3, 3),
(11, null, 'Server error', 'Homepage', 'Server error message is displayed on the homepage', 1, 1),
(12, 1, 'Broken form', 'Contact page', 'Form cannot be submitted due to an error', 2, 1),
(13, 2, 'Wrong category', 'Product page', 'Product is listed in the wrong category', 1, 2),
(14, null, 'Slow response time', 'Homepage', 'Page takes a long time to respond to user actions', 3, 2),
(15, null, 'Broken navigation', 'Homepage', 'Navigation menu links are not working', 1, 3),
(16, null, 'Layout issue', 'Product page', 'Product information is not displayed correctly on the page', 2, 1),
(17, 3, 'Wrong color', 'Product page', 'Product color is different than shown in the picture', 3, 2),
(18, null, 'Broken link', 'Homepage', 'Link to social media page is broken', 1, 3),
(19, null, 'Broken stylesheet', 'Homepage', 'Page is not styled correctly and looks broken', 2, 1),
(20, 4, 'Incorrect pricing', 'Product page', 'The price of the product is different than listed on the page', 3, 2),
(21, null, 'Broken image', 'Homepage', 'Image on the homepage is broken and not displayed', 1, 3),
(22, 5, 'Login redirect', 'Login page', 'After successful login, user is redirected to wrong page', 2, 1),
(23, 3, 'Null Pointer Exception', 'Backend', 'When a user submits an invalid request, the system crashes with a null pointer exception.', 1, 3),
(24, 5, 'Inconsistent Data', 'Database', 'The data in the database is inconsistent and causing errors in the application.', 2, 2),
(25, 2, 'Slow Response Time', 'Frontend', 'The application is taking too long to load pages, causing frustration for users.', 3, 1),
(26, NULL, 'Security Vulnerability', 'Server', 'The server has a security vulnerability that needs to be addressed.', 1, 3),
(25, 1, 'Incorrect Data Displayed', 'UI', 'The data being displayed on the UI is incorrect and needs to be updated.', 2, 2),
(26, 4, 'Feature Request', 'UI', 'Add the ability to filter search results by date.', 3, 1),
(27, 6, 'Broken Link', 'Frontend', 'A link on the page is broken and needs to be fixed.', 1, 3),
(28, 7, 'Typos in Text', 'UI', 'There are typos in the text on the page that need to be corrected.', 2, 2),
(29, NULL, 'Performance Issue', 'Backend', 'The backend is experiencing performance issues and needs to be optimized.', 1, 3),
(30, 9, 'Incorrect Calculation', 'Backend', 'The calculations being performed in the backend are incorrect and need to be fixed.', 2, 2),
(31, 10, 'Feature Request', 'UI', 'Add the ability to sort table data by column.', 3, 1);

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

INSERT INTO feedback (userid, projectid, fbdate, fbtype, fbquestion, fbscore)
VALUES
    (1, 1, '2022-01-01 10:00:00', 5, 'How satisfied are you with the project progress?', 85),
    (2, 1, '2022-01-02 11:00:00', 7, 'How would you rate the quality of the code?', 75),
    (3, 1, '2022-01-03 12:00:00', 2, 'How likely are you to recommend this project to a friend or colleague?', 90),
    (4, 1, '2022-01-04 13:00:00', 8, 'How well is the project meeting your expectations?', 80),
    (5, 1, '2022-01-05 14:00:00', 4, 'How satisfied are you with the communication between team members?', 95),
    (6, 1, '2022-01-06 15:00:00', 3, 'How helpful have the project resources been?', 92),
    (7, 1, '2022-01-07 16:00:00', 9, 'How well is the project aligned with your goals?', 78),
    (8, 1, '2022-01-08 17:00:00', 6, 'How satisfied are you with the project timeline?', 85),
    (9, 1, '2022-01-09 18:00:00', 1, 'How satisfied are you with the overall progress of the project?', 89),
    (10, 1, '2022-01-10 19:00:00', 10, 'How would you rate the level of collaboration between team members?', 83),
    (1, 1, '2022-02-01 10:00:00', 5, 'How satisfied are you with the project progress?', 91),
    (2, 1, '2022-02-02 11:00:00', 7, 'How would you rate the quality of the code?', 72),
    (3, 1, '2022-02-03 12:00:00', 2, 'How likely are you to recommend this project to a friend or colleague?', 87),
    (4, 1, '2022-02-04 13:00:00', 8, 'How well is the project meeting your expectations?', 82),
    (5, 1, '2022-02-05 14:00:00', 4, 'How satisfied are you with the communication between team members?', 94),
    (6, 1, '2022-02-06 15:00:00', 3, 'How helpful have the project resources been?', 90),
    (7, 1, '2022-02-07 16:00:00', 9, 'How well is the project aligned with your goals?', 76),
    (8, 1, '2022-02-08 17:00:00', 6, 'How satisfied are you with the project timeline?', 83),
    (9, 1, '2022-02-09 18:00:00', 1, 'How satisfied are you with the overall progress of the project?',50),
    (10, 1, '2022-01-01 12:00:00', 8, 'How satisfied are you with the overall progress of the project?', 85);
