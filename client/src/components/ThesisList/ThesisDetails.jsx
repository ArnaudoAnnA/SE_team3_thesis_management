import { useParams } from "react-router-dom";
import {Container, Table} from "react-bootstrap";
import { useEffect, useState } from "react";
import API from '../../API'


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

    useEffect( () =>
    {
        API.getThesisWithId(id)
        .then(t => setThesis(t))
        .catch(); //TO DO: define error state
    })

    return <Container>
        {
            thesis ? <>
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