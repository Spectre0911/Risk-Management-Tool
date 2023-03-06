import React, {useState} from "react";
import {IoIosPersonAdd} from "react-icons/io";
import {GrClose} from "react-icons/gr";
import {Modal, Button} from "react-bootstrap";
import { Box } from "@mui/material";
import { BsFillXCircleFill } from 'react-icons/bs';
import {BsFillPlusCircleFill} from "react-icons/bs";
import Select from "react-select";
import "./index.css";
import "../projectDashboard/index.css";
import "../projectDashboard/index.jsx";
import ProfileCard from "./ProfileCard";

const UserPage = (isPm) => {

    const DeleteButton = ({ id, handleDeleteShow }) => {
    return (
        <div className="featureDeleteTasksButtonDiv">
          {console.log(isPm)}
        {isPm.isPm? <button
            type="submit"
            id={id}
            name={id}
            value={id}
            onClick={handleDeleteShow}
            className="featureDeleteTasksButton removeTeamMember"
            style={{width: "50%", position: "absolute", top: "-10px", right:0, left:"90%"}}
        >
            <BsFillXCircleFill />
        </button>: null}
        </div>
    );
    }

    const AddButton = ({ id, handleAddShow }) => {
        return (
            <button
            type="submit"
            id={id}
            name={id}
            value={id}
            onClick={handleAddUser}
            className="featureDeleteTasksButton addTeamMember"
            style={{width: "50%", position: "absolute", top: "20px", right:0, left:"90%"}}
            >
            <BsFillPlusCircleFill />
            </button>
        );
        }

    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [removeUserId, setRemoveUserId] = useState();
  
    const handleDeleteClose = () => {
      setShowDelete(false);
    };
    const handleDeleteShow = (e) => {
      setRemoveUserId(e.target.value);
      setShowDelete(true);
    };
  
    const handleAddClose = () => {
      setShowAdd(false);
    };

    const handleAddShow = (e) => {
      console.log("2dd");
      setShowAdd(true);
    };

    const handleAddUser = (e) => {
        console.log("2dd");
        setShowAddUser(true);
      };
    
    const handleAddUserClose = (e) => {
        console.log("2dd");
        setShowAddUser(false);
        };
  
    const deleteUser = (e) => {
      console.log("delete this");
      console.log(removeUserId);
      setShowDelete(false);
    };
  
    const addTeamMember = (e) => {
      console.log(teamMembersList);
    };
  
    const teamMembersOptions = [
      { value: "1", label: "Joshua" },
      { value: "2", label: "Morgan" },
      { value: "3", label: "Sanjula" },
    ];
  
    const [teamMembersList, setTeamMembersList] = useState([]);
    const handleTeamMemberChange = (e) => {
      setTeamMembersList(e);
    };

const teamMembers = [
    {
        id: "1",
        name:"Jane Arnold",
        image:"http://localhost:5000/assets/jane.jpg",
        bio:"I am a software engineer",
        skills:["Python","React"],
    },{ 
        id: "2",
        name:"Jane Arnold",
        image:"http://localhost:5000/assets/jane.jpg",
        bio:"I am a backend engineer",
        skills:["Python","Node","SQL"],
    }];

    const recommendedMembers = [
        {
            id: "1",
            name:"Jane Doe",
            image:"http://localhost:5000/assets/jane.jpg",
            bio:"I am a software engineer",
            skills:["Python","React"],
        },{ 
            id: "2",
            name:"John Smith",
            image:"http://localhost:5000/assets/jane.jpg",
            bio:"I am a backend engineer",
            skills:["Python","Node","SQL"],
        },{
            id: "3",
            name:"Jane Doe",
            image:"http://localhost:5000/assets/jane.jpg",
            bio:"I am a software engineer",
            skills:["Python","React"],
        }];

    return (
        <>
        <div className="spacer">
          <p className="projectTitleId">
            Team members
          </p>
          <div className="userContainer">
              <div className="userTitle">
                  <p>Current Team Members:</p>
              </div>
              <div>
                  {teamMembers.map((member) => {
                      return (
                          <div>
                          <ProfileCard
                              key={member.id}
                              name={member.name}
                              image={member.image}
                              bio={member.bio}
                              skills={member.skills}
                              isPm={isPm}
                              button={<DeleteButton id={member.id} handleDeleteShow={handleDeleteShow} />} />
                          </div>
                      );
                  })}
              </div>
          </div>
          {console.log(isPm.isPm)}
           {isPm.isPm? <div className="userContainer">
                      <p className="userTitle">Recommended Team Members:</p>
                      <button
                          onClick={handleAddShow}
                          className="projectFilterInput viewProject addFeatureButton"
                          style={{
                          height: "35px",
                          width: "40px",
                          padding: "0px",
                          position: "absolute",
                          right: "20px",
                          top: "40px",
                          }}
                      >
                          <IoIosPersonAdd />
                      </button>
                  <div>
                      {recommendedMembers.map((member) => {
                          return (
                              <div>
                              <ProfileCard
                                  key={member.id}
                                  name={member.name}
                                  image={member.image}
                                  bio={member.bio}
                                  skills={member.skills}
                                  button={<AddButton id={member.id} handleDeleteShow={handleAddUser} />} />
                              </div>
                          );
                      })}
                  </div>
              </div>: null}
          <Modal
          className="addProfileModal"
          style={{ marginTop: "200px" }}
          fade={false}
          show={showAdd}
          onHide={handleAddClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleAddClose}>
              <GrClose />
            </div>
            <Modal.Title>Add team member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please select the team member you would like to add:</p>
            <p
              style={{
                gridColumn: "span 1",
                margin: "auto",
                paddingRight: "2px",
              }}
            >
              Select team member:
            </p>
            <Select
              id="teamMembers"
              name="teamMembers"
              options={teamMembersOptions}
              onChange={handleTeamMemberChange}
              className="defineDependenciesBox"
              sx={{ gridColumn: "span 3", width: "70%" }}
              value={teamMembersList}
            />
            <Box>
              <Button
                className="bugCancelButton"
                fullWidth
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
                style={{ marginLeft: "10px" }}
                onClick={addTeamMember}
              >
                {"Add"}
              </Button>

              <Button
                className="bugAddButton"
                fullWidth
                onClick={handleDeleteClose}
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
              >
                {"Cancel"}
              </Button>
            </Box>
          </Modal.Body>
        </Modal>



        <Modal
          className="addProfileModal"
          style={{ marginTop: "200px" }}
          fade={false}
          show={showDelete}
          onHide={handleDeleteClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleDeleteClose}>
              <GrClose />
            </div>
            <Modal.Title>Remove team member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you would like to remove this user from the team?</p>
            <Box>
              <Button
                className="bugCancelButton"
                fullWidth
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
                style={{ marginLeft: "10px" }}
                onClick={deleteUser}
              >
                {"Remove"}
              </Button>

              <Button
                className="bugAddButton"
                fullWidth
                onClick={handleDeleteClose}
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
              >
                {"Cancel"}
              </Button>
            </Box>
          </Modal.Body>
        </Modal>

        <Modal
          className="addProfileModal"
          style={{ marginTop: "200px" }}
          fade={false}
          show={showAddUser}
          onHide={handleAddUserClose}
        >
          <Modal.Header>
            <div className="bugFormClose" onClick={handleDeleteClose}>
              <GrClose />
            </div>
            <Modal.Title>Add team member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you would like to add this user to the team?</p>
            <Box>
              <Button
                className="confirmButton"
                fullWidth
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
                style={{ marginLeft: "10px" }}
                onClick={addTeamMember}
              >
                {"Add"}
              </Button>

              <Button
                className="bugAddButton"
                fullWidth
                onClick={handleAddUserClose}
                sx={{
                  m: "2rem 1rem",
                  p: "1rem",
                }}
              >
                {"Cancel"}
              </Button>
            </Box>
          </Modal.Body>
        </Modal>
      </div>




    </>
    );
}

export default UserPage;