import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { IconButton, Tooltip } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import { BsBriefcaseFill } from "react-icons/bs";
import { AiFillWarning } from "react-icons/ai";
import Select from "react-select";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import "./index.css";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { createGrid } from "@mui/system";

const EditProfileForm = ({ handleClose, featureId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();

  const [dependencies, setDependencies] = useState([]);
  const [dependencyOptions, setDependencyOptions] = useState([]);

  const [skillsRequired, setSkillsRequired] = useState([])
  const [teamMembers, setTeamMembers] = useState([])

  const reportBugSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    startTime: yup.string().required("required"),
    endTime: yup.string().required("required"),
    difficulty: yup.string().required("required"),
  });

  const initialValuesRegister = {
    name: "Task",
    description: "Description",
    startTime: "2023-05-24",
    endTime: "2023-05-24",
    difficulty: "1",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // console.log(dependencies);
    const newValues = {
      projectid: 1,
      featureName: values.name,
      startTime: values.startTime,
      endTime: values.endTime,
      completed: false,
      priority: priority.value,
      currentRisk: 0,
      progress: 0,
      difficulty: values.difficulty,
      dependencies: dependencies,
    };

    createFeature(newValues);
  };

  const createFeature = (values) => {
    fetch("http://localhost:5000/api/createFeature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleDependencyChange = (e) => {
    const chosenDependencies = dependencies;
    chosenDependencies.push(e);
    setDependencies(chosenDependencies);
  };


  const handleSkillsRequiredChange = (e) => {
    setSkillsRequired(e);
  }

  const handleTeamMemberChange =(e) =>{
    setTeamMembers(e);
  }

  const priorityOptions = [
    { value: "1", label: "Core" },
    { value: "2", label: "Optional" },
    { value: "3", label: "Aesthetic" },
  ];

  const skillsRequiredOptions = [
    { value: "1", label: "React" },
    { value: "2", label: "Databases" },
    { value: "3", label: "Backend" },
  ];

  const teamMembersOptions = [
    { value: "1", label: "Joshua" },
    { value: "2", label: "Morgan" },
    { value: "3", label: "Sanjula" },
  ];

  const [priority, setPriority] = useState({ value: "1", label: "Core" });

  const handlePriorityChange = (e) => {
    setPriority(e);
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
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />

                  <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "2px",
                  }}
                >
                  Skills required:
                </p>
                <Select
                  id="skillsRequired"
                  name="skillsRequired"
                  options={skillsRequiredOptions}
                  isMulti
                  onChange={handleSkillsRequiredChange}
                  onBlur={handleBlur}
                  className="defineDependenciesBox"
                  sx={{ gridColumn: "span 3", width: "70%" }}
                  value={skillsRequired}
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
                  isMulti
                  onChange={handleTeamMemberChange}
                  onBlur={handleBlur}
                  className="defineDependenciesBox"
                  sx={{ gridColumn: "span 3", width: "70%" }}
                  value={teamMembers}
                />

                <TextField
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />

              

                <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "20px",
                  }}
                >
                  Start:
                </p>
                <TextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startTime}
                  name="startTime"
                  type="date"
                  error={
                    Boolean(touched.startTime) && Boolean(errors.startTime)
                  }
                  helperText={touched.startTime && errors.startTime}
                  sx={{ gridColumn: "span 3" }}
                />

                <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "20px",
                  }}
                >
                  End:
                </p>
                <TextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endTime}
                  name="endTime"
                  type="date"
                  error={Boolean(touched.endTime) && Boolean(errors.endTime)}
                  helperText={touched.endTime && errors.endTime}
                  sx={{ gridColumn: "span 3" }}
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
              {"Save"}
            </Button>

            <Button
              className="bugCancelButton"
              fullWidth
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

export default EditProfileForm;