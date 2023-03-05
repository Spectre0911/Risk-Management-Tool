import React from "react";
import PropTypes from "prop-types";
import "./ProfileCard.css";
import Button from "react-bootstrap/Button";
import { BsFillPlusCircleFill } from "react-icons/bs";

const ProfileCard = ({ name, bio, image, skills, isMember }) => {
  const buttonClassName = isMember ? "removeButton" : "addButton";
  return (
    <div className="card-container">
      <img className="round" src={image} alt={`${name}'s profile`} />
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
