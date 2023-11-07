import React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
/*npm install dayjs @mui/x-date-pickers @mui/material @emotion/styled @emotion/react    --save */
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useMemo } from 'react';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import countryList from 'react-select-country-list';
import { Form, Button,Alert, Container } from 'react-bootstrap';



function InsertProposalForm(props) {

  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [nation, setNation] = useState('')
  const [ID, setID] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Male')
  const [degree, setDegree] = useState('')
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const options = useMemo(() => countryList().getData(), [])
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName); 
  };
  const handleSurNameChange = (event) => {
    const newSurName = event.target.value;
    setSurName(newSurName); 
  };
  const handleDateChange = (date) => {
    setSelectedDate(date.$d);
    console.log(date.$d);
  };

  const handleIDChange = (event) => {

    const ID = event.target.value;
    setID(ID);

  };

  const handleGender = (event) => {

    const gender = event.target.value;
    setGender(gender);
    console.log(gender)
   
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

  const handlePass1 = (event) => {

    const password1 = event.target.value;
    setPassword1(password1);
   
  };

  const handlePass2 = (event) => {

    const password2 = event.target.value;
    setPassword2(password2);
   
  };

  const changeHandler = value => {

    setNation(value.label)
    console.log(value.label);
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    var nomeRegex = /^[A-Za-z]+$/; // Il nome deve contenere solo lettere
    var cognomeRegex = /^[A-Za-z]+$/; // Il cognome deve contenere solo lettere
    var mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Verifica un formato email semplice
    var idRegex = /^\d+$/; // L'ID deve contenere solo cifre
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // La password deve avere almeno 8 caratteri, una maiuscola, una minuscola e un numero

    if (name === '') {
      setErrorMsg('Insert a valid ame!');
      return false;
    }

    if (surname === '') {
      setErrorMsg('Insert a valid surname!');
      return false;
    }

    if (email === '') {
      setErrorMsg('Insert a valid email!');
      return false;
    }

    if (ID === '') {
      setErrorMsg('Insert a valid ID!');
      return false;
    }

    if (password1 === '') {
      setErrorMsg('Insert a password in the first field!');
      return false;
    }

    if (password2 === '') {
      setErrorMsg('Insert a password in the second field!');
      return false;
    }
  // Esegui i controlli
  if (!name.match(nomeRegex)) {
    setErrorMsg('Not valid name data!');
    return false;
  }

  if (!surname.match(cognomeRegex)) {
    setErrorMsg('Not valid surname data!');
    return false;
  }

  if (!email.match(mailRegex)) {
    setErrorMsg('Not valid email address.');
    return false;
  }

  if (!ID.match(idRegex)) {
    setErrorMsg('ID contains numbers.');
    return false;
  }

  if (!password1.match(passwordRegex)) {
    setErrorMsg('The password is not valid. It must contain at least 8 characters, one uppercase letter, one lowercase letter, and a number.');
    return false;
  }

  if (password1 != password2) {
    setErrorMsg('Please, confirm your password!');
    return false;
  }
  // Se tutti i controlli passano, il modulo è valido

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
    
                  <div class="card bg-light" style={{ width: "45vw", marginLeft: "auto",marginRight: "auto" }}>
                  <article className="proposal-article" style={{maxWidth: "45vw", paddingLeft: "30px", paddingRight: "30px"}}>
                      <h4 class="card-title mt-3 text-center">Insert a thesis proposal</h4>
                      <p class="text-center">Get started with your proposal by inserting your data</p>
         
                      <form>
                      <div class="form-group input-group" style={{marginTop: "2px", marginBottom: "2px"}}>
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      </svg>
                          </div>
                          <input style={{borderRadius: "6px"}} name="" class="form-control" placeholder="Name" type="text" value={name} onChange={handleNameChange}/>
                      </div> 
                      <div class="form-group input-group">
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      </svg>
                          </div>
                          <input style={{borderRadius: "6px"}} name="" class="form-control" placeholder="Surname" type="text" value={surname} onChange={handleSurNameChange}/>
                      </div>
                      <div class="form-group input-group">
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      </svg>
                          </div>
                          <input  style={{borderRadius: "6px"}} name="" class="form-control" placeholder="ID" type="text" value={ID} onChange={handleIDChange}/>
                      </div> 
                  <div class="form-group input-group"style={{display: "flex" }}>
                    <div class="input-group-prepend" style={{ marginLeft: "auto", marginRight: "auto", marginTop: "2px",  marginBottom: "2px"}}>
                      <select class="custom-select"  style={{borderRadius: "3px", width: "100px"}}>
                        <option value={gender} onChange={handleGender}>Male</option>
                        <option value={gender} onChange={handleGender}>Female</option>
                      </select>
                    </div>

                      </div>
                      <div class="form-group input-group">
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                      </svg>
                             
                          </div>
                          <input style={{borderRadius: "6px"}} name="" class="form-control" placeholder="E-Mail" type="text" value={email} onChange={handleEmail}/>

                  </div>
                  <div>
                    <div >
                      <div style={{display:"flex", flexDirection: "row", marginTop:"5 px"}} >
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg"  style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                          <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                        </svg>
                        </div>
                        <div style={{ width: "55vw", marginTop: "2px", marginBottom: "2px"}}>
                             <Select options={options} onChange={changeHandler}/>
                        </div>
                      </div>
          
                    </div>
               
                  </div>

                      <div class="form-group input-group">
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-book-fill" viewBox="0 0 16 16">
                        <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                      </svg>
                          </div>
                          <select class="form-control" style={{borderRadius: "6px"}}>
                              <option selected=""> Course Degree</option>
                              <option value={degree} onChange={handleDegree}>LM-8</option>
                              <option value={degree} onChange={handleDegree}>LM-32</option>

                          </select>
                      </div> 
                  <div style={{ display: "flex" }}>
                  <p style={{ paddingTop: "2px", marginBottom: "-1px", marginLeft: "auto", marginRight: "auto" }}>Enrollment Year</p>
                  </div>
                  <div style={{ paddingLeft: "12vw", paddingBottom: "5px", paddingRight: "auto"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker value={selectedDate}
                        onChange={handleDateChange}/>
                    </LocalizationProvider>
                    <div >
                
                    </div>
                      </div> 
                      <div class="form-group input-group" style={{marginBottom: "2px"}}>
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                          </div>
                          <input style={{borderRadius: "6px"}} class="form-control" placeholder="Create password" type="password" value={password1} onChange={handlePass1}/>
                      </div> 
                      <div class="form-group input-group">
                          <div class="input-group-prepend">
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight:"1vw"}} width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                          </div>
                          <input  style={{borderRadius: "6px"}} class="form-control" placeholder="Repeat password" type="password" value={password2} onChange={handlePass2}/>
                      </div>                                       
                      <div class="form-group" style={{marginTop: "2vh", display: 'flex'}}>
                          <Button style={{marginLeft: "auto", marginRight:"auto",  width: "180px", marginBottom: '10px'}} type="submit" class="btn btn-primary btn-block" onClick={handleSubmit}> Send Proposal  </Button>
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

