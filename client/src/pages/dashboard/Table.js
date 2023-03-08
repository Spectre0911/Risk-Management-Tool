import React, { useEffect, useState, useMemo } from "react";
import { TasksToComplete } from "../services/TasksToComplete";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TableContainer from "./TableContainer";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { SelectColumnFilter } from "./filters";
import ChangingProgressProvider from "./ChangingProgressProvider";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import ReactCSSTransitionGroup from "react-transition-group"; // ES6
import FlipMove from "react-flip-move";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import FeatureForm from "./FeatureForm";
import TaskForm from "./TaskForm";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";
import { EndProject } from "../services/EndProject";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Table = () => {
  var ReactCSSTransitionGroup = require("react-transition-group"); // ES5 with npm
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const login = useSelector((state) => state.email);

  const [contacts, setContacts] = useState([
    {
      taskId: "1",
      featureId: "1",
      projectId: "1",
      projectName: "CS261",
      taskPriority: "Core",
      featureName: "Dashboard",
      taskStatus: "Completed",
      taskName: "Add sidebar",
      startTime: "12/11/2022",
      endTime: "30/02/2023",
      daysLeft: "2",
    },
    {
      taskId: "2",
      featureId: "1",
      projectId: "1",
      projectName: "CS261",
      taskPriority: "Aesthetic",
      taskStatus: "In Progress",
      featureName: "Dashboard",
      taskName: "Add sidebar",
      startTime: "12/11/2022",
      endTime: "30/02/2023",
      daysLeft: "2",
    },
    {
      taskId: "3",
      featureId: "1",
      projectId: "1",
      projectName: "CS261",
      taskPriority: "Aesthetic",
      taskStatus: "Delayed",
      featureName: "Dashboard",
      taskName: "Add sidebar",
      daysLeft: "2",
    },
  ]);
  useEffect(() => {
    console.log(login);
    TasksToComplete({ email: login.login }).then((data) => setData(data));
    setData(contacts);
  }, []);

  const viewTasks = (e) => {
    // console.log(e.target.value);
  };

  const [showEdit, setShowEdit] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const handleEditClose = () => {
    setShowEdit(false);
  };
  const handleEditShow = (e) => {
    setTaskId(e.target.value);
    setShowEdit(true);
  };

  const markTaskAsComplete = (e) => {
    console.log("mark task as complete");
    console.log(e.target.value);
  };
  // const renderRowSubComponent = (row) => {
  //   const name = "k";
  //   console.log("ee");
  //   console.log(row.cells);
  //   return (
  //     <div>
  //     {row.cells.map((row, index) => (
  //     <tr className="newRows"key={index}>
  //         <td><div>1</div></td>
  //         <td>
  //           <div><p>fji</p></div>
  //         </td>
  //     </tr>
  //     ))}
  //     </div>
  //   )
  // };

  const columns = useMemo(
    () => [
      {
        Header: "Project",
        accessor: "projectName",
        filterable: false,
        disableFilters: true,
        filterable: false,
        Cell: ({ cell }) => {
          return (
            <div>
              <b>{cell.row.original.projectName}</b>
            </div>
          );
        },
      },
      {
        Header: "Feature",
        accessor: "featureName",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Task",
        accessor: "taskName",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Priority",
        accessor: "taskPriority",
        filterable: false,
        disableFilters: true,
        filterable: false,
        Cell: ({ cell }) => {
          return (
            <div
              className={`taskPriority 
                ${cell.row.original.taskPriority == `Core` ? "red" : ""}
                ${cell.row.original.taskPriority == `Aesthetic` ? "yellow" : ""}
                ${cell.row.original.taskPriority == `Optional` ? "green" : ""}
                `}
            >
              {cell.row.original.taskPriority}
            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "taskStatus",
        filterable: false,
        disableFilters: true,
        filterable: false,
        Cell: ({ cell }) => {
          return (
            <div
              className={`taskPriority 
                ${cell.row.original.taskStatus == `Delayed` ? "red" : ""}
                ${cell.row.original.taskStatus == `In Progress` ? "yellow" : ""}
                ${cell.row.original.taskStatus == `Completed` ? "green" : ""}
                `}
            >
              {cell.row.original.taskStatus}
            </div>
          );
        },
      },
      {
        Header: "Days Left",
        accessor: "daysLeft",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "View Details",
        Cell: ({ cell }) => {
          return (
            <div className="featureViewTasks">
              <button
                type="submit"
                className="featureViewTasksButton"
                value={cell.row.original.featureId}
                onClick={handleEditShow}
              >
                View Details
              </button>
            </div>
          );
        },
      },
      {
        Header: "View Project",
        Cell: ({ cell }) => {
          return (
            <div className="featureViewTasks">
              <button
                type="submit"
                className="featureViewTasksButton"
                value={cell.row.original.projectId}
                onClick={() =>
                  navigate(`/projectstm/${cell.row.original.projectId}`)
                }
              >
                View Project
              </button>
            </div>
          );
        },
      },

      // {
      // id: 'expander', // 'id' is required
      // Cell: ({ row }) => (
      //   <span style={{transition:" all 2s"}}{...row.getToggleRowExpandedProps()}>
      //     {row.isExpanded ? '👇' : '👉'}
      //   </span>
      // )}
    ],
    []
  );

  return (
    <div>
      <TableContainer
        columns={columns}
        data={data}
        // renderRowSubComponent={renderRowSubComponent}
      />

      <div>
        <Modal
          className="addProfileModal"
          style={{ marginTop: "100px" }}
          fade={false}
          show={showEdit}
          onHide={handleEditClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleEditClose}>
              <GrClose />
            </div>
            <Modal.Title>Details of task assigned:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskForm handleClose={handleEditClose} taskId={taskId} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Table;
