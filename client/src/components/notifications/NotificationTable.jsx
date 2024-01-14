import { Table } from "react-bootstrap";
import NotificationTableRow from "./NotificationTableRow";

function NotificationTable(props){
    return (
        <Table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {props.notifications.map((notification) => (
                    <NotificationTableRow notification={notification} key={notification.id}/>
                ))}
            </tbody>
        </Table>
    );
}

export default NotificationTable;