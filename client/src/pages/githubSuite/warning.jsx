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


const Warning = ({warning}) => {
  return (
    <div className='bugContainer'>     
        <div className="issueLeftPane"> 
            <div className="bugHeader">
                <div className="bugTitle">{warning[0]+". "+warning[1]}</div>
            </div>
            <div className="bugDescription">
                <div className="bugSeverityIcon"><MdDescription/></div>
                <div className="bugFeatureLocation"><p>{warning[4]}</p></div>
            </div>
            <div className="bugFeature">
                <div className="bugSeverityIcon"><ImLocation/></div>
                <div className="bugFeatureLocation"><p>{warning[5]}</p></div>
            </div>
        </div>
        <div className="bugRightPane"> 
            <div className="bugDate">
            <div className="bugSeverityIcon"><MdDateRange/></div>
                <div className="bugFeatureLocation"><p>{warning[3]}</p></div>
            </div>
            <div className="bugPriority">
                <div className="bugSeverityIcon"><BiTimer/></div>
                <div className="bugSeverityLevel">{warning[2]}</div>
                
            </div>
        </div>
    </div>
  );
};


export default Warning;