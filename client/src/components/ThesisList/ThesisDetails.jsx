import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Alert, Button, Container, Dropdown, DropdownButton, Modal, Table, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import API from '../../API'
import { Arrow90degLeft } from "react-bootstrap-icons";
import { userContext } from "../Utils";
import dayjs from "dayjs";
import Swal from 'sweetalert2';


function object_prop_to_td(key, value) {
    switch (key) {
        case "expirationDate":
            return dayjs(value).format("YYYY/MM/DD");

        case "keywords":
        case "coSupervisors":
        case "groups": {
            let key = 0;
            return value.map(e => <div key={key++}>{e}</div>);
        }

        default:
            return value;
    }
}

function ThesisDetails(props) {
    /*-------- COSTANTS --------------- */
    const { id } = useParams();

    const STATES = { LOADING: "Loading...", ERROR: "Some error occoured...", READY: "ready" };
    const FIELDS = [
        { DBfield: "expirationDate", title: "Exipiration date" },
        { DBfield: "coSupervisors", title: "Co-supervisors" },
        { DBfield: "programmes", title: "Programmes" },
        { DBfield: "groups", title: "Groups" },
        { DBfield: "type", title: "Type" },
        { DBfield: "level", title: "Level" },
        { DBfield: "requiredKnowledge", title: "Required knowledges" },
        { DBfield: "keywords", title: "Keywords" }
    ];

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseArchiveModal = () => setShowArchiveModal(false);
    const handleShowArchiveModal = () => setShowArchiveModal(true);

    const successAlert = (mode) => {
        let textField;
        switch (mode) {
            case "delete":
                textField = "Thesis deleted successfully!";
                break;
            case "archive":
                textField = "Thesis archived successfully!";
                break;
            default:
                textField = "";
        }

        Swal.fire({
            title: 'Done!',
            text: textField,
            icon: 'success'
        });
        navigate("/");
    };

    const errorAlert = (mode) => {
        let textField;
        switch (mode) {
            case "delete":
                textField = "An error occurred while deleting the thesis. Please try again later.";
                break;
            case "archive":
                textField = "An error occurred while archiving the thesis. Please try again later.";
                break;
            default:
                textField = "";
        }

        Swal.fire({
            title: 'Error!',
            text: textField,
            icon: 'error'
        });
    };

    async function deleteThesis() {
        API.deleteProposal(id)
            .then((res) => {
                if (res.error) {
                    console.log("Error in ThesisDetails/deleteThesis:" + res.error);
                    errorAlert("delete");
                } else {
                    setShowModal(false);
                    successAlert("delete");
                }
            })
            .catch(e => {
                console.log("Error in ThesisDetails/deleteThesis:" + e);
                errorAlert("delete");
            })
    };

    const archiveThesis = async () => {
        API.archiveThesis(id)
            .then((res) => {
                if (res.error) {
                    console.log("Error in ThesisDetails/archiveThesis:" + res.error);
                    errorAlert("archive");
                } else {
                    setShowArchiveModal(false);
                    successAlert("archive");
                }
            })
            .catch(e => {
                console.log("Error in ThesisDetails/archiveThesis:" + e);
                errorAlert("archive");
            })
    };

    /* ------ STATES ----------------- */
    const [thesis, setThesis] = useState(props.thesis);
    const [appliedTwice, setAppliedTwice] = useState(false);
    const [isArchived, setIsArchived] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [state, setState] = useState(STATES.LOADING);

    /* ------ CONTEXTS ----------------- */
    const user = useContext(userContext);

    /* ------ NAVIGATE ----------------- */
    const navigate = useNavigate();
    const location = useLocation();
    const nextpage = location.state?.nextpage || '/';
    const activeKey = location.state?.activeKey || 'Pending';

    /* --------------------------------- */


    useEffect(() => {
        API.getThesisWithId(id)
            .then(t => {
                if (!t.error) {
                    setThesis(t.thesis);
                    if (t.thesis.archiveDate <= props.date) {
                        setIsArchived(true);
                    } else {
                        setIsArchived(false);
                    }
                    setState(STATES.READY);
                } else {
                    console.log("Error in ThesisDetail/getThesisWithId:" + t.error);
                    setState(STATES.ERROR);
                }
            })
            .catch(e => {
                console.log("Error in ThesisDetail/getThesisWithId:" + e);
                setState(STATES.ERROR);
            });

        async function checkApplyTwice() {
            const app = await API.getApplication(user.id, id);

            if (app.status == 401) {
                //unauthorized or notLogged
                errorAlert(app.error);
                return;
            }

            if (app.status == 200 && app.application != null) {
                setAppliedTwice(true);
            } else {
                setAppliedTwice(false);
            }
        }

        if (user.role == 'student') checkApplyTwice();
    }, []);

    return <Container>
        {
            state === STATES.READY ? <>
                <Modal
                    show={showModal}
                    onHide={() => handleCloseModal()}
                    backdrop="static" //if you click outside the modal, the modal does not disappear
                    keyboard={true} //if you press 'esc' is like clicking on X
                >
                    <Modal.Header closeButton>
                        <Modal.Title> <i className="bi bi-exclamation-triangle" style={{ color: "red" }}></i> &nbsp; <span style={{ color: "red" }}> Attention </span> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Do you really want to delete this thesis? The action is irreversible. </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <Button variant="danger" onClick={() => deleteThesis()}> Yes </Button>
                        <Button variant="secondary" onClick={() => handleCloseModal()}> No </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={showArchiveModal}
                    onHide={() => handleCloseArchiveModal()}
                    backdrop="static" //if you click outside the modal, the modal does not disappear
                    keyboard={true} //if you press 'esc' is like clicking on X
                >
                    <Modal.Header closeButton>
                        <Modal.Title> <i className="bi bi-exclamation-triangle" style={{ color: "red" }}></i> &nbsp; <span style={{ color: "red" }}> Attention </span> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Do you really want to archive this thesis? </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <Button variant="danger" onClick={() => archiveThesis()}> Yes </Button>
                        <Button variant="secondary" onClick={() => handleCloseArchiveModal()}> No </Button>
                    </Modal.Footer>
                </Modal>

                <Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <Col className="col-1"><Link to={nextpage} state={{ activeKey: activeKey }}><Button className="blueButton"><Arrow90degLeft /></Button></Link></Col>
                    {user.role == 'student' ? <>
                        <Col className="col-7"></Col>
                        <Col className="col-4 d-flex justify-content-end">
                            {appliedTwice ?
                                <Row>
                                    <Col className="d-flex justify-content-end">
                                        <h5 style={{ color: "green", textDecoration: "underline" }}>
                                            You applied for this thesis
                                        </h5>
                                    </Col>
                                </Row>
                                : <Link to={'/thesis/' + thesis.id + '/apply'}><Button className="blueButton">Apply</Button></Link>
                            }
                        </Col>
                    </> : null}
                </Row>

                <hr size={10} />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <h3>{thesis.title}</h3>
                    {user.role == 'teacher' && !isArchived && (
                        <>
                            <DropdownButton id="dropdown-basic-button" title="Actions ▼" variant="warning">
                                <Dropdown.Item className="py-2" onClick={() => handleShowModal()}> Delete <svg style={{ marginLeft: "1px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="py-2" onClick={() => navigate("/upproposal/" + thesis.id)}> Update <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="py-2" onClick={() => handleShowArchiveModal()}> Archive <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                </svg></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="py-2" onClick={() => navigate("/cpproposal/" + thesis.id)}> Copy <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                </svg></Dropdown.Item>
                            </DropdownButton>

                        </>
                    )}
                </div>
                <h6><i>{thesis.supervisor}</i></h6>
                <hr />
                <Table className="" >
                    <tbody>
                        {FIELDS.map(f => <tr key={f.title}><th>{f.title}</th><td>{object_prop_to_td(f.DBfield, thesis[f.DBfield])}</td></tr>)}
                    </tbody>
                </Table>
                <hr />
                <h2>Description</h2>
                <p>{thesis.description}</p>
                {thesis.notes ? <>
                    <h4><i>Notes:</i></h4>
                    <p>{thesis.notes}</p>
                </>
                    : ""
                }

            </>
                : (state === STATES.LOADING ?
                    <Spinner animation="border" role="status" /> :
                    <Alert style={{ textDecoration: "underline" }}> Some errors occurred </Alert>)
        }

    </Container>;
}

export { ThesisDetails }