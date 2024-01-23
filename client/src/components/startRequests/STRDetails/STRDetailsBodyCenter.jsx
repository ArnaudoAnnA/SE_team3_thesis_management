import { Table } from "react-bootstrap";

const renderCosupervisors = (cosupervisors) => {
    let key = 0;
    return cosupervisors.map(e => <span key={key++}>{e}{cosupervisors.length !== key+1 && ","} </span>);
}

function STRDetailsBodyCenter(props){
    return (
        <Table responsive >
            <tbody>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Description</td>
                    <td>{props.req.description}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Student</td>
                    <td>{props.req.student}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Teacher</td>
                    <td>{props.req.supervisor}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Co-Supervisors</td>
                    <td>{renderCosupervisors(props.req.coSupervisors)}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Type</td>
                    <td>{props.req.type}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Programme</td>
                    <td>{props.req.programmes}</td>
                </tr>
            </tbody>
        </Table>
    )
}
export default STRDetailsBodyCenter;