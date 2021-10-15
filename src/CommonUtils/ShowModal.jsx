import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ShowModal(props) {
    const show = true;
    const question = props.question; 
    const handleDisableShowModal = props.handleDisableShowModal;
    const handleConfirn = props.handleConfirn;

  return (
    <>
      <Modal show={show} onHide={handleDisableShowModal}>
        <Modal.Header className="modal-look">
          <Modal.Title>Potwierdzenie</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-look">{question}</Modal.Body>
        <Modal.Footer className="justify-content-around modal-look">
          <Button variant="primary" onClick={handleConfirn}>
            TAK
          </Button>
          <Button variant="danger" onClick={handleDisableShowModal}>
            NIE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShowModal;