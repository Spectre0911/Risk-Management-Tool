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
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ProjectContainer from "./pages/projectDashboard/ProjectManagerContainer";
import Bugs from "./pages/bugs";
import { persistor, store } from './store/index.js';
import ProjectTmContainer from "./pages/projectDashboardtm/ProjectTmManagerContainer";
function App() {
  const mode = "light";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop />
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/*" element={<Admin />} />
                <Route
                  path="/projects/:projectId/*"
                  element={<ProjectContainer />}
                />
                <Route
                  path="/projectstm/:projectId/*"
                  element={<ProjectTmContainer />}
                />
                {/* <Route path="/managedprojects" element={<ManagedProjects />} /> */}

                {/* <Route path="/ganttChart" element={<GanttChart />} /> */}
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
          </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
