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
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email address").required("Please enter your email address"),
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
  };

  return (
    <body className="waveBg">
      <div className="signup-container">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched }) => (
            <Form className="loginForm">
              <h1 className="loginH1">Sign Up</h1>
              <div className="loginForm-group">
                <label htmlFor="name" className="caption">
                  Full Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={`loginForm-control ${errors.name && touched.name ? "is-invalid" : ""}`}
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
                  className={`loginForm-control ${errors.email && touched.email ? "is-invalid" : ""}`}
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
                  className={`loginForm-control ${errors.password && touched.password ? "is-invalid" : ""}`}
                />
                <ErrorMessage name="password" component="div" className="error" />
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
                    errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <div className="loginForm-group">
                <label htmlFor="avatar" className="caption">
                  Avatar:
                </label>
                <Field
                  type="file"
                  id="avatar"
                  name="avatar"
                  className={`loginForm-control ${errors.avatar && touched.avatar ? "is-invalid" : ""}`}
                />
                <ErrorMessage name="avatar" component="div" className="error" />
            </div>
              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </body>
  );
};

export default SignupPage;