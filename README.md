# CS261 base project 

1) Download and install node (https://nodejs.org/en/download/)
2) Download and install postgres (make sure it has been added to your system variables, you might need to do this manually). 
3) Download and install pgadmin (to help view the database and its contents)
    - Remember your password for this. 
    - Connect to the database (psql -U postgres) 
    - Run the database schema (psql -U postgres -f "path to the database.sql file")
4) In the terminal run
    - npm install -g nodemon
5) Go into server/db.js and edit the 'password' field only with the password you have set up. 
6) After cloning the github repository, cd into client and run 'npm install'
7) cd into server and run 'npm install'
8) Inside server/ run 'nodemon' - The server should start up now
9) Insider client/ run 'npm start' - The front end should load up and there should be a todo list system website set up. 


Notes: The front end starts from /client/app.js
- The API's can be found in /server/index.js

#### This is to get the repo locally:
git clone git clone git@github.com:Spectre0911/CS261.git

#### This will create a new, isolated, branch that you will be able to work on without affecting the main code base.
git checkout -b featureName

#### This will show you all the branches that have been created, locally:
git branch

#### This will allow you to switch between branches
git checkout branchName

#### Every time you make a change, (use frequently but not after very small changes)
git commit -m "INPUT A MESSAGE REGARDING THE CHANGE"

This will store your changes locally and you can view them with the command **git log**

#### When you have completed a feature or want to add something to main code base:
git push -m "TELL ME WHY YOU ARE PUSHING YOUR CODE". I will review this and merge it with our existing code base.
