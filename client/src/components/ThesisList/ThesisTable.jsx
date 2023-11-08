
import {Table} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';



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
    //TO DO: mark visited links
    if (field_name == "title") return <Link to={`/thesis/${row_id}`}>{field_content}</Link> 
    // TO DO: add links to professor, group, ...
    
    return field_content;
}


/* ------------------------------------- */

function ThesisRow(props)
{
    const navigate = useNavigate();
    let row = thesis_obj_to_array(props.row, props.columns); //ATTENTION: each prop of the object which does not correspond to a column (id included) would not be present in the array called "row"

    return (
        <tr key={props.row.id}>
            {
                row.map((c,i) => <td key={c}>{row_field_to_link(props.row.id, props.columns[i].DBfield, c)}</td>)
            }
        </tr>
    )
}


function ThesisTable(props)
{
    /* ------ COSTANTS ------------ */
    const columns = [   //TO DO: dynamic width of columns
        { DBfield: "title", title: "Title",  },
        { DBfield: "supervisor", title: "Supervisor",  },
        { DBfield: "co_supervisor", title: "Co-Supervisor",  },
        { DBfield: "type", title: "Type",  },
        { DBfield: "groups", title: "Groups",  },
        { DBfield: "expiration", title: "Expiration",  },
        { DBfield: "level", title: "Level",  }
        //further info in the thesis dedicated page
    ];

    return (
        <>
        <Table responsive>
            <thead>
                <tr>
                    {
                        columns.map( col => <th key={col.title}>{col.title}</th>)
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

