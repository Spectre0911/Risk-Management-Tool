import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {FaBell} from 'react-icons/fa';
import {RiDashboardFill} from 'react-icons/ri'
import "./index.css"
import ProjectComponent from '../managedProjects/projectComponent';

const Dashboard = () => {


  return (
    <div className='main'>
        <div className='grid'>
            <div className='infoBox'>
                <div className='icon'>
                    <FaBell />
                </div>
                <div className="number">
                    <p>50</p>
                </div>
                <div className="metric">
                    <p>Notifications</p>
                </div>
            </div>
            <div className='infoBox'>
                <div className='icon'>
                    <FaBell />
                </div>
                <div className="number">
                    <p>50</p>
                </div>
                <div className="metric">
                    <p>Notifications</p>
                </div>
            </div>
            <div className='infoBox'>
                <div className='icon'>
                    <FaBell />
                </div>
                <div className="number">
                    <p>50</p>
                </div>
                <div className="metric">
                    <p>Notifications</p>
                </div>
            </div>
            <div className='infoBox'>
                <div className='icon'>
                    <FaBell />
                </div>
                <div className="number">
                    <p>50</p>
                </div>
                <div className="metric">
                    <p>Notifications</p>
                </div>
            </div>
            {/* <ProjectComponent/>
            <ProjectComponent/>
            <ProjectComponent/> */}

        </div>
    </div>
  );
};


export default Dashboard;
