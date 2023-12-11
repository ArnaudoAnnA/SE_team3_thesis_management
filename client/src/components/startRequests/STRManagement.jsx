import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Alert, Button, Col, Container, Row, Table, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import API from "../../API";


function object_prop_to_td(key, value) {
  let ret;
  switch (key) {
      case "requestDate":
          return dayjs(value).format("YYYY/MM/DD");

      case "coSupervisors":
          let key = 0;
          return value.map(e => <div key={key++}>{e}</div>);

      default:
          return value;
  }
}


function STRManagement(props) {

  const STATES = {LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready"};
  const FIELDS = [
    { DBfield: "supervisor", title: "Supervisor" },
    { DBfield: "requestDate", title: "Request date" },
    //{ DBfield: "coSupervisors", title: "Co-supervisors" },
    { DBfield: "programmes", title: "Programmes" },
    //{ DBfield: "type", title: "Type" },
   // { DBfield: "level", title: "Level" },
  ];

  const { id } = useParams();
  const navigate = useNavigate();

  const [STR, setSTR] = useState({});
  const [state, setState] = useState(STATES.LOADING);

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
        .then(t => {
                    if (!t.error) {
                      setSTR(t.STR);
                      setState(STATES.READY);
                    } else {
                      console.log("Error in STRManagement/getSTRWithId:" + e);
                      setState(STATES.ERROR);
                    }
                  })
        .catch(e => {
          console.log("Error in STRManagement/getSTRWithId:" + e);
          setState(STATES.ERROR);
        });
}, []);

  return ( <Container fluid className="vh-100" >
              {
                state === STATES.READY ? <> 
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2rem" }}>
                    <h1>{STR.title}</h1>
                  </div>
                  <h6><i>Proposed by: {STR.student}</i></h6> 
                  <hr />
                  <Table className="" >
                      <tbody>
                          {FIELDS.map(f => <tr key={f.title}> <th>{f.title}</th> <td>{object_prop_to_td(f.DBfield, STR[f.DBfield])}</td> </tr>)}
                      </tbody>
                  </Table>
                  <hr />
                  <h2> Description </h2>
                  <p> {STR.description} </p>
                  {STR.notes ? <>
                      <h4><i> Notes: </i></h4>
                      <p> {STR.notes} </p>
                  </> : ""
                  }
                  
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "2rem" }}>
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
                  </div>
                  
                </> : ( state===STATES.LOADING ? 
                          <Spinner animation="border" role="status"/> : 
                          <Alert style={{textDecoration: "underline"}}> Some errors occurred </Alert>)
              }
           </Container>
  );

}

export { STRManagement };