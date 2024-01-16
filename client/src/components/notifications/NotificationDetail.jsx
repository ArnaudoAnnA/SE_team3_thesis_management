import dayjs from 'dayjs';
import {Modal, Button} from 'react-bootstrap';

function NotificationDetail(props){

    return (
        <div className="d-flex align-items-center" style={{margin: "16px 0px"}}>
        {props.modalOpen && 
            <Modal.Dialog style={{borderRadius: "20px", border:"solid", borderColor:"black", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"}}>
                <Modal.Header>
                    <Modal.Title style={{color: "#003576"}}>{props.notification.subject}</Modal.Title>
                    <i className="bi bi-x" onClick={() => props.setModalOpen(false)} style={{color:'black', cursor: "pointer"}} ></i>
                </Modal.Header>

                <hr></hr>

                <Modal.Body>
                    <p>{props.notification.text}</p>
                </Modal.Body>

                <hr></hr>

                <Modal.Footer className='d-flex justify-content-between'>
                    <p>Date: {dayjs(props.notification.date).format("YYYY/MM/DD")} </p>
                    <p>From: {props.notification.from && props.notification.from.name} {props.notification.from && props.notification.from.surname}</p>
                </Modal.Footer>
            </Modal.Dialog>}
        </div>
    );
}

export default NotificationDetail;