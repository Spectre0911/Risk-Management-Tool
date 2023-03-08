import React, { Component, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Select from "react-select";
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

const BugReportForm = ({ handleClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();

  const reportBugSchema = yup.object().shape({
    bugName: yup.string().required("required"),
    bugDate: yup.string().required("required"),
    bugDescription: yup.string().required("required"),
    bugLocation: yup.string().required("required"),
  });

  const initialValuesRegister = {
    bugName: "",
    bugDate: "",
    bugDescription: "",
    bugLocation: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
    console.log(priority);
    console.log(severity);
    try {
      const body = { values };
    } catch (err) {
      console.error(err.message);
    }
  };

  const priorityOptions = [
    { value: "1", label: "High" },
    { value: "2", label: "Med" },
    { value: "3", label: "Low" },
  ];

  const [priority, setPriority] = useState({ value: "1", label: "High" });

  const handlePriorityChange = (e) => {
    setPriority(e);
  };

  const severityOptions = [
    { value: "1", label: "High" },
    { value: "2", label: "Med" },
    { value: "3", label: "Low" },
  ];

  const [severity, setSeverity] = useState({ value: "1", label: "High" });

  const handleSeverityChange = (e) => {
    setSeverity(e);
  };

  const [teamMembers, setTeamMembers] = useState([]);

  const handleTeamMemberChange = (e) => {
    setTeamMembers(e);
  };

  const teamMembersOptions = [
    { value: "1", label: "jc@gmail.com" },
    { value: "2", label: "mk@gmail.com" },
    { value: "3", label: "sh@gmail.com" },
  ];

  const [feature, setFeature] = useState([]);
  const featureOptions =[
    { value: "1", label: "login page" },
    { value: "2", label: "logout page" },
  ]

  const handleFeatureChange = (e) => {
    setFeature(e);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={reportBugSchema}
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
