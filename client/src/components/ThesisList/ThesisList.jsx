import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import {Alert, Container} from 'react-bootstrap';
import API from '../../API';
import { FiltersForm } from "./FiltersForm";
import { ThesisTable } from "./ThesisTable";

import contextState from "./contextState";





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
    

    /*--------------- STATES ------------------*/
    const [thesis, setThesis] = useState([]);
    const [filters, setFilters] = useState(getEmptyFiltersObject());
    const [state, setState] = useState(STATES.loading);
    const [page, setPage] = useState(1); //ATTENTION: pages numeration starts from 1
    const [entry_per_page, setEntry_per_page] = useState(0);
    const [nPages, setNPages] = useState(0);

    /*--------------- FUNCTIONS ------------------*/

    /** 
     * @param {object} thesis object given as an example.
     * 
     * @returns {array} columns corresponding to the property of the given object. 
     */
    function loadColumns(thesis)
    {
        let ret = [];
        for (let prop in thesis) {ret.push(prop);}
        return ret;
    }

    /** After this function, the filters object is in the initial state.
     * 
     */
    function resetFilters()
    {
        setFilters(getEmptyFiltersObject());
        setState(STATES.loading);
    }

    function getEmptyFiltersObject()
    {
        return {
            expirationDate: {to: "", from: ""},
            title: "",
            teacherName: "",
            coSupervisors: [],
            type: "",
            groups: [],
            level: "",
            programmes: ""
        }
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

    /*-----------------------------------------*/

    useEffect(()=>
    {
        if(state == STATES.loading)
        {
            let [start, end] = get_index_range_of_page(page);
            API.getThesis(filters, start, end)
            .then(ret => 
                {
                    if (ret.status == 200 && ret.thesis.length > 0)
                    {
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
        setState(STATES.loading); 
    }, [props.date, entry_per_page]);

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

