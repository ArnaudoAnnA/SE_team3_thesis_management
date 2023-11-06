import React from 'react';
import { useState } from 'react';
import { Navbar, Button, Form, Table, Alert, FormGroup, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
//import API from '../API';


function Login(props) {

    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('aaaaaa@gmail.com');
    const [password, setPassword] = useState('luigi');
    //const navigate = useNavigate();


    async function loggati(e){
 
        /*  try {
            const user = await API.logIn(e);  
            setErrorMsg('');
            props.logSuccessfull(user);
            navigate("/HomeUserLogged");
          } catch(err) {
            setErrorMsg('E-Mail o/e password errata/i');
            console.log(err);
          }*/
      }
      console.log("Logged!");


      function handleSubmit(event) {
        event.preventDefault();
        let valid = true;
        const e = { email, password };
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    
        // Form validation
        if (email === '' && password != ''){
            setErrorMsg('Empty E-Mail field!');
            valid = false;
        }else if (password == '' && email !='') {
            setErrorMsg('Empty password field!');
            valid = false;
    
        }else if (email=='' && password == '') {
            setErrorMsg('Empty fields, please insert your values!');
            valid = false;
    
        }else if(email.length < 6){
            setErrorMsg('E-mail too short!');
            valid = false;
        }else if ( emailRegex.test(email) == false){
            setErrorMsg('Not a valid E-mail format!');
            valid = false;
        }
        if(valid)
        {
          
          loggati(e);
        } else {
     
          console.log("Error");
        }
                                    
        }
    
        
    return (
      
        <Container>
         <Navbar.Brand style={{ fontSize: "40px" }}>Politecnico di Torino</Navbar.Brand>
       
        {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form onSubmit={handleSubmit}>

        <Form.Group>
                <Form.Label>E-mail  </Form.Label>
                <Form.Control style={{paddingRight: "120px"}}type="text" placeholder="E-mail" name="email" value={email} onChange={ev => setEmail(ev.target.value)} />
            </Form.Group>
         

        <Form.Group controlId="formBasicPassword"  >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
    
   
            <Button type='submit' variant="primary" style={{marginTop: "10px"}}>Login</Button>
            <Button variant='warning' style={{marginTop: "10px"}} >Cancel</Button>


            </Form>
            
        </Container>
    );

        
}




export default Login;

