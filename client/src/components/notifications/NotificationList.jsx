import { useEffect, useState } from "react";
import NotificationTable from "./NotificationTable";
import API from "../../API";


function NotificationList(props){
    const [notifications, setNotifications] = useState([]);
    useEffect(()=> {
        const fetchNotifications = async () => {
            try {
                const notificationsData = await API.getNotifications();
                console.log(notificationsData);
                setNotifications(notificationsData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchNotifications();
    }, []);

    return (
        <div>
            <NotificationTable notifications={notifications}/>
        </div>
    );
}

export default NotificationList;