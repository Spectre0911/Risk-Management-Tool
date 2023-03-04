import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {AiOutlineWarning} from 'react-icons/ai'
import Table from '../dashboard/Table';
import "./index.css"
const Tasks = () => {
    


    return (
        <div className="main">
            <div className="grid">
                <div className="projectTitleId">Tasks</div>
                <div className="taskTable">  
                <div className="metricTitle2">Task Summary</div>                  
                    <Table />
                </div>
            </div>
        </div>
    );
};

export default Tasks;