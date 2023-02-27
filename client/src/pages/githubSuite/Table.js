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
import { Octokit } from "octokit";
const Table = () => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const doFetch = async () => {
  //     const response = await fetch("https://randomuser.me/api/?results=100");
  //     const body = await response.json();
  //     const contacts = [
  //       {
  //         projectId: "1",
  //         projectName: "cs261",
  //         projectManager: "Jane Arnold",
  //         deadline: "26/10/2022",
  //         status: "ontime",
  //         progress: 20,
  //         risk: 10,
  //       },
  //       {
  //         projectId: "2",
  //         projectName: "cs261",
  //         projectManager: "Jane Arnold",
  //         deadline: "26/10/2022",
  //         status: "ontime",
  //         progress: 20,
  //         risk: 10,
  //       },
  //     ];
  //     // console.log(contacts);
  //     setData(contacts);
  //   };
  //   doFetch();
  // }, []);


  
  const owner = 'sanjula-hettiarachchige';
  const access_token = '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';
  const headers = {'Authorization':"Token "+access_token};

  const octokit = new Octokit({ 
    auth: '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',
  });
  const [tempData, setTempData] = useState([]);
  useEffect(() => {
    let fetchData = [];
    (async () => {
        try{
            const iterator = await octokit.paginate.iterator("GET /repos/{owner}/{repo}/commits", {
                owner: "Spectre0911",
                repo: "CS261",
                per_page:100,
            });
            for await (const {data} of iterator) {
                for (var i=0; i<data.length; i++){
                    fetchData = [...fetchData,data[i]];
                }
            }
            
            setTempData(fetchData);

        } catch (error) {
            if (error.response) {
            console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
            }
            console.error(error)
        }
        })();
    },[]);

    useEffect(() => {
        if (tempData.length==0){
            return;
        }
        console.log("This is in the table container");
        let copy = [];
        for (var i=0; i<tempData.length; i++){
          let temp = {
            name:tempData[i]['commit']['author']['name'],
            date: tempData[i]['commit']['author']['date'].split('T')[0],
            message: tempData[i]['commit']['message']
          }
          copy.push(temp);
        }
        setData(copy);
        console.log(data);
    }, [tempData])







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
        Header: "Name",
        accessor: "name",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: false,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Message",
        accessor: "message",
        filterable: false,
        disableFilters: true,
        filterable: false,
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
