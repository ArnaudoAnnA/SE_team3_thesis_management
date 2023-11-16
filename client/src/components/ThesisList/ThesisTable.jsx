
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
function row_field_to_td(row_id, field_name, field_content)
{
    // TO DO: add links to professor, group, ...

    switch (field_name)
    {
        case "coSupervisors":
        case "groups":
            let counter = 0;
            return <>{field_content.map(e => <p key={counter++}>{e}</p>)}</>
        break;


    }
    
    return field_content;
}


/* ------------------------------------- */

function ThesisRow(props)
{
    const navigate = useNavigate();

    return (
        <tr key={props.row.id} onClick={() => navigate(`/thesis/${props.row.id}`)}>
            {
                props.columns.map((c,i) => <td key={c.DBfield}>{row_field_to_td(props.row.id, c.DBfield, props.row[c.DBfield] || " ")}</td>)
            }
        </tr>
    )
}

function InteractiveTh(props)
{
    let orderable = true;
    if (props.col.DBfield == "coSupervisors" || props.col.DBfield == "groups") orderable = false;

    return <th key={props.col.DBfield}><Table borderless>
        <tbody>
        <tr>
            <th>{props.col.title}</th>
            {
                orderable ?
                <th>{props.isOrderedBy(props.col.DBfield) == "ASC" ? <p className='text-center icons' onClick={() => props.orderBy(props.col.DBfield, false)}>{"↓"}</p>
                                                    : <p className='text-center icons' onClick={() => props.orderBy(props.col.DBfield, true)}>{"↑"}</p>}
                </th>
                : ""
            }
        </tr> 
        </tbody>
    </Table></th>
}


function ThesisTable(props)
{
    const columns = props.columns;
    let key = 0;

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
                    props.thesis.map(r => <ThesisRow key={key++} row={r} columns={columns}/>)
                }
            </tbody>
        </Table>
        </>
    )
}




export {ThesisTable};

