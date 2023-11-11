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
    const handleSubmit = function handleSubmit(event) {
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
            //   loggati(e);
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
        API.logIn(email, password).then( (credentials) => {
            console.log("Login.loggati")
            if(credentials == null){
                setErrorMsg('E-Mail o/e password errata/i');
                return
            }
            setErrorMsg('');
            // props.logSuccessfull(user);
            // navigate("/HomeUserLogged");
        })
        
    }

    return (
      
        <Container style={{display: "flex", flexDirection:"column"}}>
         <h1 style={{marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>Welcome! Please insert your e-mail and password to login</h1>
       
        {errorMsg? <Alert style={{width:"20vw", marginLeft: "27vw", marginTop: "2vh"}} variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form onSubmit={handleSubmit} style={{marginLeft: "27vw", marginTop: "5vh" }}>

                <Form.Group>
                    <Form.Label>E-mail  </Form.Label>
                    <Form.Control style={{ width: "20vw" }} type="text" placeholder="E-mail" name="email" value={email} onChange={ev => setEmail(ev.target.value)} />
                </Form.Group>


        <Form.Group controlId="formBasicPassword"  >
                <Form.Label>Password</Form.Label>
                <Form.Control style={{width:"20vw"}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
         
 
            <Button type='submit' variant="dark" style={{marginTop: "10px"}}>Login</Button>
            <Button variant='warning' style={{marginTop: "10px"}} >Cancel</Button>
       

            </Form>

        </Container>
    );


}




export { Login };

