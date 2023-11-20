//import { useContext } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert, Card, Button, Badge, Form, Col, Container, Row, Table } from 'react-bootstrap';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDropzone} from 'react-dropzone';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'

import API from "../../API";
import Application from '../../models/Application';
import { userContext } from '../Utils';


function BrowseForm(props) {
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState();
  const [career, setCareer] = useState([]);
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState();

  const user = useContext(userContext);
  const {id} = useParams();

  const onDrop = useCallback((files) => {
    handleOnChangeFile(files);
  }, [])


  const successAlert = () => {
    Swal.fire({  
      title: 'Finished!',  
      text: 'Your apply request was sent',
      icon: 'success'
    });
    return true;
  };
  
  const errorAlert = (e) => {
    Swal.fire({  
      title: 'Error!',  
      text: e,
      icon: 'error'
    });
    return false;
  };

  useEffect(() => {
    async function fetchCareer(){
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
    }

    fetchCareer();
    fetchThesisDetails();
    
  },[user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Checks
    const app = await API.getApplication(user.id, id);
    if((typeof app) == "string"){
        errorAlert(app);
        return;
    }
    console.log(app)

    if (app) {
        errorAlert("You can't apply at the same thesis twice");
    } else {
        const application = new Application(user.id, id, false, file, props.virtualDate);
        console.log(application)
        
        API.addApplication(application)
            .then(() => successAlert())
            .catch((e) => errorAlert(e))
    }
    

  }

  
  return (
    <Container fluid className="vh-100" >
        {errorMsg ? (
          <Alert id="applyAlert"
            style={{marginLeft: "auto",marginRight: "auto", marginTop: "2vh" }}
            variant="danger"
            onClose={() => setErrorMsg('')}
            dismissible
          >
            {errorMsg}
          </Alert>
        ) : null}

        <Row className="text-center mt-3">
            <h3> {title ? title : "Loading..."} </h3>
        </Row>
        <Row>
            <Col md={4}>
                <Link to={`/thesis/${id}`} className="btn blueButton"> <i className="bi bi-arrow-90deg-left white"></i> </Link>
            </Col>
            <Col md={4}>
            </Col>
        </Row>

          <div className='container'>
            <hr></hr>
              <Table>
                  <tbody>
                      <tr>
                          <td><h6>Name</h6></td>
                          <td>{user.name}</td>
                      </tr>
                      <tr>
                          <td><h6>Surname</h6></td>
                          <td>{user.surname}</td>
                      </tr>
                      <tr>
                          <td><h6>Gender</h6></td>
                          <td>{user.gender}</td>
                      </tr>
                      <tr>
                          <td><h6>Nationality</h6></td>
                          <td>{user.nationality}</td>
                      </tr>
                      <tr>
                          <td><h6>Email</h6></td>
                          <td>{user.email}</td>
                      </tr>
                  </tbody>
              </Table>

          </div>
          <Row>
                <Container className='d-flex justify-content-center mt-5'>  
                  <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                      <svg  style={{ height: '2vw', width: '2vw' }}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                      <span>Download CV</span>
                  </button>  
                </Container>
            </Row>
            <Row>
                <Container className='d-flex justify-content-center mt-5'>
                    <Button  type="submit"  style={{ marginRight: "3px"}}> Accept </Button>  
                    <Button  variant="warning"> Decline </Button>    
                </Container>
            </Row>
    </Container >
  );

}

function StudentCareer(props) {
    // console.log(props.id)
    if (props.exams.length === 0)
        return <p> There are no exams yet :( </p>
    else
        return <Table striped>
            <thead >
                    <tr>
                        <th scope="col">Course Title</th>
                        <th scope="col">CFU</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Date</th>
                    </tr>
            </thead>
            <tbody>
            {   
                
                props.exams.map((exam) =>
                    <ExamRow key={"" + exam.id + " - " + exam.codCourse} exam={exam}/>
                )
            }
            </tbody>
        </Table>
}

function ExamRow(props) {

    const formatWatchDate = (dayJsDate, format) => {
      return dayJsDate ? dayJsDate.format(format) : '';
    }
  
    return(
      <tr>
        <td> {props.exam.titleCourse} </td>
        <td> {props.exam.cfu} </td>
        <td> {props.exam.grade} </td>
        <td>
          <small>{formatWatchDate(dayjs(props.exam.date), 'MMMM D, YYYY')}</small>
        </td>
      </tr>
    );
}

export {BrowseForm};