/*
import { useDropzone} from 'react-dropzone';

import Application from '../models/Application';
import { userContext } from "./Utils";
*/
import { Alert, Card, Button, Nav, Form, Col, Container, Row, Table, Tabs, Tab } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from 'react';
import API  from '../../API';
import { userContext } from "../Utils";
import dayjs from 'dayjs';

let date = new dayjs();

const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
}

const returnedObject = {
    "studentId": "ciao",
    "accepted": "ciao",
    "thesisId": "ciao",
    "thesisTitle": "Leonardo",
    "thesisDescription": "ciao",
    "teacherName": "ciao",
    "teacherSurname": "Leonardo",
    "students": [{name: "Anna", surname: "Salvatore", date: date},{name: "Emilio", surname: "David", date: date}, {name: "Vincenzo", surname: "Davide", date: new dayjs()}],

  }

function ApplicationsProfessor(props) {

    const user = useContext(userContext);
    const location = useLocation();
    const activeKey = location.state?.activeKey || "Pending";
    const STATES = {LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready"};
    const [state, setState] = useState(STATES.LOADING);
    const [key, setKey] = useState(activeKey);
    const [applications, setApplications] = useState([]);



    

    useEffect(() => {

        setState(STATES.LOADING);
        /*async function fetchApplicationsByState(state){
            if(user.id){
                API.getApplicationsByState(state)
                .then((applications) => {
                    setApplications(applications);
                    setState(STATES.READY);
                    console.log(applications);
                })
                .catch(e => {console.log("Error in ApplicationsStudent/getApplicationsByState:" + e); setState(STATES.ERROR);});
            }
        }*/

        if (key=="Pending") {
            //fetchApplicationsByState("Pending");
            /* --------------MOCK (TO BE DELETED) -------------------*/
            let v = [
                { key: "unique_key_1", ...returnedObject },
                { key: "unique_key_2", ...returnedObject },
                { key: "unique_key_3", ...returnedObject },
                { key: "unique_key_4", ...returnedObject },
              ];
            v[0]= returnedObject;
            v[1]= returnedObject;
            v[2]= returnedObject;
            v[3]= returnedObject;
            setApplications(v);
            setState(STATES.READY); 
            /*--------------------------------------*/
        } else if (key=="Accepted") {
           // fetchApplicationsByState("Accepted");
        } else {
            //fetchApplicationsByState("Rejected");
        }

        //console.log("activeKey from ThesisDetail: " + activeKey);
        
    },[key]);
  
    return (
        <div className='mx-5'>
            {state != STATES.READY ? <Alert style={{textAlign: "center", width: "50%", marginLeft: "auto", marginRight: "auto"}}>{state}</Alert>: ""}
            <Tabs
                variant="pills"
                className="mt-3 tabElem"
                justify
                activeKey={key}
                onSelect={(k) => setKey(k)}
   
            >
                <Tab eventKey="Pending" title="Pending" style={{width: "70%", padding: "3%", backgroundColor: "white", marginTop:"2%", borderRadius: "6px", border:" 3px solid rgba(125, 123, 123, 0.42)", marginLeft: "auto", marginRight: "auto", marginBottom: "4%"}}>
                    <Table >
                        <tbody>
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan="3">You have no applications for this category</td>
                                </tr>
                            ) : (
                                applications.map((app) => <tr key={app.key}><AppTable app={app} activeKey={key} /></tr>)
                            )}
                        </tbody>

                    </Table>
                </Tab>

                <Tab eventKey="Accepted" title="Accepted" style={{width: "70%", padding: "3%", backgroundColor: "white", marginTop:"2%", borderRadius: "6px", border:" 3px solid rgba(125, 123, 123, 0.42)", marginLeft: "auto", marginRight: "auto", marginBottom: "4%"}}>
                <Table>
                        <tbody>
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan="3">You have no applications for this category</td>
                                </tr>
                            ) : (
                                applications.map((app) => <tr key={app.key}><AppTable app={app} activeKey={key} /></tr>)
                            )}
                        </tbody>

                    </Table>
                </Tab>

                <Tab eventKey="Rejected" title="Rejected" style={{width: "70%", padding: "3%", backgroundColor: "white", marginTop:"2%", borderRadius: "6px", border:" 3px solid rgba(125, 123, 123, 0.42)", marginLeft: "auto", marginRight: "auto", marginBottom: "4%"}}>
                <Table>
                        <tbody>
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan="3">You have no applications for this category</td>
                                </tr>
                            ) : (
                                applications.map((app) => <tr key={app.key}><AppTable app={app} activeKey={key} /></tr>)
                            )}
                        </tbody>

                    </Table>
                </Tab>
            </Tabs>
    </div>
  );

}

function AppTable(props) {

    const formatWatchDate = (dayJsDate, format) => {
        return dayJsDate ? dayJsDate.format(format) : '';
    }

    const location = useLocation();
    const [studName, setName] = useState();
    const [viewStudents, setViewStudents] = useState(false);
    const navigate = useNavigate()


    return (
            <>
                <h1> {returnedObject.thesisTitle}</h1>
                <p className= "text-info change-bg-on-hover" style={{textAlign: "start", cursor: "pointer", paddingLeft: "2%"}} onClick={(e) => setViewStudents((v) => !v)}>
                    {"View applications" + (viewStudents ? " ▽ " : " ▷")}
                </p>
                {viewStudents ? <Table hover style={{ width:"85%", borderBlockColor: "white", cursor: "pointer"}}>

                    <tbody>

                    {returnedObject.students.map(

                        (key, index) => (

                            <tr key={index} >
                                <td onClick={() => navigate(`/browse`)} style={{ verticalAlign: "middle" }}>
                                    <h5>{key.name}</h5>
                                </td>
                                <td onClick={() => navigate(`/browse`)} style={{ verticalAlign: "middle" }}>
                                    <h5>{key.surname}</h5>
                                </td>
                                <td onClick={() => navigate(`/browse`)} style={{ verticalAlign: "middle" }}>
                                    <p>Application Date: {formatWatchDate(key.date, 'YYYY-MM-DD')}</p>
                                </td>
                            </tr>

                        )

                    )}


                    </tbody>

                </Table> : ""} 
           
                <hr ></hr>
    

                </>
  
    );
}

export {ApplicationsProfessor};