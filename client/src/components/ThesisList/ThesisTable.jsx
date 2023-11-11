
import {Table, Row, Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';



/*--------- UTILITY FUNCTIONS ------------- */
function thesis_obj_to_array(obj, columns)
{
    let ret = [];

    for (let prop in obj)
    {
        let found = false;
        for (let i = 0; i<columns.length && !found; i++)
        {
            if(columns[i].DBfield == prop) 
            {
                ret[i] = obj[prop];
                found = true;
            }
        }
    }

    return ret;
}

/**
 * 
 * @param {*} row_id 
 * @param {*} field_name 
 * @param {*} field_content
 * @returns a link to the specific item if exists, or the content of the field itself
 */
function row_field_to_link(row_id, field_name, field_content)
{
    // TO DO: add links to professor, group, ...
    
    return field_content;
}


/* ------------------------------------- */

function ThesisRow(props)
{
    const navigate = useNavigate();
    let row = thesis_obj_to_array(props.row, props.columns); //ATTENTION: each prop of the object which does not correspond to a column (id included) would not be present in the array called "row"

    return (
        <tr key={props.row.id} onClick={() => navigate(`/thesis/${props.row.id}`)}>
            {
                row.map((c,i) => <td key={c}>{row_field_to_link(props.row.id, props.columns[i].DBfield, c)}</td>)
            }
        </tr>
    )
}

function InteractiveTh(props)
{
    return <th className='align-middle'>
        <Row className='align-middle'>
            <Col className='col-7'>{props.col.title}</Col>
            <Col className='col-1 align-middle'>{props.isOrderedBy(props.col.DBfield) == "ASC" ? <p className='text-center icons' onClick={() => props.orderBy(props.col.DBfield, false)}>{"↓"}</p>
                                                    : <p className='text-center icons' onClick={() => props.orderBy(props.col.DBfield, true)}>{"↑"}</p>}
            </Col>
        </Row> 
    </th>
}


function ThesisTable(props)
{
    const columns = props.columns;

    return (
        <>
        <Table responsive hover style={{minWidth: "700px"}}>
            <thead>
                <tr>
                    {
                        columns.map( col => <InteractiveTh key={col.title} col={col} orderBy={props.orderBy} isOrderedBy={props.isOrderedBy} />)
                    }
                </tr>
            </thead>

            <tbody>
                {
                    props.data.map(r => <ThesisRow key={r.id} row={r} columns={columns}/>)
                }
            </tbody>
        </Table>
        </>
    )
}




export {ThesisTable};

