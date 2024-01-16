import { useEffect, useState } from "react";
import NotificationTable from "./NotificationTable";
import { Container } from 'react-bootstrap';
import API from "../../API";


function NotificationList(props){
    const [notifications, setNotifications] = useState([]);
    useEffect(()=> {
        const fetchNotifications = async () => {
            try {
                const notifications = await API.getNotifications();
                console.log(notifications);
                setNotifications(notifications);
            } catch (err) {
                console.log(err);
            }
        }
        fetchNotifications();
    }, []);

    return (
        <Container>
            <><hr size={10}/><h1>Notifications <i class="bi bi-bell-fill"></i></h1><hr /></>
            <div className="text-info">Number of notifications: {notifications.length}</div>
            <hr />
            <NotificationTable notifications={notifications}/>
        </Container>
    );
}

export default NotificationList;