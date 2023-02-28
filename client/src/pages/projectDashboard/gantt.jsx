import React, { useState, useEffect } from "react";
import { FrappeGantt, Task } from "frappe-gantt-react";
import { getAllDependencies } from "../services/AllDependencies";
import { CallTopoSort } from "../services/TopoSort";
const GanttChart = () => {
  const [tasks, setTasks] = useState([{}]);

  useEffect(() => {
    getAllFeatures({ projectid: 1 });
    sortTopologically({ projectid: 1 });
  }, []);

  const getAllFeatures = (values) => {
    var outputList = [];
    fetch("http://localhost:5000/api/features", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          let featureDepMap = new Map();
          let promises = [];

          for (let i = 0; i < data.length; i++) {
            let currentFeatureId = data[i].featureid;
            let promise = getAllDependencies({ featureid: currentFeatureId })
              .then((dependencyIds) => {
                featureDepMap.set(currentFeatureId, dependencyIds);
              })
              .catch((error) => {
                featureDepMap.set(currentFeatureId, []);
              });
            promises.push(promise);
          }

          Promise.all(promises)
            .then(() => {
              var dateList = (outputList = data.map((inputObj, index) =>
                console.log(
                  inputObj.featurename,
                  new Date(inputObj.starttime).toISOString().split("T")[0],
                  new Date(inputObj.endtime).toISOString().split("T")[0]
                )
              ));
              outputList = data.map((inputObj, index) => ({
                id: `i${inputObj.featureid}`,
                name: inputObj.featurename,
                start: new Date(inputObj.starttime).toISOString().split("T")[0],
                end: new Date(inputObj.endtime).toISOString().split("T")[0],
                progress: inputObj.progress,
                dependencies: featureDepMap
                  .get(inputObj.featureid)
                  .map((num) => `i${num}`)
                  .join(","),
              }));
              setTasks(outputList);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  };
  const sortTopologically = (values) => {
    var outputList = [];
    fetch("http://localhost:5000/api/features", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          let featureDepMap = new Map();
          let promises = [];

          for (let i = 0; i < data.length; i++) {
            let currentFeatureId = data[i].featureid;
            let promise = getAllDependencies({ featureid: currentFeatureId })
              .then((dependencyIds) => {
                featureDepMap.set(currentFeatureId, dependencyIds);
              })
              .catch((error) => {
                featureDepMap.set(currentFeatureId, []);
              });
            promises.push(promise);
          }

          Promise.all(promises)
            .then(() => {
              console.log(values);
              CallTopoSort({
                dependencies: featureDepMap,
                projectid: 1,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  };

  return (
    <div>
      <FrappeGantt
        tasks={tasks}
        viewMode={"Day"}
        onClick={(task) => console.log(task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
      />
    </div>
  );
};

export default GanttChart;
