import React, { Component, useEffect, useState }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import {FaBell} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Formik, Form, Field } from "formik"; 
import {
    Box,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";
import { Octokit } from "octokit";
import "./index.css"
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { te } from 'date-fns/locale';
import { setDate } from 'date-fns';
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const GithubIntegrator = () => {
    const {projectId} = useParams();
    const [names, setNames] = useState([]);
    const [commitHistory, setCommitHistory] = useState([]);
    const [dates, setDates] = useState([]);
    const [dataset, setDataset] = useState([]);
    const colors = ['rgb(230, 25, 75)', 'rgb(60, 180, 75)', 'rgb(255, 225, 25)', 'rgb(0, 130, 200)', 'rgb(245, 130, 48)', 'rgb(145, 30, 180)', 'rgb(70, 240, 240)', 'rgb(240, 50, 230)', 'rgb(210, 245, 60)', 'rgb(250, 190, 212)', 'rgb(0, 128, 128)', 'rgb(220, 190, 255)', 'rgb(170, 110, 40)', 'rgb(255, 250, 200)', 'rgb(128, 0, 0)', 'rgb(170, 255, 195)', 'rgb(128, 128, 0)', 'rgb(255, 215, 180)', 'rgb(0, 0, 128)', 'rgb(128, 128, 128)', 'rgb(0, 0, 0)']

    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
          legend: {
            display: true,
            labels: {
              color: "rgb(0, 0, 0)",
              font: {
                family: "Montserrat", // Add your font here to change the font of your legend label
                size: "20px",
              }
            },
            tooltip: {
              bodyFont: {
                family: "Montserrat" // Add your font here to change the font of your tooltip body
              },
              titleFont: {
                family: "Montserrat" // Add your font here to change the font of your tooltip title
              }
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
                font: {
                    size: 20,
                }
            }
          },
          y: {
            stacked: true,
            ticks: {
                font: {
                    size: 20,
                }
            }
          },
        },
      };
      
      const [data, setData] = useState();

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
        var uniqueDates = [];
        for (var i=0; i<tempData.length; i++){
            var date = tempData[i]['commit']['author']['date'].split('T')[0];
            if (!uniqueDates.includes(date)){
                uniqueDates.push(date);
            }
        }
        uniqueDates.splice(-5);
        uniqueDates = fillDates(uniqueDates[uniqueDates.length-1],uniqueDates[0]);
        
        var uniqueContributors = [];
        for (var i=0; i<tempData.length; i++){
            if (!uniqueContributors.includes(tempData[i]['commit']['committer']['name'])){
                uniqueContributors.push(tempData[i]['commit']['committer']['name']);
            }
        }
        var index = uniqueContributors.indexOf('GitHub');
        if (index !== -1) {
            uniqueContributors.splice(index, 1);
        }
        let commitHistory = [];
        for (var i=0; i<uniqueContributors.length; i++){
            let devCommits = [];
            let currContrib = uniqueContributors[i];
            for (var a=0; a<uniqueDates.length; a++){
                let totalCommits = 0
                let currDate = uniqueDates[a];
                for (var b=0; b<tempData.length; b++){
                    if ((tempData[b]['commit']['committer']['name']==currContrib)
                        &&(tempData[b]['commit']['author']['date'].split('T')[0]==currDate)){
                            totalCommits+=1;
                        }
                }
                devCommits.push(totalCommits);
            }
            commitHistory.push(devCommits);
        }

        let tempDataset = [];
        console.log(uniqueContributors);
        for (var i=0; i<uniqueContributors.length; i++){
            
            let json = {
                label:uniqueContributors[i],
                data:commitHistory[i],
                backgroundColor: colors[i],
            }
            tempDataset.push(json);
        }
        setDataset(tempDataset);
        setData({
            labels:uniqueDates,
            datasets: tempDataset,
          });
    }, [tempData])
    
    function fillDates(start, end) {
        var output = [start];
        var date = new Date(start);
        var endDate = new Date(end);
    
        do {
            output.push(date.toISOString().split('T')[0]);
            date = new Date(date.getTime());
            date.setDate(date.getDate() + 1);
        } while (date < endDate);
    
        output.push(end);
        return output;
    }
    
    return (
        <div className='bugBox'>
            <div className="bugBoxTitle">
                <p>Git metrics: {projectId}</p>
            </div>
            <div style={{textAlign:"center", margin:'5%'}}>
                <p>Github commit tracking</p>
                {dataset.length!=0 && <Bar options={options} data={data} />}
            </div>
        </div>
    );
};

export default GithubIntegrator;