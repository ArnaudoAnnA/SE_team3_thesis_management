import { Alert, Spinner, Card, Tabs, Tab } from 'react-bootstrap';
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

    const STATES = {LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready"};

    const [key, setKey] = useState(activeKey);
    const [applications, setApplications] = useState([]);
    const [state, setState] = useState(STATES.LOADING);

    useEffect(() => {

        async function fetchApplicationsByState(state){
            if(user.id){
                API.getApplicationsForStudent(state)
                .then((res) => {
                    if (res.error) {
                        console.log("Error in ApplicationsStudent/getApplicationsByState:" + res.error);
                        setState(STATES.ERROR);
                    } else {
                        setApplications(res);
                        setState(STATES.READY);
                    }
                })
                .catch(e => {
                                console.log("Error in ApplicationsStudent/getApplicationsByState:" + e);
                                setState(STATES.ERROR);
                            })
            }
        }

        setState(STATES.LOADING);
        if (key=="Pending") {
            fetchApplicationsByState("Pending");
        } else if (key=="Accepted") {
            fetchApplicationsByState("Accepted");
        } else {
            fetchApplicationsByState("Rejected");
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
                    <div className='mt-3'>
                        {state===STATES.LOADING ? <Spinner animation="border" role="status"/> : (
                            state===STATES.ERROR ? <Alert style={{textDecoration: "underline"}}> Some errors occurred </Alert> :
                                (applications.length == 0 ? <span style={{textDecoration: "underline"}}> You have no applications for this category </span> : 
                                    applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/>)
                                )
                            )
                        }
                    </div>
                </Tab>

                <Tab eventKey="Accepted" title="Accepted">
                    <div className='mt-3'>
                        {state===STATES.LOADING ? <Spinner animation="border" role="status"/> : (
                            state===STATES.ERROR ? <Alert style={{textDecoration: "underline"}}> Some errors occurred </Alert> :
                                (applications.length == 0 ? <span style={{textDecoration: "underline"}}> You have no applications for this category </span> : 
                                    applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/>)
                                )
                            )
                        }
                    </div>
                </Tab>

                <Tab eventKey="Rejected" title="Rejected">
                    <div className='mt-3'>
                        {state===STATES.LOADING ? <Spinner animation="border" role="status"/> : (
                                state===STATES.ERROR ? <Alert style={{textDecoration: "underline"}}> Some errors occurred </Alert> :
                                    (applications.length == 0 ? <span style={{textDecoration: "underline"}}> You have no applications for this category </span> : 
                                        applications.map((app) => <AppCard key={"" + app.studentId + " - " + app.thesisId} app={app} activeKey={key}/>)
                                    )
                            )
                            
                        }
                    </div>
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
        <Card className="text-center mb-3 mx-5 appCard">
            <Card.Header className="d-flex justify-content-between"> <span> {props.app.thesisType} </span> <span> <i className="bi bi-person-lines-fill"></i> {props.app.teacherName} {props.app.teacherSurname} </span></Card.Header>
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