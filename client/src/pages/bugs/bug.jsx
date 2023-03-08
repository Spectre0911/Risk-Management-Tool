import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  MdOutlineReportProblem,
  MdDescription,
  MdDateRange,
} from "react-icons/md";
import { ImLocation } from "react-icons/im";
import { BsFillTrashFill } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import BugAssignForm from "./bugAssignForm";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";
import "./bug.css";
import BugDetailForm from "./bugDetailForm";

const Bug = ({ data, deleteBug, key }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    console.log(show);
  };
  const handleShow = () => {
    setShow(true);
    console.log(show);
  };

  const [editshow, setEditShow] = useState(false);
  const handleEditClose = () => {
    setEditShow(false);
    console.log(show);
  };
  const handleEditShow = () => {
    setEditShow(true);
    console.log(show);
  };

  return (
    <div className="bugContainer">
      <div className="bugLeftPane">
        <div className="bugHeader">
          <div className="bugTitle">{data.bugName}</div>
          <div className="bugTrashButton" onClick={() => deleteBug(data.bugId)}>
            <BsFillTrashFill />
          </div>
        </div>
        <div className="bugFeature">
          <div className="bugSeverityIcon">
            <ImLocation />
          </div>
          <div className="bugFeatureLocation">
            <p>{data.bugLocation}</p>
          </div>
        </div>
        <div className="bugDescription">
          <div className="bugSeverityIcon">
            <MdDescription />
          </div>
          <div className="bugFeatureLocation">
            <p>{data.bugDescription}</p>
          </div>
        </div>
        <div className="bugViewButtonContainer">
          <button className="bugViewButton" onClick={handleEditShow}>
            Details
          </button>
          <button className="bugAssignButton" onClick={handleShow}>
            Assign Bug
          </button>
        </div>
      </div>
      <div className="bugRightPane">
        <div className="bugDate">
          <div className="bugSeverityIcon">
            <MdDateRange />
          </div>
          <div className="bugFeatureLocation">
            <p>{data.bugReportDate}</p>
          </div>
        </div>
        <div className="bugPriority">
          <div className="bugSeverityIcon">
            <BiTimer />
          </div>
          <div className={"bugSeverityLevel " + data.bugPriority.toLowerCase()}>
            {data.bugPriority}
          </div>
        </div>
        <div className="bugSeverity">
          <div className="bugSeverityIcon">
            <MdOutlineReportProblem />
          </div>
          <div className={"bugSeverityLevel " + data.bugSeverity.toLowerCase()}>
            {data.bugSeverity}
          </div>
        </div>
        <div className="bugReportedBy">
          <div className="bugSeverityIcon">Reported by:</div>
          <div className="bugProfileImageContainer">
            <OverlayTrigger
              placement={"top"}
              overlay={
                <Tooltip>
                  <strong>{data.ReportedByUser.name}</strong>.
                </Tooltip>
              }
            >
              <img
                className="bugProfileImage"
                src={`http://localhost:5000/assets/${data.ReportedByUser.imagePath}`}
              ></img>
            </OverlayTrigger>
          </div>
        </div>
        <div className="bugUserFix">
          <div className="bugSeverityIcon">Assigned to:</div>
          <div className="bugProfileImageContainer">
            <OverlayTrigger
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip`}>
                  <strong>{data.AssignedToUser.name}</strong>.
                </Tooltip>
              }
            >
              <img
                className="bugProfileImage"
                src={`http://localhost:5000/assets/${data.AssignedToUser.imagePath}`}
              ></img>
            </OverlayTrigger>
          </div>
        </div>

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
            <Modal.Title>Assign Bug</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BugAssignForm handleClose={handleClose} bugId={1} />
          </Modal.Body>
        </Modal>

        <Modal
          className="bugModal"
          fade={false}
          show={editshow}
          onHide={handleEditClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleEditClose}>
              <GrClose />
            </div>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BugDetailForm handleClose={handleEditClose} data={data} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Bug;
