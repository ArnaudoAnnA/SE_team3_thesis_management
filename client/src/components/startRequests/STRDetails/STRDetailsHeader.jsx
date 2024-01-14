import { Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Arrow90degLeft } from "react-bootstrap-icons";

function STRDetailsHeader(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToList = () => {
        navigate("/STRList");
    }
    const navigateToChange = () => {
        console.log(location);
        navigate(location.pathname + "/ChangeRequest")
    }
    return (
        <div>
            <Col className="col-1">
                <Button className="blueButton" onClick={navigateToList}>
                    <Arrow90degLeft />
                </Button>
            </Col>
            <Col>
                <Button className="blueButton" onClick={navigateToChange}>
                    <div>Change Request</div>
                </Button>
            </Col>
        </div>
    );
}

export default STRDetailsHeader;