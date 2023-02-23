import React, { Component, useState, } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Table from "./Table";
import "./index.css"
import { height } from "@mui/system";
import DonutChart from "./DonutChart";
import {Doughnut} from 'react-chartjs-2';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
import { Button } from "react-bootstrap";
import {CgUserRemove} from 'react-icons/cg';
import Modal from 'react-bootstrap/Modal';
import {GrClose} from 'react-icons/gr';
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

Chart.register(ArcElement);
Chart.register([Tooltip])
Chart.register([Legend])

const TaskDashboard = () => {
  
    const {taskId} = useParams();
    const labelsRisk = ['Budget','Team','Time','Code', 'Technical'];
    const dataRisk = [29,24,25,25,10];
    const borderColorRisk =['rgba(255,206,86,0.2)'];
    const backgroundColorRisk = [
      'rgba(232,99,132,1)',
      'rgba(232,211,6,1)',
      'rgba(54,162,235,1)',
      'rgba(255,159,64,1)',
      'rgba(255,129,64,1)'
    ];

    const labelsBugs = ['Critical','Major','Minor'];
    const dataBugs = [10,4,1];
    const backgroundColorBugs = [
      'rgba(215,20,50,1)',
      'rgba(255,128,0,1)',
      'rgba(255,255,0,1)',
    ];


    const labelsFeatures = ['Core','Optional','Aesthetic'];
    const dataFeatures = [8,14,12];
    const backgroundColorFeatures = [
      'rgba(255,0,0,1)',
      'rgba(255,128,0,1)',
      'rgba(255,255,0,1)',
    ];

    const labelsTime = ['Remaining', 'Total'];
    const dataTime = [8,14];
    const backgroundColorTime = [
      'rgba(255,0,0,1)',
      'rgba(255,128,0,1)',
    ];

    const teamMembers = [
      {
        id: "1",
        name:"Jane Arnold",
        image:"http://localhost:5000/assets/jane.jpg",
        skills:["Python","React"],
        suitabilityScore:0
      },{ 
        id: "2",
        name:"Jane Arnold",
        image:"http://localhost:5000/assets/jane.jpg",
        skills:["Python","React"],
        suitabilityScore:0
      }];

    const [showDelete, setShowDelete] = useState(false);
    const [removeUserId, setRemoveUserId] = useState();


    const handleDeleteClose = () => {
      setShowDelete(false);
    }
    const handleDeleteShow = (e) => {
      setRemoveUserId(e.target.value);
      setShowDelete(true);
    }
  
    const deleteFeature = (e) => {
      console.log("delete this");
      console.log(removeUserId);
      setShowDelete(false);
    }
    
      

  return (
    <div className="main">
      <div className="grid">
        <div className="infoBox2 projectTable task">
          <p className="projectTitleId">Tasks for {taskId} project</p>
          <div className="metricTitle2">Features</div>
          <Table />
        </div>
      </div>

      <Modal className="addProfileModal" style={{"marginTop":"200px"}} fade={false} show={showDelete} onHide={handleDeleteClose}>
            <Modal.Header>
            <div className="bugFormClose" onClick={handleDeleteClose}>
                <GrClose />
            </div>
            <Modal.Title>Remove team member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <p>Are you would you would like to remove Jane from the team?</p>
            <Box>
              <Button
                className="bugCancelButton"
                fullWidth
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
                style={{marginLeft: "10px"}}
                onClick={deleteFeature}
              >
                {"Remove"}
              </Button>

              <Button
                className="bugAddButton"
                fullWidth
                onClick={handleDeleteClose}
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
              >
                {"Cancel"}
              </Button>
            </Box>

            </Modal.Body>
        </Modal>
      
    </div>
  );
};

export default TaskDashboard;
