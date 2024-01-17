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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Warning
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>REMEMBER</h4>
        <p>
         Do not add requests before talking to professor
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ProposalModal };