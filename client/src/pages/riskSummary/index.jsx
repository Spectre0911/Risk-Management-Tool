import React, { Component, useEffect, useState } from 'react';
import DonutChart from '../projectDashboard/DonutChart';
import { useParams } from "react-router-dom";
import "./index.css";
import LineGraph from './Line';
import { useNavigate } from 'react-router-dom';
import HalfDonutChart from './HalfDonutChart';
const RiskSummary = () => {
    const navigate = useNavigate();
    const {projectId} = useParams();
    const labelsRisk = ['Team','Time','Code', 'Technical'];
    const dataRisk = [29,24,25,25,10];
    const borderColorRisk =['rgba(255,206,86,0.2)'];
    const backgroundColorRisk = [
        'rgba(232,211,6,1)',
        'rgba(54,162,235,1)',
        'rgba(255,159,64,1)',
        'rgba(255,129,64,1)'
    ];


    const labelsTeam = ['Team'];
    const dataTeam = [0.5,0.5];
    const borderColorTeam =['rgba(255,206,86,0.2)'];
    const backgroundColorTeam = [
        'rgba(232,99,132,1)','#dbe3de'
    ];


    const dates = ["12/12/12","12/1/12","12/1/12","12/1/12"];
    const values = [0.1, 0.2, 0.1, 0.4];
  return(
    <div className="main">
        <div className="grid">
        <p className="projectTitleId">Project number {projectId}</p>
        
        <div className="infoBox2 riskBox">
            <div className="metricTitle2">Current Risk Score</div>
            <div className="riskDonutContainer" style={{"marginTop":"30px"}}>
                <DonutChart chartData={dataRisk} labels={labelsRisk} border={borderColorRisk} backgroundColor={backgroundColorRisk} cutOut={99}
                />
                <div className="donutText risk">
                <p>7.8/10</p>
                </div>
            </div>
        </div>

        <div className="infoBox2 riskHistoryTrack">
          <div className="metricTitle2" style={{"marginBottom":"20px", "paddingTop":"7px"}}>
            Risk history
          </div>
            <LineGraph labels={dates} datavalues={values}/>
        </div>

        <div className="infoBox2 riskRecommendation">
          <div className="metricTitle2" style={{"marginBottom":"20px", "paddingTop":"7px"}}>
            Soft Skills Risk
          </div>
          <div className="riskDonutContainerSmaller" style={{"marginTop":"10px"}}>
            <HalfDonutChart chartData={dataTeam} labels={labelsTeam} border={borderColorTeam} backgroundColor={backgroundColorTeam} cutOut={60}/>
            <div className="riskText">
                <p className="riskTitle">
                    Recommendations:
                </p>
                <p className="riskDescription">
                    <b>- Increase quality of communication:</b> Your team is lacking in communication skills.
                </p>
            </div>
          </div>
        </div>

        <div className="infoBox2 riskRecommendation">
          <div className="metricTitle2" style={{"marginBottom":"20px", "paddingTop":"7px"}}>
            Code Quality Risk
          </div>
          <div className="riskDonutContainerSmaller" style={{"marginTop":"10px"}}>
            <HalfDonutChart chartData={dataTeam} labels={labelsTeam} border={borderColorTeam} backgroundColor={backgroundColorTeam} cutOut={60}/>
            <div className="riskText">
                <p className="riskTitle">
                    Recommendations:
                </p>
                <p className="riskDescription">
                    <b>- Increase quality of communication:</b> Your team is lacking in communication skills.
                </p>
            </div>
          </div>
        </div>

        <div className="infoBox2 riskRecommendation">
          <div className="metricTitle2" style={{"marginBottom":"20px", "paddingTop":"7px"}}>
            Technical Risk
          </div>
          <div className="riskDonutContainerSmaller" style={{"marginTop":"10px"}}>
            <HalfDonutChart chartData={dataTeam} labels={labelsTeam} border={borderColorTeam} backgroundColor={backgroundColorTeam} cutOut={60}/>
            <div className="riskText">
                <p className="riskTitle">
                    Recommendations:
                </p>
                <p className="riskDescription">
                    <b>- Increase quality of communication:</b> Your team is lacking in communication skills.
                </p>
            </div>
          </div>
        </div>

        <div className="infoBox2 riskRecommendation">
          <div className="metricTitle2" style={{"marginBottom":"20px", "paddingTop":"7px"}}>
            Team Risk
          </div>
          <div className="riskDonutContainerSmaller" style={{"marginTop":"10px"}}>
            <HalfDonutChart chartData={dataTeam} labels={labelsTeam} border={borderColorTeam} backgroundColor={backgroundColorTeam} cutOut={60}/>
            <div className="riskText">
                <p className="riskTitle">
                    Recommendations:
                </p>
                <p className="riskDescription">
                    <b>- Increase quality of communication:</b> Your team is lacking in communication skills.
                </p>
            </div>
          </div>
        </div>


      </div>
    </div>
    );
};

export default RiskSummary;

