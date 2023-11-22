import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import {Alert, Container} from 'react-bootstrap';
import API from '../../API';
import { FiltersForm } from "./FiltersForm";
import { ThesisTable } from "./ThesisTable";

import contextState from "./contextState";
import { orderBy } from "lodash";





function ThesisList(props)
{
    /* ------ COSTANTS ------------ */
    const COLUMNS = [   //TO DO: dynamic width of columns
        { DBfield: "title", title: "Title",  },
        { DBfield: "supervisor", title: "Supervisor",  },
        { DBfield: "coSupervisors", title: "Co-Supervisors",  }, //array
        { DBfield: "type", title: "Type",  },
        { DBfield: "groups", title: "Groups",  }, //array
        { DBfield: "expirationDate", title: "Expiration date",  },
        { DBfield: "level", title: "Level",  },
        { DBfield: "programmes", title: "Programmes",  }
        //further info in the thesis dedicated page
    ];

    const STATES = {loading: "Loading...", ready: "", error: "Error"};

    const DEFAULT_FILTERS =  {
        expirationDate: {to: "", from: ""},
        title: "",
        teacherName: "",
        coSupervisors: [],
        type: "",
        groups: [],
        level: "",
        programmes: ""
    };

    const DEFAULT_ORDERBY = COLUMNS.map(c => {return {DBfield: c.DBfield, mode: "ASC"}; });
    

    /*--------------- STATES ------------------*/
    const [thesis, setThesis] = useState([]);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [old_filters, setOld_filters] = useState();
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDERBY);
    const [old_orderBy, setOld_orderBy] = useState();

    const [state, setState] = useState(STATES.loading);
    const [page, setPage] = useState(1); //ATTENTION: pages numeration starts from 1
    const [entry_per_page, setEntry_per_page] = useState(0);
    const [nPages, setNPages] = useState(0);

    /*--------------- FUNCTIONS ------------------*/

    /** After this function, the filters object is in the initial state. 
     */
    function resetFilters()
    {
        setFilters(Object.assign({}, DEFAULT_FILTERS));
        setState(STATES.loading);
    }

    /**
     * @returns {bool} true if some filter is applyed. Ordering is excluded.
     */
    function isFiltered()
    {
        for (let prop in filters)
        {
            if (prop == "expirationDate" && (filters[prop].from != "" || filters[prop].to != ""))
            {
                return true;
            }
            if (filters[prop] && typeof(filters[prop]) == "string"  && filters[prop] != "")
            {
                return true;
            }
            if (filters[prop] && Array.isArray(filters[prop]))
            {
                if(filters[prop].find(v => {if(v && v!="") return true})) return true;
            }
        }

        return false;
    }

    function isQueryChanged()
    {
        if (!old_filters || !old_orderBy) return true;

        return !(old_filters.toString() === filters.toString() && old_orderBy.toString() === orderBy.toString());

        /*
        for (let [f1, i] of old_orderBy)
        {
            let f2 = orderBy[i];

        }

        for (let prop in old_filters)
        {
            if( (old_filters[prop] && !filters[prop]) || (old_filters[prop] && !filters[prop])) return true;
            if (typeof old_filters[prop] == "string")
            {
                if (old_filters[prop] != filters[prop]) return true;
            }else if(Array.isArray(old_filters[prop]))
            {
                for (let [v, i] of old_filters[prop])
                {
                    if(v != filters[i]) return true;
                }
            }else
            {
                console.log(`ERROR: (isQueryChanged()) invalid type of filters.${prop}`);
            }
        }*/
    }

    /*-----------------------------------------*/

    useEffect(()=>
    {
        if(state == STATES.loading)
        {
            let lastThesisID = isQueryChanged() ? undefined : ( thesis[entry_per_page-1] || thesis[-1] );
            API.getThesis(filters, orderBy, lastThesisID, entry_per_page)
            .then(ret => 
                {
                    if (ret.status == 200)
                    {
                        setOld_filters({...filters});
                        setOld_orderBy({...orderBy});
                        setThesis(ret.thesis);
                        setState(STATES.ready);
                    } else
                    {
                        setState(STATES.error);
                    }
                    
                })
            .catch(e => setState(STATES.error));  
        }
        

    }, [state]);

    useEffect(()=>
    {
        if(state != STATES.loading) setState(STATES.loading); 
    }, [props.date, entry_per_page, orderBy]);

    useEffect(() =>
    {
        let new_epp = window.innerHeight / 100;
        setEntry_per_page( new_epp ) ;

        API.getThesisNumber()
        .then(n => setNPages(n/new_epp + (n%new_epp == 0 ? 0 : 1)))
        .catch(e => {console.log(e); setState(STATES.error);})
        
    });

    return (
        <contextState.Provider value={{state: state, setState: setState, states: STATES}}>
            <Container>
                { state == STATES.ready ? 
                    <><FiltersForm filters={[filters, setFilters, resetFilters, isFiltered]}/>
                    <ThesisTable columns={COLUMNS} thesis={thesis}/>
                    <TablePagination active={[page, setPage]} nPages={nPages}/></>  
                    :  <Alert>{state}</Alert>
                }
            </Container>
        </contextState.Provider>
        
    )
}

function TablePagination(props)
{
    let [active, setActive] = props.active;
    let nPages = props.nPages;
    let items = [];

    for (let number = 1; number <= nPages; number++) {
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

