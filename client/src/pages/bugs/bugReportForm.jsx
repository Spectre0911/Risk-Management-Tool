import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import { AllFeatures } from "../services/AllFeatures";
import { AllProjectMembers } from "../services/AllProjectMembers";
import { CreateBug } from "../services/CreateBug";
import { useSelector } from "react-redux";
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


// Defining the BugReportForm component, which receives props for handleClose and projectid
const BugReportForm = ({ handleClose, projectid }) => {
   // Using a media query to check if the current device is non-mobile
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const email = useSelector((state) => state.email.email);

  // Defining Yup validation schema for the form
  const reportBugSchema = yup.object().shape({
    bugName: yup.string().required("required"),
    bugDate: yup.string().required("required"),
    bugDescription: yup.string().required("required"),
    bugLocation: yup.string().required("required"),
  });

  // Defining initial values for the form
  const initialValuesRegister = {
    bugName: "",
    bugDate: "",
    bugDescription: "",
    bugLocation: "",
  };

  // Handling the form submission
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      console.log(feature);
      console.log(teamMembers);
      console.log(values);
      console.log(email);
      // Constructing the body of the HTTP request using the form data and other necessary data
      const body = {
        ...values,
        priority: priority.value,
        severity: severity.value,
        featureid: feature.value,
        devid: teamMembers.value,
        email: email,
      };
      CreateBug(body);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Options for priority selector
  const priorityOptions = [
    { value: "1", label: "High" },
    { value: "2", label: "Med" },
    { value: "3", label: "Low" },
  ];

  //State for currently selected priority
  const [priority, setPriority] = useState({ value: "1", label: "High" });

  // Defining the handlePriorityChange function to handle changes to the selected priority
  const handlePriorityChange = (e) => {
    setPriority(e);
  };

  // Options for severity selector
  const severityOptions = [
    { value: "1", label: "High" },
    { value: "2", label: "Med" },
    { value: "3", label: "Low" },
  ];

  // State for currently selected severity
  const [severity, setSeverity] = useState({ value: "1", label: "High" });

  // Defining the handleSeverityChange function to handle changes to the selected severity
  const handleSeverityChange = (e) => {
    setSeverity(e);
  };
// State for currently selected team members
  const [teamMembers, setTeamMembers] = useState([]);
// Defining the handleTeamMemberChange function to handle changes to the selected team members
  const handleTeamMemberChange = (e) => {
    setTeamMembers(e);
  };
// State for currently selected team members
  const [teamMembersOptions, setTeamMemberOptions] = useState([
    { value: "1", label: "jc@gmail.com" },
    { value: "2", label: "mk@gmail.com" },
    { value: "3", label: "sh@gmail.com" },
  ]);
// State for currently selected feature
  const [feature, setFeature] = useState([]);
  const [featureOptions, setFeatureOptions] = useState([]);

  const handleFeatureChange = (e) => {
    setFeature(e);
  };
// Defining the useEffect hook to fetch the features and team members for the project
  useEffect(() => {
    console.log(projectid);
    AllFeatures({ projectid: parseInt(projectid) }).then((data) => {
      let newFeatures = [];
      data.map((feature) => {
        newFeatures.push({
          value: feature.featureid.toString(),
          label: feature.featurename,
        });
      });

      setFeatureOptions(newFeatures);
    });
    AllProjectMembers({ projectId: parseInt(projectid) }).then((data) => {
      let newMembers = [];
      data.map((member) => {
        newMembers.push({
          value: member.userid.toString(),
          label: member.name,
        });
      });
      setTeamMemberOptions(newMembers);
    });
  }, []);
// Rendering the form
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={reportBugSchema}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {
              <>
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bugName}
                  name="bugName"
                  error={Boolean(touched.bugName) && Boolean(errors.bugName)}
                  helperText={touched.bugName && errors.bugName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bugDate}
                  name="bugDate"
                  type="date"
                  error={Boolean(touched.bugDate) && Boolean(errors.bugDate)}
                  helperText={touched.bugDate && errors.bugDate}
                  sx={{ gridColumn: "span 2" }}
                />

                <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "2px",
                  }}
                >
                  Team Members:
                </p>
                <Select
                  id="teamMembers"
                  name="teamMembers"
                  options={teamMembersOptions}
                  onChange={handleTeamMemberChange}
                  onBlur={handleBlur}
                  className="defineDependenciesBox"
                  sx={{ gridColumn: "span 3", width: "70%" }}
                  value={teamMembers}
                />

                <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "2px",
                  }}
                >
                  Feature:
                </p>
                <Select
                  id="feature"
                  name="feature"
                  options={featureOptions}
                  onChange={handleFeatureChange}
                  onBlur={handleBlur}
                  className="defineDependenciesBox"
                  sx={{ gridColumn: "span 3", width: "70%" }}
                  value={feature}
                />

                <TextField
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bugDescription}
                  name="bugDescription"
                  error={
                    Boolean(touched.bugDescription) &&
                    Boolean(errors.bugDescription)
                  }
                  helperText={touched.bugDescription && errors.bugDescription}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bugLocation}
                  name="bugLocation"
                  error={
                    Boolean(touched.bugLocation) && Boolean(errors.bugLocation)
                  }
                  helperText={touched.bugLocation && errors.bugLocation}
                  sx={{ gridColumn: "span 4" }}
                />

                <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "20px",
                  }}
                >
                  Priority:
                </p>
                <Select
                  id="priority"
                  options={priorityOptions}
                  multi={false}
                  onChange={handlePriorityChange}
                  onBlur={handleBlur}
                  className="defineDependenciesBox"
                  sx={{ gridColumn: "span 3", width: "70%" }}
                  value={priority}
                />

                <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "20px",
                  }}
                >
                  Severity:
                </p>
                <Select
                  id="priority"
                  options={severityOptions}
                  multi={false}
                  onChange={handleSeverityChange}
                  onBlur={handleBlur}
                  className="defineDependenciesBox"
                  sx={{ gridColumn: "span 3", width: "70%" }}
                  value={severity}
                />
              </>
            }
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              className="bugAddButton"
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
              }}
            >
              {"Report Bug"}
            </Button>

            <Button
              className="bugCancelButton"
              fullwidth
              onClick={handleClose}
              sx={{
                m: "2rem 0",
                p: "1rem",
              }}
            >
              {"Cancel"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default BugReportForm;
