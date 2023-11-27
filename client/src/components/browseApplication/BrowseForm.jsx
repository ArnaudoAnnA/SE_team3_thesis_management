import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert, Card, Button, Badge, Form, Col, Container, Row, Table, Spinner } from 'react-bootstrap';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import API from "../../API";
import Application from '../../models/Application';
import { userContext } from '../Utils';


function BrowseForm(props) {
  const [errorMsg, setErrorMsg] = useState('');
  const [cvPath, setCvPath] = useState();
  const [career, setCareer] = useState([]);
  const [title, setTitle] = useState('');
  const [student, setStudent] = useState();
  const [showSpinner, setShowSpinner] = useState(true);
  const { id } = useParams();


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
    async function fetchApplicationDetails(id) {

      API.getApplicationDetails(id)
        .then((res) => {
          console.log(res);
          
          setCareer(res.application.career);
          setTitle(res.application.title);
          setStudent(res.application.student);
          setCvPath(res.application.curriculum);
          setShowSpinner(false);
        })
        .catch(e => console.log("Error in ApplyForm/getApplicationDetails:" + e))


    }

    // async function fetchCareer() {
    //   if (user.id) {
    //     await API.retrieveCareer(id)
    //       .then((career) => {
    //         // console.log(career)
    //         career.sort((a, b) => {
    //           if (a.date && b.date) {
    //             return a.date.isAfter(b.date);
    //           }
    //           else if (!b.date)
    //             return -1;
    //           else {
    //             return 1;
    //           }
    //         });
    //         setCareer(career);
    //         setShowSpinner(false);
    //       })
    //       .catch(e => console.log("Error in ApplyForm/retrieveCareerAPI:" + e))
    //   }

    // }
    // async function fetchThesisDetails() {
    //   API.getTitleAndTeacher(id)
    //     .then((result) => {
    //       setTitle(result.title);
    //       setTeacher(result.teacher);
    //       setShowSpinner(false);
    //     })
    //     .catch(e => console.log("Error in ApplyForm/getTitleAndTeacher:" + e))
    // }

    // fetchCareer();
    // fetchThesisDetails();
    fetchApplicationDetails(id);

  },[]);


  return (
    <Container fluid className="vh-100" >
      {errorMsg ? (
        <Alert id="applyAlert"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "2vh" }}
          variant="danger"
          onClose={() => setErrorMsg('')}
          dismissible
        >
          {errorMsg}
        </Alert>
      ) : null}

      <Row className="text-center mt-3">
        <h1> {title ? title : "Loading..."} </h1>
      </Row>
      <Row>
        <Col md={4}>
          <Link to={`/applications`} className="btn blueButton" style={{ marginLeft: "4%" }}> <i className="bi bi-arrow-90deg-left white"></i> </Link>
        </Col>
        <Col md={4}>
        </Col>
      </Row>

      {showSpinner ? (<Spinner style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto", width: "140px", height: "140px" }} animation="border" role="status" />) : (
        <div className='container'>
          <hr style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}></hr>
          <Table style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
            <tbody>
              <tr>
                <td><h6>Name:</h6></td>
                <td style={{ textAlign: "center", fontStyle: "italic" }}>{student.name}</td>
              </tr>
              <tr>
                <td><h6>Surname:</h6></td>
                <td style={{ textAlign: "center", fontStyle: "italic" }}>{student.surname}</td>
              </tr>
              <tr>
                <td><h6>Gender:</h6></td>
                <td style={{ textAlign: "center", fontStyle: "italic" }}>{student.gender}</td>
              </tr>
              <tr>
                <td><h6>Nationality:</h6></td>
                <td style={{ textAlign: "center", fontStyle: "italic" }}>{student.nationality}</td>
              </tr>
              <tr>
                <td><h6>Email:</h6></td>
                <td style={{ textAlign: "center", fontStyle: "italic" }}>{student.email}</td>
              </tr>
            </tbody>
          </Table>

        </div>
      )}

      <>
        <Row className="text-center">
          <Container className='mt-5' style={{ width: '55%' }}>
            <h5 className='mb-5'>Student Career <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-graph-up-arrow" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
            </svg></h5>
            {showSpinner ? (
              <Spinner style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto", width: "140px", height: "140px" }} animation="border" role="status" />
            ) : (
              <StudentCareer exams={career}></StudentCareer>
            )}
          </Container>
        </Row>
        <Row>
          <Container className='d-flex  mt-1' style={{ width: '50%', height: '10%' }}>
            
            <Button variant="secondary" className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => API.getCVOfApplication(cvPath)}>
              <svg style={{ height: '2vw', width: '2vw', marginRight: "8px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              <span>Download CV</span>
            </Button>
          </Container>
        </Row>
        <Row>
          <Container className='d-flex justify-content-center mt-4' style={{ marginBottom: "3%" }}>
            {props.activeKey == 'Accepted' || props.activeKey == 'Rejected' && (
              <>
                <Button
                  type="submit"
                  className='brwbtt'
                  style={{
                    marginRight: "3px",
                    fontSize: "16px",
                    padding: "0.5% 2%"
                  }}
                  onClick={() => successAlert()}
                >
                  Accept
                </Button>
                <Button
                  variant="warning"
                  className='brwbtt'
                  style={{
                    fontSize: "16px",
                    padding: "0.5% 2%"
                  }}
                  onClick={(e) => errorAlert(e)}
                >
                  Decline
                </Button>
              </>
            )}

          </Container>
        </Row>
      </>

    </Container >
  );

}

function StudentCareer(props) {

  if (props.exams.length === 0)
    return <p> No Info Aviable <svg xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "6px" }} width="2%" height="2%" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
      <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
    </svg></p>

  else
    return <Table striped >
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
            <ExamRow key={"" + exam.id + " - " + exam.codCourse} exam={exam} />
          )
        }
      </tbody>
    </Table>
}

function ExamRow(props) {

  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
  }

  return (
    <tr>
      <td style={{ fontStyle: 'italic' }}> {props.exam.titleCourse} </td>
      <td> {props.exam.cfu} </td>
      <td> {props.exam.grade} </td>
      <td>
        <small>{formatWatchDate(dayjs(props.exam.date), 'MMMM D, YYYY')}</small>
      </td>
    </tr>
  );
}

export { BrowseForm };