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

  return (
    <div className="main">
      <div className="grid">
        <p className="projectTitleId">Soft Metric Hub</p>

        <div className="infoBox2 projectTable feature" style={{marginBottom:'30px'}}>
          <div className="metricTitle2">Features</div>
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
          <HalfDoughnutChart data1={3.5} label="Communication" />
          <div className="donutText halfdonutRisk">
            <p>3.5</p>
          </div>
        </div>    
      </div>

      <div className="infoBox project">
        <div className="metricTitle">Project Understanding</div>
        <div className="metricHalfDonutContainer">
          <HalfDoughnutChart data1={4.1} label="Effective Decisions" />
          <div className="donutText halfdonutRisk">
            <p>4.1</p>
          </div>
        </div>
      </div>

      <div className="infoBox project">
        <div className="metricTitle">Team Cohesion</div>
        <div className="metricHalfDonutContainer">
          <HalfDoughnutChart data1={3.8} label="Core Values" />
          <div className="donutText halfdonutRisk">
            <p>3.8</p>
          </div>
        </div>
      </div>

      <div className="infoBox project">
        <div className="metricTitle">Confidence in Skillset</div>
        <div className="metricHalfDonutContainer">
          <HalfDoughnutChart data1={4.4} label="Confidence in Skillsets" />
          <div className="donutText halfdonutRisk">
            <p>4.4</p>
          </div>
        </div>
      </div>

      </div>     
    </div>
  );
};

export default SoftMetrics;
