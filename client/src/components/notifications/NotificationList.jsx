import { useEffect, useState } from "react";
import NotificationTable from "./NotificationTable";
import { Alert, Container, Spinner } from 'react-bootstrap';
import API from "../../API";


function NotificationList(props){

    const STATES = {LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready"};

    const [notifications, setNotifications] = useState([]);
    const [state, setState] = useState(STATES.LOADING);

    useEffect(()=> {
        const fetchNotifications = async () => {
            try {
                const notificationsData = await API.getNotifications();
                setNotifications(notificationsData.notifications);
            } catch (err) {
                console.log(err);
            }
        }

        fetchNotifications()
        .then(() => {
            setState(STATES.READY);
        }).catch(() => {
            setState(STATES.ERROR);
        });
    }, []);

    return (
        <Container>
            <><hr size={10}/><h1>Notifications <i className="bi bi-bell-fill"></i></h1><hr /></>
            <div className="text-info">Number of notifications: {notifications.length}</div>
            <hr />
            
            {state === STATES.READY ? <>
                <NotificationTable notifications={notifications}/>
            </> : ( state===STATES.LOADING ? 
                  <Spinner animation="border" role="status"/> : 
                  <Alert style={{textDecoration: "underline"}}> Some errors occurred </Alert>)}
        </Container>
    );
}

export default NotificationList;