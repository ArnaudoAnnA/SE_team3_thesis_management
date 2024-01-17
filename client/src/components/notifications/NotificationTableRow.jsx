import { useState } from 'react';
import NotificationDetail from './NotificationDetail';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function NotificationTableRow(props){

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <tr key={props.notification.id} onClick={() => setModalOpen(modalOpen ? false : true)}>
                <td>{props.notification.subject}</td>
                <td>{props.notification.date && dayjs(props.notification.date).format("YYYY/MM/DD")}</td>
                <td><Link className='text-info' style={{ width: "1px" }}>Details</Link></td>
                <td className='text-info' style={{ width: "1px" }}>▷</td>
            </tr>
            {modalOpen && <NotificationDetail notification={props.notification} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
        </>
    );
}

export default NotificationTableRow;