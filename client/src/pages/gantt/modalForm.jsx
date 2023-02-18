import React, { Component, useState } from "react";
import GanttForm from "./ganttForm";
import { GrClose } from "react-icons/gr";
import Modal from "react-bootstrap/Modal";

const ModalForm = ({ addFeature }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOpen(isOpen);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    console.log(show);
  };
  const handleShow = () => {
    setShow(true);
    console.log(show);
  };

  return (
    <div>
      <div>
        <button onClick={handleShow}>Create Feature</button>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <div onClick={handleClose}>
              <GrClose />
            </div>
            <Modal.Title>Create Feature</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GanttForm handleClose={handleClose} addFeature={addFeature} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ModalForm;
