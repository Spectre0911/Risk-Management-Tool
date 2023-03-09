import React, { Component, useState, useEffect } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { Scrollbars } from "react-custom-scrollbars";
// import "../projectDashboard/index.css";
import "./index.css";
import MultiLineChart from "./MultiLineChart";
import HalfDoughnutChart from "./HalfDoughnutChart";
import { SoftSkillScore } from "../services/SoftSkillScore";

import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

const SoftMetrics = ({ projectid }) => {
  const [communicationScore, setCommunicationScore] = useState([0]);
  const [projectUnderstanding, setProjectUnderstanding] = useState([0]);
  const [teamCohesion, setTeamCohesion] = useState([0]);
  const [confidenceInSkillSet, setConfidenceInSkillSet] = useState([0]);

  useEffect(() => {
    SoftSkillScore({ fbtype: 1, projectid: projectid }).then((data) => {
      setCommunicationScore(parseInt(data[0].avg));
    });
    SoftSkillScore({ fbtype: 2, projectid: projectid }).then((data) => {
      setProjectUnderstanding(parseInt(data[0].avg));
    });
    SoftSkillScore({ fbtype: 3, projectid: projectid }).then((data) => {
      setTeamCohesion(parseInt(data[0].avg));
    });
    SoftSkillScore({ fbtype: 4, projectid: projectid }).then((data) => {
      setConfidenceInSkillSet(parseInt(data[0].avg));
    });
  }, []);

  return (
    <div className="main">
      <div className="grid">
        <p className="projectTitleId">Soft Metric Hub</p>

        <div
          className="infoBox2 projectTable feature"
          style={{ marginBottom: "30px" }}
        >
          <div className="metricTitle2">Soft Skill Tracker</div>
          <div className="ganttContainer overviewContainer">
            <MultiLineChart />
          </div>
        </div>

        <div className="infoBox2" style={{ marginBottom: "30px" }}>
          <Scrollbars>
            <div className="metricTitle2" style={{ marginBottom: "20px" }}>
              Notifications
            </div>

            <div className="notificationBox">
              <div className="notificationIcon blueIcon">
                <BsFillChatSquareTextFill />
              </div>

              <div className="NotificationText">
                <p>New Feedback</p>
              </div>

              <div className="NotificationDescription">
                <p>From: John Smith</p>
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

        <div className="infoBox project" style={{ marginBottom: "50px" }}>
          <div className="metricTitle">Communication</div>
          <div className="metricHalfDonutContainer">
            <HalfDoughnutChart
              data1={communicationScore}
              label="Communication"
            />
            <div className="donutText halfdonutRisk">
              <p>{communicationScore}</p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Project Understanding</div>
          <div className="metricHalfDonutContainer">
            <HalfDoughnutChart
              data1={projectUnderstanding}
              label="Effective Decisions"
            />
            <div className="donutText halfdonutRisk">
              <p>{projectUnderstanding}</p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Team Cohesion</div>
          <div className="metricHalfDonutContainer">
            <HalfDoughnutChart data1={teamCohesion} label="Core Values" />
            <div className="donutText halfdonutRisk">
              <p>{teamCohesion}</p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Confidence in Skillset</div>
          <div className="metricHalfDonutContainer">
            <HalfDoughnutChart
              data1={confidenceInSkillSet}
              label="Confidence in Skillsets"
            />
            <div className="donutText halfdonutRisk">
              <p>{confidenceInSkillSet}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftMetrics;
