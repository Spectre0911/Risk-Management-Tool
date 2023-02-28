import React, { Component, useEffect, useState }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import AdminSidebar from '../../components/AdminSidebar';
import "./index.css"
import Dashboard from '../dashboard';
import ManagedProjects from '../managedProjects';
import Bugs from '../bugs';
import Modal from 'react-bootstrap/Modal';
import {GrClose} from 'react-icons/gr';
import EditProfileForm from './editProfileForm';
import ProjectDashboard from '../projectDashboard';
import TaskDashboard from '../viewTask';
import GithubIntegrator from '../githubSuite';
const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOverlay = () =>{
      setIsOpen(isOpen);
  }

  const [show, setShow] = useState(false);
  const handleClose = () => {
      setShow(false);
      console.log(show);
  }
  const handleShow = () => {
      setShow(true);
      console.log(show);
  }


  return (
    <div>
      <div className="splitScreen">
        <div className="leftPane">
          <AdminSidebar/>
        </div>
        <div className="rightPane">
            <div className='titleBar'>
              <button className="accountInitialsCircle" onClick={handleShow}>
                <p className="accountInitials">JA</p>
              </button>
              <div>
                <Modal className="addProfileModal" fade={false} show={show} onHide={handleClose}>
                    <Modal.Header>
                    <div className="bugFormClose" onClick={handleClose}>
                        <GrClose />
                    </div>
                    <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <EditProfileForm handleClose={handleClose}/>

                    </Modal.Body>
                </Modal>
            </div>
            </div>
          <Routes>
              <Route path="/*" element={<Dashboard />} />
              <Route path="/managedprojects" element={<ManagedProjects />} />
              <Route path="/bugs" element={<Bugs />} />
              <Route path="/projects/:projectId" element={<ProjectDashboard/> }/>
              <Route path="/viewtasks/:featureId" element={<TaskDashboard/> }/>
              <Route path="/github/:projectId" element={<GithubIntegrator/> }/>
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default Admin;


