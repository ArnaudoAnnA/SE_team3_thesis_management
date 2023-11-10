import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import {Alert, Container} from 'react-bootstrap';
import API from '../../API';
import { FiltersForm } from "./FiltersForm";
import { ThesisTable } from "./ThesisTable";





function ThesisList(props)
{
    /* ------ COSTANTS ------------ */
    const columns = [   //TO DO: dynamic width of columns
        { DBfield: "title", title: "Title",  },
        { DBfield: "supervisor", title: "Supervisor",  },
        { DBfield: "coSupervisors", title: "Co-Supervisors",  },
        { DBfield: "type", title: "Type",  },
        { DBfield: "groups", title: "Groups",  },
        { DBfield: "expirationDate", title: "Expiration date",  },
        { DBfield: "level", title: "Level",  },
        { DBfield: "programmes", title: "Programmes",  }
        //further info in the thesis dedicated page
    ];
    

    /*--------------- STATES ------------------*/
    //const [entry_per_page, setEntry_per_page] = useState(0);
    const [page, setPage] = useState(1);
    const [n_pages, setN_pages] = useState(0);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({orderBy: columns.map(c => Object.assign({}, {field: c.DBfield, mode: "ASC"})) , 
                                            searchKeyWord: ""}); /*TO DO: add filters */ 

    /*--------------- VARIABLES ------------------*/
    let entry_per_page = Math.floor(window.innerHeight / 100);


    /*--------------- FUNCTIONS ------------------*/

    /** Add a field to the ones which are currently considered for ordering.
     * In particular, the field is added at the beginning of the list, so that it will
     * be the first field in the ORDER BY clause of the db query.
     * If the field was already present, this method siply moves it into the front of the list.
     * 
     * @param {string} field must be present in the columns array
     * @param {bool} asc if true, the ordering is ascendant, otherwise descendant
     */
    function orderBy(field, asc)
    {
        if (!columns.find(f => f.DBfield == field)) { console.log(`invalid field passed to ThesisList::orderBy: ${field}`); return; }
        if (typeof asc != "boolean") {console.log(`ThesisList::orderBy wants the second parameter to be a boolean (the value ${asc} has been passed)`); return;}

        let new_orderBy = [ ...filters.orderBy];
        let temp_index = new_orderBy.findIndex(o => o.field == field);
        if (temp_index >= 0) new_orderBy.splice(temp_index, 1);
        new_orderBy.unshift({field: field, mode: (asc ? "ASC" : "DESC")});

        setFilters(f => Object.assign({}, f, {orderBy: new_orderBy}));
    }

    /**
     * @param {string} field must be present in the columns array.
     * 
     * @returns "ASC" or "DESC"
     */
    function isOrderedBy(field)
    {
        if (!columns.find(f => f.DBfield == field)) { console.log(`invalid field passed to ThesisList::isOrderedBy(): ${field}`); return; }
        let entry = filters.orderBy.find(c => c.field == field);
        if(!entry) {console.log(`BUG: ThesisList::isOrderedBy() the field ${field} is a valid column, but it is not in the filters.orderBy array`); return;}

        return entry.mode;
    }

    /*-----------------------------------------*/

    useEffect(()=>
    {
        /* TO DO: call a different API basing on the applyied filter */
        API.getThesis(filters, get_index_range_of_page(page, entry_per_page))
        .then(d => setData(d))
        .catch();  // TO DO: define global error state

        API.getThesisNumber(filters)
        .then(n => setN_pages(n/entry_per_page + (n%entry_per_page == 0 ? 0 : 1)))
        .catch();  // TO DO: define global error state

    }, [page, filters, entry_per_page]);

    return (
        <>
            <Container>
                <FiltersForm filters={[filters, setFilters]}/>
                <ThesisTable columns={columns} data={data} orderBy={orderBy} isOrderedBy={isOrderedBy}/>
                <TablePagination active={[page, setPage]} n_pages={n_pages}/>
                
            </Container>
        </>
        
    )
}

function TablePagination(props)
{
    let [active, setActive] = props.active;
    let n_pages = props.n_pages;
    let items = [];

    for (let number = 1; number <= n_pages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={event => setActive(event.target.innerText)}>
                {number}
            </Pagination.Item>,
        );
    }

    return <Pagination size="sm">{items}</Pagination>;

}


/* ---------- UTILITY FUNCTIONS -------- */
function get_index_range_of_page(page, entry_per_page)
{
    return [(page-1)*entry_per_page, page*entry_per_page -1];
}

export { ThesisList };

