import { Button, Col } from "react-bootstrap";


function STRDetailsBottom(props) {

    const updateRequest = (status)=> {
        console.log("Updating request " + props.reqId + " to " + status);
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
            <Button className='brwbtt blueButton'
                style={{ margin: "1rem" }}
                onClick={() => {
                    updateRequest(true)
                }}>
                Accept
            </Button>

            <Button className='brwbtt orangeButton'
                style={{ margin: "1rem" }}
                onClick={() => {
                    updateRequest(false)
                }}>
                Decline
            </Button>
        </Col>
    );
}

export default STRDetailsBottom;