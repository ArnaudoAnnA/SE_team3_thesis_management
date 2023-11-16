import { Link, useNavigate, useParams } from "react-router-dom";
import {Button, Container, Table, Col, Row} from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import API from '../../API'
import { Arrow90degLeft } from "react-bootstrap-icons";
import { userContext } from "../Utils";


function object_prop_to_table_row(key, value)
{
    let ret;
    switch(key)
    {
        case "id":
        case "description":
        case "notes":
        case "title":
        case "supervisor":
        break;

        

        default:
            ret = <tr key={key}><th>{key}</th><td>{value}</td></tr>
    }

    return ret;
}

function ThesisDetails(props)
{
    const {id} =  useParams();
    const [thesis, setThesis] = useState();
    const navigate = useNavigate();
    const user = useContext(userContext);

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
                        <Table className="" size="sm" borderless>
                            <tbody>
                                {Object.entries(thesis).map(([key, value]) => object_prop_to_table_row(key, value))}
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