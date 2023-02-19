import { textAlign } from "@mui/system";
import React, { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./index.css";

const LoginPage = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    //this is just here temporarily, will obviously be getting rid of it
    if (email === "admin" && password === "password") {
      window.location.href = "/admin";
    } else {
      setError("Username or password is incorrect");
    }
  };

  return (
    <body className="waveBg">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="loginForm">
          <h1 className="loginH1">Login</h1>
          {error && <p className="error">{error}</p>}
          <div className="loginForm-group">
            <label class="caption" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="loginForm-control"
              value={email}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="loginForm-group">
            <label class="caption" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="loginForm-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <div class="resetLabel">
              <label class="resetLabel">Forgot password?</label>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
          <div>
            <label class="signupLabel">
              No account? <a href="/signup">Sign Up</a>
            </label>
          </div>
        </form>
      </div>
    </body>
  );
};

export default LoginPage;
