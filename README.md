# CS261 base project 

1) Download and install node (https://nodejs.org/en/download/)
2) Download and install postgres (make sure it has been added to your system variables, you might need to do this manually). 
3) Download and install pgadmin (to help view the database and its contents)
    - Remember your password for this. 
    - Connect to the database (psql -U postgres) 
    - Run the database schema (psql -U postgres -f "path to the database.sql file")
4) Go into server/db.js and edit the 'password' field only with the password you have set up. 
4) After cloning the github repository, cd into client and run 'npm install'
5) cd into server and run 'npm install'
6) Inside server/ run 'nodemon' - The server should start up now
7) Insider client/ run 'npm start' - The front end should load up and there should be a todo list system website set up. 


Notes: The front end starts from /client/app.js
- The API's can be found in /server/index.js



