import { useEffect, useState, useContext } from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
/*npm install dayjs @mui/x-date-pickers @mui/material @emotion/styled @emotion/react    --save */
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate, useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button,Alert, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import API from '../API'
import { userContext } from './Utils';



function UpdateProposal(props) {

  let mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Verify email
  const user = useContext(userContext);
  const navigate = useNavigate();
  const {id} = useParams();
  const types = [
    { value: 'Academic Research', label: 'Academic Research' },
    { value: 'Stage', label: 'Stage' },
  ];


  const successAlert = () => {
    Swal.fire({  
      title: 'Finished!',  
      text: 'You uploaded the thesis proposal.',
      icon: 'success'
    });
    navigate("/");
  };
  
  const errorAlert = (e) => {
    Swal.fire({  
      title: 'Error!',  
      text: e,
      icon: 'error'
    });
    return false;
  };
 

  const [tags, setTags] = useState([])
  const [emailTags, setEmailTags] = useState([]);

  function handleKeyDown(e){
    if(e.key !== 'Enter') return
    e.preventDefault(); 
    const value = e.target.value.trim();
    if(!value.trim()) return
    if(!tags.includes(value)) {
      setTags([...tags, value])
    }else{
      setErrorMsg('Keyword already exists.');
      window.scrollTo(0, 0);

    }

    e.target.value = ''
  }
  
  function removeTag(index){
    setTags(tags.filter((el, i) => i !== index))
  }
  
  function handleBlur(e) {
    const value = e.target.value.trim();
    if (!value.trim()) return;
    if (!tags.includes(value)) {
      setTags([...tags, value]);
    } else {
      setErrorMsg('Keyword already exists.');
      window.scrollTo(0, 0);
    }
    e.target.value = '';
  }


  function handleMailKeyDown(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const value = e.target.value.trim();
    
    if (!value.trim()) return;
  
    if (!value.match(mailRegex)) {
      setErrorMsg('Not a valid email address.');
      window.scrollTo(0, 0);
      return false;
    }
  
    if (!emailTags.includes(value)) {
      setEmailTags([...emailTags, value]);
   
    }else{
      setErrorMsg('Co-Supervisor already exists.');
      window.scrollTo(0, 0);

    }
  
    e.target.value = '';
  }
  
  

  function removeTagMail(index) {
    setEmailTags(emailTags.filter((el, i) => i !== index));
  }

  function handleMailBlur(e) {
    const value = e.target.value.trim();
  
    if (!value) return;
  
    if (!value.match(mailRegex)) {
      setErrorMsg('Not a valid email address.');
      window.scrollTo(0, 0);
      return false;
    }
  
    if (!emailTags.includes(value)) {
      setEmailTags([...emailTags, value]);
    } else {
      setErrorMsg('Co-Supervisor already exists.');
      window.scrollTo(0, 0);
    }
  
    e.target.value = '';
  }  

  const [inputErrorTitle, setInputErrorTitle] = useState(false);
  const [inputErrorType, setInputErrorType] = useState(false);
  const [inputErrorDescription, setInputErrorDescription] = useState(false);
  const [inputErrorKnowledge, setInputErrorKnowledge] = useState(false);
  const [inputErrorLevel, setInputErrorLevel] = useState(false);
  const [inputErrorProgrammes, setInputErrorProgrammes] = useState(false);
  const [note, setNote] = useState('');
  const [pname, setPname] = useState('');
  const [level, setLevel] = useState('');
  const [knowledge, setKnowledge] = useState('')
  const [degree, setDegree] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [deg, setDeg] = useState()

  useEffect(() => {
    const now = dayjs(props.date);
    const sixMonthsLater = now.add(6, 'month');
    setSelectedDate(sixMonthsLater)
    API.getDegree()
    .then((d) => {
      setDeg(d);
    })
    .catch((e) => {
      console.error("Error in the getDegree API:", e);

    });
  
  
    API.getThesisWithId(id)
    .then((res) => {
      if (!res.error) {
        setTitle(res.thesis.title);
        setDegree(res.thesis.type);
        setDescription(res.thesis.description);
        setKnowledge(res.thesis.requiredKnowledge);
        setLevel(res.thesis.level);
        setTags(res.thesis.keywords);
        setEmailTags(res.thesis.coSupervisors);
        setPname(res.thesis.programmes);
        setSelectedDate(dayjs(res.thesis.expirationDate));
        setNote(res.thesis.notes);
      } else {
        console.log("Error in UpdateProposal/getThesisWithId:" + res.error);
      }
    })
    .catch(e => console.log("Error in UpdateProposal/getThesisWithId:" + e))

  }, []);
 
  //Performs the controlls and if it's true the sendig part of the form

  const handleSubmit = (event) => {

    event.preventDefault();
   
    if (title === '') {

      setErrorMsg('Check required fields!');
      setInputErrorTitle(true);
      window.scrollTo(0, 0);


    } 
    if (degree === '') {

      setErrorMsg('Check required fields!');
      setInputErrorType(true);
      window.scrollTo(0, 0);



    } 
    if (description === '') {

      setErrorMsg('Check required fields!');
      setInputErrorDescription(true);
      window.scrollTo(0, 0);


    } 
     if (knowledge === '') {

      setErrorMsg('Check required fields!');
      setInputErrorKnowledge(true);
      window.scrollTo(0, 0);


    } 
    if (level === '') {

      setErrorMsg('Check required fields!');
      setInputErrorLevel(true);
      window.scrollTo(0, 0);


    } 
    if (pname === '') {

      setErrorMsg('Check required fields!');
      window.scrollTo(0, 0);
      setInputErrorProgrammes(true);


    }  

    if (dayjs(props.date) > selectedDate) {
      setErrorMsg("Date cannot be before today!")
      window.scrollTo(0, 0);
      setSelectedDate(dayjs())
      return false;
    }

      const predefinedProposalStructure = {   

        archiveDate: dayjs(selectedDate).toISOString(),   
        coSupervisors: emailTags,   
        description: description,   
        expirationDate: dayjs(selectedDate).toISOString(),   
        keywords: tags,   
        level: level,   
        notes: note,   
        programmes: pname,   
        requiredKnowledge: knowledge,   
        teacherId: user.id,   
        title: title,   
        type: degree,   

      };

    
   
      if (title && degree && description && knowledge && level && pname !== '') {

        API.updateProposal(id,predefinedProposalStructure)
        .then((res) => {
          if(!res.error) {
            successAlert();
          } else {
            errorAlert(res.error);
          }
        })
        .catch((e)=> errorAlert(e));
  
      }


      return true;


  };
   

     
      return (
        <Container>
        {errorMsg ? (
          <Alert
            style={{ display: "flex", justifyContent: "center", width: "30%", marginLeft: "auto",marginRight: "auto", marginTop: "2vh", paddingLeft: "auto", paddingRight: "auto", textAlign:"center" }}
            variant="danger"
            onClose={() => setErrorMsg('')}
            dismissible
          >
              <svg xmlns="http://www.w3.org/2000/svg" style={{margin: "2%"}} width="5%" height="5%" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>
            {errorMsg}
          </Alert>
        ) : null}
        <Form onSubmit={handleSubmit} >
           
            <div className="container" style={{marginBottom: "20px"}}>
    
                  <div className="card bg-light cart" style={{ width: "45vw", marginLeft: "auto",marginRight: "auto" }}>
                  <article className="proposal-article" style={{maxWidth: "85vw", paddingLeft: "30px", paddingRight: "30px"}}>
                      <h4 className="card-title mt-3 text-center">Update a thesis proposal</h4>
                      <p className="text-center" style={{fontStyle: "italic"}}>Make changes or discard</p>
                      <p className="text-center" style={{fontStyle: "italic", fontSize: "73%"}}> (Required fildes are marked with *) </p>
                      <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                      <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis title, this field is required">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw", color: inputErrorTitle ? "red": undefined }} width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </div>
                      <input required style={{ borderRadius: "6px", borderColor: inputErrorTitle ? "red": undefined}} name="" className="form-control" placeholder="Insert your Thesis title *" type="text" value={title} onChange={ev => setTitle(ev.target.value)} onClick={()=> {setInputErrorTitle(false)}}/>
                    </div>
                    <div className="form-group input-group" style={{  marginBottom: "2px", display: "flex", flexDirection: "row", position: "relative",alignItems: "stretch", flexWrap: "wrap",  }}>
                          <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis type, this field is required">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw", color: inputErrorType ? "red": undefined}} width="16" height="16" fill="currentColor" className="bi bi-book-fill" viewBox="0 0 16 16">
                        <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                      </svg>
                          </div>
         
                    <Autocomplete
                      options={types}
                      className={inputErrorType ? "red-border" : ""} 
                      value={degree || null}
                      freeSolo
                      required
                      onChange={(ev) => {
                        setDegree(ev.target.value);
                      }}
                      onBlur={(ev) => {
                        setDegree(ev.target.value);
                      }}
                      renderInput={(params) => <TextField {...params} placeholder="Insert the Type *" variant="standard" style={{ paddingLeft: "2px", borderRadius: "6px", width: '100%', fontSize: "12px"}} onClick={()=> {setInputErrorType(false)}}/>}
                    />
                      </div>                 
                      <div className="form-group input-group" style={{display: "flex", marginBottom: "10px"}}>
                      <p style={{ paddingTop: "2px", marginBottom: "1px", marginLeft: "auto", marginRight: "auto", fontWeight: "300"}}>Description</p>
                        <textarea
                          style={{fontSize: "15px", width: "100%", marginLeft: "auto", marginRight: "auto", borderRadius: "3px", fontStyle: "italic", paddingLeft:"5px", borderColor:inputErrorDescription ? "red": "rgba(165, 165, 165, 0.42)"}}
                          value={description}
                          required
                          onChange={(e) => setDescription(e.target.value)}
                          onClick={()=> {setInputErrorDescription(false)}}
                          rows="4"
                          cols="50"
                          placeholder="Insert your thesis description *"
                        />
                      </div> 
                      <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                      <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Required Knowledge, this field is required">
                        <svg xmlns="http://www.w3.org/2000/svg"  style={{ marginRight:"1vw", color: inputErrorKnowledge ? "red": undefined}} width="16" height="16" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                          <path fillRule ="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>
                      </div>
                      <input required style={{ borderRadius: "6px", borderColor: inputErrorKnowledge ? "red": undefined }} name="" className="form-control" placeholder="Insert the Required Knowledge *" type="text" value={knowledge} onChange={ev => setKnowledge(ev.target.value)} onClick={()=> {setInputErrorKnowledge(false)}}/>
                    </div>
                      <div className="form-group input-group" style={{ marginTop: '4px'}}>
                          <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Thesis level, this field is required">
                        <svg xmlns="http://www.w3.org/2000/svg"  style={{ marginRight:"1vw", color: inputErrorLevel ? "red": undefined}} width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                          <path fillRule ="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                        </svg>
                          </div>
                          <select className="form-control" style={{borderRadius: "6px", borderColor: inputErrorLevel ? "red": undefined}} value={level} onChange={ev => setLevel(ev.target.value)} onClick={()=> {setInputErrorLevel(false)}}>
                              <option  style={{ fontWeight: "100" }} value="" disabled> --Insert Level-- *</option>
                              <option value= "Master">Master</option>
                              <option value= "Bachelor">Bachelor</option>

                          </select>
                      </div>
                      <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px", display: 'flex', alignItems: 'center' }}>

                      <div style={{ display: 'flex', flexDirection: "column", flex: 1 }}>
                        <div className="tags-input-container" style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
                          {tags.map((tag, index) => (
                            <div className="tag-item" key={index} style={{ cursor: "pointer", marginBottom: "2px", marginRight: "5px", borderBlockColor: "black" }}>
                              <span className="text">{tag}</span>
                              <span className="close" role='button' onClick={() => removeTag(index)}>&times;</span>
                            </div>
                          ))}
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '2px'}}>
                          <div data-bs-toggle="tooltip" data-bs-placement="left" title="Keywords">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" , marginTop: "2% "}} width="16" height="16" fill="currentColor" className="bi bi-file-word-fill" viewBox="0 0 16 16">
                              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.485 4.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z" />
                            </svg>
                          </div>
                          <input  onKeyDown={handleKeyDown}  onBlur={handleBlur} style={{ borderRadius: "3px", marginTop: "2px", marginBottom: "2px", borderWidth: "1px", flex: 1 }} type="text" className="form-control" placeholder="Insert Keywords and press Enter.." />
                        </div>
                      </div>
                    </div>

                  
                    <div className="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px", display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: "column", flex: 1 }}>
                        <div className="tags-input-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                          {emailTags.map((tag, index) => (
                            <div className="tag-item" key={index} style={{ cursor: 'pointer', marginBottom: '2px', marginRight: '5px', borderBlockColor: 'black' }}>
                              <span className="text">{tag}</span>
                              <span className="close" onClick={() => removeTagMail(index)}>
                                &times;
                              </span>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2px', alignItems: 'center' }}>
                          <div data-bs-toggle="tooltip" data-bs-placement="left" title="Co-Supervisors' mails">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" }} width="16" height="16" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                              <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                              <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                            </svg>
                          </div>
                          <input style={{ borderRadius: '6px', flex: 1 }} name="" className="form-control" placeholder="Insert Co-Supervisors' mails and press Enter.." type="text" onKeyDown={handleMailKeyDown}  onBlur={handleMailBlur} />
                        </div>
                      </div>
                    </div>



                    <div className="form-group input-group" style={{ marginTop: "4px", marginBottom: "2px" }}>
                      <div className="input-group-prepend" data-bs-toggle="tooltip" data-bs-placement="left" title="Cds/Programmes, this field is required">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw", color: inputErrorProgrammes ? "red": undefined}} width="16" height="16" fill="currentColor" className="bi bi-person-video3" viewBox="0 0 16 16">
                          <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
                        </svg>
                      </div>
                    <select
                      style={{ borderRadius: "6px", borderColor: inputErrorProgrammes ? "red": undefined }}
                      className="form-control"
                      value={pname}
                      onClick={()=> {setInputErrorProgrammes(false)}}
                      onChange={ev => setPname(ev.target.value)}>
                      <option  value="" disabled>--Insert Programmes-- *</option>
                      {deg && Object.keys(deg).map((optionKey) => (
                        <option key={deg[optionKey]} value={deg[optionKey]}>
                          {deg[optionKey]}
                        </option>
                      ))}
                    </select>
                    </div>  
                  <div style={{ display: "flex" }}>
                  <p style={{ paddingTop: "2px", marginBottom: "3px", marginLeft: "auto", marginRight: "auto", fontWeight: "300" }}>Expected Expiration Date (may change) *</p>
                  </div>
                  <div style={{display: "flex"}}>
                    <div style={{marginLeft: "auto", paddingBottom: "5px", marginRight: "auto"}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker value={selectedDate}
                          onChange={(newDate) => {
                            setSelectedDate(newDate);
                          }} />
                      </LocalizationProvider>
                    </div>
                    </div>
                    <div className="form-group input-group" style={{display: "flex", marginBottom: "2px", flexDirection: "column", flexWrap: "wrap"}}>
                      <p style={{ paddingTop: "2px", marginBottom: "1px", marginLeft: "auto", marginRight: "auto", fontWeight: "300" }}>Notes</p>
                        <textarea
                          style={{fontSize: "15px", width: "100%", marginLeft: "auto", marginRight: "auto", borderRadius: "3px", fontStyle: "italic", paddingLeft:"5px", borderColor: "rgba(165, 165, 165, 0.42)"}}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          rows="4"
                          cols="50"
                          placeholder="Insert your notes here.."
                        />
                      </div> 

                  <div className="form-group" style={{ marginTop: "2vh", display: 'flex' }}>
                    <Button id="sendpb" style={{ marginLeft: "auto", marginRight: "auto", width: "150px", marginBottom: '10px' }} type="submit" className="blueButton" onClick={handleSubmit}> Update Proposal  </Button>
                <Button id="sendpb" style={{ marginLeft: "auto", marginRight: "auto", width: "150px", marginBottom: '10px' }} variant='danger' onClick={()=> {navigate(`/thesis/${id}`)}}>Discard Changes  </Button>
                  </div>

                </article>
              </div> 
                  
                  </div> 
               
          </Form>
          </Container>
       
        
  )
  };
  
  


export {UpdateProposal};

