import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import AdminSidebar from '../../components/AdminSidebar';
import "./index.css"
import Dashboard from '../dashboard';

const Admin = () => {


  return (
    <div>
      <div className="splitScreen">
        <div className="leftPane">
          <AdminSidebar/>
        </div>
        <div className="rightPane">
            <div className='titleBar'></div>
          <Routes>
              <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default Admin;
