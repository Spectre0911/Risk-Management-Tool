import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";
import { Scrollbars } from "react-custom-scrollbars";
import { ActiveProjects } from "../services/ProjectCount";
import { NotificationCount } from "../services/NotificationCount";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../actions";
import "./index.css";

const Notification = (data) => {
  const [activeProjects, setActiveProjects] = useState(0);
  const [notifications, setActiveNotifications] = useState(0);
  const [warnings, setActiveWarnings] = useState(0);

  const [tasksToComplete, setTasksToComplete] = useState(0);



  return (
        <div>
          <div className="notificationBox">
            
          <div className={`notificationIcon ${data.data.notifType=="info" && "blueIcon"}`}>
            {data.data.notifType=="warning" && <AiFillWarning />}
            {data.data.notifType=="info" && <BsBriefcaseFill />}
          </div>

            <div className="NotificationText">
              <p>{data.data.title}</p>
            </div>

            <div className="NotificationDescription">
              <p>
                {data.data.description}
              </p>
            </div>
          </div>
        </div>
  );
};

export default Notification;
