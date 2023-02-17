import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {MdOutlineReportProblem, MdDescription, MdDateRange} from 'react-icons/md';
import {ImLocation} from 'react-icons/im';
import {BsFillTrashFill} from 'react-icons/bs'
import {BiTimer} from 'react-icons/bi'
import {Button} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';


import "./bug.css"

const Bug = () => {
  return (
    <div className='bugContainer'>      
        <div className="bugLeftPane"> 
            <div className="bugHeader">
                <div className="bugTitle">Log out button</div>
                <div className="bugTrashButton"><BsFillTrashFill/></div>
            </div>
            <div className="bugFeature">
                <div className="bugSeverityIcon"><ImLocation/></div>
                <div className="bugFeatureLocation"><p>On the admin side bar</p></div>
            </div>
            <div className="bugDescription">
                <div className="bugSeverityIcon"><MdDescription/></div>
                <div className="bugFeatureLocation"><p>The log out button is not working. To fix this please do the following</p></div>
            </div>
            <div className="bugViewButtonContainer">
                <button className="bugViewButton">
                    Details
                </button>
                <button className="bugAssignButton">
                    Assign task
                </button>
            </div>
        </div>
        <div className="bugRightPane"> 
            <div className="bugDate">
            <div className="bugSeverityIcon"><MdDateRange/></div>
                <div className="bugFeatureLocation"><p>14/02/2023</p></div>
            </div>
            <div className="bugPriority">
                <div className="bugSeverityIcon"><BiTimer/></div>
                <div className="bugSeverityLevel">High</div>
                
            </div>
            <div className="bugSeverity">
                <div className="bugSeverityIcon"><MdOutlineReportProblem/></div>
                <div className="bugSeverityLevel med">Med</div>
            </div>
            <div className="bugReportedBy">
                <div className="bugSeverityIcon">Report by:</div>
                <div className="bugProfileImageContainer">
                    {['Jane Arnold1', 'Jane Arnold2'].map((name) => (
                        <OverlayTrigger
                        key={name}
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-${name}`}>
                            <strong>{name}</strong>.
                            </Tooltip>
                        }
                        >
                        <img className="bugProfileImage" src="http://localhost:5000/assets/jane.jpg"></img>
                        </OverlayTrigger>
                    ))}  
                </div>
            </div>
            <div className="bugUserFix">
            <div className="bugSeverityIcon">Assigned to:</div>
                <div className="bugProfileImageContainer">
                    {['Jane Arnold1', 'Jane Arnold2'].map((name) => (
                        <OverlayTrigger
                        key={name}
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-${name}`}>
                            <strong>{name}</strong>.
                            </Tooltip>
                        }
                        >
                        <img className="bugProfileImage" src="http://localhost:5000/assets/jane.jpg"></img>
                        </OverlayTrigger>
                    ))}  
                </div>
            </div>
        </div>
    </div>
  );
};


export default Bug;