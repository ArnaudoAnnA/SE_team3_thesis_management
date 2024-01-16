import { Table } from "react-bootstrap";

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
                    <td>{props.req.teacherId}</td>
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