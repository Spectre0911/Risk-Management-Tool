import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
//components
import "@fontsource/montserrat";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Admin from "./pages/admin";
import EditProfile from "./pages/editProfile";
import GanttChart from "./pages/gantt";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
function App() {
  const mode = "light"
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      {/* These two components can be removed for the real version
      Just kept these here so we can see how components can be added
  */}
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <InputTodo></InputTodo>
      <ListTodos></ListTodos> */}
        <Routes>
          <Route path="/*" element={<Admin />} />
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
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
