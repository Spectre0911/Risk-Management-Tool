import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TableContainer from './TableContainer';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';
import ChangingProgressProvider from './ChangingProgressProvider';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import FlipMove from "react-flip-move";
import {MdModeEditOutline} from 'react-icons/md';
import {BsFillTrashFill} from 'react-icons/bs';

const Table = () => {
  var ReactCSSTransitionGroup = require('react-transition-group'); // ES5 with npm
  
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const body = await response.json();
      const contacts = [{'featureId':'1','featureName':'Add sidebar', 'startTime':'12/11/2022', 'endTime':'30/02/2023', 'progress':20, 'risk':10},{'featureId':'2','featureName':'Add sidebar', 'startTime':'12/11/2022', 'endTime':'30/02/2023', 'progress':20, 'risk':10}];
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const viewTasks = (e) =>{
    console.log(e.target.value);
  }

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
        Header: 'Feature name',
        accessor: 'featureName',
        filterable: false,
        disableFilters:true,
        filterable: false,
      },
      {
        Header: 'Progress',
        accessor: 'progress',
        filterable: false,
        disableFilters:true,
        filterable: false,
        Cell: ({ cell }) => {
          const percentage = cell.value;
          console.log(percentage);
          return (
            <div className="progressDisplayContainer">
              <div className="progressNumber feature">
                2/3
              </div>
              <ProgressBar variant="danger" now={percentage} />
            </div>
          );
        },
      },
      {
        Header: 'Start time',
        accessor: 'startTime',
        filterable: false,
        disableFilters:true,
        filterable: false,
      },
      {
        Header: 'End Time',
        accessor: 'endTime',
        filterable: false,
        disableFilters:true,
        filterable: false,
      },
      {
        Header: 'Risk',
        accessor: 'risk',
        filterable: false,
        disableFilters:true,
        filterable: false,
        Cell: ({ cell }) => {
          const percentage = cell.value;
          console.log(percentage);
          return (
            <div className="projectCircularProgressBar">
               <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={12} />
            </div>
          );
        },
      },
      {
        Header: 'View Tasks',
        Cell: ({ cell }) => {
          console.log(cell.row.original.featureId);
          return (
            <div className="featureViewTasks">
               <button type="submit" className="featureViewTasksButton" value={cell.row.original.featureId} onClick={viewTasks}>View tasks</button>
            </div>
          );
        },
      },
      {
        Header: 'Edit',
        Cell: ({ cell }) => {
          console.log(cell.row.original.featureId);
          return (
            <div className="featureViewTasks">
               <button type="submit" className="featureEditButton" value={cell.row.original.featureId} onClick={viewTasks}>
                  <MdModeEditOutline/>
                </button>
            </div>
          );
        },
      },
      {
        Header: 'Delete',
        Cell: ({ cell }) => {
          console.log(cell.row.original.featureId);
          return (
            <div className="featureViewTasks">
               <button type="submit" className="featureDeleteTasksButton" value={cell.row.original.featureId} onClick={viewTasks}>
                <BsFillTrashFill/>
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
      <TableContainer
        columns={columns}
        data={data}
        // renderRowSubComponent={renderRowSubComponent}
      />
  );
};

export default Table;