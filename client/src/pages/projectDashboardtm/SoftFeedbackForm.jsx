import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { IconButton, Tooltip } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import Slider from "@mui/material/Slider";
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
import './feedbackform.css';

const SoftFeedbackForm = ({ handleClose, taskId, close }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();

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


  const [value, setValue] = React.useState([1, 5]);

  function valuetext(value) {
    // return `${value} ${difficulty[value - 1]}`;
    return "bollocks";
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [[
  [{value: 1, label: 'Not at all'},{value: 2, label: 'To a small extent'}, {value: 3, label: 'Moderately'},{value: 4, label: 'To a large extent'},{value: 5, label: 'Completely'}],
  [{value: 1, label: 'Not at all'},{value: 2, label: 'To a small extent'}, {value: 3, label: 'Moderately'},{value: 4, label: 'To a large extent'},{value: 5, label: 'Completely'}],
  [{value: 1, label: 'Not at all'},{value: 2, label: 'Rarely'}, {value: 3, label: 'Sometimes'},{value: 4, label: 'Often'},{value: 5, label: 'Very Often'}]
  ],
  [
    [{value: 1, label: 'Not at all'},{value: 2, label: 'To a small extent'}, {value: 3, label: 'Moderately'},{value: 4, label: 'To a large extent'},{value: 5, label: 'Completely'}],
    [{value: 1, label: 'Not at all'},{value: 2, label: 'Rarely'}, {value: 3, label: 'Sometimes'},{value: 4, label: 'Often'},{value: 5, label: 'Very Often'}],
    [{value: 1, label: 'Not at all confident'},{value: 2, label: 'Slightly confident'}, {value: 3, label: 'Moderately confident'},{value: 4, label: 'Very confident'},{value: 5, label: 'Extremely confident'}]
  ],
  [
    [{value: 1, label: 'Not at all'},{value: 2, label: 'To a small extent'}, {value: 3, label: 'Moderately'},{value: 4, label: 'To a large extent'},{value: 5, label: 'Completely'}],
    [{value: 1, label: 'Not well at all'},{value: 2, label: 'Not very well'}, {value: 3, label: 'Moderately well'},{value: 4, label: 'Well'},{value: 5, label: 'Very well'}],
    [{value: 1, label: 'Not at all confident'},{value: 2, label: 'Slightly confident'}, {value: 3, label: 'Moderately confident'},{value: 4, label: 'Very confident'},{value: 5, label: 'Extremely confident'}]
  ],
  [
    [{value: 1, label: 'Not at all confident'},{value: 2, label: 'Slightly confident'}, {value: 3, label: 'Moderately confident'},{value: 4, label: 'Very confident'},{value: 5, label: 'Extremely confident'}],
    [{value: 1, label: 'Not at all'},{value: 2, label: 'To a small extent'}, {value: 3, label: 'Moderately'},{value: 4, label: 'To a large extent'},{value: 5, label: 'Completely'}],
    [{value: 1, label: 'Not well at all confident'},{value: 2, label: 'Slightly confident'}, {value: 3, label: 'Moderately confident'},{value: 4, label: 'Very confident'},{value: 5, label: 'Extremely confident'}],
    
  ]
  ];

  const questions = [{ 
    category:"Communication",
    questions:[
      "1. To what extent do you think team members communicate progress and updates to each other during the project?",
      "2. How comfortable do you feel providing feedback and suggestions to other team members during the project?",
      "3. How comfortable do you feel providing feedback and suggestions to other team members during the project?"
    ]},
    {category:"Project understanding",
    questions:[
      "1. To what extent do you understand the project's requirements and goals?",
      "2. To what extent do you ask for additional information or clarification when you encounter uncertainty or ambiguity during the project?",
      "3. How confident are you in your ability to explain the project's technical details to other developers or clients?"
    ]},
    {category:"Team Cohesion",
    questions:[
      "1. To what extent do you trust and respect other team member’s opinions and expertise?",
      "2. How well do you think team members collaborate and work together to achieve project goals?",
      "3. To what extent do you think team members share common values, such as quality, innovation, and customer satisfaction?"
    ]},
    {category:"Project Confidence",
    questions:[
      "1. How confident do you feel that the project currently being worked on meets the clients requirements?",
      "2. To what extent do you feel as though you have the necessary skills and knowledge to complete the project successfully?",
      "3. How confident are you in the overall success of the project, taking into account its complexity, risks, and potential roadblocks?"
    ]},
];

  const categories = [
    "Communication",
    "Project Understanding",
    "Team Cohesion",
    "Project Confidence"
  ]

  // All the values from the sliders should be nicely packaged for you 
  // Josh in this array. I have configured it to automatically update as well
  // when a slider is reset  
  const [values, setValues] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ])

  const [textFeedback, setTextFeedback] = useState("");

  const textFeedbackChange = (e) =>{
    setTextFeedback(e.target.value);
    console.log(textFeedback);
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) ;
  }
  
  const setScore = (e, row, col) =>{
    var temp = values;
    console.log(row);
    temp[row][col] = e.target.value;
    setValues(temp);
    console.log(temp);
  }

  const handleFormSubmit = () =>{
    console.log(values);
    console.log(textFeedback);
    close();
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
            className="feedbackBox"
            gap="30px"
            style={{height:'400px', margin:"auto"}}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Scrollbars>
            <p className="feedbackHeading">Please use this form to rate your experience on this particular project so far:</p>
            {questions.map((question, index)=>{
              return(
                <div className="feedbackFormDiv">
                  <p className="feedbackHeading">{question.category}</p>
                    {question.questions.map((string, index1)=>{
                      return(
                      <>
                      <p className="feedbackFormQuestion">
                      {string}
                      </p>
                      <Slider
                        aria-label="Restricted values"
                        defaultValue={0}
                        key={1}
                        onChange={(e) =>{
                          setScore(e,index,index1)}}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        className="feedbackFormSlider"
                        valueLabelDisplay="auto"
                        marks={marks[index][index1]}
                        row={index}
                        col={index1}
                        min={1}
                        max={5}
                        sx={{
                          gridColumn: "span 4"
                        }}
                      />
                    </>
                    )})}
                </div>
                
            )})
            }

            <p className="feedbackBoxQuestion">Please enter feedback directly to your project manager:</p>
            <TextField
                className="feedbackBox"
                multiline
                rows={4}
                value={textFeedback}
                onChange={textFeedbackChange}
                maxRows={4}
                sx={{
                  gridColumn: "span 4"
                }}
              />
            </Scrollbars>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              className="bugAddButton"
              fullWidth
              onClick={handleSubmit}
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
              onClick={close}
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

export default SoftFeedbackForm;
