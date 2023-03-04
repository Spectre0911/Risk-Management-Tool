from flask import Flask, request
from sklearn import model_selection
import joblib
import numpy as np
import json 
   
# Setup flask server
app = Flask(__name__)

#load the Logistic Regression Model
filename = 'LogisticRegression.sav'
model = joblib.load(filename)

# Setup url route which will calculate
# total sum of array.
@app.route('/predict', methods = ['POST']) 
def sum_of_array():
    #recieve the post request
    data = request.get_json() 
    print(data)
    #turn the data into right format
    in_data = np.array(data['array'])
    print(in_data)
    #feed the input to the model
    result = model.predict(in_data)
    print(result[0])
  
    # Return data in json format 
    return json.dumps({"result": result[0]})

if __name__ == "__main__": 
    app.run(port=5001)