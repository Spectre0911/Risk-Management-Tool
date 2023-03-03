import React from "react";
import PropTypes from "prop-types";
import "./ProfileCard.css";

const ProfileCard = ({ name, bio, image, skills }) => {
  return (
    <div className="card-container">
      <img className="round" src={image} alt={`${name}'s profile`} />
      <h3>{name}</h3>
      <p>{bio}</p>
      <div className="skills">
        <h6>Skills</h6>
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
};

export default ProfileCard;