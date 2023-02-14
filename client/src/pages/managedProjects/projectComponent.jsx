import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {FaBell} from 'react-icons/fa';
import "./projectComponent.css"
const ProjectComponent = ({projectName, description, status}) => {


  return (
    <div className='projectInfoBox'>
        <div className="projectName">
            <p>{projectName}</p>
        </div>
        <div className="projectDescription">
            <p>{description}</p>
        </div>
        <div className={`projectStatus ${status ? "completed" : "ongoing"}`}>
            <p>{status? 'Completed' : 'Ongoing'}</p>
        </div>
    </div>
  );
};


export default ProjectComponent;
