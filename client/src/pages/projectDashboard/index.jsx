import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Table from "./Table";
import "./index.css";
import DonutChart from "./DonutChart";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";
import { IoIosPersonAdd } from "react-icons/io";
import NewGantt from "./App.js";
import Select from "react-select";
import { Box, useRadioGroup } from "@mui/material";
// import GanttChart from "../gantt";
import { Octokit } from "octokit";
import { RadarChart } from "./radar/RadarChart";
import LineGraph from "./Line";
import { useNavigate } from "react-router-dom";
import { TimeLeft } from "../services/TimeLeft";
import { AllFeatures } from "../services/AllFeatures";
import { BugCount } from "../services/BugCounts";
import { AllProjectMembers } from "../services/AllProjectMembers";
import { MemberSkills } from "../services/MemberSkills";
import { MdCardMembership } from "react-icons/md";
import { OrderedUsers } from "../services/OrderedUsers";
import { AddTeamMember } from "../services/AddTeamMember";
import { EndProject } from "../services/EndProject";
Chart.register(ArcElement);
Chart.register([Tooltip]);
Chart.register([Legend]);
const ProjectDashboard = () => {
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
  const [dataFeatures, setDataFeatures] = useState([0, 0, 0]);
  const backgroundColorFeatures = [
    "rgba(255,0,0,1)",
    "rgba(255,128,0,1)",
    "rgba(255,255,0,1)",
  ];

  const labelsTime = ["Remaining", "Completed"];
  const [dataTime, setDataTime] = useState([0, 0]);
  const backgroundColorTime = ["rgba(255,0,0,1)", "rgba(255,128,0,1)"];

  const [teamMembers, setTeamMembers] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [showEndProject, setShowEndProject] = useState(false);
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

  const handleEndProjectClose = () => {
    setShowEndProject(false);
  };
  const handleEndProjecShow = (e) => {
    setShowEndProject(true);
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
    console.log("WE ARE DELETING");
    console.log(removeUserId);
    setShowDelete(false);
  };

  const addTeamMember = (e) => {
    AddTeamMember({ projectid: projectId, userid: teamMembersList.value });
    // console.log(teamMembersList);
  };

  const changeGanttViewState = (e) => {
    setGanttViewState(e.target.value);
  };

  const [teamMembersOptions, setTeamMemberOptions] = useState([
    { value: "1", label: "Joshua" },
    { value: "2", label: "Morgan" },
    { value: "3", label: "Sanjula" },
  ]);

  const [teamMembersList, setTeamMembersList] = useState([]);
  const handleTeamMemberChange = (e) => {
    setTeamMembersList(e);
  };

  const [data, setData] = useState();

  const owner = "sanjula-hettiarachchige";
  const access_token = "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";
  const headers = { Authorization: "Token " + access_token };

  const octokit = new Octokit({
    auth: "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",
  });

  const outcomeOptions = [
    { value: "1", label: "Success" },
    { value: "2", label: "Failure" },
  ];

  const [outcome, setOutcome] = useState([]);
  const handleOutcomeChange = (e) => {
    setOutcome(e);
    console.log(outcome);
  };

  const endProject = () => {
    console.log("end project");

    EndProject({ projectid: projectId });
  };
  //Fetching github commit data
  const [tempData, setTempData] = useState([]);
  const [dataset, setDataset] = useState([]);
  useEffect(() => {
    OrderedUsers({ projectId: projectId }).then((data) => {
      // console.log("------");
      // console.log(data);
      // console.log("------");
      setTeamMemberOptions(data);
    });
    AllProjectMembers({ projectId: projectId }).then((data) => {
      // console.log("Fetching project members");
      if (data != null) {
        // console.log(data);
        let newData = [];
        var useridSkillMap = new Map();
        const memberSkillPromises = data.map((member) => {
          // console.log(member);
          return MemberSkills({ userid: member.userid }).then((skills) => {
            // console.log(skills);

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

    // In this updated code, the memberSkillPromises array is created by calling map on the data array, and each element is a promise returned by MemberSkills. The promises are returned from the map function, and then `Promise

    // Set the amount of time left: THERE IS AN ISSUEHERE
    TimeLeft({
      projectid: projectId,
    }).then((data) => {
      console.log(data);
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

    // Get the outstanding features
    AllFeatures({
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
            acc[obj.priority]++;
            return acc;
          }, counts); // Use the counts object as the initial value of the reduce function

        setDataFeatures([counts[1], counts[2], counts[3]]);
      }
    });
    let fetchData = [];
    (async () => {
      try {
        const iterator = await octokit.paginate.iterator(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: "Spectre0911",
            repo: "CS261",
            per_page: 100,
          }
        );
        for await (const { data } of iterator) {
          for (var i = 0; i < data.length; i++) {
            fetchData = [...fetchData, data[i]];
          }
        }

        setTempData(fetchData);
      } catch (error) {
        if (error.response) {
          console.error(
            `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`
          );
        }
        console.error(error);
      }
    })();
  }, []);

  //Fetching github commit data
  const [dates, setDates] = useState([]);
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    // Setting donut data from api calls

    if (tempData.length == 0) {
      return;
    }
    var uniqueDates = [];
    for (var i = 0; i < tempData.length; i++) {
      var date = tempData[i]["commit"]["author"]["date"].split("T")[0];
      if (!uniqueDates.includes(date)) {
        uniqueDates.push(date);
      }
    }
    uniqueDates.splice(-5);
    uniqueDates = fillDates(
      uniqueDates[uniqueDates.length - 1],
      uniqueDates[0]
    );

    var uniqueContributors = [];
    for (var i = 0; i < tempData.length; i++) {
      if (
        !uniqueContributors.includes(tempData[i]["commit"]["committer"]["name"])
      ) {
        uniqueContributors.push(tempData[i]["commit"]["committer"]["name"]);
      }
    }
    var index = uniqueContributors.indexOf("GitHub");
    if (index !== -1) {
      uniqueContributors.splice(index, 1);
    }

    let commitHistory = [];
    for (var a = 0; a < uniqueDates.length; a++) {
      let totalCommits = 0;
      let currDate = uniqueDates[a];
      for (var b = 0; b < tempData.length; b++) {
        if (tempData[b]["commit"]["author"]["date"].split("T")[0] == currDate) {
          totalCommits += 1;
        }
      }
      commitHistory.push([currDate, totalCommits]);
    }
    setDataset(commitHistory);
    var tempDates = [];
    var tempCount = [];
    for (var i = 0; i < commitHistory.length; i++) {
      tempDates.push(commitHistory[i][0]);
      tempCount.push(commitHistory[i][1]);
    }

    setDates(tempDates);
    setCommits(tempCount);
  }, [tempData]);

  const checkZero = (array) => {
    if (array.reduce((acc, val) => acc + val, 0) == 0) {
      return 0;
    } else {
      return 1;
    }
  };

  function fillDates(start, end) {
    var output = [start];
    var date = new Date(start);
    var endDate = new Date(end);

    do {
      output.push(date.toISOString().split("T")[0]);
      date = new Date(date.getTime());
      date.setDate(date.getDate() + 1);
    } while (date < endDate);

    output.push(end);
    return output;
  }

  return (
    <div className="main">
      <div className="grid">
        <p className="projectTitleId">
          Project number {projectId}
          <button
            onClick={handleEndProjecShow}
            className="projectFilterInput viewProject closeProject"
          >
            Close Project
          </button>
        </p>
        <div className="infoBox project">
          <div className="metricTitle">Risk Score</div>
          <div className="metricDonutContainer">
            <DonutChart
              chartData={dataRisk}
              labels={labelsRisk}
              border={borderColorRisk}
              backgroundColor={backgroundColorRisk}
              cutOut={60}
            />
            <div className="donutText risk">
              <p>7.8/10</p>
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
              <p>
                {dataBugs.reduce(function (a, b) {
                  return a + b;
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="infoBox project">
          <div className="metricTitle">Outstanding Features</div>
          <div className="metricDonutContainer smaller">
            {checkZero(dataFeatures) ? (
              <DonutChart
                chartData={dataFeatures}
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
              <p>{dataFeatures.reduce((acc, val) => acc + val, 0)}</p>
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

        <div className="infoBox2 projectTable feature">
          <div className="metricTitle2">Features</div>
          <Table projectid={projectId} />
        </div>

        <div className="infoBox2">
          <Scrollbars>
            <div
              className="metricTitle2"
              style={{ marginBottom: "20px", paddingTop: "7px" }}
            >
              Team members
              <button
                onClick={handleAddShow}
                className="projectFilterInput viewProject addFeatureButton"
                style={{
                  height: "35px",
                  width: "40px",
                  padding: "0",
                  position: "absolute",
                  right: "20px",
                  top: "15px",
                }}
              >
                <IoIosPersonAdd />
              </button>
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
                    Skills match:
                    <div className="projectDashboardSkillScore">7.9</div>
                  </div>
                  <div className="projectDashboardSkillMatchTitle">
                    <p>
                      <b className="projectDashboardBold">Bio:</b> {member.bio}
                    </p>
                  </div>
                  <div className="featureDeleteTasksButtonDiv">
                    <button
                      type="submit"
                      id={member.id}
                      name={member.id}
                      value={member.id}
                      onClick={handleDeleteShow}
                      className="featureDeleteTasksButton removeUser"
                      style={{ width: "40px" }}
                    >
                      Remove
                    </button>
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

        <div className="infoBox2 softMetricBox">
          <div
            className="metricTitle2"
            style={{ marginBottom: "20px", paddingTop: "7px" }}
          >
            Soft Metric Summary
            <button
              onClick={() => navigate(`./softmetrics/${projectId}`)}
              className="projectFilterInput viewProject addFeatureButton"
              style={{
                height: "35px",
                width: "160px",
                padding: "0",
                position: "absolute",
                right: "20px",
                top: "20px",
              }}
            >
              View Analysis
            </button>
          </div>
          <RadarChart />
        </div>

        <div className="infoBox2 githubMetricBox">
          <div
            className="metricTitle2"
            style={{ marginBottom: "20px", paddingTop: "7px" }}
          >
            Github Metrics Suite
            <button
              onClick={() => navigate(`./github/${projectId}`)}
              className="projectFilterInput viewProject addFeatureButton"
              style={{
                height: "35px",
                width: "160px",
                padding: "0",
                position: "absolute",
                right: "20px",
                top: "20px",
              }}
            >
              More details
            </button>
          </div>
          <LineGraph labels={dates} datavalues={commits} />
        </div>

        {/* <div className="infoBox2 bugs">
          <div
            className="metricTitle2"
            style={{ marginBottom: "20px", paddingTop: "7px" }}
          >
            Bugs summary
            <button
              onClick={() => navigate(`./bugs/${projectId}`)}
              className="projectFilterInput viewProject addFeatureButton"
              style={{
                height: "35px",
                width: "120px",
                padding: "0",
                position: "absolute",
                right: "20px",
                top: "20px",
              }}
            >
              View bugs
            </button>
          </div>
          <div>
            <p>What should go here???</p>
            <ProgressBar variant="danger" now={20} />
          </div>
        </div> */}
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

      <Modal
        className="addProfileModal"
        style={{ marginTop: "200px" }}
        fade={false}
        show={showAdd}
        onHide={handleAddClose}
      >
        <Modal.Header>
          <div className="bugFormClose" onClick={handleAddClose}>
            <GrClose />
          </div>
          <Modal.Title>Add team member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Add a team member</p>
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
              style={{ marginLeft: "10px" }}
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

      <Modal
        className="addProfileModal"
        style={{ marginTop: "200px" }}
        fade={false}
        show={showEndProject}
        onHide={handleEndProjectClose}
      >
        <Modal.Header>
          <div className="bugFormClose" onClick={handleEndProjectClose}>
            <GrClose />
          </div>
          <Modal.Title>End project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Was this project a success or failure?</p>
          <p
            style={{
              gridColumn: "span 1",
              margin: "auto",
              paddingRight: "2px",
            }}
          >
            Select outcome
          </p>
          <Select
            id="teamMembers"
            name="teamMembers"
            options={outcomeOptions}
            onChange={handleOutcomeChange}
            className="defineDependenciesBox"
            sx={{ gridColumn: "span 3", width: "70%" }}
            value={outcome}
          />
          <Box>
            <Button
              className="bugCancelButton"
              fullWidth
              sx={{
                m: "2rem 1rem",
                p: "1rem",
              }}
              style={{ marginLeft: "10px" }}
              onClick={endProject}
            >
              {"End Project"}
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

export default ProjectDashboard;
