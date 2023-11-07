
import {Table} from 'react-bootstrap';



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


/* ------------------------------------- */

function ThesisRow(props)
{
    let row = thesis_obj_to_array(props.row, props.columns);

    return (
        <tr>
            {
                row.map(c => <td>{c}</td>)
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

    let count = 0;

    return (
        <>
        <Table responsive>
            <thead>
                <tr>
                    {
                        columns.map( col => <th>{col.title}</th>)
                    }
                </tr>
            </thead>

            <tbody>
                {
                    props.data.map(r => <ThesisRow key={count++} row={r} columns={columns}/>)
                }
            </tbody>
        </Table>
        </>
    )
}




export {ThesisTable};

