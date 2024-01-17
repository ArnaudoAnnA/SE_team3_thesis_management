import { Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Arrow90degLeft } from "react-bootstrap-icons";

function STRDetailsHeader(props) {
    const navigate = useNavigate();
    

    const navigateToList = () => {
        navigate("/STRList");
    }
    
    return (
        <div>
            <Col className="col-1">
                <Button className="blueButton" onClick={navigateToList}>
                    <Arrow90degLeft />
                </Button>
            </Col>
            <hr />
            
        </div>
    );
}

export default STRDetailsHeader;