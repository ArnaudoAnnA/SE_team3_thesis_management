import { createContext, useContext, useState } from "react";
import { Button, Col, Row, Form, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "../navbar.css"

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
                <Navbar sticky="top" expand="lg" className='whiteNavbar mb-3 shadow' collapseOnSelect>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link as={Link} to={"/"} className="customLink" href='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to={"/applications"} className="customLink" href='/applications'>Applications</Nav.Link>
                            {user.role == 'teacher' ?
                                <>
                                    <Nav.Link as={Link} to={"/archive"} className="customLink" href='/archive'>Archive</Nav.Link>
                                </>
                                : null}
                            <Nav.Link as={Link} to={"/notifications"} className="customLink" href='/notifications'>Notifications</Nav.Link>
                        </Nav>
                    </ Navbar.Collapse>
                    <NavDropdown title={<i className="bi bi-person-circle" style={{ fontSize: '2rem' }} />} id="basic-nav-dropdown" style={{ marginRight: '10px' }} className="dropdown-menu-right">
                        <NavDropdown.Header>
                            <Row> {`${user.name} ${user.surname}`} </Row>
                            <Row> {`${user.email}`} </Row>
                        </NavDropdown.Header>
                        <NavDropdown.Item as={Link} to='/' onClick={props.logoutCbk}>
                            <i className="bi bi-box-arrow-right" style={{ marginRight: '5px' }} />
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
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
