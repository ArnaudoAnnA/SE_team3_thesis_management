import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ProposalModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title id="contained-modal-title-vcenter" className="warningText">
          <span><i className="bi bi-exclamation-triangle-fill"></i> Warning </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className='d-flex justify-content-center'>REMEMBER</h4>
        <p className='d-flex justify-content-center'>
         Do not add requests before talking to professor!
        </p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <Button className="blueButton" onClick={props.onHide}>Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ProposalModal };