import React, { useState, useEffect } from "react";
import { FrappeGantt, Task } from "frappe-gantt-react";

const GanttChart = () => {
  const [tasks, setTasks] = useState([{}]);

  useEffect(() => {
    const getAllFeatures = (values) => {
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
            const outputList = data.map((inputObj, index) => ({
              id: `Task ${index + 1}$`,
              name: inputObj.featurename,
              start: new Date(inputObj.starttime).toISOString().split("T")[0],
              end: new Date(inputObj.endtime).toISOString().split("T")[0],
              progress: inputObj.progress,
              // dependencies: inputObj.dependencies,
            }));
            setTasks(outputList);
          }
        });
    };
    getAllFeatures({ projectid: 1 });
    // console.log("Current tasks");
    // console.log(tasks);
  }, []);

  return (
    <div>
      <FrappeGantt
        tasks={tasks}
        viewMode={"Week"}
        onClick={(task) => console.log(task)}
        customPopupHtml={(task) =>{
            return (
              <div class="details-container">
                <h5>${task.name}</h5>
                <p>Task started on: ${task._start.getDate()}</p>
                <p>Expected to finish by ${task._start.getDate()}</p>
                <p>${task.progress}% completed!</p>
              </div>
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
      />
    </div>
  );
};


export default GanttChart;
