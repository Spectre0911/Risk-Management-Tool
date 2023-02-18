import React, { Component, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { FaBell } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { IconButton, Tooltip } from '@mui/material';
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

const EditProfileForm = ({ handleClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState("http://localhost:5000/assets/jane.jpg");
  const { palette } = useTheme();
  const options = [
    { value: 'Python', label: 'Python' },
    { value: 'Front-End', label: 'Front-End' },
    { value: 'Backend', label: 'Backend' },
  ];

  const [skills, setSkills] = useState([{value: 'Python', label: 'Python'}, {value: 'React', label: 'React'}])

  const reportBugSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().required("required"),
    bio: yup.string().required("required"),
    gitHubToken: yup.string().required("required"),
    yearsOfExperience: yup.number().required("required"),
    // skills: yup.array().required("required")
  });

  const initialValuesRegister = {
    name: "Jane Arnold",
    email: "janearnold@mail.com",
    bio: "Hi, my name is Jane and I am a software developer",
    yearsOfExperience: 2,
    gitHubToken: "mvvnknvjknerngvegver",
    // skills: { value: 'Python', label: 'Python' }
  };


  const uploadImage  = (e) =>{
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("fff");
    console.log(skills);
    try {
      const body = { values };
      const response = await fetch("http://localhost:5000/addbug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSkillChange = (e) => {
    setSkills(e);
  }

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
                <div style={{ gridColumn: "span 4", alignContent:"center", margin:"auto"}}>
                  <img 
                    className='editProfilePic' 
                    src={image}
                    style={{margin:"auto", borderRadius:"200px", height:"200px", width:"200px"}}>
                  </img>
                

                <label htmlFor='file' className="uploadImageLabel" style={{gridColumn: "span 4", margin:"auto"}}>
                  <input
                    id='file'
                    type='file'
                    multiple
                    style={{ position: 'fixed', top: '-100em', color: "#5873ca" }}
                    onChange={uploadImage}
                  />
                    <Tooltip title='Upload Files'>
                      <IconButton component='span'>
                        <AiFillCamera className="uploadImageButton"/>
                      </IconButton>
                    </Tooltip>
                </label>
                </div>

              
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
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Github Token"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gitHubToken}
                  name="Github Token"
                  error={Boolean(touched.gitHubToken) && Boolean(errors.gitHubToken)}
                  helperText={touched.gitHubToken && errors.gitHubToken}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Years of Experience"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.yearsOfExperience}
                  name="Years of Experience"
                  error={Boolean(touched.yearsOfExperience) && Boolean(errors.yearsOfExperience)}
                  helperText={touched.yearsOfExperience && errors.yearsOfExperience}
                  sx={{ gridColumn: "span 2" }}
                />

                <p style={{ gridColumn: "span 1", margin:'auto'}}>Skills:</p>
                <Select
                    defaultValue={skills}
                    label="skills"
                    isMulti
                    name="skills"
                    options={options}
                    className="editProfileSkills"
                    classNamePrefix="select"
                    onChange={handleSkillChange}
                    style={{ gridColumn: "span 3", width:"80%"}}
                />
                              
                <TextField
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={
                    Boolean(touched.bio) &&
                    Boolean(errors.bio)
                  }
                  multiline
                  rows={4}
                  helperText={touched.bio && errors.bio}
                  sx={{ gridColumn: "span 4" }}
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
