import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AdminSidebar from "../../components/AdminSidebar";
import Dashboard from '../dashboard';
import ManagedProjects from '../managedProjects';
import Bugs from "../bugs";
import {GrClose} from 'react-icons/gr';

import EditProfileForm from "../admin/editProfileForm";
import ProjectDashboard from ".";
import TaskDashboard from "../viewTask";
import GithubIntegrator from '../githubSuite';

const ProjectContainer = () => {
  const {projectId} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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
          
          <AdminSidebar projectId={projectId}/>
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
              <Route path="/" element={<ProjectDashboard />} />
              <Route path="/bugs/:projectId" element={<Bugs />} />
              <Route path="/viewtasks/:featureId" element={<TaskDashboard/> }/>
              <Route path="/github/:projectId" element={<GithubIntegrator/> }/>
              </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProjectContainer;
