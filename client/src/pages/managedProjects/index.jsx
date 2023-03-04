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
        projectName:"CS261 Coursework",
        projectDescription:"Group coursework run by James Archbold",
        progress:70,
        teamMembers: [{
            name:"Jack Arnold",
            imagePath: "jane.jpg"
            },
            {
            name:"Jane Arnold",
            imagePath: "jane.jpg"
        }],
        startDate: "12/10/22",
        endDate: "12/12/22",
        tasksPending:"2",
        risk: 50
    },
    {
        projectId:"1",
        projectName:"CS261 Coursework",
        projectDescription:"Group coursework run by James Archbold",
        progress:70,
        teamMembers: [{
            name:"Jack Arnold",
            imagePath: "jane.jpg"
            },
            {
            name:"Jane Arnold",
            imagePath: "jane.jpg"
        }],
        startDate: "12/10/22",
        endDate: "12/12/22",
        tasksPending:"2",
        risk: 50
    },
    {
        projectId:"1",
        projectName:"CS261 Coursework",
        projectDescription:"Group coursework run by James Archbold",
        progress:70,
        teamMembers: [{
            name:"Jack Arnold",
            imagePath: "jane.jpg"
            },
            {
            name:"Jane Arnold",
            imagePath: "jane.jpg"
        }],
        startDate: "12/10/22",
        endDate: "12/12/22",
        tasksPending:"2",
        risk: 50
    },
{
        projectId:"1",
        projectName:"CS261 Coursework",
        projectDescription:"Group coursework run by James Archbold",
        progress:70,
        teamMembers: [{
            name:"Jack Arnold",
            imagePath: "jane.jpg"
            },
            {
            name:"Jane Arnold",
            imagePath: "jane.jpg"
        }],
        startDate: "12/10/22",
        endDate: "12/12/22",
        tasksPending:"2",
        risk: 50
    }]
    return (
        <div className="viewProjectsPage">
            <p className="projectTitleId">Managed Projects</p>
            <div className="viewProjectGrid">
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