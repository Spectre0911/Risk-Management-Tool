import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
//components
import "@fontsource/montserrat";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Admin from "./pages/admin";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ScrollToTop from "./pages/projectDashboard/ScrollToTop";
import ManagedProjects from "./pages/managedProjects";
import ProjectContainer from "./pages/projectDashboard/ProjectManagerContainer";
import Bugs from "./pages/bugs";
import ProjectDashboardTm from "./pages/projectDashboardtm";
function App() {
  const mode = "light";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      {/* These two components can be removed for the real version
      Just kept these here so we can see how components can be added
  */}
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Admin />} />
            <Route
              path="/projects/:projectId/*"
              element={<ProjectContainer />}
            />
            <Route
              path="/projectstm/:projectId/*"
              element={<ProjectDashboardTm />}
            />

            {/* <Route path="/ganttChart" element={<GanttChart />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
