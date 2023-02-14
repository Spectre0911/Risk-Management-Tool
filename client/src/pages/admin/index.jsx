import React, { Component, useEffect }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import AdminSidebar from '../../components/AdminSidebar';
import "./index.css"
import Dashboard from '../dashboard';
import EditProfile from '../editProfile';
import ManagedProjects from '../managedProjects';
import Bugs from '../bugs';

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
              <Route path="/*" element={<Dashboard />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/managedprojects" element={<ManagedProjects />} />
              <Route path="/bugs" element={<Bugs />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default Admin;


