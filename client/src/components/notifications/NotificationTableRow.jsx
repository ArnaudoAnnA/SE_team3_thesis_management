function NotificationTableRow(props){
    return (
        <tr>
            <td>{props.notification.subject}</td>
            <td>{props.notification.date}</td>
        </tr>
    );
}

export default NotificationTableRow;