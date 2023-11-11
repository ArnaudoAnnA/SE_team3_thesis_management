//import { useContext } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert, Card, Button, Badge, Form, Col, Container, Row, Table } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDropzone} from 'react-dropzone';
import dayjs from 'dayjs';
import {career} from '../MOCKS';

import API  from '../API';


function ApplyForm(props) {

  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState();

  const onDrop = useCallback((files) => {
    handleOnChangeFile(files);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  useEffect(() => {
    //API to call for retrieving all the data about the student
  }, []);

  const handleSubmit = (event) => {

  }

  const handleOnChangeFile = (files) => {
    if (files.length===1) {
        if (files[0].name.endsWith("pdf") || files[0].name.endsWith("doc") || files[0].name.endsWith("docx"))
            setFile(files[0]);
        else
            setErrorMsg("We're sorry, but the file format you uploaded is not supported. Please make sure to upload the file in the correct format (.pdf, .doc, .docx)");
    } else 
        setErrorMsg("You cannot upload more than 1 file");
  }
  
  return (
    <Container fluid className="vh-100" >
        {errorMsg ? (
          <Alert
            style={{ width: "250px", marginLeft: "auto",marginRight: "auto", marginTop: "2vh" }}
            variant="danger"
            onClose={() => setErrorMsg('')}
            dismissible
          >
            {errorMsg}
          </Alert>
        ) : null}

        <Row className="text-center">
            <h3>Thesis title</h3>
        </Row>
        <Row>
            <Col md={8}>
            </Col>
            <Col className='d-flex justify-content-end' md={4}>
                    <p> 
                        <b>Teacher:</b> <Badge pill bg='secondary'>{props.data ? props.data.teacherName : "Loading..."} {props.data ? props.data.teacherSurname : ""}</Badge>
                    </p>
            </Col>
        </Row>

        <Form onSubmit={handleSubmit} >
            <Row>
                <Col md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control disabled type="text" required={true} value={"Salvo"}/>
                    </Form.Group>
                </Col>
                <Col md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control disabled type="text" required={true} value={"Acquaviva"}/>
                    </Form.Group>
                </Col>
                <Col md={2}>
                <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control disabled type="text" required={true} value={"Maschio"}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control disabled type="text" required={true} value={"Italiana"}/>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled type="text" required={true} value={"salvoacquaviva99@gmail.com"}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="text-center">
                <Container className='mt-5'>
                    <h5>Student Career</h5>
                    <StudentCareer exams={career}></StudentCareer>
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
                    <Button className="mb-3" variant="primary" type="submit"> Send your application </Button>   
                </Container>
            </Row>
         </Form>
    </Container >
  );

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
                <ExamRow key={exam.id} exam={exam}/>
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

export {ApplyForm};