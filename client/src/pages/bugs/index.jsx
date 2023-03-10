import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { AllBugs } from "../services/AllBugs";
import { GetUser } from "../services/GetUser";
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
import BugAssignForm from "./bugAssignForm";
const Bugs = () => {
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOpen(isOpen);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    console.log(show);
  };
  const handleShow = () => {
    setShow(true);
    console.log(show);
  };

  const [bugData, setBugData] = useState([
    {
      bugId: "1",
      bugName: "Log out button",
      bugLocation: "Admin Sidebar",
      bugDescription: "The logout button is not working",
      bugReportDate: "2023-02-11",
      bugSeverity: "High",
      bugPriority: "Med",
      ReportedByUser: { name: "Jane Arnold", imagePath: "jane.jpg" },
      AssignedToUser: { name: "Jane Arnold", imagePath: "jane.jpg" },
    },
    {
      bugId: "2",
      bugName: "Delete button not working",
      bugLocation: "Main dashboard",
      bugDescription: "The delete function is not working",
      bugReportDate: "2023-03-14",
      bugSeverity: "High",
      bugPriority: "High",
      ReportedByUser: { name: "Jane Arnold", imagePath: "jane.jpg"},
      AssignedToUser: {name: "Jonathan Hague", imagePath: "jonathan.jpg" },
    },
    {
        bugId: "3",
        bugName: "Profile image not appearing",
        bugLocation: "Profile page",
        bugDescription: "Image path is wrong",
        bugReportDate: "2023-03-14",
        bugSeverity: "Med",
        bugPriority: "High",
        ReportedByUser: { name: "Jane Arnold", imagePath: "jane.jpg" },
        AssignedToUser: { name: "Sylvia Lewis", imagePath: "sylvia.jpg" }
      },
      {
        bugId: "4",
        bugName: "Feedback form bug",
        bugLocation: "Feedback page",
        bugDescription: "The feedback form is not submitting",
        bugReportDate: "2023-03-14",
        bugSeverity: "Low",
        bugPriority: "Med",
        ReportedByUser: { name: "Jane Arnold", imagePath: "jane.jpg" },
        AssignedToUser: { name: "Sylvia Lewis", imagePath: "sylvia.jpg" },
      },
      {
        bugId: "5",
        bugName: "Message loading fails",
        bugLocation: "Team page",
        bugDescription: "The messages from team members is not loading for the project manager",
        bugReportDate: "2023-03-14",
        bugSeverity: "Low",
        bugPriority: "Med",
        ReportedByUser: { name: "Jane Arnold", imagePath: "jane.jpg" },
        AssignedToUser: {name: "Jonathan Hague", imagePath: "jonathan.jpg" },
      },
  ]);

//   useEffect(() => {
//     AllBugs({ projectid: projectId }).then((data) => {
//       let newBugs = [];
//       const promises = data.map((bug) => {
//         return GetUser({ userid: bug.devid }).then((assignedToName) => {
//           let newBug = {
//             bugId: bug.bugid.toString(),
//             bugName: bug.bugname,
//             bugLocation: "Random Location",
//             bugDescription: bug.bugdesc || "Default",
//             bugReportDate: new Date().toISOString().slice(0, 10),
//             bugPriority: ["Low", "Medium", "High"][parseInt(bug.severity) - 1],
//             bugSeverity: ["Low", "Medium", "High"][parseInt(bug.priority) - 1],
//             ReportedByUser: { name: "Jane Arnold", imagePath: "jane.jpg" },
//             AssignedToUser: { name: assignedToName, imagePath: "jane.jpg" },
//           };
//           return newBug;
//         });
//       });
//       Promise.all(promises).then((newBugs) => {
//         console.log(newBugs);
//         setBugData(newBugs);
//       });
//     });
//   }, []);

  const deleteBug = (bugId) => {
    console.log("delete this");
    console.log(bugId);
  };

  return (
    <div className="bugBox">
      <div className="bugBoxTitle">
        <p>Bug Reporting</p>
      </div>
      <div className="bugAddBug">
        <button className="bugAddBugButton" onClick={handleShow}>
          Report Bug
        </button>
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
            <Modal.Title>Report Bug</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BugReportForm handleClose={handleClose} projectid={projectId} />
          </Modal.Body>
        </Modal>
      </div>
      {bugData.map((bug, index) => {
        return <Bug data={bug} deleteBug={deleteBug} key={bug.bugId} />;
      })}
    </div>
  );
};

export default Bugs;
