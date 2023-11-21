import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert, Card, Button, Badge, Form, Col, Container, Row, Table } from 'react-bootstrap';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      title: 'Accepted!',  
      text: 'Your have accepted the application!',
      icon: 'success'
    });
    return true;
  };
  
  const errorAlert = (e) => {
    Swal.fire({  
      title: 'Declined!',  
      text: 'You have declined the application!',
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
                <Link to={`/thesis/${id}`} className="btn blueButton" style={{marginLeft: "4%"}}> <i className="bi bi-arrow-90deg-left white"></i> </Link>
            </Col>
            <Col md={4}>
            </Col>
        </Row>
      
          <div className='container'>
            <hr style={{width: "70%",  marginLeft: "auto", marginRight: "auto"}}></hr>
              <Table style={{ width: "70%", marginLeft: "auto", marginRight: "auto"}}>
                  <tbody>
                      <tr>
                          <td><h6>Name:</h6></td>
                          <td style={{textAlign: "center", fontStyle: "italic"}}>{user.name}</td>
                      </tr>
                      <tr>
                          <td><h6>Surname:</h6></td>
                          <td style={{textAlign: "center", fontStyle: "italic"}}>{user.surname}</td>
                      </tr>
                      <tr>
                          <td><h6>Gender:</h6></td>
                          <td style={{textAlign: "center", fontStyle: "italic"}}>{user.gender}</td>
                      </tr>
                      <tr>
                          <td><h6>Nationality:</h6></td>
                          <td style={{textAlign: "center", fontStyle: "italic"}}>{user.nationality}</td>
                      </tr>
                      <tr>
                          <td><h6>Email:</h6></td>
                          <td style={{textAlign: "center", fontStyle: "italic"}}>{user.email}</td>
                      </tr>
                  </tbody>
              </Table>

          </div>

          <Row className="text-center">
                <Container className='mt-5'>
                    <h5>Student Career</h5>
                    <StudentCareer exams={career} ></StudentCareer>
                </Container>
            </Row>
          <Row>
                <Container className='d-flex justify-content-center mt-1'>  
                  <Button variant="secondary" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                      <svg  style={{ height: '2vw', width: '2vw', marginRight: "8px" }}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                      <span>Download CV</span>
                  </Button>  
                </Container>
            </Row>
            <Row>
                <Container className='d-flex justify-content-center mt-5'style={{marginBottom: "3%"}}>
                    <Button  type="submit"  style={{ marginRight: "3px"}} onClick={() => successAlert()} > Accept </Button>  
                    <Button  variant="warning" onClick={(e) => errorAlert(e)}> Decline </Button>    
                </Container>
            </Row>

    </Container >
  );

}

function StudentCareer(props) {

    if (props.exams.length === 0)
        return <p> No Info Aviable <svg xmlns="http://www.w3.org/2000/svg" style={{marginBottom: "6px"}} width="5%" height="5%" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
      </svg></p>
        
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