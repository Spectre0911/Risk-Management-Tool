from flask import Flask, request
from sklearn import model_selection
import joblib
import numpy as np
import json 
import psycopg2

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
filename = 'LogisticRegression.sav'
model = joblib.load(filename)

# Setup url route which will calculate
# total sum of array.
@app.route('/predictoveralscore', methods = ['POST']) 
def predict():
    #recieve the post request
    data = request.get_json() 
    
    #get the project id
    projectid = data['projectid']

    #get the necessary features
    skillset_per_workload = skillset_workload(projectid)
    delay = get_delay(projectid)
    bugs = get_bugs(projectid)
    replacement_score = get_replacement(projectid)
    change_features = get_change_features(projectid)
    success_story = 0.5

    #merge all the features into one numpy array
    in_data = np.array([skillset_per_workload, success_story, delay, change_features, bugs, replacement_score])

    #feed the input to the model
    result = model.predict(in_data)
  
    # Return data in json format 
    return json.dumps({"overall_result": result[0],
                       "skillset" : skillset_per_workload,
                       "code_quality" : bugs,
                       "delay" : delay,
                       "employee_replacement" : replacement_score,
                       "features_changed" : change_features,
                       "success_story" : success_story})

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
    print(skill_years)
    #calculate the score for the skillset
    for skill_year in skill_years:
        if skills_required_by_project.get(skill_year[0]):
            skillset_score += skill_year[1]
    print(skillset_score)
    #get durations of each feature from that project
    #discuss it with groupmates
    cursorObj.execute("SELECT extract(days from (endtime - starttime))::INTEGER FROM features WHERE features.projectid = %s", (projectId,))
    durations = cursorObj.fetchall()
    durations = [item[0] for item in durations]
    print(durations)
    workload = sum(durations)

    return skillset_score/workload

#calculating delay assuming the #days(delayed) does not exceed 20 days
def get_delay (projectId):
    cursorObj = conn.cursor()

    cursorObj.execute("SELECT SUM(EXTRACT(DAYS FROM (NOW() - endtime))/20::INTEGER) FROM features WHERE EXTRACT(SECOND from (NOW() - endtime))::INTEGER < 0")
    delay = cursorObj.fetchall()[0][0]

    return -delay

def get_bugs (projectId):
    cursorObj = conn.cursor()

    cursorObj.execute("SELECT SUM(severity) FROM features NATURAL JOIN bugs WHERE projectid = %s", (projectId,))
    num_bugs = cursorObj.fetchall()[0][0]

    return num_bugs


def get_replacement (projectId):
    cursorObj = conn.cursor()

    cursorObj.execute("SELECT dateChanged FROM replacements WHERE replacements.changeType = %s", (0,))
    dates_changed = cursorObj.fetchAll()
    dates_changed = [item[0] for item in dates_changed]

    cursorObj.execute("SELECT opened, deadline FROM projects WHERE projectid = %s", (projectId,))
    (opened, deadline) = cursorObj.fetchall()[0]
    duration = (deadline - opened).days

    delay = 0

    for change in dates_changed:
        if (dates_chnaged - opened).days > 5:
            delay += (dates_chnaged - opened).days/duration
    
    return delay

def get_change_features (projectId):
    cursorObj = conn.cursor()
    
    cursorObj.execute("SELECT SUM(priority) FROM featureChange WHERE featureChange.projectid = %s", (projectid,))
    change_score = cursorObj.fetchall()[0][0]

    return change_score

if __name__ == "__main__":
    app.run(port=5001)