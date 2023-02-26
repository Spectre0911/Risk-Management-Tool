import React, { useEffect, useState, useMemo } from "react";
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

const Table = () => {
  var ReactCSSTransitionGroup = require("react-transition-group"); // ES5 with npm
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const body = await response.json();
      const contacts = [
        {
          featureId: "1",
          featureName: "Add sidebar",
          startTime: "12/11/2022",
          endTime: "30/02/2023",
          progress: 20,
          risk: 10,
        },
        {
          featureId: "2",
          featureName: "Add sidebar",
          startTime: "12/11/2022",
          endTime: "30/02/2023",
          progress: 20,
          risk: 10,
        },
      ];
      // console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const viewTasks = (e) => {
    // console.log(e.target.value);
  };

  const [showEdit, setShowEdit] = useState(false);
  const [featureId, setFeatureId] = useState(0);

  const handleEditClose = () => {
    setShowEdit(false);
  };
  const handleEditShow = (e) => {
    setFeatureId(e.target.value);
    setShowEdit(true);
  };

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => {
    setShowDelete(false);
  };
  const handleDeleteShow = (e) => {
    setFeatureId(e.target.value);
    setShowDelete(true);
  };

  const deleteFeature = (featureDeleteId) => {
    console.log("delete this");
    // console.log(featureId);
    setShowDelete(true);
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
        Header: "Feature name",
        accessor: "featureName",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Progress",
        accessor: "progress",
        filterable: false,
        disableFilters: true,
        filterable: false,
        Cell: ({ cell }) => {
          const percentage = cell.value;
          // console.log(percentage);
          return (
            <div className="progressDisplayContainer">
              <div className="progressNumber feature">2/3</div>
              <ProgressBar variant="danger" now={percentage} />
            </div>
          );
        },
      },
      {
        Header: "Start time",
        accessor: "startTime",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "End Time",
        accessor: "endTime",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Risk",
        accessor: "risk",
        filterable: false,
        disableFilters: true,
        filterable: false,
        Cell: ({ cell }) => {
          const percentage = cell.value;
          // console.log(percentage);
          return (
            <div className="projectCircularProgressBar">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={12}
              />
            </div>
          );
        },
      },
      {
        Header: "View Tasks",
        Cell: ({ cell }) => {
          // console.log(cell.row.original.featureId);
          return (
            <div className="featureViewTasks">
              <button
                type="submit"
                className="featureViewTasksButton"
                value={cell.row.original.featureId}
                onClick={() =>
                  navigate(`/viewtasks/${cell.row.original.featureId}`)
                }
              >
                View tasks
              </button>
            </div>
          );
        },
      },
      {
        Header: "Edit",
        Cell: ({ cell }) => {
          // console.log(cell.row.original.featureId);
          return (
            <div className="featureViewTasks">
              <button
                type="submit"
                className="featureEditButton"
                onClick={handleEditShow}
                value={cell.row.original.featureId}
              >
                <MdModeEditOutline />
              </button>
            </div>
          );
        },
      },
      {
        Header: "Delete",
        Cell: ({ cell }) => {
          // console.log(cell.row.original.featureId);
          return (
            <div className="featureViewTasks">
              <button
                type="submit"
                className="featureDeleteTasksButton"
                onClick={handleDeleteShow}
                value={cell.row.original.featureId}
              >
                <BsFillTrashFill />
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
            <Modal.Title>Edit Feature</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FeatureForm handleClose={handleEditClose} featureId={featureId} />
          </Modal.Body>
        </Modal>

        <Modal
          className="addProfileModal"
          style={{ marginTop: "200px" }}
          fade={false}
          show={showDelete}
          onHide={handleDeleteClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleDeleteClose}>
              <GrClose />
            </div>
            <Modal.Title>Delete Feature</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you would you would like to delete the feature?</p>
            <Box>
              <Button
                className="bugCancelButton"
                fullWidth
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
                style={{ marginLeft: "10px" }}
                onClick={deleteFeature}
              >
                {"Delete me"}
              </Button>

              <Button
                className="bugAddButton"
                fullWidth
                onClick={handleDeleteClose}
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
              >
                {"Cancel"}
              </Button>
            </Box>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Table;
