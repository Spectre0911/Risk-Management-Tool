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
import { AssignedProjects } from "../services/AssignedProject";
const Table = () => {
  var ReactCSSTransitionGroup = require("react-transition-group"); // ES5 with npm
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const login = useSelector((state) => state.email);

  const [contacts, setContacts] = useState([
    {
      projectId: "1",
      projectName: "CS261",
      projectManager: "Joshua Castelino",
      startTime: "12/11/2022",
      tasksToDo: "2",
      endTime: "30/02/2023",
      daysLeft: 2,
    },
    {
      projectId: "2",
      projectName: "CS139",
      projectManager: "Morgan Kippen",
      startTime: "22/01/2022",
      tasksToDo: "4",
      endTime: "30/02/2023",
      daysLeft: 35,
    },
    {
      projectId: "1",
      projectName: "CS261",
      projectManager: "Faye Warrington",
      startTime: "12/11/2022",
      tasksToDo: "2",
      endTime: "30/02/2023",
      daysLeft: 15,
    },
  ]);
  useEffect(() => {
    AssignedProjects({ email: login.email }).then((data) => {
      let newContacts = [];
      data.map((project) => {
        console.log("--------------------");
        console.log(project.projectid);
        let newProject = {
          projectId: project.projectid.toString(),
          projectName: project.projectname,
          projectManager: project.name,
          startTime: new Date(project.opened).toLocaleDateString("en-GB"),
          endTime: new Date(project.deadline).toLocaleDateString("en-GB"),
          tasksToDo: project.count.toString(),
          daysLeft: project.daysleft.toString(),
        };
        newContacts.push(newProject);
      });
      console.log("NEW CONTACT");
      console.log(newContacts);

      setContacts(newContacts);
    });
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
        Header: "Project Manager",
        accessor: "projectManager",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      // {
      //   Header: "Priority",
      //   accessor: "taskPriority",
      //   filterable: false,
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: ({ cell }) => {
      //     return (
      //       <div
      //         className={`taskPriority
      //           ${cell.row.original.taskPriority == `Core` ? "red" : ""}
      //           ${cell.row.original.taskPriority == `Aesthetic` ? "yellow" : ""}
      //           ${cell.row.original.taskPriority == `Optional` ? "green" : ""}
      //           `}
      //       >
      //         {cell.row.original.taskPriority}
      //       </div>
      //     );
      //   },
      // },
      // {
      //   Header: "Status",
      //   accessor: "taskStatus",
      //   filterable: false,
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: ({ cell }) => {
      //     return (
      //       <div
      //         className={`taskPriority
      //           ${cell.row.original.taskStatus == `Delayed` ? "red" : ""}
      //           ${cell.row.original.taskStatus == `In Progress` ? "yellow" : ""}
      //           ${cell.row.original.taskStatus == `Completed` ? "green" : ""}
      //           `}
      //       >
      //         {cell.row.original.taskStatus}
      //       </div>
      //     );
      //   },
      // },
      {
        Header: "Tasks assigned",
        accessor: "tasksToDo",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Days Left",
        accessor: "daysLeft",
        filterable: false,
        disableFilters: true,
        filterable: false,
        Cell: ({ cell }) => {
          return (
            <div
              className={`taskPriority 
              ${cell.row.original.daysLeft > 20 ? "green" : ""}
              ${cell.row.original.daysLeft < 5 ? "red" : ""}
              ${cell.row.original.daysLeft > 6 ? "yellow" : ""}
              
              
              
                `}
            >
              {cell.row.original.daysLeft}
            </div>
          );
        },
      },
      {
        Header: "Project Start Time",
        accessor: "startTime",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Project End Time",
        accessor: "endTime",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      // {
      //   Header: "View Details",
      //   Cell: ({ cell }) => {
      //     return (
      //       <div className="featureViewTasks">
      //         <button
      //           type="submit"
      //           className="featureViewTasksButton"
      //           value={cell.row.original.featureId}
      //           onClick={handleEditShow}
      //         >
      //           View Details
      //         </button>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   Header: "View Project",
      //   Cell: ({ cell }) => {
      //     return (
      //       <div className="featureViewTasks">
      //         <button
      //           type="submit"
      //           className="featureViewTasksButton"
      //           value={cell.row.original.projectId}
      //           onClick={() =>
      //             navigate(`/projectstm/${cell.row.original.projectId}`)
      //           }
      //         >
      //           View Project
      //         </button>
      //       </div>
      //     );
      //   },
      // },

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
        data={contacts}
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
