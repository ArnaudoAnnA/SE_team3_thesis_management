import { createContext, useContext, useState } from "react";
import { Alert, Button, Container, Col, Row, Card, Form, Navbar } from "react-bootstrap";
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
            <Navbar sticky="top" expand="lg" className='colorNav1'>
                <Container>
                    <Col>
                        {/* Polito logo */}
                    </Col>
                    {/* change date */}
                </Container>
            </Navbar>
            {true ?
                <Navbar sticky="top" expand="lg" className='colorNav2 mb-3 shadow'>
                    <Container>
                        {/* <Col>
                            <Navbar.Brand><Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                                <i className="bi bi-file-earmark-fill" />
                                {" "}
                                {props.appName}
                            </Link></Navbar.Brand>
                            {user.id ? <Link to='/pages' style={{ color: 'black', textDecoration: 'none', marginLeft: '10px' }}>EDIT PAGES</Link> : ''}
                            {user.role === 'admin' ? <Link to='/appname' style={{ color: 'black', textDecoration: 'none', marginLeft: '20px' }}>CHANGE NAME</Link> : ''}
                        </Col>
                        {user.id ?
                            <Navbar.Text style={{ color: 'white' }}>
                                Signed in as: {user.username}
                                <Link to='/' style={{ textDecoration: 'none', marginLeft: '10px' }} onClick={props.logoutCbk}>LOGOUT</Link>
                            </Navbar.Text> :
                            <Link to='/login' style={{ color: 'black', textDecoration: 'none' }}>
                                LOGIN
                                {" "}
                                <i className="bi bi-person-fill" />
                            </Link>
                        } */}
                    </Container>
                </Navbar>
                : ''}
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
