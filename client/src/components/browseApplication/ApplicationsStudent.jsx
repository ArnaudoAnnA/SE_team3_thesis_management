/*
import { useDropzone} from 'react-dropzone';

import Application from '../models/Application';
import { userContext } from "./Utils";
*/
import { Alert, Card, Button, Nav, Form, Col, Container, Row, Table, Tabs, Tab } from 'react-bootstrap';
import { useParams, Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from 'react';
import API  from '../../API';
import dayjs from 'dayjs';

function ApplicationsStudent(props) {

  /*const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState();
  const [career, setCareer] = useState([]);
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState();

  const user = useContext(userContext);
  const {id} = useParams();
  */
    const mockApp = [
        {
          "studentId": "s789012",
          "accepted": true,
          "date": "2022-12-05T16:40:00.000Z",
          "thesisId": 0,
          "curriculum": null,
          "thesisTitle": "Instrumenting Kubernetes 5G services with eBPF probes",
          "thesisDescription": "Description for Thesis Proposal 1",
          "teacherName": "John",
          "teacherSurname": "Smith"
        },
        {
            "studentId": "s789012",
            "accepted": true,
            "date": "2022-12-05T16:40:00.000Z",
            "thesisId": 1,
            "curriculum": null,
            "thesisTitle": "Instrumenting Kubernetes 5G services with eBPF probes",
            "thesisDescription": "Description for Thesis Proposal 1",
            "teacherName": "John",
            "teacherSurname": "Smith"
        },
        {
            "studentId": "s789012",
            "accepted": true,
            "date": "2022-12-05T16:40:00.000Z",
            "thesisId": 2,
            "curriculum": null,
            "thesisTitle": "Instrumenting Kubernetes 5G services with eBPF probes",
            "thesisDescription": "Description for Thesis Proposal 1",
            "teacherName": "John",
            "teacherSurname": "Smith"
        },
        {
            "studentId": "s789012",
            "accepted": true,
            "date": "2022-12-05T16:40:00.000Z",
            "thesisId": 3,
            "curriculum": null,
            "thesisTitle": "Instrumenting Kubernetes 5G services with eBPF probes",
            "thesisDescription": "Description for Thesis Proposal 1",
            "teacherName": "John",
            "teacherSurname": "Smith"
        },
      ];

    const [key, setKey] = useState('Pending');
    const [applications, setApplications] = useState(mockApp);

    useEffect(() => {

        /*async function fetchCareer(){
            if(user.id){
                await API.retrieveCareer(user.id)
                .then((career) => {
                    // console.log(career)
                    career.sort((a,b) => {
                        if(a.date && b.date){
                            return a.date.isAfter(b.date);
                        }
                        else if(!b.date)
                            return -1;
                        else{
                            return 1;
                        }
                    });
                    setCareer(career);
                })
                .catch(e => console.log("Error in ApplyForm/retrieveCareerAPI:" + e))
            }
            
        }
        async function fetchThesisDetails(){
            API.getTitleAndTeacher(id)
            .then((result) => {
                setTitle(result.title);
                setTeacher(result.teacher);
            })
            .catch(e => console.log("Error in ApplyForm/getTitleAndTeacher:" + e))
        } */

        async function fetchPendingApp(){}
        async function fetchAcceptedApp(){}
        async function fetchRejectedApp(){}


        if (key=="Pending") {
            fetchPendingApp();
        } else if (key=="Accepted") {
            fetchAcceptedApp();
        } else {
            fetchRejectedApp();
        }
        
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
                <Tab eventKey="Pending" title="Pending">
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app}/>)
                    }
                </Tab>

                <Tab eventKey="Accepted" title="Accepted">
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app}/>)
                    }
                </Tab>

                <Tab eventKey="Rejected" title="Rejected">
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app}/>)
                    }
                </Tab>
            </Tabs>
    </div>
  );

}

function AppCard(props) {

    const formatWatchDate = (dayJsDate, format) => {
        return dayJsDate ? dayJsDate.format(format) : '';
    }

    const location = useLocation();

    return (
        <Card className="text-center mt-3 mx-5 appCard">
            <Card.Header className="text-end">{props.app.teacherName} {props.app.teacherSurname}</Card.Header>
            <Card.Body>
                <Card.Title>{props.app.thesisTitle}</Card.Title>
                <Card.Text>
                    {props.app.thesisDescription}
                </Card.Text>
                <Link to={`/thesis/${props.app.thesisId}`} className="btn blueButton" state={{nextpage: location.pathname}}> <span className='white'> See details &nbsp; </span> <i className="bi bi-search white"></i> </Link>
            </Card.Body>
            <Card.Footer className="text-muted text-end">Application Date: {formatWatchDate(dayjs(props.app.date), 'MMMM D, YYYY')}</Card.Footer>
        </Card>
    );
}

export {ApplicationsStudent};