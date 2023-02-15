import React, { Fragment } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Admin from "./pages/admin";
import EditProfile from "./pages/editProfile";
import GanttChart from "./pages/gantt";
import SignUp from "./pages/signup";
import Login from "./pages/login";

function App() {
  return (
    <div>
      {/* These two components can be removed for the real version
      Just kept these here so we can see how components can be added
  */}
      <BrowserRouter>
        {/* <InputTodo></InputTodo>
      <ListTodos></ListTodos> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ganttChart" element={<GanttChart />} />

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
