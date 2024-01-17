import dayjs from 'dayjs';
import {Modal, Button} from 'react-bootstrap';

function NotificationDetail(props){

    return (
        <div className="d-flex align-items-center modalNot" style={{flexWrap: "wrap", margin: "16px 0px", marginLeft: "12vw"}}>
        {props.modalOpen && 
            <Modal.Dialog style={{borderRadius: "20px", border:"solid", borderColor:"black", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"}}>
                <Modal.Header>
                    <Modal.Title style={{color: "#e65c00"}}>{props.notification.subject}</Modal.Title>
                    <i className="bi bi-x h1 orangeClose" style={{cursor:"pointer"}} onClick={() => props.setModalOpen(false)} ></i>
                </Modal.Header>

                <hr></hr>

                <Modal.Body>
                    <p>{props.notification.text}</p>
                </Modal.Body>

                <hr></hr>

                <Modal.Footer className='d-flex justify-content-between'>
                    <p>From: {props.notification.from && `${props.notification.from.name} ${props.notification.from.surname}, ${props.notification.from.id}`}</p>
                    <p>Date: {dayjs(props.notification.date).format("YYYY/MM/DD")} </p>
                </Modal.Footer>
            </Modal.Dialog>}
        </div>
    );
}

export default NotificationDetail;