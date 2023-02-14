import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {FaBell} from 'react-icons/fa';

import "./index.css"
import Bug from './bug';
const Bugs = () => {
  return (
    <div className='bugBox'>
        <div className="bugBoxTitle">
            <p>Bug Reporting</p>
        </div>
        <div className="bugAddBug">
            <button className="bugAddBugButton">
                Report Bug
            </button>
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