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
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';
import ChangingProgressProvider from './ChangingProgressProvider';
const Table = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const body = await response.json();
      const contacts = [{'projectName':'cs261', 'projectManager':'Jane Arnold', 'deadline':'26/10/2022', 'status':"ontime", 'progress':"20"},{'projectName':'cs261', 'projectManager':'Jane Arnold', 'deadline':'26/10/2022', 'status':"ontime", 'progress':"20"}];
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
        // disableSortBy: true,
        // Filter: SelectColumnFilter,
        // filter: 'equals',
        filterable: false,
        disableFilters:true,
        filterable: false,
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
        Header: 'Progress',
        accessor: 'progress',
        filterable: false,
        disableFilters:true,
        filterable: false,
        Cell: ({ cell }) => {
          const {percentage} = Number(cell);
          console.log(percentage);
          return (
            <div className="projectCircularProgressBar">
            <CircularProgressbar value={20} text={`${20}%`} strokeWidth={12} />
          </div>
          );
        },
      },
    //   {
    //     Header: 'Hemisphere',
    //     accessor: (values) => {
    //       const { latitude, longitude } = values.location.coordinates;
    //       const first = Number(latitude) > 0 ? 'N' : 'S';
    //       const second = Number(longitude) > 0 ? 'E' : 'W';
    //       return first + '/' + second;
    //     },
    //     disableSortBy: true,
    //     Filter: SelectColumnFilter,
    //     filter: 'equals',
    //     Cell: ({ cell }) => {
    //       const { value } = cell;

    //       const pickEmoji = (value) => {
    //         let first = value[0]; // N or S
    //         let second = value[2]; // E or W
    //         const options = ['⇖', '⇗', '⇙', 'p'];
    //         let num = first === 'N' ? 0 : 2;
    //         num = second === 'E' ? num + 1 : num;
    //         return options[num];
    //       };

    //       return (
    //         <div style={{ textAlign: 'center', fontSize: 18 }}>
    //           {pickEmoji(value)}
    //         </div>
    //       );
    //     },
    //   },
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