import React, { useEffect } from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
/*npm install dayjs @mui/x-date-pickers @mui/material @emotion/styled @emotion/react    --save */
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import API from '../../API'
import context from 'react-bootstrap/esm/AccordionContext';
import { userContext } from '../Utils';



function InsertStudentProposal(props) {


  const date = props.date;
  const user = useContext(userContext);
  const navigate = useNavigate();
  const types = [
    { value: 'Academic Research', label: 'Academic Research' },
    { value: 'Stage', label: 'Stage' },
  ];


  const successAlert = () => {
    Swal.fire({
      title: 'Finished!',
      text: 'You uploaded the thesis request.',
      icon: 'success'
    });
    navigate("/");
  };

  const errorAlert = (e) => {
    Swal.fire({
      title: 'Error!',
      text: 'Something happened. ' + e,
      icon: 'error'
    });
    return false;
  };
  
  const [inputErrorTitle, setInputErrorTitle] = useState(false);
  const [inputErrorType, setInputErrorType] = useState(false);
  const [inputErrorDescription, setInputErrorDescription] = useState(false);
  const [inputErrorName, setInputErrorName] = useState(false);
  const [note, setNot] = useState('');
  const [profname, setprofname] = useState('');
  const [type, setType] = useState('');
  const [description, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [values, setValues] = useState([])
  const [deg, setDeg] = useState()

  useEffect(() => {
    const now = dayjs(props.date);

    API.getTecher().then((e) => setValues(e))


  }, []);

  //Performs the controlls and if it's true the sendig part of the form

  const handleSubmit = async (event) => {

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

    const sendingStructure = {
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


    if (title !== '' && description !== '' && profname !== '' && type !== '' &&
      title !== null && description !== null && profname !== null && type !== null) {

      //console.log(user)
      let ret = await API.insertSTR(sendingStructure);
      if (ret.status == 200) {
        successAlert();
      } else
        errorAlert(ret.err || "");
    }

  }

return (
  <Container>
    <Row className="my-3">
      <Col md={5} className="ml-2">
        <Link to={`/`} className="btn blueButton btn-lg"> <i className="bi bi-arrow-90deg-left white"></i> </Link>
      </Col>
      <Col md={8}>
      </Col>
    </Row>
    {errorMsg ? (
      <Alert
        style={{ display: "flex", justifyContent: "center", width: "30%", marginLeft: "auto", marginRight: "auto", marginTop: "2vh", paddingLeft: "auto", paddingRight: "auto", textAlign: "center" }}
        variant="danger"
        onClose={() => setErrorMsg('')}
        dismissible
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: "2%" }} width="5%" height="5%" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
          <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
          <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
        </svg>
        {errorMsg}
      </Alert>
    ) : null}
    <Form onSubmit={handleSubmit} >

      <div className="container" style={{ marginBottom: "20px" }}>

        <div className="card bg-light cart" style={{ width: "45vw", marginLeft: "auto", marginRight: "auto" }}>
          <article className="proposal-article" style={{ maxWidth: "85vw", paddingLeft: "30px", paddingRight: "30px" }}>
            <h4 className="card-title mt-3 text-center">Insert a thesis request</h4>
            <p className="text-center" style={{ fontStyle: "italic" }}>Get started with your request by inserting your data</p>
            <p className="text-center" style={{ fontStyle: "italic", fontSize: "73%" }}> (Required fildes are marked with *) </p>
            <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
              <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis title, this field is required">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw", color: inputErrorTitle ? "red" : undefined }} width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </div>
              <input required style={{ borderRadius: "6px", borderColor: inputErrorTitle ? "red" : undefined }} name="" className="form-control" placeholder="Insert your Thesis title *" type="text" value={title} onChange={ev => setTitle(ev.target.value)} onClick={() => { setInputErrorTitle(false) }} />
            </div>
            <div className="form-group input-group" style={{ marginBottom: "2px", display: "flex", flexDirection: "row", position: "relative", alignItems: "stretch", flexWrap: "wrap", }}>
              <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis type, this field is required">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw", color: inputErrorType ? "red" : undefined }} width="16" height="16" fill="currentColor" className="bi bi-book-fill" viewBox="0 0 16 16">
                  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
              </div>
              <Autocomplete
                options={types}
                className={inputErrorType ? "red-border" : "norm-border "}
                freeSolo
                required
                onChange={(ev) => {
                  setType(ev.target.value);
                  // console.log(ev.target.value);
                }}
                onBlur={(ev) => {
                  setType(ev.target.value);
                  // console.log(ev.target.value);
                }}
                renderInput={(params) => <TextField {...params} placeholder="Insert the Type *" variant="standard" style={{ paddingLeft: "2px", borderRadius: "6px", width: '100%', fontSize: "12px", borderWidth: "300px" }} onClick={() => setInputErrorType(false)} />}
              />
            </div>
            <div className="form-group input-group" style={{ display: "flex", marginBottom: "10px" }}>
              <p style={{ paddingTop: "2px", marginBottom: "1px", marginLeft: "auto", marginRight: "auto", fontWeight: "300" }}>Description</p>
              <textarea
                style={{ fontSize: "15px", width: "100%", marginLeft: "auto", marginRight: "auto", borderRadius: "3px", fontStyle: "italic", paddingLeft: "5px", borderColor: inputErrorDescription ? "red" : "rgba(165, 165, 165, 0.42)" }}
                value={description}
                required
                onClick={() => { setInputErrorDescription(false) }}
                onChange={(e) => setDesc(e.target.value)}
                rows="4"
                cols="50"
                placeholder="Insert your thesis description *"
              />
            </div>
            <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
              <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Theacher's name, this field is required">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw", color: inputErrorName ? "red" : undefined }} width="16" height="16" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                </svg>
              </div>
              <select
                required
                style={{ borderRadius: "6px", borderColor: inputErrorName ? "red" : undefined }}
                className="form-control"
                value={profname.id || ''}
                onChange={(ev) => setprofname(values.find(teacher => teacher.id === ev.target.value) || {})}
                onClick={() => {
                  setInputErrorName(false);
                }}
              >
                <option value="" disabled>--Insert Teacher's Name-- *</option>
                {values.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} {teacher.surname}
                  </option>
                ))}

              </select>
            </div>
            <div className="form-group input-group" style={{ display: "flex", marginBottom: "2px", flexDirection: "column", flexWrap: "wrap" }}>
              <p style={{ paddingTop: "2px", marginBottom: "1px", marginLeft: "auto", marginRight: "auto", fontWeight: "300" }}>Notes</p>
              <textarea
                style={{ fontSize: "15px", width: "100%", marginLeft: "auto", marginRight: "auto", borderRadius: "3px", fontStyle: "italic", paddingLeft: "5px", borderColor: "rgba(165, 165, 165, 0.42)" }}
                value={note}
                onChange={(e) => setNot(e.target.value)}
                rows="4"
                cols="50"
                placeholder="Insert your notes here.."
              />
            </div>

            <div className="form-group" style={{ marginTop: "2vh", display: 'flex' }}>
              <Button id="sendpb" style={{ marginLeft: "auto", marginRight: "auto", width: "150px", marginBottom: '10px' }} type="submit" className="blueButton" onClick={handleSubmit}> Upload Request  </Button>
            </div>

          </article>
        </div>

      </div>

    </Form>
  </Container>


)
  };




export { InsertStudentProposal };

