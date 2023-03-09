import React, { Component, useState, } from "react";
import {BsFillExclamationTriangleFill} from 'react-icons/bs';
import {BsFillChatSquareTextFill} from 'react-icons/bs';
import { Scrollbars } from "react-custom-scrollbars";
// import "../projectDashboard/index.css";
import "./index.css";
import MultiLineChart from "./MultiLineChart";
import HalfDoughnutChart from "./HalfDoughnutChart";

import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

const SoftMetrics = () => {

  const backgroundColorTeamList = {
    green:['rgba(0, 128, 0,1)','#dbe3de'],
    red:['rgba(219, 52, 0,1)','#dbe3de'],
    yellow:['rgba(255,159,64,1)','#dbe3de']
  };

  const calculateRiskColor = (risk) =>{
    console.log(risk);
    if (risk<2){
      return backgroundColorTeamList.red;
    }else if (risk<3.5){
      return backgroundColorTeamList.yellow;
    }else{
      return backgroundColorTeamList.green;
    }
  }

  const data =[2.4, 4.2, 3.2, 1.2];
  return (
    <div className="main">
      <div className="grid">
        <p className="projectTitleId">Soft Metric Hub</p>

        <div className="infoBox2 projectTable feature" style={{marginBottom:'30px'}}>
          <div className="metricTitle2">Soft Skill Tracker</div>
          <div className="ganttContainer overviewContainer">
            <MultiLineChart/>
          </div>
        </div>
        
        <div className="infoBox2" style={{marginBottom:'30px'}}>
          <Scrollbars>
            <div className="metricTitle2"  style={{marginBottom:'20px'}}>Notifications</div>

            <div className="notificationBox">
              <div className="notificationIcon blueIcon">
                <BsFillChatSquareTextFill />
              </div>

              <div className="NotificationText">
                <p>New Feedback</p>
              </div>

              <div className="NotificationDescription">
                <p>
                  From: John Smith
                </p>
              </div>
            </div>

            <div className="notificationBox">
              <div className="notificationIcon blueIcon">
                <BsFillChatSquareTextFill />
              </div>

              <div className="NotificationText">
                <p>New Feedback</p>
              </div>

              <div className="NotificationDescription">
                <p>From: Jane Doe</p>
              </div>
            </div>
            <div className="notificationBox">
              <div className="notificationIcon blueIcon">
                <BsFillChatSquareTextFill />
              </div>

              <div className="NotificationText">
                <p>New Feedback</p>
              </div>

              <div className="NotificationDescription">
                <p>From: Charis</p>
              </div>
            </div>

            <div className="notificationBox">
              <div className="notificationIcon">
                <BsFillExclamationTriangleFill />
              </div>

              <div className="NotificationText">
                <p>Risk Rising</p>
              </div>

              <div className="NotificationDescription">
                <p>Communication risk level is higher than previous week</p>
              </div>
            </div>
          </Scrollbars>
        </div>
      
        <div className="infoBox project"  style={{marginBottom:'50px'}}>
        
        <div className="metricTitle">Communication</div>
        <div className="metricHalfDonutContainer">
          <HalfDoughnutChart data1={data[0]} label="Communication" backgroundColor={(()=>{
                return(calculateRiskColor(data[0]))})}/>
          <div className="donutText halfdonutRisk">
            <p>{data[0]}</p>
          </div>
        </div>    
      </div>

      <div className="infoBox project">
        <div className="metricTitle">Project Understanding</div>
        <div className="metricHalfDonutContainer">
          <HalfDoughnutChart data1={data[1]} label="Effective Decisions" backgroundColor={(()=>{
                return(calculateRiskColor(data[1]))})}/>
          <div className="donutText halfdonutRisk">
            <p>{data[1]}</p>
          </div>
        </div>
      </div>

      <div className="infoBox project">
        <div className="metricTitle">Team Cohesion</div>
        <div className="metricHalfDonutContainer">
          <HalfDoughnutChart data1={data[2]} label="Core Values" backgroundColor={(()=>{
                return(calculateRiskColor(data[2]))})}/>
          <div className="donutText halfdonutRisk">
            <p>{data[2]}</p>
          </div>
        </div>
      </div>

      <div className="infoBox project">
        <div className="metricTitle">Confidence in Skillset</div>
        <div className="metricHalfDonutContainer">
          <HalfDoughnutChart data1={data[3]} label="Confidence in Skillsets" backgroundColor={(()=>{
                return(calculateRiskColor(data[3]))})}/>
          <div className="donutText halfdonutRisk">
            <p>{data[3]}</p>
          </div>
        </div>
      </div>

      </div>     
    </div>
  );
};

export default SoftMetrics;
