import React, { Component }  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux"
import { useState } from 'react';
import "./index.css";
import Select from "react-select";

const EditProfile = () => {
    const options = [
        { value: 'Python', label: 'Python' },
        { value: 'Front-End', label: 'Front-End' },
        { value: 'Backend', label: 'Backend' },
        ];
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className='mainApp'>
            <div className='editProfileGrid'>
                <div className='editProfilePicContainer'>
                    <img className='editProfilePic' src="http://localhost:5000/assets/jane.jpg"></img>
                </div>

                <div className='editProfileDetails'>
                    <p className="editProfileName">Jane Arnold</p>
                    <p className="editProfileEmail">janearnold@warwick.ac.uk</p>
                    <Select
                        defaultValue={[selectedOption]}
                        isMulti
                        name="skills"
                        options={options}
                        className="editProfileSkills"
                        classNamePrefix="select"
                    />
                </div>

                <textarea className='editProfileTextArea' placeholder='Enter Bio' type="textarea" name="textValue" />
            </div>
        </div>
    );
};


export default EditProfile;