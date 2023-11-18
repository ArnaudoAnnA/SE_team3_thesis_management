import { Link, useNavigate, useParams } from "react-router-dom";
import {Button, Container, Table, Col, Row} from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import API from '../../API'
import { Arrow90degLeft } from "react-bootstrap-icons";
import { userContext } from "../Utils";
import dayjs from "dayjs";


function object_prop_to_td(key, value)
{
    let ret;
    switch(key)
    {
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

function ThesisDetails(props)
{
    /*-------- COSTANTS --------------- */
    const {id} =  useParams();
    const FIELDS = [
        {DBfield: "expirationDate", title: "Exipiration date"},
        {DBfield: "coSupervisors", title: "Co-supervisors"},
        {DBfield: "programmes", title: "Programmes"},
        {DBfield: "groups", title: "Groups"},
        {DBfield: "type", title: "Type"},
        {DBfield: "level", title: "Level"},
        {DBfield: "requiredKnowledge", title: "Required knowledges"},
    ]


    /* ------ STATES ----------------- */
    const [thesis, setThesis] = useState(props.thesis);

    /* ------ CONTEXTS ----------------- */ 
    const user = useContext(userContext);

    /* --------------------------------- */


    useEffect( () =>
    {
        API.getThesisWithId(id)
        .then(t => setThesis(t))
        .catch(); //TO DO: define error state
    }, []);

    return <Container>
        {
            thesis ? <>
                        <Row>
                            <Col className="col-1"><Link to='/'><Button className="blueButton"><Arrow90degLeft /></Button></Link></Col>
                            {user.role=='teacher' ? null : <Col className="col-1"><Link to={'/thesis/'+thesis.id+'/apply'}><Button className="blueButton">Apply</Button></Link></Col>}
                        </Row>
                        
                        <hr size={10}/>
                        <h1>{thesis.title}</h1>
                        <h6><i>{thesis.supervisor}</i></h6>
                        <hr />
                        <Table className="" size="sm">
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

export {ThesisDetails}