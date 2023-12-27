import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import API from '../../API';



function ChangeRequest() {

  const STATES = {LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready"};

  const {id} = useParams();

  const [state, setState] = useState(STATES.LOADING);
  const [advice, setAdvice] = useState('');
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [reqDate, setReqDate] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [type, setType] = useState('');
  const [programme, setProgramme] = useState('');
  const [notes, setNotes] = useState('');
  const [student, setStudent] = useState('');
  const [supervisor, setSupervisor] = useState('');

  const successAlert = () => {
    Swal.fire({  
      title: 'Request sent!',  
      text: 'Your change request was sent',
      icon: 'success'
    });
    navigate(`/STRlist/${id}`);
  };
  
  const errorAlert = (e) => {
    Swal.fire({  
      title: 'Error!',  
      text: e,
      icon: 'error'
    });
    return false;
  };

  const handleSubmit = () => {

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
          setNotes(res.STR.notes);
          setStudent(res.STR.student);
          setSupervisor(res.STR.supervisor);

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
    <Container fluid className="vh-100" style={{padding: "40px"}}>
      {
        state === STATES.READY ? <>
          <Row className="my-3">
            <Col md={5} className="ml-2">
              <Link to={`/STRlist`} className="btn blueButton btn-lg"> <i className="bi bi-arrow-90deg-left white"></i> </Link>
            </Col>
            <Col md={8}>
            </Col>
          </Row>

          <Row>
            <Col md={3} className="d-flex align-items-center">
              <div>
                <div style={{fontSize: "20px"}}> <span style={{fontWeight: "bold"}}>Student: </span> <span> {student} </span> </div>
                <div style={{marginTop: "5rem", fontSize: "20px"}}> <span style={{fontWeight: "bold"}}>Supervisor: </span> <span> {supervisor} </span> </div>
                <div style={{marginTop: "5rem", fontSize: "20px"}}> <span style={{fontWeight: "bold"}}>Request Date: </span> <span> {reqDate} </span> </div>
                <div style={{marginTop: "5rem", fontSize: "20px"}}> <span style={{fontWeight: "bold"}}>Approval Date: </span> <span> {approvalDate} </span> </div>
              </div>
            </Col>

            <Col md={9}>
              <Form onSubmit={handleSubmit} >
                
                <div className="container" style={{marginBottom: "20px"}}>
        
                      <div className="card bg-light cart" style={{ width: "45vw", marginLeft: "auto",marginRight: "auto" }}>
                        <article className="proposal-article" style={{maxWidth: "85vw", paddingLeft: "30px", paddingRight: "30px"}}>

                          <h4 className="card-title mt-3 text-center">Change Request</h4>
                          <p className="text-center" style={{fontStyle: "italic"}}>Select what you want to be modified by the student</p>

                          <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                            <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis title">
                              <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" }} width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg> <b>Title: </b> &nbsp;
                            </div>
                            <p>{title}</p>
                          </div>

                          <hr/>

                          <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                            <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis type">
                              <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" className="bi bi-book-fill" viewBox="0 0 16 16">
                                <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                              </svg> <b>Type: </b> &nbsp;
                            </div>
                            <p>{type}</p>
                          </div>

                          <hr/>

                          <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                            <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis description">
                              <b>Description: </b> &nbsp;
                            </div>
                            <p>{desc}</p>
                          </div>

                          <hr/>

                          <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                            <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis programmes">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" className="bi bi-person-video3" viewBox="0 0 16 16">
                              <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
                              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
                          </svg> <b>Programmes: </b> &nbsp;
                            </div>
                            <p>{programme}</p>
                          </div>

                          {notes ? 
                          <>
                            <hr/>
                            <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                              <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Notes">
                                <b>Notes: </b> &nbsp;
                              </div>
                              <p>{notes}</p>
                            </div> 
                          </> : ""}

                          <div className="form-group input-group" style={{display: "flex", marginBottom: "2px", flexDirection: "column", flexWrap: "wrap"}}>
                            <p style={{ paddingTop: "2px", marginBottom: "1px", marginLeft: "auto", marginRight: "auto", fontWeight: "300" }}>Advice</p>
                              <textarea
                                style={{fontSize: "15px", width: "100%", marginLeft: "auto", marginRight: "auto", borderRadius: "3px", fontStyle: "italic", paddingLeft:"5px", borderColor: "rgba(165, 165, 165, 0.42)"}}
                                value={advice}
                                onChange={(e) => setAdvice(e.target.value)}
                                rows="4"
                                cols="50"
                                placeholder="Write down some advice to the student here ..."
                              />
                          </div> 

                          <div className="form-group" style={{marginTop: "2vh", display: 'flex'}}>
                              <Button style={{marginLeft: "auto", marginRight:"auto",  width: "150px", marginBottom: '10px'}} type="submit" className="blueButton" onClick={() => handleSubmit()}> Send Request </Button>
                          </div> 

                        </article>
                      </div>

                </div> 
              </Form>
            </Col>
          </Row>

        </> : ( state===STATES.LOADING ? 
                  <Spinner animation="border" role="status"/> : 
                  <Alert style={{textDecoration: "underline"}}> Some errors occurred </Alert>)
      }
    </Container>
  )
};

export { ChangeRequest };

/*const date = props.date;
  const user = useContext(userContext);
  const navigate = useNavigate();
  const types = [
    { value: 'Academic Research', label: 'Academic Research' },
    { value: 'Stage', label: 'Stage' },
  ];
 
  //Performs the controlls and if it's true the sendig part of the form

  const handleSubmit = (event) => {

    event.preventDefault();

    if (title === '') {

      setErrorMsg('Check required fields!');
      setInputErrorTitle(true);
      window.scrollTo(0, 0);


    } 

    if (profname === '') {

        setErrorMsg('Check required fields!');
        setInputErrorName(true);
        window.scrollTo(0, 0);
  
  
  
      } 
    if (description === '') {

      setErrorMsg('Check required fields!');
      setInputErrorDescription(true);
      window.scrollTo(0, 0);


    } 

    if (type === '') {

      setErrorMsg('Check required fields!');
      setInputErrorType(true);
      window.scrollTo(0, 0);


    }  

  
   
  // if everything is ok return true but in out case we send the data, console log to check everything is ok

    // console.log(`
    //   note: ${note}
    //   pname: ${profname.name + ' ' + profname.surname}
    //   type: ${type}
    //   teacherId: ${profname.id}
    //   userId: ${user.id}
    //   description: ${description}
    //   title: ${title}
    //   requestDate: ${date}
    //   errorMsg: ${errorMsg} 
    //    `);


       const predefinedSTRStructure = {   

        approvalDate: "",     
        description: description,           
        notes: note,  
        type: type, 
        studentId: user.id,
        teacherId: profname.id,   
        title: title,
        programmes: "",
        requestDate: date,
        approved: null,
      };
      

      if (title !== ''  && description !== '' && profname !== '' && type !== '' && 
      title !== null  && description !== null && profname !== null && type !== null) {
      //console.log(user)
      API.insertSTR(predefinedSTRStructure)
        .then(successAlert)
        .catch((e)=> errorAlert(e.err));

    }
  
    
    

      return true;

  }; */