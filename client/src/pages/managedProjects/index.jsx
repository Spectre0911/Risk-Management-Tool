import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import { useState } from 'react';
import "./index.css";
import Select from "react-select";
import ProjectComponent from './projectComponent';

const ManagedProjects = () => {

    const data = [{
        projectId:"1",
        projectName:"Water Estimation project",
        projectDescription:"A model to estimae water usage",
        progress:80,
        teamMembers: [{
            name:"Jane Arnold",
            imagePath: "jane.jpg"
            },
            {
            name:"Ankit Patel",
            imagePath: "ankit.jpg"
        }],
        startDate: "12/02/23",
        endDate: "12/03/23",
        tasksPending:"2",
        risk: 50
    },
    {
        projectId:"2",
        projectName:"Feedback Tool",
        projectDescription:"Develop a new feedback tool",
        progress:20,
        teamMembers: [{
            name:"Jack Arnold",
            imagePath: "jane.jpg"
            },
            {
            name:"Jonathan Hague",
            imagePath: "jonathan.jpg"
            },
            {
            name:"Sylvia Lewis",
            imagePath: "sylvia.jpg"
            },
        ],
        startDate: "12/10/22",
        endDate: "12/12/22",
        tasksPending:"2",
        risk: 50
    }]
    return (
        <div className="viewProjectsPage">
            <p className="projectTitleId">Managed Projects</p>
            <div className="projectContainerBox">
                {data.map((project,index) =>{
                    return(
                    <ProjectComponent data={project}/>
                    )
                })}
            </div>
        </div>
    );
};


export default ManagedProjects;