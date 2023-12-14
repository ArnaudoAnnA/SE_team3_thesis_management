
import {Table, Row, Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {useState} from 'react';



/*--------- UTILITY FUNCTIONS ------------- */
function data_obj_to_array(obj, columns)
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
function row_field_to_td(data_id, field_name, field_content)
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

function TableWithOrderByRow(props)
{
    const navigate = useNavigate();

    return (
        <tr key={props.row.id} onClick={() => navigate(props.linkURL)}>
            {
                props.columns.map((c,i) => <td style={{paddingLeft: "3vw"}} key={c.DBfield}>{row_field_to_td(props.row.id, c.DBfield, props.row[c.DBfield] || " ")}</td>)
            }
            <td><Link to={props.linkURL} className='text-info' style={{width: "1px"}}>Details</Link></td>
            <td className='text-info' style={{width: "1px"}}>▷</td>
        </tr>
    )
}

function InteractiveTh(props)
{

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
            {
                !props.isArray ? <ToggleArrow/> : <th></th>
            }
            <th>{props.col.title}</th>
        </tr> 
        </tbody>
    </Table></th>
}


/**
 * 
 * @param {{columns: [{title: string, DBfield: string}, ...], 
 * data: Array, 
 * orderBy: [{DBfield: string, mode: string ("ASC"|"DESC") }, ...],
 * orderByField: function(string, bool),
 * detailsPageURL: string}} props 
 *  
 */
function TableWithOrderBy(props)
{
    const columns = props.columns;
    const [data, setData] = useState(props.data);
    let key = 0;


    return (
        <>
        <Table responsive hover>
            <thead>
                <tr>
                    {
                        console.log(data)
                    }
                    {
                        columns.map( col => <InteractiveTh key={col.title} col={col} orderBy={props.orderBy} orderByField={props.orderByField} isArray={data && data[0] ? Array.isArray(data[0][col.DBfield]) : false}/>)
                    }
                <th style={{width: "1px"}}></th><th style={{width: "1px"}}></th>
                </tr>
            </thead>

            <tbody>
                {
                    data.map(r => <TableWithOrderByRow key={key++} row={r} columns={columns} linkURL={props.detailsPageURL+r.id}/>)
                }
            </tbody>
        </Table>
        </>
    )
}




export {TableWithOrderBy};

