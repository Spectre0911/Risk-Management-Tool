import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {BsFillQuestionCircleFill} from 'react-icons/bs';
import {GrClose} from 'react-icons/gr';
import './Guide.css'
const images = [
  {
    title: 'Home Dashboard',
    src: 'https://picsum.photos/600/400?random=1',
    caption: <div><p>{`The first page you will view upon closing this guide is your home dashboard.On this dashboard, below the metric overviews, there is a "Project Summary" component, which details all the projects you are a part of.\nBeside this is your notifications, which will inform you of important information such as notifying users when they are added to a new project, or if there is increasing risk on a certain project.`}</p></div>,
  },
  {
    title: 'Creating a Project',
    src: 'https://picsum.photos/600/400?random=2',
    caption: <p>{`This is done by clicking the 'Create Project' button, located at the top of your Project Summary on the home dashboard.\nAs can be seen in the image, this brings up a form which requires the Project Manager to input some basic details about the project.\nBy choosing the required skills from the dropdown list, this will help facilitate the recommendation of team members once the project has been created.
There must be developers assigned to the project in order to create it, but these developers are able to be switched out with other ones during the project.`}</p>,
  },
  {
    title: 'Editing Profile',
    src: 'https://picsum.photos/600/400?random=3',
    caption: <p>{`By clicking your profile photo in the top right corner, you can edit your profile.\nBy doing so, you can change your name and email, as well as upload a profile photo and pick your technical skills from a dropdown menu.\nYou may also enter a biography to be displayed to your team members; it is recommended to do so, in order to facilitate greater team cohesion.`}</p>,
  },
  {
    title: 'Project Dashboard- Manager',
    src: 'https://picsum.photos/600/400?random=4',
    caption: <p>{`As Project Manager, the project dashboard provides an overview of all risk factors. At the top of this dashboard are graphs giving an overview of the technical metrics which will measure risk level in your project.\nBelow these graphs are the list of features in the project; from here, new features can be created.\nThe dashboard also displays a Gantt Chart, which displays a timetable of all project features and their dependencies. At the bottom of the Project Manager dashboard are small graphs that provide a glance into Github metrics and soft metrics; these can be clicked on for more detail`}</p>,
  },
  {
    title: 'Creating features & Gantt Chart',
    src: 'https://picsum.photos/600/400?random=5',
    caption: <p>{`New features can be added to the project by clicking the 'Add Feature' button on the Project Manager dashboard. When doing so, you are prompted to select any dependencies that the feature has; this means any features that must be completed prior to the new one being started.
By doing so, the new feature will only be allowed to be created if its start date is after the end date of its dependencies. From this, a topologically ordered Gantt Chart is created, which is the timetable for the project.`}</p>,
  },
  {
    title: 'Creating Tasks for features',
    src: 'https://picsum.photos/600/400?random=7',
    caption: <p>{`Each feature can have tasks added to it, in order to break down workload. This is done by pressing 'View Tasks' for a given feature on the dashboard.\nFrom this page, tasks can be added and assigned to a user via the 'Add Task' button. Below this is a list of all in progress and completed tasks, which can be marked as complete or updated from this page.`}</p>,
  },
  {
    title: 'Soft Metrics Overview',
    src: 'https://picsum.photos/600/400?random=6',
    caption: <p>{`This section gives a more detailed look into the soft metrics affecting your project, using the data gathered from developers. The line graph shows each of the 4 metrics over time, to illustrate how they've changed.\nBesides the graph, the notifications section allows the Project Manager to access any feedback that has been given through the forms.\nThe graphs below these components show the current score for each metric.`}</p>,
  },
  {
    title: 'Github Metrics Overview',
    src: 'https://picsum.photos/600/400?random=7',
    caption: <p>{`The graph at the top of this page illustrates all commits, colour coded in order to keep track of which developers could be falling behind on their designated tasks. Below this all commit messages are recorded.`}</p>,
  }, 
  {
    title: 'Developer Questionnaires',
    src: 'https://picsum.photos/600/400?random=8',
    caption: <p>{`At each project milestone, all developers will receieve a notification asking them to complete a questionnaire about the project. As shown in the image, all questions are on the Likert scale.`}</p>,
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
            style={{ maxWidth: '55%', maxHeight: '50vh' }}
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
