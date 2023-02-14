import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import { useState } from 'react';
import "./index.css";
import Select from "react-select";
import ProjectComponent from './projectComponent';

const ManagedProjects = () => {
    return (
        <div className='viewProjectsPage'>
            <div className="pageTitle">
                <p>Managed Projects</p>
            </div>
            <div className='viewProjectGrid'>
                <ProjectComponent projectName="cs261 coursework" description="Group coursework run by James Archbold" status="1"/>
                <ProjectComponent name="jack1" num="2"/>
                <ProjectComponent name="jac2" num="3"/>
                <ProjectComponent name="jac3" num="2"/>
            </div>
        </div>
    );
};


export default ManagedProjects;