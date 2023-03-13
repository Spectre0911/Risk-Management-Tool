from flask import Flask, request
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
import numpy as np
import pickle
import json 
import psycopg2

#set up the connection with the database
conn = psycopg2.connect(
    database = "riskmanager",
    user = "postgres",
    password = "Avazbek2002",
    host = "localhost",
    port = "5432"
)
   
# Setup flask server
app = Flask(__name__)

#load the Logistic Regression Model
loaded_model = pickle.load(open('finalized_model.sav', 'rb'))

# Setup url route which will calculate
# the probabilty of success.
@app.route('/predictoveralscore', methods = ['POST']) 
def predict():
    #recieve the post request
    data = request.get_json() 
    #get the project id
    projectid = int(data['projectid'])

    #get the necessary features
    skillset_per_workload = skillset_workload(projectid)
    delay = get_delay(projectid)
    bugs = get_bugs(projectid)
    replacement_score = get_replacement(projectid)
    change_features = get_change_features(projectid)
    feedback = get_feedback(projectid)
    success_story = 0.5 #for now since there is no any history of success of a company

    #merge all the features into one numpy array
    in_data = np.array([skillset_per_workload, success_story, delay, bugs, feedback, change_features, replacement_score]).reshape(1,-1)
    #feed the input to the model
    result = loaded_model.predict_proba(in_data).T[1][0]
    print(result)
    # Return data in json format 
    return json.dumps({"overall_result": result,
                       "skillset" : skillset_per_workload,
                       "code_quality" : bugs,
                       "delay" : delay,
                       "employee_replacement" : replacement_score,
                       "features_changed" : change_features,
                       "success_story" : success_story,
                       "feedback" : feedback})


def skillset_workload (projectId):
    cursorObj = conn.cursor()

    #get all the skills required by the project
    cursorObj.execute("SELECT skill FROM projectSkill WHERE projectSkill.projectID = %s", (projectId,))
    skills_required_by_project = cursorObj.fetchall()
    
    skills_required_by_project = {item[0]:1 for item in skills_required_by_project}

    skillset_score = 0
    #get all the skills that each employee, working on that project, possesses
    cursorObj.execute("SELECT skill, sklevel FROM (userskill NATURAL JOIN userProject) AS newTable WHERE newTable.projectid = %s", (projectId,))
    skill_years = cursorObj.fetchall()

    #calculate the score for the skillset
    for skill_year in skill_years:
        if skills_required_by_project.get(skill_year[0]):
            skillset_score += skill_year[1]

    #get durations of each feature from that project
    #discuss it with groupmates
    cursorObj.execute("SELECT sum(difficulty) FROM features WHERE projectid = %s", (projectId,))
    durations = cursorObj.fetchall()
    if durations[0][0] == None:
        return 0

    durations = [item[0] for item in durations]
    workload = sum(durations)

    return (skillset_score/workload)


#calculating delay assuming the #days(delayed) does not exceed 20 days
def get_delay (projectId):
    cursorObj = conn.cursor()

    cursorObj.execute("SELECT SUM((EXTRACT(DAYS FROM (NOW() - endtime))::INTEGER)/(EXTRACT(DAYS from (endtime-starttime))::INTEGER)) FROM features WHERE EXTRACT(SECOND from (NOW() - endtime))::INTEGER > 0 and completed=%s", (False,))
    delay = cursorObj.fetchall()[0][0]
    if delay == None:
        return 0
    cursorObj.execute("SELECT COUNT(*) FROM features WHERE projectid = %s", (projectId,))
    feature_size = cursorObj.fetchall()[0][0]/2

    return delay/feature_size

#calculate the code quality score
def get_bugs (projectId):
    cursorObj = conn.cursor()
    
    # retrieve the sum of severity of all bugs in the project
    cursorObj.execute("SELECT SUM(severity) FROM features NATURAL JOIN bugs WHERE projectid = %s", (projectId,))
    num_bugs = cursorObj.fetchall()[0][0]

    if num_bugs == None:
        return 0
    
    #count the number of features of that project
    cursorObj.execute("SELECT COUNT(*) FROM features WHERE projectid = %s", (projectId,))
    feature_size = cursorObj.fetchall()[0][0] * 1.5

    return num_bugs/feature_size

#get the team-member replacement score
def get_replacement (projectId):
    cursorObj = conn.cursor()
    
    #get the dates when the team members were removed from the project
    cursorObj.execute("SELECT dateChanged FROM replacements WHERE replacements.changeType = %s", (0,))
    dates_changed = cursorObj.fetchall()
    if len(dates_changed) == 0:
        return 0

    dates_changed = [item[0] for item in dates_changed]
    
    #fetch the started date and the deadline of a project
    cursorObj.execute("SELECT opened, deadline FROM projects WHERE projectid = %s", (projectId,))
    (opened, deadline) = cursorObj.fetchall()[0]
    duration = (deadline - opened).days
    replacement_score = 0
    
    #count the number of users working on a project
    cursorObj.execute("SELECT count(*) FROM userproject WHERE projectid = %s", (projectId,))
    num_employees = cursorObj.fetchall()[0][0]/8
    
    #select the replacements which happened after 0.1*duration days the project started
    for change in dates_changed:
        if (change - opened).days/duration > 0.1:
            replacement_score += (change - opened).days/duration
    
    return replacement_score/num_employees

#calculate change is features score
def get_change_features (projectId):
    cursorObj = conn.cursor()
    
    #get the sum of priorities of all features that have been added to the project
    cursorObj.execute("SELECT SUM(priority) FROM (featureChange NATURAL JOIN projects) AS newTable WHERE newTable.projectid = %s and EXTRACT(DAYS from (newTable.dateChanged - newTable.opened))::INTEGER > %s", (projectId, 10))
    change_score = cursorObj.fetchall()[0][0]
    if change_score == None:
        return 0

    return change_score/50

#get the feedback score
def get_feedback(projectId):
    cursorObj = conn.cursor()
    
    #get the average of all the scores in feedback given by the developers
    cursorObj.execute("SELECT AVG(fbscore) FROM feedback WHERE projectid = %s", (projectId,))
    result = cursorObj.fetchall()[0][0]
    if result == None:
        return 1
    
    return float(result/100)

if __name__ == "__main__":
    app.run(port=5001)
