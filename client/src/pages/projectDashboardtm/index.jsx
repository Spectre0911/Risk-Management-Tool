import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { TimeLeft } from "../services/TimeLeft";
import Table from "./Table";
import "./index.css";
import { height } from "@mui/system";
import DonutChart from "../projectDashboard/DonutChart";
import { Doughnut } from "react-chartjs-2";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Button } from "react-bootstrap";
import { CgUserRemove } from "react-icons/cg";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";
import { IoIosPersonAdd } from "react-icons/io";
import NewGantt from "./App.js";
import Select from "react-select";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Box } from "@mui/material";
import { BugCount } from "../services/BugCounts";
import GanttChart from "./gantt";
import { gantt } from "dhtmlx-gantt";
// import GanttChart from "../gantt";
import { Octokit } from "octokit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SoftFeedbackForm from "./SoftFeedbackForm";
import { AllProjectMembers } from "../services/AllProjectMembers";
import { MemberSkills } from "../services/MemberSkills";

import { TasksToCompletePID } from "../services/TasksToCompletePID";
Chart.register(ArcElement);
Chart.register([Tooltip]);
Chart.register([Legend]);
const ProjectDashboardTm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const labelsRisk = ["Budget", "Team", "Time", "Code", "Technical"];
  const dataRisk = [29, 24, 25, 25, 10];
  const borderColorRisk = ["rgba(255,206,86,0.2)"];
  const backgroundColorRisk = [
    "rgba(232,99,132,1)",
    "rgba(232,211,6,1)",
    "rgba(54,162,235,1)",
    "rgba(255,159,64,1)",
    "rgba(255,129,64,1)",
  ];

  const labelsBugs = ["Critical", "Major", "Minor"];
  const [dataBugs, setDataBugs] = useState([10, 4, 1]);
  const backgroundColorBugs = [
    "rgba(215,20,50,1)",
    "rgba(255,128,0,1)",
    "rgba(255,255,0,1)",
  ];

  const labelsFeatures = ["Core", "Optional", "Aesthetic"];
  const [dataTasks, setDataTasks] = useState([8, 14, 12]);
  const backgroundColorFeatures = [
    "rgba(255,0,0,1)",
    "rgba(255,128,0,1)",
    "rgba(255,255,0,1)",
  ];

  const labelsTime = ["Remaining", "Completed"];
  const [dataTime, setDataTime] = useState([0, 0]);
  const backgroundColorTime = ["rgba(255,0,0,1)", "rgba(255,128,0,1)"];
  const email = useSelector((state) => state.email);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "Jane Arnold",
      image: "http://localhost:5000/assets/jane.jpg",
      skills: ["Python", "React"],
      suitabilityScore: 0,
    },
    {
      id: "2",
      name: "Jane Arnold",
      image: "http://localhost:5000/assets/jane.jpg",
      skills: ["Python", "React"],
      suitabilityScore: 0,
    },
  ]);

  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [ganttViewState, setGanttViewState] = useState("Days");
  const [removeUserId, setRemoveUserId] = useState();

  const handleDeleteClose = () => {
    setShowDelete(false);
  };
  const handleDeleteShow = (e) => {
    setRemoveUserId(e.target.value);
    setShowDelete(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
  };
  const handleAddShow = (e) => {
    console.log("2dd");
    setShowAdd(true);
  };

  const deleteFeature = (e) => {
    console.log("delete this");
    console.log(removeUserId);
    setShowDelete(false);
  };

  const addTeamMember = (e) => {
    console.log(teamMembersList);
  };

  const changeGanttViewState = (e) => {
    setGanttViewState(e.target.value);
  };

  const teamMembersOptions = [
    { value: "1", label: "Joshua" },
    { value: "2", label: "Morgan" },
    { value: "3", label: "Sanjula" },
  ];

  const [teamMembersList, setTeamMembersList] = useState([]);
  const handleTeamMemberChange = (e) => {
    setTeamMembersList(e);
  };

  const checkZero = (array) => {
    if (array.reduce((acc, val) => acc + val, 0) == 0) {
      return 0;
    } else {
      return 1;
    }
  };
  useEffect(() => {
    AllProjectMembers({ projectId: projectId }).then((data) => {
      // console.log("Fetching project members");
      if (data != null) {
        // console.log(data);
        let newData = [];
        var useridSkillMap = new Map();
        const memberSkillPromises = data.map((member) => {
          return MemberSkills({ userid: member.userid }).then((skills) => {
            let skillArr = [];
            if (skills != null) {
              skills.map((skill) => {
                if (skill.skill != null) {
                  skillArr.push(skill.skill);
                }
              });
            }
            useridSkillMap.set(member.userid, skillArr);
          });
        });

        Promise.all(memberSkillPromises).then(() => {
          // console.log(useridSkillMap);
          data.forEach((member) =>
            newData.push({
              ...member,
              skills: useridSkillMap.get(member.userid),
            })
          );
          // console.log(newData);
          setTeamMembers(newData);
        });
      }
    });
    TasksToCompletePID({ email: email.email, projectid: projectId }).then(
      (data) => {
        console.log(data);
        const counts = {
          1: 0,
          2: 0,
          3: 0,
        };

        // Filter the array to only include objects where completed is false, then reduce the filtered array to update the counts object
        data.reduce((acc, obj) => {
          // Increment the count for the priority of the current object
          acc[obj.priority]++;
          return acc;
        }, counts); // Use the counts object as the initial value of the reduce function
        setDataTasks([counts[1], counts[2], counts[3]]);
      }
    );

    TimeLeft({
      projectid: projectId,
    }).then((data) => {
      setDataTime([data[0].remaining.days, data[0].completed.days]);
    });
    BugCount({
      projectid: projectId,
    }).then((data) => {
      if (data != null) {
        const counts = {
          1: 0,
          2: 0,
          3: 0,
        };

        // Filter the array to only include objects where completed is false, then reduce the filtered array to update the counts object
        data
          .filter((obj) => !obj.completed) // Filter the array to only include objects where completed is false
          .reduce((acc, obj) => {
            // Increment the count for the priority of the current object
            acc[obj.severity]++;
            return acc;
          }, counts); // Use the counts object as the initial value of the reduce function

        setDataBugs([counts[1], counts[2], counts[3]]);
      }
    });
  }, []);
  return (
    <div className="main tm">
      <div className="grid">
        <p className="projectTitleId">Project number team member {projectId}</p>

        <div className="infoBox project">
          <div className="metricTitle">Tasks left to complete</div>
          <div className="metricDonutContainer smaller">
            {checkZero(dataTasks) ? (
              <DonutChart
                chartData={dataTasks}
                labels={labelsFeatures}
                border={borderColorRisk}
                backgroundColor={backgroundColorFeatures}
                cutOut={60}
              />
            ) : (
              <DonutChart
                chartData={[1]}
                labels={["None"]}
                border={borderColorRisk}
                backgroundColor={["rgb(50,205,50)"]}
                cutOut={60}
              />
            )}
            <div className="donutText">
              <p>{dataTasks.reduce((acc, val) => acc + val, 0)}</p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Bugs</div>
          <div className="metricDonutContainer smaller">
            {checkZero(dataBugs) ? (
              <DonutChart
                chartData={dataBugs}
                labels={labelsBugs}
                border={borderColorRisk}
                backgroundColor={backgroundColorBugs}
                cutOut={63}
              />
            ) : (
              <DonutChart
                chartData={[1]}
                labels={["None"]}
                border={borderColorRisk}
                backgroundColor={["rgb(50,205,50)"]}
                cutOut={60}
              />
            )}
            <div className="donutText">
              <p>{dataBugs.reduce((acc, val) => acc + val, 0)}</p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Time Left</div>
          <div className="metricDonutContainer smaller1">
            <DonutChart
              chartData={dataTime}
              labels={labelsTime}
              border={borderColorRisk}
              backgroundColor={backgroundColorTime}
              cutOut={60}
            />
            <div className="donutText">
              <p>{dataTime[0]}</p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Complete Survey</div>
          <div className="metricDonutContainer smaller1">
            <div className="surveyText">
              <p className="daysLeftTitle">6 Days</p>
              <p className="daysLeftDesc">
                Since you last completed the feedback survey
              </p>
              <button
                onClick={handleAddShow}
                className="projectFilterInput feedbackForm"
              >
                Complete Survey
              </button>
            </div>
          </div>
        </div>

        <div className="infoBox2 projectTable feature">
          <div className="metricTitle2">Tasks</div>
          <Table projectid={projectId} />
        </div>

        <div className="infoBox2">
          <Scrollbars>
            <div
              className="metricTitle2"
              style={{ marginBottom: "20px", paddingTop: "7px" }}
            >
              Team members
            </div>

            {teamMembers.map((member, index) => {
              const imageUrl = member.image;
              return (
                <div className="projectDashboardProfile">
                  <p className="projectDashboardProfileName">{member.name}</p>

                  <div className="projectDashboardProfilePic">
                    <img
                      key={index}
                      className="profilePic"
                      style={{ marginLeft: "0px" }}
                      src={imageUrl}
                    ></img>
                  </div>
                  <div className="projectDashboardSkill">Skills:</div>
                  {member.skills.map((skill, index) => {
                    return (
                      <div className="projectDashboardSkillName">{skill}</div>
                    );
                  })}

                  <div className="projectDashboardSkillMatchTitle">
                    <p>
                      <b className="projectDashboardBold">Bio:</b> Hi, my name
                      is Jane and I am a software developer
                    </p>
                  </div>

                  {/* <SemiCircleProgressBar diameter={200} strokeWidth={30} percentage={33} showPercentValue /> */}
                </div>
              );
            })}
          </Scrollbars>
        </div>

        <div className="infoBox2 ganttChart">
          <div className="metricTitle2">
            <p>Gannt Chart</p>
          </div>
          <div className="ganttContainer">
            {/* <GanttChart viewMode={ganttViewState}/> */}
            <NewGantt viewMode={ganttViewState} projectid={projectId} />
          </div>
        </div>
      </div>
      <Modal
        className="addProfileModal"
        style={{ marginTop: "200px" }}
        fade={false}
        show={showDelete}
        onHide={handleDeleteClose}
      >
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
              style={{ marginLeft: "10px" }}
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

      <div className="feedbackModal">
        <Modal
          className="addProfileModal Feedback"
          style={{ marginTop: "200px" }}
          fade={false}
          show={showAdd}
          onHide={handleAddClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleAddClose}>
              <GrClose />
            </div>
            <Modal.Title>Complete team member feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SoftFeedbackForm close={handleAddClose} projectid={projectId} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ProjectDashboardTm;
