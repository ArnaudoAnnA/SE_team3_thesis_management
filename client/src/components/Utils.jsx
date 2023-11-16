import { createContext, useContext, useState } from "react";
import { Alert, Button, Container, Col, Row, Card, Form, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import dayjs from "dayjs";
import API from "../API";

/** Context used to propagate the user object */
const userContext = createContext();

/**
 * A custom navigation bar at the top of the app.
 * 
 * @param props.logoutCbk callback to perform the actual logout
 * @param props.date the setted date
 * @param props.changeDateCbk callback to change the date
 */

function CustomNavbar(props) {
    const user = useContext(userContext);
    const [date, setDate] = useState(props.date);
    const [showConfirmation, setShowConfirmation] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        props.changeDateCbk(dayjs(date).format('YYYY-MM-DD'));
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 1000);
    }
    return (
        <>
            {/* Top banner with logo and app name */}
            <Navbar expand="lg" className='bluePoli' variant="dark">
                <Navbar.Brand>
                    <img src="https://drive.google.com/uc?export=download&id=1HTuSShZT0omPheSlNEMBWKPypY8OeaOY" width="55" height="55" style={{ marginRight: '5px' }} alt="" />
                    Thesis Management
                </Navbar.Brand>
            </Navbar>
            {/* App main navbar */}
            {user.email ?
                <Navbar sticky="top" expand="lg" className='orangePoli mb-3 shadow' collapseOnSelect>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link as={Link} to={"/"} className="white" href='/'>Home</Nav.Link>
                            {user.role == 'teacher' ?
                                <>
                                    <Nav.Link as={Link} to={"/archive"} className="white" href='/archive'>Archive</Nav.Link>
                                    <Nav.Link as={Link} to={"/applications"} className="white" href='/applications'>Applications</Nav.Link>
                                </>
                                : null}
                            <Nav.Link as={Link} to={"/notifications"} className="white" href='/notifications'>Notifications</Nav.Link>
                        </Nav>
                    </ Navbar.Collapse>
                    <div className="ml-auto">
                        <Nav.Link as={Link} to='/' onClick={props.logoutCbk} className="white">
                            LOGOUT
                            <i className="bi bi-box-arrow-right" style={{ marginLeft: '5px', marginRight: '5px' }} />
                        </Nav.Link>
                    </div>
                </Navbar>
                : null}

            {/* Virtual clock, just for testing */}
            {user.email ?
                <Navbar >
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={event => { setDate(event.target.value); }} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button className="blueButton" type="submit" >
                                    Time travel
                                    <img src="https://drive.google.com/uc?export=download&id=1EMkvkiqkf9EoBiiKBo0kv4xgJEMtmytf" width="40" style={{ marginLeft: '5px' }} />
                                </Button>
                            </Form.Group>
                        </Row>
                    </Form>
                    {showConfirmation && (
                            <span style={{ marginLeft: '10px', color: 'black' }}>Date changed</span>
                    )}
                </Navbar>
                : null}
        </>
    );
}

/**
 * Informs the user that the route is not valid
 */
function NotFoundPage() {
    return <>
        <div style={{ "textAlign": "center", "paddingTop": "2rem" }}>
            <h1>
                <i className="bi bi-exclamation-circle-fill" />
                {" "}
                404 Not found
            </h1>
            <br />
            <p>
                The requested page does not exist, please head back to the <Link to={"/"}>app</Link>.
            </p>
        </div>
    </>;
}

export {
    NotFoundPage,
    userContext,
    CustomNavbar,
};
