import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {BsFillQuestionCircleFill} from 'react-icons/bs';
import {GrClose} from 'react-icons/gr';
import './Guide.css'
const images = [
  {
    title: 'Home Dashboard',
    src: "/assets/images/homeDashboard.png",
    caption: <div>
      <p style={{ whiteSpace: "pre-line" }}>
        {`The first page you will view upon closing this guide is your home dashboard.`}
      <ul>
        <li>On this dashboard there is a "Project Summary" component, which details all the projects you manage.</li>
        <ul><li>Next to this is your managed project notifications, which will inform you of important information, such as when there is increasing risk on a certain project.</li></ul>
        <li>Below these components is the task summary, which summarises all of your assigned tasks for the projects you are developing</li>
        <ul><li>Ensure you pay attention to the notifications for these projects too</li></ul>
      </ul>
    </p>
  </div>,
  },
  {
    title: 'Creating a Project',
    src: '/assets/images/createProject.png',
    caption: <div>
    <p style={{whiteSpace:"pre-line"}}>{`This is done by clicking the 'Create Project' button, located at the top of your Project Summary on the home dashboard.`}
    <ul>
      <li>As can be seen in the image, this brings up a form which requires the Project Manager to input some basic details about the project.</li>
      <li>By choosing the required skills from the dropdown list, this will help facilitate the recommendation of team members once the project has been created.</li>
      <li>There must be developers assigned to the project in order to create it, but these developers can be switched out with others during the project.</li>
    </ul>
  </p>
  </div>,
  },
  {
    title: 'Editing Profile',
    src: '/assets/images/editProfile.png',
    caption: <div>
      <p style={{whiteSpace:"pre-line"}}>{`By clicking your profile photo in the top right corner, you can edit your profile.`}
      <ul>
        <li>Here it is possible to change your name and email, as well as upload a profile photo and pick your technical skills from a dropdown menu.</li>
        <li>You may also enter a biography to be displayed to your team members</li>
        <ul><li>It is recommended to do so, in order to facilitate greater team cohesion.</li></ul>
      </ul>
      </p>
    </div>,
  },
  {
    title: 'Project Dashboard- Manager',
    src: '/assets/images/PMdashboard.png',
    caption: <div>
      <p>{`As PM, the project dashboard provides an overview of all risk factors.`}
      <ul>
        <li>At the top of this dashboard are graphs giving an overview of the technical metrics which will measure risk level in your project.</li>
        <li>Below these graphs are the list of features in the project; from here, new features can be created- as explained in the following guide page</li>
        <li>The dashboard also displays a Gantt Chart, which displays a timetable of all project features and their dependencies.</li>
        <li>At the bottom of the Project Manager dashboard are small graphs that provide a glance into Github metrics and soft metrics; these can be clicked on for more detail</li>
      </ul>
      </p>
    </div>,
  },
  {
    title: 'Creating features & Gantt Chart',
    src: '/assets/images/createFeature.png',
    caption:<div>
    <p>
      {`New features can be added to the project by clicking the 'Add Feature' button on the Project Manager dashboard.`}
      <ul>
        <li>When doing so, you are prompted to select any dependencies that the feature has; this means any features that must be completed prior to the new one being started.</li>
        <li>By doing so, the new feature will only be allowed to be created if its start date is after the end date of its dependencies, to ensure your deadlines match up.</li>
        <li>From this, a topologically ordered Gantt Chart is created, which is the timetable for the project.</li>
      </ul>
    </p>
  </div>,
  },
  {
    title: 'Creating Tasks for features',
    src: '/assets/images/createTask.png',
    caption:<div>
    <p>
      {`Each feature can have tasks added to it, in order to break down workload. This is done by pressing 'View Tasks' for a given feature on the dashboard.`}</p>
      <ul>
        <li>From this page, tasks can be added and assigned to a user via the 'Add Task' button.</li>
        <li>Below this is a list of all in progress and completed tasks, which can be marked as complete or updated from this page.</li>
      </ul>
    </div>,
  },
  {
    title: 'Soft Metrics Overview',
    src: '/assets/images/softMetrics.png',
    caption:<div>
     <p>
      {`This section gives a more detailed look into the soft metrics affecting your project, using the data gathered from developers.`}
      <ul>
        <li>The line graph shows each of the 4 metrics over time, to illustrate how they've changed.</li>
        <li>Besides the graph, the notifications section allows the Project Manager to access any feedback that has been given through the forms.</li>
        <li>The graphs below these components show the current score for each metric based off of the most recent developer questionnaire</li>
      </ul>
     </p>
     </div>,
  },
  {
    title: 'Github Metrics Overview',
    src: '/assets/images/gitMetrics.png',
    caption:<div>
    <p>{`This page takes its information directly from the project's Github repository`}</p>
    <ul>
      <li>The graph at the top of this page illustrates all commits, colour coded in order to keep track of which developers could be falling behind on their designated tasks.</li>
      <li>Below this is a table which displays all commit messages from the most recent first.</li>
    </ul>
    </div>,
  }, 
  {
    title: 'Project Dashboard- Developer',
    src: '/assets/images/TMdashboard.png',
    caption: <div>
      <p>{`The developer dashboard is similar to the Project Manager dashboard, but with the majority of the risk information removed.`}
      <ul>
        <li>Next to the graphs displaying project metrics is a component informing of the last time you filled out a milestone form, and a button to the next one if it's available</li>
        <li>Below this is a table displaying all of your assigned tasks for the project, as well as their priority: Core, Optional or Aesthetic.</li>
          <ul><li>Pay attention to this priority when choosing which task to work on</li></ul>
          <ul><li>Tasks can be ticked off and removed using the "Complete Task" button.</li></ul>
      </ul>
      </p>
    </div>,
  },
  {
    title: 'Developer Questionnaires',
    src: '/assets/images/devForm.png',
    caption: <div>
      <p>{`At each project milestone, all developers will receieve a notification asking them to complete a questionnaire about the project.`}
      <ul>
        <li>As shown in the image, all questions are on the Likert scale, meaning that they are rated on a scale of 1 to 5, where 5 is completely agreeing with the given statement</li>
        <li>At the end of the form, non-anonymous feedback can be entered in a text field, which will be read by the project manager</li>
        <li>These questionnaires are used to gather data on the project's soft metrics, which are used to calculate the risk level of the project.</li>
      </ul>
      </p>
    </div>,
  },
];

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const Guide = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(0);

  const openModal = () => {
    setModalIsOpen(true);
    console.log(modalIsOpen);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextPage = () => {
    setPage((page + 1) % images.length);
  };

  const prevPage = () => {
    setPage((page + images.length - 1) % images.length);
  };

const handleKeyDown = (event) => {
  if (event.key === 'ArrowLeft') {
    // left arrow key
    prevPage();
  } else if (event.key === 'ArrowRight') {
    // right arrow key
    nextPage();
  }
};

  return (
    <>
      <button onClick={openModal} className="helpButton featureViewTasksButton">?</button>
      <Modal
        className="guideModal"
        show={modalIsOpen}
        onHide={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        onKeyDown={handleKeyDown}
      >
        <Modal.Header>
          <div className="bugFormClose" onClick={closeModal}>
              <GrClose />
          </div>
          <Modal.Title>Guide</Modal.Title>
        </Modal.Header>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color:'#243f8a' }}>
          <p className="guideTitle">{images[page].title}</p>
          <hr />
          <img
            className="guideImage"
            src={images[page].src}
            alt={images[page].caption}
            style={{ maxWidth: '65%', maxHeight: '50vh' }}
          />
          <p className="guideCaption" style={{fontSize:'15px', textAlign: 'left', maxWidth:'80%'}}>{images[page].caption}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position:"absolute", bottom:"20px" }}>
            <button className="arrowButtonLeft featureViewTasksButton" onClick={prevPage}>&lt;</button>
            <button className="arrowButtonRight featureViewTasksButton" onClick={nextPage}>&gt;</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Guide;
