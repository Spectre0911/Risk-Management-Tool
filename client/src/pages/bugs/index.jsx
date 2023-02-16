import React, { Component, useState }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {FaBell} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from "formik"; 
import {
    Box,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";

import "./index.css"
import Bug from './bug';
import Dropzone from "react-dropzone";
import * as yup from "yup";
import BugReportForm from './bugReportForm';
const Bugs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOverlay = () =>{
        setIsOpen(isOpen);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        console.log(show);
    }
    const handleShow = () => {
        setShow(true);
        console.log(show);
    }

    return (
        <div className='bugBox'>
            <div className="bugBoxTitle">
                <p>Bug Reporting</p>
            </div>
            <div className="bugAddBug">
                <button className="bugAddBugButton" onClick={handleShow}>
                    Report Bug
                </button>
            </div>
            
            <div>
                <Modal className="bugModal" fade={false} show={show} onHide={handleClose}>
                    <Modal.Header>
                    <div className="bugFormClose" onClick={handleClose}>
                        <GrClose />
                    </div>
                    <Modal.Title>Report Bug</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <BugReportForm handleClose={handleClose}/>

                    </Modal.Body>
                </Modal>
            </div>

            <Bug/>
            <Bug/>
            <Bug/>
            <Bug/>
            <Bug/>
        </div>
    );
};


export default Bugs;