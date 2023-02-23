import React, { Component } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "../login/index.css";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupPage = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your name"),
    lastName: Yup.string().required("Please enter your name"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email address"),
    password: Yup.string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    avatar: Yup.mixed().test("fileType", "Invalid file type", (value) => {
      if (value) {
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }
      return true;
    }),
  });

  const onSubmit = (values) => {
    console.log(values);
    // This will not check if there is an issue with singup
    fetch("http://localhost:5000/api/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  return (
    <body className="waveBg">
      <div className="signup-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="loginForm">
              <h1 className="loginH1">Sign Up</h1>
              <div className="loginForm-group">
                <label htmlFor="firstName" className="caption">
                  First Name:
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`loginForm-control ${
                    errors.name && touched.lastName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="loginForm-group">
                <label htmlFor="lastName" className="caption">
                  Last Name:
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`loginForm-control ${
                    errors.name && touched.firstName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="loginForm-group">
                <label htmlFor="email" className="caption">
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`loginForm-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="loginForm-group">
                <label htmlFor="password" className="caption">
                  Password:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className={`loginForm-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="loginForm-group">
                <label htmlFor="confirmPassword" className="caption">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`loginForm-control ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
              <div className="loginForm-group">
                <label htmlFor="avatar" className="caption">
                  Avatar:
                </label>
                <Field
                  type="file"
                  id="avatar"
                  name="avatar"
                  className={`loginForm-control ${
                    errors.avatar && touched.avatar ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="avatar" component="div" className="error" />
              </div>
              <button type="submit" className="submit-button">
                Sign Up
              </button>
              <div>
                <label className="signupLabel">
                  Already have an account? <a href="/login">Sign In</a>
                </label>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </body>
  );
};

export default SignupPage;
