import React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
/*npm install dayjs @mui/x-date-pickers @mui/material @emotion/styled @emotion/react    --save */
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useMemo } from 'react';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button,Alert, Container } from 'react-bootstrap';


function InsertProposalForm(props) {

  const [tags, setTags] = useState([])

  function handleKeyDown(e){
    if(e.key !== 'Enter') return
    e.preventDefault(); 
    const value = e.target.value
    if(!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }
  
  function removeTag(index){
    setTags(tags.filter((el, i) => i !== index))
  }
  

  const [note, setNot] = useState('');
  const [pname, setpName] = useState('');
  const [level, setLevel] = useState('');
  const [knowledge, setKnowledge] = useState('')
  const [email, setEmail] = useState([])
  const [degree, setDegree] = useState('')
  const [description, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedDate, setSelectedDate] = useState(null);
 


  const handlePNameChange = (event) => {
    const newPName = event.target.value;
    setpName(newPName); 
  };
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle); 
  };
  const handleDateChange = (date) => {
    setSelectedDate(date.$d);
    console.log(date.$d);
  };

  const handleEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const handleDegree = (event) => {
    const degree = event.target.value;
    setDegree(degree);
    console.log(degree);
  };

  const handleLevel = (event) => {
    const level = event.target.value;
    setLevel(level);
    console.log(level);
  };

  const handleKnowledgeChange = (event) => {
    const knowledge = event.target.value;
    setKnowledge(knowledge)
    console.log(knowledge);
  }

 
  //Performs the controlls and if it's true the sendig part of the form

  const handleSubmit = (event) => {

    event.preventDefault();
    var nomeRegex = /^[A-Za-z]+$/; // The word must contains words
    var mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Verify email
    var idRegex = /^\d+$/; // L'ID deve contenere solo cifre


   
    if (title === '') {
      setErrorMsg('Insert a valid title!');
      return false;
    }

    if (degree === '') {
      setErrorMsg('Insert a type!');
      return false;
    }

    if (description === '') {
      setErrorMsg('Insert a description!');
      return false;
    }

    if (knowledge === '') {
      setErrorMsg('Insert a knowledge requirment!');
      return false;
    }

    if (level === '') {
      setErrorMsg('Insert a level!');
      return false;
    }

    if (tags.length === 0) {
      setErrorMsg('Insert keywords!');
      return false;
    }

    if (email.length === 0) {
      setErrorMsg('Insert a valid co-supervisor!');
      return false;
    }


    if (pname === '') {
      setErrorMsg('Insert programmes!');
      return false;
    }

 
  
  // Esegui i controlli
 
  if (!pname.match(Regex)) {
    setErrorMsg('Not valid programmes name!');
    return false;
  }

  if (!email.match(mailRegex)) {
    setErrorMsg('Not valid email address.');
    return false;
  }

 
  // if everything is ok return true but in out case we send the data 

      return true;


  };
   

     
      return (
        <Container>
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
        <Form onSubmit={handleSubmit} >
           
            <div class="container" style={{marginBottom: "20px"}}>
    
                  <div class="card bg-light cart" style={{ width: "45vw", marginLeft: "auto",marginRight: "auto" }}>
                  <article className="proposal-article" style={{maxWidth: "85vw", paddingLeft: "30px", paddingRight: "30px"}}>
                      <h4 class="card-title mt-3 text-center">Insert a thesis proposal</h4>
                      <p class="text-center">Get started with your proposal by inserting your data</p>
         
                      <form>
                      <div class="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                      <div class="input-group-prepend">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1vw" }} width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </div>
                      <input style={{ borderRadius: "6px" }} name="" class="form-control" placeholder="Thesis title" type="text" value={title} onChange={handleTitleChange} />
                    </div>
                    <div class="form-group input-group" style={{  marginBottom: "2px" }}>
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-book-fill" viewBox="0 0 16 16">
                        <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                      </svg>
                          </div>
                          <select class="form-control" style={{borderRadius: "6px"}} value={degree} onChange={handleDegree}>
                              <option value=""> --Type--</option>
                              <option value="Academic Research" >Academic Research</option>
                              <option value="Stage">Stage</option>

                          </select>
                      </div>
                      <div class="form-group input-group" style={{display: "flex", marginBottom: "10px"}}>
                      <p style={{ paddingTop: "2px", marginBottom: "1px", marginLeft: "auto", marginRight: "auto" }}>Description</p>
                        <textarea
                          style={{fontSize: "15px", width: "60vw", marginLeft: "auto", marginRight: "auto", borderRadius: "1px"}}
                          value={description}
                          onChange={(e) => setDesc(e.target.value)}
                          rows="4"
                          cols="50"
                          placeholder="Insert your thesis description.."
                        />
                      </div> 
                      <div class="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                      <div class="input-group-prepend">
                        <svg xmlns="http://www.w3.org/2000/svg"  style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>
                      </div>
                      <input style={{ borderRadius: "6px" }} name="" class="form-control" placeholder="Required Knowledge" type="text" value={knowledge} onChange={handleKnowledgeChange} />
                    </div>
                      <div class="form-group input-group">
                          <div class="input-group-prepend">
                        <svg xmlns="http://www.w3.org/2000/svg"  style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                        </svg>
                          </div>
                          <select class="form-control" style={{borderRadius: "6px"}} value={level} onChange={handleLevel}>
                              <option selected=""> --Level--</option>
                              <option value= "Master">Master</option>
                              <option value= "Bachelor">Bachelor</option>

                          </select>
                      </div>
                      <div class="form-group input-group" style={{marginTop: "2px", marginBottom: "2px"}}>
                          <div class="input-group-prepend">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-file-word-fill" viewBox="0 0 16 16">
                          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.485 4.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z" />
                        </svg>
                      </div>
                      <div style={{display: 'flex', flexDirection: "column"}}>
                      <div className="tags-input-container" style={{display: 'flex', flexDirection: "row", flexWrap: "wrap"}}>
                        {tags.map((tag, index) => (
                          <div className="tag-item" key={index} style={{cursor: "pointer", marginBottom: "2px", marginRight: "5px", borderBlockColor: "black"}}>
                            <span className="text">{tag}</span>
                            <span className="close" onClick={() => removeTag(index)}>&times;</span>
                          </div>
                        ))}
                      
                      </div>
                      <input onKeyDown={handleKeyDown} style={{ borderRadius: "3px", marginTop: "2px", marginBottom: "2px", borderWidth: "1px" }} type="text" class="form-control" placeholder="Keywords" />
                      </div>
                    </div> 
                  
                      <div class="form-group input-group">
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                      </svg>
                             
                          </div>
                          <input style={{borderRadius: "6px"}} name="" class="form-control" placeholder="Co-Supervisor" type="text" value={email} onChange={handleEmail}/>

                  </div>
                    <div class="form-group input-group" style={{ marginTop: "2px", marginBottom: "2px" }}>
                      <div class="input-group-prepend">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-person-video3" viewBox="0 0 16 16">
                          <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
                        </svg>
                      </div>
                      <input style={{ borderRadius: "6px" }} name="" class="form-control" placeholder="Programmes" type="text" value={pname} onChange={handlePNameChange} />
                    </div>  
                  <div style={{ display: "flex" }}>
                  <p style={{ paddingTop: "2px", marginBottom: "3px", marginLeft: "auto", marginRight: "auto" }}>Expiration Date</p>
                  </div>
                  <div style={{ paddingLeft: "12vw", paddingBottom: "5px", paddingRight: "auto"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker value={selectedDate}
                        onChange={handleDateChange}/>
                    </LocalizationProvider>
                    </div>
                    <div class="form-group input-group" style={{display: "flex", marginBottom: "2px"}}>
                      <p style={{ paddingTop: "2px", marginBottom: "1px", marginLeft: "auto", marginRight: "auto" }}>Notes</p>
                        <textarea
                          style={{fontSize: "15px", width: "60vw", marginLeft: "auto", marginRight: "auto", borderRadius: "1px"}}
                          value={note}
                          onChange={(e) => setNot(e.target.value)}
                          rows="4"
                          cols="50"
                          placeholder="Insert your notes here.."
                        />
                      </div> 
                   
                                                       
                      <div class="form-group" style={{marginTop: "2vh", display: 'flex'}}>
                          <Button style={{marginLeft: "auto", marginRight:"auto",  width: "150px", marginBottom: '10px'}} type="submit" class="btn btn-primary btn-block" onClick={handleSubmit}> Upload Proposal  </Button>
                      </div>     
                                                                                      
                  </form>
                  </article>
                  </div> 
                  
                  </div> 
               
          </Form>
          </Container>
       
        
  )
  };
  
  


export {InsertProposalForm};

