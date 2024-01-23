import dayjs from 'dayjs';
import { Modal } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

function NotificationDetail(props) {

    const location = useLocation();

    return (
        <Modal
            show={props.modalOpen}
            onHide={() => props.setModalOpen(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title style={{ color: "#e65c00" }}>{props.notification.subject}</Modal.Title>
                <i className="bi bi-x h1 orangeClose" role="button" style={{ cursor: "pointer" }} onClick={() => props.setModalOpen(false)} ></i>
            </Modal.Header>
            <Modal.Body>
                <p>{ReactHtmlParser(props.notification.text)}</p>
                {props.notification.thesisId && <div className='d-flex justify-content-center'><br/><Link to={`/thesis/${props.notification.thesisId}`} className="btn blueButton" state={{nextpage: location.pathname}}> <span className='white'> See thesis details &nbsp; </span> <i className="bi bi-search white"></i> </Link></div>}
                {props.notification.applicationId && <div className='d-flex justify-content-center'><br/><Link to={`/applications/${props.notification.applicationId}/Pending`} className="btn blueButton" state={{nextpage: location.pathname}}> <span className='white'> See application detail &nbsp; </span> <i className="bi bi-search white"></i> </Link></div>}
                {props.notification.strId && <div className='d-flex justify-content-center'><br/><Link to={`/STRlist/${props.notification.strId}`} className="btn blueButton" state={{nextpage: location.pathname}}> <span className='white'> See thesis request details &nbsp; </span> <i className="bi bi-search white"></i> </Link></div>}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <p>From: {props.notification.from && `${props.notification.from.name} ${props.notification.from.surname}, ${props.notification.from.id}`}</p>
                <p>Date: {props.notification.date && dayjs(props.notification.date).format("MMMM DD, YYYY")} </p>
            </Modal.Footer>
        </Modal>
    );
}

export default NotificationDetail;