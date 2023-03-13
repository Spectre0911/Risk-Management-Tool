import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {FaBell} from 'react-icons/fa';
import "./projectComponent.css"
import { ProgressBar } from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNavigate } from "react-router-dom";

const ProjectComponent = ({data}) => {
  const navigate = useNavigate();
  const progressDotStyle = (percentage) => ({
    left: `calc(${percentage}%)`,
    top: "17px"
  });

  return (
    <div className='projectInfoBox'>
        <div className="projectName">
            <p>{data.projectName}</p>
        </div>
        <div className="projectDescription">
            <p>{data.projectDescription}</p>
        </div>
        <div className="progressTitle">Progress:</div>
        <div className="projectInfoBar">
        <div id="progressDot" className="progressNumber project" style={progressDotStyle(data.progress)}>
          <p>{data.progress}%</p>
        </div>
          <ProgressBar now={data.progress} />
        </div>
        <div className="projectCardDate"><b>Timeline: </b>{data.startDate} - {data.endDate}</div>
        
        <div className="projectCardDate"><b>Tasks pending: </b>3</div>
        
        <button className="projectStatus" onClick={() =>
                  navigate(`/projects/${data.projectid}`)
                }>View Project</button>

        <div className="projectCardDate"><b>Risk: </b>
          <CircularProgressbar
            value={data.risk}
            text={`${data.risk}%`}
            strokeWidth={12}
          />
        </div>


    </div>
  );
};


export default ProjectComponent;
