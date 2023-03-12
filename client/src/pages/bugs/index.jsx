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
  // Define state variables for modal windows
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOpen(isOpen);
  };

  // Define state for the modal window for reporting a bug
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    console.log(show);
  };
  const handleShow = () => {
    setShow(true);
    console.log(show);
  };

  // Define state for the modal window for assigning a bug
  const [bugData, setBugData] = useState([
    {
      bugId: "1",
      bugName: "Log out button",
      bugLocation: "Admin Sidebar",
      bugDescription: "The logout button is not working",
      bugReportDate: "2023-03-14",
      bugSeverity: "High",
      bugPriority: "Med",
      ReportedByUser: { id: 20, name: "Jane Arnold", imagePath: "jane.jpg" },
      AssignedToUser: { id: 20, name: "Jane Arnold", imagePath: "jane.jpg" },
    },
    {
      bugId: "2",
      bugName: "Log in button",
      bugLocation: "Admin Sidebar",
      bugDescription: "The login button is not working",
      bugReportDate: "2023-03-14",
      bugSeverity: "High",
      bugPriority: "High",
      ReportedByUser: { id: 20,name: "Jane Arnold", imagePath: "jane.jpg" },
      AssignedToUser: { id: 21, name: "Jane Arnold", imagePath: "jane.jpg" },
    },
  ]);

  // Fetch bug data from API
  useEffect(() => {
    AllBugs({ projectid: projectId }).then((data) => {
      let newBugs = [];
      const promises = data.map((bug) => {
        return GetUser({ userid: bug.devid }).then((assignedToName) => {
          return GetUser({ userid: bug.assigner }).then((asssignedName) => {
            let newBug = {
              bugId: bug.bugid.toString(),
              bugName: bug.bugname,
              bugLocation: bug.location,
              bugDescription: bug.bugdesc || "Default",
              bugReportDate: new Date().toISOString().slice(0, 10),
              bugPriority: ["Low", "Medium", "High"][
                parseInt(bug.severity) - 1
              ],
              bugSeverity: ["Low", "Medium", "High"][
                parseInt(bug.priority) - 1
              ],
              ReportedByUser: { id: bug.assigner, asssignedName, imagePath: "jane.jpg" },
              AssignedToUser: { id:bug.devid, name: assignedToName, imagePath: "jane.jpg" },
            };
            return newBug;
          });
        });
      });
      Promise.all(promises).then((newBugs) => {
        console.log(newBugs);
        setBugData(newBugs);
      });
    });
  }, []);

  const deleteBug = (bugId) => {
    console.log("delete this");
    console.log(bugId);
  };

  // Render the bug reporting modal window
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
// Export the component
export default Bugs;
