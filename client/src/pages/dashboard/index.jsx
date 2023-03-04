import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";
import { Scrollbars } from "react-custom-scrollbars";
import { ActiveProjects } from "../services/ProjectCount";
import { NotificationCount } from "../services/NotificationCount";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../actions";
import "./index.css";
import ProjectTable from "./ProjectTable";
import Table from "./Table";
import { TasksToComplete } from "../services/TasksToComplete";
const Dashboard = () => {
  const [activeProjects, setActiveProjects] = useState(0);
  const [activeNotifications, setActiveNotifications] = useState(0);
  const [tasksToComplete, setTasksToComplete] = useState(0);

  const login = useSelector((state) => state.email);
  ActiveProjects({
    email: login.email,
  }).then((data) => setActiveProjects(data));
  NotificationCount({
    email: login.email,
  }).then((data) => setActiveNotifications(data));
  TasksToComplete({ email: login.email }).then((data) =>
    setTasksToComplete(data)
  );
  useEffect(() => {
    console.log(login);
  });
  return (
    <div className="main">
      <div className="grid">
        <div className="infoBox">
          <div className="metricTitle dashboard">Active projects</div>
          <div className="metricNumber">{activeProjects}</div>
          <div className="metricCircleBackground metricBlueBackground">
            <div className="metricIcon metricBlueIcon">
              <BsBriefcaseFill />
            </div>
          </div>
        </div>

        <div className="infoBox">
          <div className="metricTitle dashboard">Tasks to complete</div>
          <div className="metricNumber">{tasksToComplete}</div>
          <div className="metricCircleBackground metricBlueBackground">
            <div className="metricIcon metricBlueIcon">
              <BiTask />
            </div>
          </div>
        </div>

        <div className="infoBox">
          <div className="metricTitle dashboard">Notifications</div>
          <div className="metricNumber">{activeNotifications}</div>
          <div className="metricCircleBackground metricBlueBackground">
            <div className="metricIcon metricBlueIcon">
              <FaBell />
            </div>
          </div>
        </div>

        <div className="infoBox">
          <div className="metricTitle dashboard">Warnings</div>
          <div className="metricNumber">2</div>
          <div className="metricCircleBackground metricRedBackground">
            <div className="metricIcon metricRedIcon">
              <AiFillWarning />
            </div>
          </div>
        </div>

        <div className="infoBox2 projectTable">
          <div className="metricTitle2">Project Summary</div>
          <ProjectTable />
        </div>

        <div className="infoBox2">
          <Scrollbars>
            <div className="metricTitle2" style={{ marginBottom: "20px" }}>
              Notificationss
            </div>

            <div className="notificationBox">
              <div className="notificationIcon">
                <AiFillWarning />
              </div>

              <div className="NotificationText">
                <p>Risk alert!</p>
              </div>

              <div className="NotificationDescription">
                <p>
                  Risk on CS261 project is increasingRisk on CS261 project is
                  increasingRisk on CS261 project is increasing.
                </p>
              </div>
            </div>

            <div className="notificationBox">
              <div className="notificationIcon blueIcon">
                <BsBriefcaseFill />
              </div>

              <div className="NotificationText">
                <p>Added to new project!</p>
              </div>

              <div className="NotificationDescription">
                <p>Yuo have been added to a new project</p>
              </div>
            </div>
            <div className="notificationBox">
              <div className="notificationIcon blueIcon">
                <BsBriefcaseFill />
              </div>

              <div className="NotificationText">
                <p>Added to new project!</p>
              </div>

              <div className="NotificationDescription">
                <p>Yuo have been added to a new project</p>
              </div>
            </div>

            <div className="notificationBox">
              <div className="notificationIcon blueIcon">
                <BsBriefcaseFill />
              </div>

              <div className="NotificationText">
                <p>Added to new project!</p>
              </div>

              <div className="NotificationDescription">
                <p>Yuo have been added to a new project</p>
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>

      <div className="infoBox2 projectTable">
        <div className="metricTitle2">Task Summary</div>
        <Table />
      </div>

      <div className="infoBox2">
        <Scrollbars>
          <div className="metricTitle2" style={{ marginBottom: "20px" }}>
            Notificationss
          </div>

          <div className="notificationBox">
            <div className="notificationIcon">
              <AiFillWarning />
            </div>

            <div className="NotificationText">
              <p>Risk alert!</p>
            </div>

            <div className="NotificationDescription">
              <p>
                Risk on CS261 project is increasingRisk on CS261 project is
                increasingRisk on CS261 project is increasing.
              </p>
            </div>
          </div>

          <div className="notificationBox">
            <div className="notificationIcon blueIcon">
              <BsBriefcaseFill />
            </div>

            <div className="NotificationText">
              <p>Added to new project!</p>
            </div>

            <div className="NotificationDescription">
              <p>You have been added to a new project</p>
            </div>
          </div>
          <div className="notificationBox">
            <div className="notificationIcon blueIcon">
              <BsBriefcaseFill />
            </div>

            <div className="NotificationText">
              <p>Added to new project!</p>
            </div>

            <div className="NotificationDescription">
              <p>Yuo have been added to a new project</p>
            </div>
          </div>

          <div className="notificationBox">
            <div className="notificationIcon blueIcon">
              <BsBriefcaseFill />
            </div>

            <div className="NotificationText">
              <p>Added to new project!</p>
            </div>

            <div className="NotificationDescription">
              <p>Yuo have been added to a new project</p>
            </div>
          </div>
        </Scrollbars>
      </div>

      {/* <div className='icon'>
                    <FaBell />
                </div>
                <div className="number">`
                    <p>50</p>
                </div>
                <div className="metric">
                    <p>Notifications</p>
                </div> */}
      {/* <ProjectComponent/>
            <ProjectComponent/>
            <ProjectComponent/> */}
    </div>
  );
};

export default Dashboard;
