import { Button, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import API from '../../../API';
import { useNavigate } from 'react-router-dom';

function STRDetailsBottom(props) {

    const navigate = useNavigate();

    const successAlert = (mode) => {

        let textField;
        switch (mode) {
            case "accept":
                textField = "Proposal accepted successfully!";
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
    
        navigate("/STRlist");
      };
    
      const errorAlert = (mode) => {
        let textField;
        switch (mode) {
            case "accept":
                textField = "An error occurred while accepting proposal. Please try again later.";
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

    const updateRequest = (status)=> {
        API.teacherAcceptRejectChangeRequestSTR(props.reqId, status)
            .then((res) => {
                if (!res.error) {
                  successAlert(status ? "accept" : "decline");
                } else {
                  console.error("Error in STRDetailsBottom/teacherAcceptRejectChangeRequestSTR_API: ", res.error);
                  errorAlert(status ? "accept" : "decline");
                }
            })
            .catch((error) => {
                console.error("STRDetailsBottom/teacherAcceptRejectChangeRequestSTR_API: ", error);
                errorAlert(status ? "accept" : "decline");
              });
    }

    return (
        <Col style={
            {
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "left",
                marginTop: "1rem",
                marginBottom: "1rem"
            }

        }>
            {props.req.approved===true && <Button className='brwbtt blueButton'
                style={{ margin: "1rem" }}
                onClick={() => {
                    updateRequest(true)
                }}>
                Accept
            </Button>}

            {props.req.approved===true && <Button className='brwbtt orangeButton'
                style={{ margin: "1rem" }}
                onClick={() => {
                    updateRequest(false)
                }}>
                Decline
            </Button>}
        </Col>
    );
}

export default STRDetailsBottom;