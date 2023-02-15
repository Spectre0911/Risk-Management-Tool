import React, { Component, useState }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {FaBell} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import { Formik, Form, Field } from "formik"; 
import {
    Box,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";

import "./index.css"
import Bug from './bug';
import Dropzone from "react-dropzone";
import * as yup from "yup";


const BugReportForm = ({handleClose}) =>{
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();

    const reportBugSchema = yup.object().shape({
        bugName: yup.string().required("required"),
        bugDate: yup.string().required("required"),
        bugDescription: yup.string().required("required"),
        severity: yup.number().required("required"),
        priority: yup.number().required("required"),
      });
            
      const initialValuesRegister = {
        bugName: "",
        bugDate: "",
        bugDescription: "",
        severity: "",
        priority: "",
      };
      

      const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(values);
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
                    {(
                    <>
                        <TextField
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bugName}
                        name="bugName"
                        error={
                            Boolean(touched.bugName) && Boolean(errors.bugName)
                        }
                        helperText={touched.bugName && errors.bugName}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        label="Date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bugDate}
                        name="bugDate"
                        error={Boolean(touched.bugDate) && Boolean(errors.bugDate)}
                        helperText={touched.bugDate && errors.bugDate}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bugDescription}
                        name="bugDescription"
                        error={Boolean(touched.bugDescription) && Boolean(errors.bugDescription)}
                        helperText={touched.bugDescription && errors.bugDescription}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                        label="Severity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.severity}
                        name="severity"
                        error={
                            Boolean(touched.severity) && Boolean(errors.severity)
                        }
                        helperText={touched.severity && errors.severity}
                        sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                        label="Priority"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.priority}
                        name="priority"
                        error={
                            Boolean(touched.priority) && Boolean(errors.priority)
                        }
                        helperText={touched.priority && errors.priority}
                        sx={{ gridColumn: "span 4" }}
                        />
                    </>
                    )}
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
    )
}

export default BugReportForm;



