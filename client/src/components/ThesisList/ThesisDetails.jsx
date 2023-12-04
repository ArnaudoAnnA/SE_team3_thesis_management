import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import API from '../../API'
import { Arrow90degLeft } from "react-bootstrap-icons";
import { userContext } from "../Utils";
import dayjs from "dayjs";


function object_prop_to_td(key, value) {
    let ret;
    switch (key) {
        case "expirationDate":
            return dayjs(value).format("YYYY/MM/DD");

        case "coSupervisors":
        case "groups":
            let key = 0;
            return value.map(e => <div key={key++}>{e}</div>);

        default:
            return value;
    }

    return ret;
}

function ThesisDetails(props) {
    /*-------- COSTANTS --------------- */
    const { id } = useParams();
    const FIELDS = [
        { DBfield: "expirationDate", title: "Exipiration date" },
        { DBfield: "coSupervisors", title: "Co-supervisors" },
        { DBfield: "programmes", title: "Programmes" },
        { DBfield: "groups", title: "Groups" },
        { DBfield: "type", title: "Type" },
        { DBfield: "level", title: "Level" },
        { DBfield: "requiredKnowledge", title: "Required knowledges" },
    ]


    /* ------ STATES ----------------- */
    const [thesis, setThesis] = useState(props.thesis);
    const [appliedTwice, setAppliedTwice] = useState(false);

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
            .then(t => setThesis(t))
            .catch(); //TO DO: define error state

        async function checkApplyTwice() {
            const app = await API.getApplication(user.id, id);
            if ((typeof app) == "string") {
                //unauthorized or notLogged
                errorAlert(app);
                return;
            }

            if (app) {
                setAppliedTwice(true);
            } else {
                setAppliedTwice(false);
            }
        }

        checkApplyTwice();
    }, []);

    return <Container>
        {
            thesis ? <>
                <Row>
                    <Col className="col-1"><Link to={nextpage} state={{activeKey: activeKey}}><Button className="blueButton"><Arrow90degLeft /></Button></Link></Col>
                    {user.role == 'teacher' ? null : <>
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
                    </>}
                </Row>

                <hr size={10} />
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h1>{thesis.title}</h1>
                {user.role == 'teacher'  && (
                <Button
                  variant="warning"
                  style={{
                    fontStyle: "italic",
                    height:"35%",
                    padding: "0.5% 1%"
                  }}
                  onClick={() => console.log("You pressed edit!")}
                >
                  Edit
                  <svg style={{marginLeft: "5px", marginBottom: "10%"}} xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </Button> )}
                </div>
                <h6><i>{thesis.supervisor}</i></h6>
                <hr />
                <Table className="" >
                    <tbody>
                        {FIELDS.map(f => <tr><th>{f.title}</th><td>{object_prop_to_td(f.DBfield, thesis[f.DBfield])}</td></tr>)}
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
                : "" //TO DO: loading
        }

    </Container>;
}

export { ThesisDetails }