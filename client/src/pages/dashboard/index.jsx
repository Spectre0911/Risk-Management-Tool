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
import Notification from "./notification";
import { TasksToComplete } from "../services/TasksToComplete";
import { NotificationInfo } from "../services/NotificationInfo";
import { LocationNotifications } from "../services/LocationNotifcations";
const Dashboard = () => {
  const [activeProjects, setActiveProjects] = useState(0);
  const [notifications, setActiveNotifications] = useState(0);
  const [warnings, setActiveWarnings] = useState(0);

  const [tasksToComplete, setTasksToComplete] = useState(0);

  const login = useSelector((state) => state.email);

  // This is going to be location 1
  const [notificationData, setNotifications] = useState([]);

  useEffect(() => {
    // Get all active projects
    ActiveProjects({
      email: login.email,
    }).then((data) => setActiveProjects(data));
    // Get the number of notifications
    NotificationCount({
      email: login.email,
      type: 1,
    }).then((data) => setActiveNotifications(data));
    // Get the number of warnings
    NotificationCount({
      email: login.email,
      type: 2,
    }).then((data) => setActiveWarnings(data));
    // Get the number of tasks to complete
    TasksToComplete({ email: login.email }).then((data) =>
      setTasksToComplete(data)
    );
    // Get all the notifications
    // console.log("NOTIFICATION INGO");
    //userid = $2 and notiftype = $3 and location = $4

    LocationNotifications({
      email: login.email,
      location: 1,
    }).then((data) => {
      console.log(data);
      let newNotifications = [];
      data.map((notification) => {
        console.log(notification);
        let notifType = "warning";
        if (notification.notiftype == 2) {
          notifType = "info";
        }
        // let notifType = notification.notifType === 1 ? "warning" : "info";
        newNotifications.push({ ...notification, notifType: notifType });
      });

      console.log(newNotifications);
      setNotifications(newNotifications);
    });
    // LocationNotifications({
    //   email: login.email,
    //   notifType: 2,
    //   location: 1,
    // }).then((data) => {
    //   let newWarning = [];
    //   data.map((notification) => {
    //     newWarning.push({ ...notification, notifType: "info" });
    //   });
    //   console.log(newWarning);
    //   setNotifications(notificationData.concat(newWarning));
    // });
  }, []);

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
          <div className="metricNumber">{notifications}</div>
          <div className="metricCircleBackground metricBlueBackground">
            <div className="metricIcon metricBlueIcon">
              <FaBell />
            </div>
          </div>
        </div>

        <div className="infoBox">
          <div className="metricTitle dashboard">Warnings</div>
          <div className="metricNumber">{warnings}</div>
          <div className="metricCircleBackground metricRedBackground">
            <div className="metricIcon metricRedIcon">
              <AiFillWarning />
            </div>
          </div>
        </div>

        <div className="infoBox2 projectTable">
          <div className="metricTitle2">Project Summary</div>
          <ProjectTable setActiveProjects={setActiveProjects} />
        </div>

        <div className="infoBox2">
          <Scrollbars>
            <div className="metricTitle2" style={{ marginBottom: "20px" }}>
              Notificationss
            </div>
            {notificationData.map((notif, index) => {
              return <Notification data={notif} />;
            })}
          </Scrollbars>
        </div>
      </div>

      <div className="infoBox2 projectTable">
        <div className="metricTitle2">Task Summary</div>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
