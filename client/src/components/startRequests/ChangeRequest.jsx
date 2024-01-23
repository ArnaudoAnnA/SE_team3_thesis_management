import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import API from '../../API';
import { BsCheck2Square } from "react-icons/bs";



function ChangeRequest() {

  const STATES = { LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready" };

  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(STATES.LOADING);
  const [advice, setAdvice] = useState('');

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [reqDate, setReqDate] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [type, setType] = useState('');
  const [programme, setProgramme] = useState('');
  const [student, setStudent] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [cosupervisors, setCosupervisors] = useState([]);

  const [titleSignal, setTitleSignal] = useState(false);
  const [typeSignal, setTypeSignal] = useState(false);
  const [descriptionSignal, setDescriptionSignal] = useState(false);
  const [cosupervisorsSignal, setCosupervisorsSignal] = useState(false);

  const successAlert = () => {
    Swal.fire({
      title: 'Request sent!',
      text: 'Your change request was sent',
      icon: 'success'
    });
    navigate(`/STRlist`);
  };

  const errorAlert = () => {
    Swal.fire({
      title: 'Error!',
      text: "An error occurred while sending the Change Request. Please try again later.",
      icon: 'error'
    });
    return false;
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const changeRequest = {
      titleSignal: titleSignal,
      typeSignal: typeSignal,
      descriptionSignal: descriptionSignal,
      cosupervisorsSignal: cosupervisorsSignal,
      advice: advice
    }

    API.teacherAcceptRejectChangeRequestSTR(id, "changeRequested", changeRequest)
      .then((res) => {
        if (!res.error) {
          successAlert();
        } else {
          console.error("Error in ChangeRequest/teacherAcceptRejectSTR_API:", res.error);
          errorAlert();
        }
      })
      .catch((error) => {
        console.error("Error in ChangeRequest/teacherAcceptRejectSTR_API:", error);
        errorAlert();
      });
  }

  const renderCosupervisors = (cosupervisors) => {
    let key = 0;
    return cosupervisors.map(e => <span key={key++}>{e}{cosupervisors.length !== key + 1 && ","} </span>);
  }

  useEffect(() => {

    API.getSTRWithId(id)
      .then((res) => {
        if (!res.error) {
          setTitle(res.STR.title);
          setDesc(res.STR.description);
          setReqDate(res.STR.requestDate);
          setApprovalDate(res.STR.approvalDate);
          setType(res.STR.type);
          setProgramme(res.STR.programmes);
          setStudent(res.STR.student);
          setSupervisor(res.STR.supervisor);
          setCosupervisors(res.STR.coSupervisors);

          setState(STATES.READY);
        } else {
          console.log("Error in ChangeRequest/getSTRWithId:" + res.error);
          setState(STATES.ERROR);
        }
      })
      .catch((e) => {
        console.log("Error in ChangeRequest/getSTRWithId:" + e);
        setState(STATES.ERROR);
      })

  }, []);

  return (
    <Container fluid className="vh-100" style={{ padding: "40px" }}>
      {
        state === STATES.READY ? <>
          <Row className="my-3">
            <Col md={5} className="ml-2">
              <Link to={`/STRlist/${id}`} className="btn blueButton btn-lg"> <i className="bi bi-arrow-90deg-left white"></i> </Link>
            </Col>
            <Col md={8}>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form onSubmit={handleSubmit} >

                <div className="container">

                  <div className="card bg-light cart" style={{ width: "60vw", marginLeft: "auto", marginRight: "auto" }}>
                    <article className="proposal-article" style={{ maxWidth: "85vw", paddingLeft: "30px", paddingRight: "30px" }}>

                      <h4 className="card-title mt-3 text-center">Change Request</h4>

                      <div style={{ marginTop:"1rem" }}> <span style={{ fontWeight: "bold" }}>Student: </span> <span> {student} </span> </div>
                      <div style={{ marginTop:"1rem" }}> <span style={{ fontWeight: "bold" }}>Supervisor: </span> <span> {supervisor} </span> </div>
                      <div style={{ marginTop:"1rem" }}> <span style={{ fontWeight: "bold" }}>Request Date: </span> <span> {dayjs(reqDate).format("YYYY/MM/DD")} </span> </div>
                      <div style={{ marginTop:"1rem"}}> <span style={{ fontWeight: "bold" }}>Secretary approval Date: </span> <span> {dayjs(approvalDate).format("YYYY/MM/DD")} </span> </div>
                      <div style={{ marginTop:"1rem", marginBottom: "3rem" }}> <span style={{ fontWeight: "bold" }}>Programmes: </span> <span> {programme} </span> </div>

                      <hr />
                      <p className="text-center" style={{ fontStyle: "italic" }}>Select what you want to be modified by the student:</p>

                      <div className="form-group input-group" style={{ marginTop: "2rem" }}>

                        <Col md={1} sm={2} xs={2} className="d-flex align-items-center">
                          <Form.Check type='switch' value={titleSignal} onClick={() => setTitleSignal(t => !t)} />
                        </Col>
                        <Col md={11} sm={9} xs={9}>
                          <span className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis title">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" }} width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg> <b>Title: </b> &nbsp;
                          </span>
                          <span>{title}</span>
                        </Col>
                      </div>

                      <hr />

                      <div className="form-group input-group" style={{ marginTop: "2px" }}>
                        <Col md={1} sm={2} xs={2} className="d-flex align-items-center">
                          <Form.Check type='switch' value={typeSignal} onClick={() => setTypeSignal(t => !t)} />
                        </Col>
                        <Col md={11} sm={9} xs={9}>
                          <span className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis type">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" }} width="16" height="16" fill="currentColor" className="bi bi-book-fill" viewBox="0 0 16 16">
                              <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                            </svg> <b>Type: </b> &nbsp;
                          </span>
                          <span>{type}</span>
                        </Col>
                      </div>

                      <hr />

                      <div className="form-group input-group" style={{ marginTop: "2px" }}>
                        <Col md={1} sm={2} xs={2} className="d-flex align-items-center">
                          <Form.Check type='switch' value={descriptionSignal} onClick={() => setDescriptionSignal(t => !t)} />
                        </Col>
                        <Col md={11} sm={9} xs={9}>
                          <span className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis description">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" }} width="16" height="16" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
                              <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                            </svg> <b>Description: </b> &nbsp;
                          </span>
                          <span>{desc}</span>
                        </Col>
                      </div>

                      <hr />

                      <div className="form-group input-group" style={{ marginTop: "2px" }}>
                        <Col md={1} sm={2} xs={2} className="d-flex align-items-center">
                          <Form.Check type='switch' value={cosupervisorsSignal} onClick={() => setCosupervisorsSignal(t => !t)} />
                        </Col>
                        <Col md={11} sm={9} xs={9}>
                          <span className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis Co-Supervisors">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" }} width="16" height="16" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                              <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                              <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                            </svg> <b>Co-Supervisors: </b> &nbsp;
                          </span>
                          <span>{renderCosupervisors(cosupervisors)}</span>
                        </Col>
                      </div>

                      <hr />

                      <div className="form-group input-group" style={{ display: "flex", marginTop: "2rem", flexDirection: "column", flexWrap: "wrap" }}>
                        <b style={{ /*paddingTop: "2px", marginBottom: "1px", */ marginLeft: "auto", marginRight: "auto", /*fontWeight: "300"*/ }} >Advice</b>
                        <textarea
                          style={{ fontSize: "15px", width: "100%", marginLeft: "auto", marginRight: "auto", borderRadius: "3px", fontStyle: "italic", paddingLeft: "5px", borderColor: "rgba(165, 165, 165, 0.42)" }}
                          value={advice}
                          onChange={(e) => setAdvice(e.target.value)}
                          rows="4"
                          cols="50"
                          placeholder="Write down some advice to the student here ..."
                        />
                      </div>

                      <div className="form-group" style={{ marginTop: "2vh", display: 'flex' }}>
                        <Button style={{ marginLeft: "auto", marginRight: "auto", width: "150px", marginBottom: '10px' }} type="submit" className="blueButton" onClick={handleSubmit}> Send Request </Button>
                      </div>

                    </article>
                  </div>

                </div>
              </Form>
            </Col>
          </Row>

        </> : (state === STATES.LOADING ?
          <Spinner animation="border" role="status" /> :
          <Alert style={{ textDecoration: "underline" }}> Some errors occurred </Alert>)
      }
    </Container>
  )
};

export { ChangeRequest };