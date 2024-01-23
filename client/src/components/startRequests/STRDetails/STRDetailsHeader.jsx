import { Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Arrow90degLeft } from "react-bootstrap-icons";

function STRDetailsHeader(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const nextpage = location.state?.nextpage || '/STRList';
    

    const navigateBack = () => {
        navigate(nextpage);
    }
    
    return (
        <div>
            <Col className="col-1">
                <Button className="blueButton" onClick={navigateBack} style={{marginTop: "8px"}}>
                    <Arrow90degLeft />
                </Button>
            </Col>
            <hr />
            
        </div>
    );
}

export default STRDetailsHeader;