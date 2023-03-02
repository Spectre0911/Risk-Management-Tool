import React, { Component, useEffect, useState } from 'react';
import Gantt from './Gantt/'
import Toolbar from './Toolbar/';

const data = {
  data: [
    { id: 1, text: 'Task #1', start_date: '2020-02-12', duration: 3, progress: 0.6 },
    { id: 2, text: 'Task #2', start_date: '2020-02-16', duration: 3, progress: 0.4 }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
};
const NewGantt = () => {


  const [currentZoom, setZoom] = useState('Days');

  const handleZoomChange = (zoom) => {
    setZoom(zoom);
  }

  const logDataUpdate = (tasks) =>{
    console.log(tasks);
  }

  useEffect(()=>{
    console.log("dd");
  },[]);

  return(
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={logDataUpdate}
          />
        </div>
      </div>
    );
};

export default NewGantt;

