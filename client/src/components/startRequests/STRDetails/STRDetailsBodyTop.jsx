import { Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function STRDetailsBodyTop(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const navigateToChange = () => {
        console.log(location);
        navigate(location.pathname + "/changeRequest")
    }
    return (
        <>
            <Row style={
                {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }
            }>
                <Col>
                    <h3>{props.req.title}</h3>
                </Col>
                <Col style={
                    {
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }
                }>
                    {props.req.approved===true && <Button className="blueButton" onClick={navigateToChange}>
                        <div>Change Request</div>
                    </Button>}
                </Col>
            </Row>
        </>
    )
}

export default STRDetailsBodyTop; 