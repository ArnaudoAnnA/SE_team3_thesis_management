
import {Table, Row, Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {useState} from 'react';



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
function row_field_to_td(thesis_id, field_name, field_content)
{
    // TO DO: add links to professor, group, ...

    if (field_name == "expirationDate") return dayjs(field_content).format('YYYY/MM/DD');

    if (Array.isArray(field_content)) 
    {
        let counter = 0;
        return <>{field_content.map(e => <div key={counter++}>{e}</div>)}</>
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
            <td><Link to={`/thesis/${props.row.id}`} className='text-info'>Details</Link></td>
            <td className='text-info'>▷</td>
        </tr>
    )
}

function InteractiveTh(props)
{
    let orderable = true;
    if (props.col.DBfield == "coSupervisors" || props.col.DBfield == "groups") orderable = false;

    let temp = props.orderBy.find(i => i.DBfield == props.col.DBfield);
    let asc = temp.mode == "ASC" ? true : false;

    function ToggleArrow()
    {
        return asc ? <th className='text-center icons change-bg-on-hover text-info' onClick={() => {props.orderByField(props.col.DBfield, false);}}>{"▿"}</th>
                    : <th className='text-center icons change-bg-on-hover text-info' onClick={() => { props.orderByField(props.col.DBfield, true); }}>{"▵"}</th>;
    }

    return <th key={props.col.DBfield}><Table borderless>
        <tbody>
        <tr>
            <th>{props.col.title}</th>
            {
                orderable ? <ToggleArrow/> : <th></th>
            }
        </tr> 
        </tbody>
    </Table></th>
}


function ThesisTable(props)
{
    const columns = props.columns;
    const [thesis, setThesis] = useState(props.thesis);
    let key = 0;


    return (
        <>
        <Table responsive hover>
            <thead>
                <tr>
                    {
                        columns.map( col => <InteractiveTh key={col.title} col={col} orderBy={props.orderBy} orderByField={props.orderByField}/>)
                    }
                <th></th><th></th>
                </tr>
            </thead>

            <tbody>
                {
                    thesis.map(r => <ThesisRow key={key++} row={r} columns={columns}/>)
                }
            </tbody>
        </Table>
        </>
    )
}




export {ThesisTable};

