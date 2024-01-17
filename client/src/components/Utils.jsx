import { createContext, useContext, useState } from "react";
import { Button, Col, Row, Form, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import "../navbar_sidebar.css";
import { IoMenuOutline as MenuIcon, IoClose as CloseIcon } from "react-icons/io5"

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
    const [isOpen, setIsOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        props.changeDateCbk(dayjs(date).format('YYYY-MM-DD'));
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 1000);
    }

    const openSidebar = () => {
        setIsOpen(true);
    }

    const closeSidebar = () => {
        setIsOpen(false);
    }

    return (
        <>
            {/* Top banner with logo and app name */}
            <Navbar expand="lg" className='bluePoli' variant="dark">
                <Navbar.Brand>
                    <img src="https://svgshare.com/i/11vY.svg" width="55" height="55" style={{ marginRight: '5px' }} alt="PoliTo logo" />
                    Thesis Management
                </Navbar.Brand>
            </Navbar>

            {/* App main navbar */}
            {user.email ?
                <header sticky="top" expand="lg" className="whiteNavbar mb-3">
                    <div className='generalNavbar shadow'>
                        <div className="menuBtn" onClick={() => openSidebar()}>
                            <MenuIcon size={30} />
                        </div>

                        <div className="links">
                            <Nav.Link as={Link} to={"/"} className="customLink" href='/'>Home</Nav.Link>
                            {user.role == 'teacher' || user.role == 'student' ? <Nav.Link as={Link} to={"/applications"} className="customLink" href='/applications'>Applications</Nav.Link> : null}
                            {user.role == 'teacher' ? <Nav.Link as={Link} to={"/archive"} className="customLink" href='/archive'>Archive</Nav.Link> : null}
                            {user.role == 'teacher' ? <Nav.Link as={Link} to={"/STRlist"} className="customLink" href='/STRlist'>Thesis Requests</Nav.Link> : null}
                            {user.role == 'teacher' || user.role == 'student' ? <Nav.Link as={Link} to={"/notifications"} className="customLink" href='/notifications'>Notifications</Nav.Link> : null}
                        </div>

                        <div className="auth">
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
                        </div>

                        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} user={user} />
                    </div>
                </header>
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
                                    <img src='https://svgshare.com/i/11ua.svg' alt="Delorean" width="40" style={{ marginLeft: '5px' }} />
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

CustomNavbar.propTypes = {
    logoutCbk: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    changeDateCbk: PropTypes.func.isRequired
};

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


function Sidebar(props) {
    return <>
        <div className={`sidebar ${props.isOpen && "open"}`}>
            <span className="closeIcon" onClick={() => props.closeSidebar()}>
                <CloseIcon size={30} />
            </span>

            <div className="mt-5">
                <Nav.Link as={Link} to={"/"} className="customSidebarLink" href='/' onClick={() => props.closeSidebar()}>Home</Nav.Link>
                {props.user.role == 'teacher' || props.user.role == 'student' ? <Nav.Link as={Link} to={"/applications"} className="customSidebarLink" href='/applications' onClick={() => props.closeSidebar()}>Applications</Nav.Link> : null}
                {props.user.role == 'teacher' ? <Nav.Link as={Link} to={"/archive"} className="customSidebarLink" href='/archive' onClick={() => props.closeSidebar()}>Archive</Nav.Link> : null}
                {props.user.role == 'teacher' ? <Nav.Link as={Link} to={"/STRlist"} className="customSidebarLink" href='/STRlist' onClick={() => props.closeSidebar()}>Thesis Requests</Nav.Link> : null}
                {props.user.role == 'teacher' || props.user.role == 'student' ? <Nav.Link as={Link} to={"/notifications"} className="customSidebarLink" href='/notifications' onClick={() => props.closeSidebar()}>Notifications</Nav.Link> : null}
            </div>
        </div>
    </>;
}

export {
    NotFoundPage,
    userContext,
    CustomNavbar,
    Sidebar
};
