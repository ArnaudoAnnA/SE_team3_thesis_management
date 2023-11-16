import React from 'react';
import { useState } from 'react';
import { Navbar, Button, Form, Table, Alert, FormGroup, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {API} from '../API.js'

import API from '../API.js';
import { Navigate } from 'react-router-dom';





function Login(props) {

    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('s901234@studenti.polito.it');
    const [password, setPassword] = useState('s901234');
    //const navigate = useNavigate();
    const handleSubmit = async function handleSubmit(event) {
        event.preventDefault();
        let valid = true;
        const e = { email, password };
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


        // Form validation
        if (email === '' && password != '') {
            setErrorMsg('Empty E-Mail field!');
            valid = false;
        } else if (password == '' && email != '') {
            setErrorMsg('Empty password field!');
            valid = false;

        } else if (email == '' && password == '') {
            setErrorMsg('Empty fields, please insert your values!');
            valid = false;

        } else if (email.length < 6) {
            setErrorMsg('E-mail too short!');
            valid = false;
        } else if (emailRegex.test(email) == false) {
            setErrorMsg('Not a valid E-mail format!');
            valid = false;
        }
        if (valid) {
            login(email, password)
        } else {
            console.log("Error");
        }

    }

    const login = async function loggati(email, password) {

        /*  try {
            const user = await API.logIn(e);  
            setErrorMsg('');
            props.logSuccessfull(user);
            navigate("/HomeUserLogged");
          } catch(err) {
            setErrorMsg('E-Mail o/e password errata/i');
            console.log(err);
          }*/
        // console.log("Logged!");
        await API.logIn(email, password).then( (credentials) => {
            setErrorMsg('');
        })
        .catch((error) => {
            setErrorMsg('E-Mail o/e password errata/i');
        })
        
    }

    return (
      
        <Container style={{display: "flex", flexDirection: "column"}}>
         <h1 style={{marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>Welcome! Please insert your e-mail and password to login</h1>
       
        {errorMsg? <Alert style={{width:"30%", marginLeft: "auto", marginTop: "3%", marginRight: "auto", textAlign: "center"}} variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        
        <Form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "auto", marginTop: "2%", width:"30%"}}>
        
                <Form.Group>
                    <Form.Label>E-mail  </Form.Label>
                    <Form.Control style={{ width: "100%" }} type="text" placeholder="E-mail" name="email" value={email} onChange={ev => setEmail(ev.target.value)} />
                </Form.Group>


        <Form.Group controlId="formBasicPassword"  >
                <Form.Label>Password</Form.Label>
                <Form.Control style={{width:"100%"}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
         
            <div style={{display: "flex", flexDirection: "row"}}>
            <Button type='submit' className='blueButton' style={{marginLeft: "auto", marginRight:"auto", marginTop: "10px", width:"45%"}}>Login</Button>
            {/* <Button variant='warning' style={{marginLeft: "auto", marginRight:"auto", marginTop: "10px", width:"45%"}} >Cancel</Button> */}
            </div>

            </Form>


        </Container>
    );


}




export { Login };

