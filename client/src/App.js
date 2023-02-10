import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Admin from "./pages/admin";
function App() {
  return (
    <div>
      {/* These two components can be removed for the real version
      Just kept these here so we can see how components can be added
      */}
      {/* <InputTodo></InputTodo>
      <ListTodos></ListTodos> */}
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<Admin />} />
              {/* <Route
                path="/dashboard"
                element={isAuth ? <BasketPage /> : <Navigate to="/" />}
              />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              /> */}
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
