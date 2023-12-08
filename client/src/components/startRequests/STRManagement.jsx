import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert, Button, Col, Container, Row, Table, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import API from "../../API";



function STRManagement(props) {
  const [errorMsg, setErrorMsg] = useState('');
  const [STR, setSTR] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const successAlert = (mode) => {
    let textField;
    switch (mode) {
        case "send":
            textField = "Proposal sent successfully!";
            break;
        case "decline":
            textField = "Proposal declined successfully!";
            break;
      default:
            textField = "";
    }

    Swal.fire({
      title: 'Done!',
      text: textField,
      icon: 'success'
    });

    navigate("/");
  };

  const errorAlert = (mode) => {
    let textField;
    switch (mode) {
        case "send":
            textField = "An error occurred while sending proposal. Please try again later.";
            break;
        case "decline":
            textField = "An error occurred while declining proposal. Please try again later.";
            break;
      default:
            textField = "";
    }
    
    Swal.fire({
        title: 'Error!',
        text: textField,
        icon: 'error'
    });
  };

  // const sendToProfessor = () => {
  //   API.()
  //     .then(() => {
  //        successAlert("send");
  //     })
  //     .catch((error) => {
  //       console.error("Error in STRManagement/xxx_API:", error);
  //       errorAlert("send");
  //     });
  // };


  // const declineProposal = () => {

  //   API.()
  //     .then(() => {
  //         successAlert("decline");
  //     })
  //     .catch((error) => {
  //       console.error("Error in STRManagement/xxx_API:", error);
  //       errorAlert("decline");
  //     });
  // };

  useEffect(() => {
    API.getSTRWithId(id)
        .then(t => setSTR(t))
        .catch(); //TO DO: define error state
}, []);

  return ( <Container fluid className="vh-100" > 
            <>
                <Button
                  type="submit"
                  className='brwbtt blueButton'
                  style={{
                    marginRight: "3px",
                    fontSize: "16px",
                    padding: "0.5% 2%"
                  }}
                  onClick={() => sendToProfessor()}
                >
                  Send to professor
                </Button>
                <Button
                  variant="warning"
                  className='brwbtt orangeButton'
                  style={{
                    fontSize: "16px",
                    padding: "0.5% 2%"
                  }}
                  onClick={() => declineProposal()}
                >
                  Decline
                </Button>
              </>
           </Container>
    
  );

}

/*
      {errorMsg ? (
        <Alert id="applyAlert"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "2vh" }}
          variant="danger"
          onClose={() => setErrorMsg('')}
          dismissible
        >
          {errorMsg}
        </Alert>
      ) : null}
*/

export { STRManagement };