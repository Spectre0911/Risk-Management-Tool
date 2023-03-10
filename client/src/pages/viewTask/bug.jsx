import React, { Component, useState }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {MdOutlineReportProblem, MdDescription, MdDateRange} from 'react-icons/md';
import {GrStatusInfo} from 'react-icons/gr';
import {BsFillTrashFill} from 'react-icons/bs'
import {BiTimer} from 'react-icons/bi'
import {Button} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import {GrClose} from 'react-icons/gr';
import Modal from 'react-bootstrap/Modal';
import EditProfileForm from './FeatureForm';
import "./bug.css"

const Bug = ({data}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOverlay = () =>{
        setIsOpen(isOpen);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        console.log("ddd");
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const [isEditOpen, setIsEditOpen] = useState(false);
    const toggleEditOverlay = () =>{
        setIsEditOpen(isOpen);
    }
    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => {
        console.log("oo");
        setShowEdit(false);
    }
    const handleEditShow = () => {
        setShowEdit(true);
    }


  return (
    <div className='bugContainer'>      
        <div className="bugLeftPane"> 
            <div className="bugHeader">
                <div className="bugTitle">{data.bugTitle}</div>
                <div className="bugTrashButton"><BsFillTrashFill/></div>
            </div>
            <div className="bugFeature">
                <div className="bugSeverityIcon"><GrStatusInfo/></div>
                <div className="bugFeatureLocation"><p>{data.status}</p></div>
            </div>
            <div className="bugDescription">
                <div className="bugSeverityIcon"><MdDescription/></div>
                <div className="bugFeatureLocation"><p>{data.description}</p></div>
            </div>
            <div className="bugViewButtonContainer">
                <button className="bugViewButton" onClick={handleEditShow}>
                    Edit
                </button>
                {data.status!="Completed" && <button className="bugAssignButton" style={{backgroundColor:"#00800087"}}>
                    Mark as Complete
                </button>}
            </div>
        </div>
        <div className="bugRightPane"> 
            <div className="bugDate">
            <div className="bugSeverityIcon"><MdDateRange/></div>
                <div className="bugFeatureLocation"><p>{data.startDate} - {data.endDate}</p></div>
            </div>
            <div className="bugPriority">
                <div className="bugSeverityIcon"><BiTimer/></div>
                <div className="bugSeverityLevel">{data.priority}</div>
                
            </div>
            <div className="bugUserFix">
            <div className="bugSeverityIcon">Assigned to:</div>
                <div className="bugProfileImageContainer">
                        <OverlayTrigger
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-${data.assignedTo}`}>
                            <strong>{data.assignedTo}</strong>.
                            </Tooltip>
                        }
                        >
                        <img className="bugProfileImage" src={`http://localhost:5000/assets/${data.path}`}></img>
                        </OverlayTrigger>
                </div>
            </div>
        </div>
        

        <Modal className="bugModal" fade={"false"} show={showEdit} onHide={handleEditClose}>
            <Modal.Header>
            <div className="bugFormClose" onClick={handleEditClose}>
                <GrClose />
            </div>
            <Modal.Title>Edit task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <EditProfileForm handleClose={handleEditClose} featureId={2} mode={0}/>

            </Modal.Body>
        </Modal>
    </div>
  );
};


export default Bug;