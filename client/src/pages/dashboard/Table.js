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
const Table = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const body = await response.json();
      const contacts = [{'projectId':'1','projectName':'cs261', 'projectManager':'Jane Arnold', 'deadline':'26/10/2022', 'status':"ontime", 'progress':20, 'risk':10},{'projectId':'2', 'projectName':'cs261', 'projectManager':'Jane Arnold', 'deadline':'26/10/2022', 'status':"ontime", 'progress':20, 'risk':10}];
      console.log(contacts);
      setData(contacts);
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
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardImg top src={picture.large} alt='Card image cap' />
        <CardBody>
          <CardTitle>
            <strong>{`${first} ${last}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {cell} <br />
            <strong>Address:</strong>{' '}
            {`${street.name} ${street.number} - ${postcode} - ${city}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'projectName',
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
              <div className="progressNumber">
                {percentage}
              </div>
              <ProgressBar variant="danger" now={percentage} />
            </div>
          );
        },
      },
      {
        Header: 'Project Manager',
        accessor: 'projectManager',
        filterable: false,
        disableFilters:true,
        filterable: false,
      },
      {
        Header: 'Deadline',
        accessor: 'deadline',
        filterable: false,
        disableFilters:true,
        filterable: false,
      },
      {
        Header: 'Status',
        accessor: 'status',
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

export default Table;