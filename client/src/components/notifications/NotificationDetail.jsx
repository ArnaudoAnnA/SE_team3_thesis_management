import dayjs from 'dayjs';
import { Modal } from 'react-bootstrap';

function NotificationDetail(props) {

    return (
        <Modal
            show={props.modalOpen}
            onHide={() => props.setModalOpen(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title style={{ color: "#e65c00" }}>{props.notification.subject}</Modal.Title>
                <i className="bi bi-x h1 orangeClose" style={{ cursor: "pointer" }} onClick={() => props.setModalOpen(false)} ></i>
            </Modal.Header>
            <Modal.Body>
                <p>{props.notification.text}</p>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <p>From: {props.notification.from && `${props.notification.from.name} ${props.notification.from.surname}, ${props.notification.from.id}`}</p>
                <p>Date: {props.notification.date && dayjs(props.notification.date).format("MMMM DD, YYYY")} </p>
            </Modal.Footer>
        </Modal>
    );
}

export default NotificationDetail;