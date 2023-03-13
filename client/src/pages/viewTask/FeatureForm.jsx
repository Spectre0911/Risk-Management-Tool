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
import { AllProjectMembers } from "../services/AllProjectMembers";
import { CreateTask } from "../services/CreateTask";
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

const EditProfileForm = ({ handleClose, featureId, mode, projectid }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();

  const reportBugSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    difficulty: yup.string().required("required"),
  });

  const initialValuesRegister = {
    name: "feature name",
    description: "Add login screen",
    difficulty: "0",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    CreateTask({
      ...values,
      featureid: featureId,
      priority: priority.value,
      devid: user.value,
    });
  };

  const dependencyOptions = [
    { value: "1", label: "Login Screen" },
    { value: "2", label: "Render Screen" },
    { value: "3", label: "Rendering Screen" },
  ];

  const [dependencies, setDependencies] = useState([
    { value: "1", label: "Login Screen" },
  ]);

  const handleDependencyChange = (e) => {
    setDependencies(e);
  };

  const priorityOptions = [
    { value: "1", label: "Core" },
    { value: "2", label: "Optional" },
    { value: "3", label: "Aesthetic" },
  ];

  const [priority, setPriority] = useState({ value: "1", label: "Core" });

  const handlePriorityChange = (e) => {
    setPriority(e);
  };

  const [teamMembers, setTeamMemberOptions] = useState([
    { value: "1", label: "Jane Arnold" },
    { value: "2", label: "Joshua" },
    { value: "3", label: "Morgan" },
  ]);

  const handleUserChange = (e) => {
    setUser(e);
  };

  const [user, setUser] = useState();

  useEffect(() => {
    // console.log(projectid);
    // AllFeatures({ projectid: parseInt(projectid) }).then((data) => {
    //   let newFeatures = [];
    //   data.map((feature) => {
    //     newFeatures.push({
    //       value: feature.featureid.toString(),
    //       label: feature.featurename,
    //     });
    //   });
    //   setFeatureOptions(newFeatures);
    // });
    AllProjectMembers({ projectId: projectid }).then((data) => {
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

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={mode ? initialValuesRegister : {}}
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
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Difficulty"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.difficulty}
                  name="difficulty"
                  error={
                    Boolean(touched.difficulty) && Boolean(errors.difficulty)
                  }
                  helperText={touched.difficulty && errors.difficulty}
                  sx={{ gridColumn: "span 2" }}
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

                {/* <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "20px",
                  }}
                >
                  Dependencies:
                </p>
                <Select
                  defaultValue={dependencies}
                  label="Dependencies"
                  isMulti
                  name="Dependencies"
                  options={dependencyOptions}
                  className="defineDependenciesBox"
                  classNamePrefix="select"
                  onChange={handleDependencyChange}
                  style={{ gridColumn: "span 3", width: "70%" }}
                /> */}

                {/* <p
                  style={{
                    gridColumn: "span 1",
                    margin: "auto",
                    paddingRight: "20px",
                  }}
                >
                  Assign to:
                </p>
                <Select
                  defaultValue={user}
                  label="Users"
                  name="Users"
                  options={teamMembers}
                  className="defineDependenciesBox"
                  classNamePrefix="select"
                  onChange={handleUserChange}
                  style={{ gridColumn: "span 3", width: "70%" }}
                /> */}

                {/* <p
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
                /> */}

                {/* <p
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
                /> */}
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
