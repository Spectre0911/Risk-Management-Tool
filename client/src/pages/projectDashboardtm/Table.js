import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
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

import { MdModeEditOutline } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import FeatureForm from "./FeatureForm";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TasksToCompletePID } from "../services/TasksToCompletePID";
const Table = ({ projectid }) => {
  var ReactCSSTransitionGroup = require("react-transition-group"); // ES5 with npm
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const login = useSelector((state) => state.email);
  const [tasks, setTasks] = useState([
    {
      taskId: "1",
      featureId: "1",
      taskPriority: "Core",
      featureName: "Dashboard",
      taskStatus: "Completed",
      taskName: "Add sidebar",
      startTime: "12/11/2022",
      endTime: "30/02/2023",
      daysLeft: "78",
    },
    {
      taskId: "2",
      featureId: "1",
      taskPriority: "Aesthetic",
      taskStatus: "In Progress",
      featureName: "Dashboard",
      taskName: "Add sidebar",
      startTime: "30/01/2022",
      endTime: "30/02/2023",
      daysLeft: "2",
    },
    {
      taskId: "3",
      featureId: "1",
      taskPriority: "Aesthetic",
      taskStatus: "Delayed",
      featureName: "Dashboard",
      taskName: "Add sidebar",
      daysLeft: "2",
    },
  ]);

  // useEffect(() => {
  //   TasksToCompletePID({ email: login.email, projectid: projectid }).then(
  //     (data) => {
  //       let newTasks = [];
  //       data.map((task) => {
  //         let newTask = {
  //           taskId: task.taskid.toString(),
  //           taskName: task.taskname,
  //           featureId: task.featureid.toString(),
  //           projectId: task.projectid.toString(),
  //           projectName: task.projectname,
  //           taskPriority: ["Core", "Optional", "Aesthetic"][task.priority - 1],
  //           taskStatus: "In Progress",
  //           featureName: task.featurename,
  //           daysLeft: task.daysleft,
  //         };
  //         newTasks.push(newTask);
  //       });
  //       setData(newTasks);
  //     }
  //   );
  // }, []);
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
        Header: "Mark as Complete",
        Cell: ({ cell }) => {
          if (cell.row.original.taskStatus != "Completed") {
            return (
              <div className="featureViewTasks">
                <button
                  type="submit"
                  className="featureCompleteTasksButton"
                  value={cell.row.original.taskId}
                  onClick={markTaskAsComplete}
                >
                  Complete task
                </button>
              </div>
            );
          }
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
        data={tasks}
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
            <FeatureForm handleClose={handleEditClose} taskId={taskId} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Table;
