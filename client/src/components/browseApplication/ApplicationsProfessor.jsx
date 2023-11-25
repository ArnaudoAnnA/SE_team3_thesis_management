/*
import { useDropzone} from 'react-dropzone';

import Application from '../models/Application';
import { userContext } from "./Utils";
*/
import { Alert, Card, Button, Nav, Form, Col, Container, Row, Table, Tabs, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
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
    "thesisTitle": "Stack App",
    "thesisDescription": "ciao",
    "teacherName": "ciao",
    "teacherSurname": "ciao",
    "students": [{name: "Anna", surname: "ciao", date: date},{name: "Emilio", surname: "ciao2", date: date}, {name: "Vincenzo", surname: "ciao3", date: new dayjs()}],

  }

function ApplicationsProfessor(props) {

    const user = useContext(userContext);
    const location = useLocation();
    const activeKey = location.state?.activeKey || "Pending";

    const [key, setKey] = useState(activeKey);
    const [applications, setApplications] = useState([]);



    

    useEffect(() => {

        async function fetchApplicationsByState(state){
            if(user.id){
                API.getApplicationsByState(state)
                .then((applications) => {
                    setApplications(applications);
                    console.log(applications)
                })
                .catch(e => console.log("Error in ApplicationsStudent/getApplicationsByState:" + e))
            }
        }

        if (key=="Pending") {
            //fetchApplicationsByState("Pending");
            let v = [];
            v[0]= returnedObject;
            v[1]= returnedObject;
            v[2]= returnedObject;
            v[3]= returnedObject;
            setApplications(v)
        } else if (key=="Accepted") {
           // fetchApplicationsByState("Accepted");
        } else {
            //fetchApplicationsByState("Rejected");
        }

        //console.log("activeKey from ThesisDetail: " + activeKey);
        
    },[key]);
  
    return (
        <div className='mx-5'>
            <Tabs
                variant="pills"
                className="mt-3 tabElem"
                justify
                activeKey={key}
                onSelect={(k) => setKey(k)}
   
            >
                <Tab eventKey="Pending" title="Pending" style={{width: "70%", padding: "3%", backgroundColor: "white", marginTop:"2%", borderRadius: "6px", border:" 3px solid rgba(125, 123, 123, 0.42)", marginLeft: "auto", marginRight: "auto"}}>
                    <Table>
                        <tbody>
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <tr><AppTable key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/></tr>)
                    }
                    </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="Accepted" title="Accepted" style={{width: "70%", padding: "3%", backgroundColor: "white", marginTop:"2%", borderRadius: "6px", border:" 3px solid rgba(125, 123, 123, 0.42)", marginLeft: "auto", marginRight: "auto"}}>
                <Table>
                        <tbody>
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <tr><AppTable key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/></tr>)
                    }
                     </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="Rejected" title="Rejected" style={{width: "70%", padding: "3%", backgroundColor: "white", marginTop:"2%", borderRadius: "6px", border:" 3px solid rgba(125, 123, 123, 0.42)", marginLeft: "auto", marginRight: "auto"}}>
                <Table>
                        <tbody>
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <tr><AppTable key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/></tr>)
                    }
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



    return (
 <>
                <h1> {returnedObject.thesisTitle}</h1>
                <p className= "text-info" style={{textAlign: "start"}} onClick={(e) => setViewStudents((v) => !v)}>
                    {"View applications" + (viewStudents ? " ▽ " : " ▷")}
                </p>
                {viewStudents ? <Table class= "prova" hover style={{flexDirection: "row", width:"85%", borderBlockColor: "white"}}>

                    <tbody>

                    {returnedObject.students.map(

                        key => (

                            <tr>

                                <td><h5> {key.name} </h5></td>
                                <td> <h5> {key.surname} </h5></td>
                                <td style={{marginLeft: "1px"}}><p> Application Date: {formatWatchDate(key.date, 'YYYY-MM-DD')} </p></td>
    

                            </tr>

                        )

                    )}


                    </tbody>

                </Table> : ""} 
                <hr></hr>

                </>
  
    );
}

export {ApplicationsProfessor};