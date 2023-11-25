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

function ApplicationsStudent(props) {

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
                })
                .catch(e => console.log("Error in ApplicationsStudent/getApplicationsByState:" + e))
            }
        }

        if (key=="Pending") {
            fetchApplicationsByState("Pending");
        } else if (key=="Accepted") {
            fetchApplicationsByState("Accepted");
        } else {
            fetchApplicationsByState("Rejected");
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
                <Tab eventKey="Pending" title="Pending">
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/>)
                    }
                </Tab>

                <Tab eventKey="Accepted" title="Accepted">
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/>)
                    }
                </Tab>

                <Tab eventKey="Rejected" title="Rejected">
                    {applications.length == 0 ? "You have no applications for this category" : 
                        applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/>)
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
                <Link to={`/thesis/${props.app.thesisId}`} className="btn blueButton" state={{nextpage: location.pathname, activeKey: props.activeKey}}> <span className='white'> See thesis details &nbsp; </span> <i className="bi bi-search white"></i> </Link>
            </Card.Body>
            <Card.Footer className="text-muted text-end">Application Date: {formatWatchDate(dayjs(props.app.date), 'MMMM D, YYYY')}</Card.Footer>
        </Card>
    );
}

export {ApplicationsStudent};