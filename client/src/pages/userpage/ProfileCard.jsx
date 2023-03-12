import React from "react";
import PropTypes from "prop-types";
import "./ProfileCard.css";
import Button from "react-bootstrap/Button";
import "./index.jsx"
import { BsFillPlusCircleFill, BsFillXCircleFill } from "react-icons/bs";

const ProfileCard = ({ name, bio, image, skills, button, isPm }) => {
  return (
    <div className="card-container">
      {button}
      <img className="round" src={`http://localhost:5000/assets/${image}`} alt={`${name}'s profile`} />
      <h3 className="UserH3">{name}</h3>
      <p className="UserP">{bio}</p>
      <div className="skills">
        <h6 className="UserH6">Skills</h6>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  image: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMember: PropTypes.bool,
};

export default ProfileCard;
