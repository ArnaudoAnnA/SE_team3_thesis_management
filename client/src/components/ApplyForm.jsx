import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert, Card, Button, Badge, Form, Col, Container, Row, Table } from 'react-bootstrap';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDropzone} from 'react-dropzone';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'

import API  from '../API';
import Application from '../models/Application';
import { userContext } from "./Utils";


function ApplyForm(props) {
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState();
  const [career, setCareer] = useState([]);
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState();

  const user = useContext(userContext);
  const {id} = useParams();
  const navigate = useNavigate();

  const onDrop = useCallback((files) => {
    handleOnChangeFile(files);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const successAlert = () => {
    Swal.fire({  
      title: 'Finished!',  
      text: 'Your apply request was sent',
      icon: 'success'
    });
    navigate(`/thesis/${id}`);
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
    if(app.status == 401){
        errorAlert(app);
        return;
    }
    
    if (app.status != 404) {
        errorAlert("You can't apply at the same thesis twice");
    } else {
        const application = new Application(null, user.id, Number(id), null, file, props.virtualDate, teacher.id, title);
                
        API.addApplication(application, teacher)
            .then(() => {
                successAlert()
            })
            .catch((e) => errorAlert(e))
    }
    

  }

  const handleOnChangeFile = (files) => {
    if (files.length===1) {
        if (files[0].name.endsWith("pdf") || files[0].name.endsWith("doc") || files[0].name.endsWith("docx")){
                        setFile(files[0]);
        }
        
        else
            setErrorMsg("We're sorry, but the file format you uploaded is not supported. Please make sure to upload the file in the correct format (.pdf, .doc, .docx)");
    } else 
        setErrorMsg("You cannot upload more than 1 file");
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
            <h3> {title || "Loading..."} </h3>
        </Row>
        <Row>
            <Col md={4}>
                <Link to={`/thesis/${id}`} className="btn blueButton"> <i className="bi bi-arrow-90deg-left white"></i> </Link>
            </Col>
            <Col md={4}>
            </Col>
            <Col className='d-flex justify-content-end' md={4}>
                    <p> 
                        {<>
                            <b>Teacher:</b> <Badge pill bg='secondary'>{teacher ? teacher.surname : "Loading..."} {teacher ? teacher.name : ""}</Badge>
                        </>}
                    </p>
            </Col>
        </Row>

        <Form className="mt-3" onSubmit={handleSubmit} >
            <Row>
                <Col md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control disabled type="text" required={true} defaultValue={user.name}/>
                    </Form.Group>
                </Col>
                <Col md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control disabled type="text" required={true} defaultValue={user.surname}/>
                    </Form.Group>
                </Col>
                <Col md={2}>
                <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control disabled type="text" required={true} defaultValue={user.gender}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control disabled type="text" required={true} defaultValue={user.nationality}/>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled type="text" required={true} defaultValue={user.email}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="text-center">
                <Container className='mt-5'>
                    <h5>Student Career</h5>
                    <StudentCareer exams={career} ></StudentCareer>
                </Container>
            </Row>
            <Row className="text-center">
                <Container className='mt-5'>
                    <h5>Upload your CV</h5>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} type="file" accept=".pdf, .doc, .docx" onChange={event => handleOnChangeFile(event.target.files)} />
                        <Card className='d-flex align-items-center dragDropArea'>
                            <Button variant='secondary' className='mt-3'>
                                {
                                    isDragActive ?
                                    "Drop the file here ..." :
                                    "Drag & drop the CV file here, or click to select it (.pdf, .doc, .docx)"
                                }
                            </Button>
                            <div className='my-3'>
                                {file && file.name}
                            </div>
                        </Card>
                    </div>
                </Container>
            </Row>
            <Row>
                <Container className='d-flex justify-content-center mt-5'>
                    <Button className="mb-3 blueButton" type="submit"> Send your application </Button>   
                </Container>
            </Row>
         </Form>
    </Container >
  );

}

ApplyForm.propTypes = {
    virtualDate: PropTypes.string.isRequired,
    exams: PropTypes.array
}

function StudentCareer(props) {
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

StudentCareer.propTypes = {
    exams: PropTypes.array
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

ExamRow.propTypes = {
    exam: PropTypes.object
  }



export {ApplyForm};