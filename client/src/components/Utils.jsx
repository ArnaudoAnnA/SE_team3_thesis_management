import { createContext, useContext, useState } from "react";
import { Alert, Button, Container, Col, Row, Card, Form, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

/** Context used to propagate the user object */
const userContext = createContext();

/**
 * A custom navigation bar at the top of the app.
 * 
 * @param props.user object with all the currently logged in user's info
 * @param props.logoutCbk callback to perform the actual logout
 * @param props.changeDateCbk callback to change the date
 */

function CustomNavbar(props) {
    const user = useContext(userContext);
    return (
        <>
            <Navbar sticky="top" expand="lg" className='colorNav1' variant="dark">
                <Navbar.Brand>
                    <img src="https://drive.google.com/uc?export=download&id=1HTuSShZT0omPheSlNEMBWKPypY8OeaOY" width="55" height="55" style={{ marginRight: '5px' }} alt="" />
                    Thesis Management
                </Navbar.Brand>
            </Navbar>
            {true ? // TODO change to user.email
                <Navbar sticky="top" expand="lg" className='colorNav2 mb-3 shadow' collapseOnSelect>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link as={Link} to={"/"} className="white">Home</Nav.Link>
                            {true ?  // TODO change to user.role === "professor"
                                <>
                                    <Nav.Link as={Link} to={"/"} className="white">Thesis</Nav.Link>
                                    <Nav.Link as={Link} to={"/"} className="white">Archive</Nav.Link>
                                    <Nav.Link as={Link} to={"/"} className="white">Applications</Nav.Link>

                                </>
                                : null}
                            <Nav.Link as={Link} to={"/"} className="white">Notifications</Nav.Link>
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
