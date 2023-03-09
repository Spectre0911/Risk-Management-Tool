# CS261 base project 

1) Download and install node (https://nodejs.org/en/download/) v18.14
2) Download and install postgres v15.1 (make sure it has been added to your system variables, you might need to do this manually) (When installing set the postgres password to 'root'. 
3) Download and install pgadmin (to help view the database and its contents)
    - Remember your password for this. 
    - Connect to the database (`psql -U postgres`) 
    - Run the database schema (`psql -U postgres -f "path to the database.sql file"`)
4) Install Flask using `pip install flask`
5) Install __requests__ library for python using `pip install requests`
6) Install __joblib__ library for python using `pip install joblib`
7) Install __sklearn__ library for python using `pip install -U scikit-learn` for **Windows** and **macOS**, `pip3 install -U scikit-learn` for **Linux**.
8) Install __pycopg2__ for python using `pip install psycopg2` command. 
8) In a new terminal, to run the Flask server type `python pyfile.py`
9) In the terminal run
    - `npm install -g nodemon`
10) Go into server/db.js and edit the `password` field only with the password you have set up. 
11) After cloning the github repository, cd into client and run `npm install`
12) `cd` into server and run `npm install`
13) Change the password field 'currently san' in db.sql to the password you set when install postgres.
14) Inside server/ run `nodemon` - The server should start up now
15) Insider client/ run `npm start` - The front end should load up and there should be a todo list system website set up. 

Additional software:
- Install pgAdmin - Can help you view the database and its contents graphically. 


Notes: The front end starts from /client/app.js
- The API's can be found in /server/index.js

#### This is to get the repo locally:
`git clone git@github.com:Spectre0911/CS261.git`

#### This will create a new, isolated, branch that you will be able to work on without affecting the main code base.
`git checkout -b featureName`

#### This will show you all the branches that have been created, locally:
`git branch`

#### This will allow you to switch between branches
`git checkout branchName`

#### Every time you make a change, (use frequently but not after very small changes)
`git commit -m "INPUT A MESSAGE REGARDING THE CHANGE"`

This will store your changes locally and you can view them with the command **git log**

#### When you have completed a feature or want to add something to main code base:
`git push`. I will review this and merge it with our existing code base.
