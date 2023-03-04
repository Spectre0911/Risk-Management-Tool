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
import TableContainer from "./ProjectTableContainer";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { SelectColumnFilter } from "./filters";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { AllProjects } from "../services/AllProjects";
import { useSelector } from "react-redux";
const ProjectTable = () => {
  const [data, setData] = useState([]);
  const email = useSelector((state) => state.email);

  const [contacts, setContacts] = useState([
    {
      projectId: "1",
      projectName: "cs261",
      projectManager: "Jane Arnold",
      deadline: "26/12/2022",
      closed: "false",
      progress: 20,
      risk: 10,
    },
    {
      projectId: "2",
      projectName: "cs261",
      projectManager: "Jane Arnold",
      deadline: "26/10/2022",
      closed: "false",
      progress: 20,
      risk: 10,
    },
  ]);
  useEffect(() => {
    const doFetch = async () => {
      AllProjects(email).then((data) => {
        const updatedContacts = data.map((item) => {
          return {
            projectId: item.projectid,
            projectName: item.projectname,
            projectManager: item.projectmanager,
            deadline: new Date(item.deadline).toLocaleDateString("en-GB"),
            closed: item.closed.toString(),
            progress: Math.floor(item.progress),
            risk: 0,
          };
        });
        setData(updatedContacts);
      });

      // console.log(contacts);
    };
    doFetch();
  }, []);

  const renderRowSubComponent = (row) => {
    const {
      name: { first, last },
      location: { city, street, postcode },
      picture,
      cell,
    } = row.original;
    return (
      <Card style={{ width: "18rem", margin: "0 auto" }}>
        <CardImg top src={picture.large} alt="Card image cap" />
        <CardBody>
          <CardTitle>
            <strong>{`${first} ${last}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {cell} <br />
            <strong>Address:</strong>{" "}
            {`${street.name} ${street.number} - ${postcode} - ${city}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "projectName",
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
              <div className="progressNumber">{percentage}</div>
              <ProgressBar variant="danger" now={percentage} />
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
      {
        Header: "Deadline",
        accessor: "deadline",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
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
    ],
    []
  );

  return (
    <TableContainer
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

export default ProjectTable;
