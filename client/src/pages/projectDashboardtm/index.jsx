import React, { Component, useState, useEffect} from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Table from "./Table";
import "./index.css"
import { height } from "@mui/system";
import DonutChart from "../projectDashboard/DonutChart";
import {Doughnut} from 'react-chartjs-2';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
import { Button } from "react-bootstrap";
import {CgUserRemove} from 'react-icons/cg';
import Modal from 'react-bootstrap/Modal';
import {GrClose} from 'react-icons/gr';
import {IoIosPersonAdd} from 'react-icons/io';
import NewGantt from './App.js';
import Select from "react-select";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  Box,
} from "@mui/material";
import GanttChart from "./gantt";
import { gantt } from "dhtmlx-gantt";
// import GanttChart from "../gantt";
import { Octokit } from "octokit";
import { useNavigate } from "react-router-dom";
Chart.register(ArcElement);
Chart.register([Tooltip])
Chart.register([Legend])
const ProjectDashboardTm = () => {
    const navigate = useNavigate();
    const {projectId} = useParams();
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
    const [showAdd, setShowAdd] = useState(false);
    const [ganttViewState, setGanttViewState] = useState("Days");
    const [removeUserId, setRemoveUserId] = useState();


    const handleDeleteClose = () => {
      setShowDelete(false);
    }
    const handleDeleteShow = (e) => {
      setRemoveUserId(e.target.value);
      setShowDelete(true);
    }
  
    const handleAddClose = () => {
      setShowAdd(false);
    }
    const handleAddShow = (e) => {
      console.log("2dd");
      setShowAdd(true);
    }


    const deleteFeature = (e) => {
      console.log("delete this");
      console.log(removeUserId);
      setShowDelete(false);
    }

    const addTeamMember = (e) =>{
      console.log(teamMembersList);
    }

    const changeGanttViewState = (e) =>{
      setGanttViewState(e.target.value);
    }

    
  const teamMembersOptions = [
    { value: "1", label: "Joshua" },
    { value: "2", label: "Morgan" },
    { value: "3", label: "Sanjula" },
  ];

  const [teamMembersList, setTeamMembersList] = useState([]);
  const handleTeamMemberChange =(e) =>{
    setTeamMembersList(e);
  }
    


  return (
    <div className="main">
      <div className="grid">
        <p className="projectTitleId">Project number team member {projectId}</p>
        
        
        <div className="infoBox project">
          <div className="metricTitle">Tasks left to complete</div>
            <div className="metricDonutContainer smaller">
              <DonutChart chartData={dataFeatures} labels={labelsFeatures} border={borderColorRisk} backgroundColor={backgroundColorFeatures} cutOut={60}/>
            <div className="donutText">
              <p>10</p>
            </div>
            </div>
          
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Bugs</div>
          <div className="metricDonutContainer smaller">
            <DonutChart chartData={dataBugs} labels={labelsBugs} border={borderColorRisk} backgroundColor={backgroundColorBugs} cutOut={63}/>
          <div className="donutText">
            <p>21</p>
          </div>
          </div>
        </div>

        

        <div className="infoBox project">
          <div className="metricTitle">Time Left</div>
            <div className="metricDonutContainer smaller1">
              <DonutChart chartData={dataTime} labels={labelsTime} border={borderColorRisk} backgroundColor={backgroundColorTime} cutOut={60}/>
            <div className="donutText">
              <p>5 days</p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Complete Survey</div>
            <div className="metricDonutContainer smaller1">
              <div className="surveyText">
                <p className="daysLeftTitle">6 Days</p>
                <p className="daysLeftDesc">Since you last completed the feedback survey</p>
                <button onClick={{}} className="projectFilterInput feedbackForm" >
                  Complete Survey
                </button>
              </div>
            </div>
        </div>

        <div className="infoBox2 projectTable feature">
          <div className="metricTitle2">Tasks</div>
          <Table/>
        </div>

        <div className="infoBox2">
          <Scrollbars>
            <div className="metricTitle2" style={{"marginBottom":"20px", "paddingTop":"7px"}}>Team members

            </div>
            
            {teamMembers.map((member,index)=>{
              const imageUrl = member.image;
              return(
              <div className="projectDashboardProfile">
                <p className="projectDashboardProfileName">{member.name}</p>

                <div className="projectDashboardProfilePic">
                  <img key={index} className='profilePic' style={{marginLeft:"0px"}} src={imageUrl}></img>
                </div>
                <div className="projectDashboardSkill">
                  Skills:
                </div>
                {member.skills.map((skill, index) =>{
                  return(
                    <div className="projectDashboardSkillName">
                      {skill}
                    </div>
                  )
                })}
                
                <div className="projectDashboardSkillMatchTitle">
                  <p><b className="projectDashboardBold">Bio:</b> Hi, my name is Jane and I am a software developer</p> 
                </div>
                
                {/* <SemiCircleProgressBar diameter={200} strokeWidth={30} percentage={33} showPercentValue /> */}
              </div>
              )
            })}
            
          </Scrollbars>
      </div>
      
      <div className="infoBox2 ganttChart">
          <div className="metricTitle2"><p>Gannt Chart</p>
          </div>
          <div className="ganttContainer">
            {/* <GanttChart viewMode={ganttViewState}/> */}
            <NewGantt viewMode={ganttViewState}/>
          </div>
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
      
        <Modal className="addProfileModal" style={{"marginTop":"200px"}} fade={false} show={showAdd} onHide={handleAddClose}>
            <Modal.Header>
            <div className="bugFormClose" onClick={handleAddClose}>
                <GrClose />
            </div>
            <Modal.Title>Add team member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <p>Please select the team member you would like to add:</p>
            <p
              style={{
                gridColumn: "span 1",
                margin: "auto",
                paddingRight: "2px",
              }}
            >
              Select team member:
            </p>
            <Select
              id="teamMembers"
              name="teamMembers"
              options={teamMembersOptions}
              onChange={handleTeamMemberChange}
              className="defineDependenciesBox"
              sx={{ gridColumn: "span 3", width: "70%" }}
              value={teamMembersList}
            />
            <Box>
              <Button
                className="bugCancelButton"
                fullWidth
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
                style={{marginLeft: "10px"}}
                onClick={addTeamMember}
              >
                {"Add"}
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

export default ProjectDashboardTm;
