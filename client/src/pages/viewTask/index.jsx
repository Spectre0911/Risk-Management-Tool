import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Formik, Form, Field } from "formik";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import "./index.css";
import Bug from "./bug";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import BugReportForm from "./bugReportForm";
import EditProfileForm from "./FeatureForm";
const TaskDashboard = ({ projectid }) => {
  const percentage = 70;
  const { featureId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOpen(isOpen);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const progressDotStyle = (percentage) => ({
    left: `calc(${percentage}%)`,
    top: "9px",
  });

  useEffect(() => {
    const head = document.getElementsByTagName("head")[0];
    const progressDot = document.getElementById("progressDot");
    const progressBar = document.getElementsByClassName("progress-bar")[0];
    let keyframes =
      `
            @keyframes movedot {
                from {left: 0px;}
                to {left: ` +
      percentage +
      `%;}
                            },
            @keyframes movebar {
                from {width: 0px;}
                to {width: ` +
      percentage +
      `%;}
            }`;
    let style = document.createElement("STYLE");
    style.innerHTML = keyframes;
    head.appendChild(style);
    progressDot.style.animationName = "movedot";
    progressBar.style.animationName = "movebar";
  }, []);

  return (
    <div className="bugBox">
      <div className="bugBoxTitle">
        <p>List of tasks: {featureId}</p>
      </div>

      <div className="featureProgress">
        <div className="featureProgressTitle">Feature Progress</div>
        <div className="progressDisplayContainer">
          <div style={{ width: "100%" }}>
            <div
              id="progressDot"
              className="progressNumber feature"
              style={progressDotStyle(percentage)}
            ></div>
          </div>
          <ProgressBar now={percentage} />
          <div className="progressAddTaskButtonontainer">
            <p className="progressText">2/3 Tasks Completed</p>
            <button className="progressAddTaskButton" onClick={handleShow}>
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div>
        <Modal
          className="bugModal"
          fade={false}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleClose}>
              <GrClose />
            </div>
            <Modal.Title>Create task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProfileForm
              handleClose={handleClose}
              featureId={featureId}
              mode={0}
              projectid={projectid}
            />
          </Modal.Body>
        </Modal>
      </div>
      <div className="bugBoxTitle" style={{ paddingTop: "20px" }}>
        <p style={{ fontSize: "30px" }}>To do:</p>
      </div>
      <Bug />
      <div className="bugBoxTitle" style={{ paddingTop: "20px" }}>
        <p style={{ fontSize: "30px" }}>Completed:</p>
      </div>
      <Bug />
      <div className="bugBoxTitle" style={{ paddingTop: "20px" }}>
        <p style={{ fontSize: "30px" }}>Verified</p>
      </div>
      <Bug />
    </div>
  );
};

export default TaskDashboard;
