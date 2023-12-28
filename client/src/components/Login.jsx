import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import API from '../API';

const Login = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false); 

      API.loginWithSaml()
        .catch(error => {

          console.error(error);
        });
    }, 1000);

    return () => clearTimeout(timer); 

  }, []); 

  return (
    <div style={{marginTop: "15%"}}>
      {showSpinner && <div><Spinner  style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto", width: "140px", height:"140px"}} animation="border" role="status" /></div>}
    </div>
  );
};

export {Login};
