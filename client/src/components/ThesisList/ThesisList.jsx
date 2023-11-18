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
    const columns = [   //TO DO: dynamic width of columns
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

    const states = {loading: "Loading...", ready: "", error: "Error"};
    

    /*--------------- STATES ------------------*/
    const [thesis, setThesis] = useState([]);
    const [filters, setFilters] = useState(getEmptyFiltersObject());
    const [state, setState] = useState(states.loading);


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
        setState(states.loading);
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
            if (filters[prop] && filters[prop] != "")
            {
                return true;
            }
        }

        return false;
    }

    /*-----------------------------------------*/

    useEffect(()=>
    {
        if(state == states.loading)
        {
            API.getThesis(filters)
            .then(ret => 
                {
                    if (ret.status == 200 && ret.thesis.length > 0)
                    {
                        setThesis(ret.thesis); 
                        setState(states.ready);
                    } else
                    {
                        setState(states.error);
                    }
                    
                })
            .catch(e => setState(states.error));  
        }
        

    }, [state]);

    useEffect(()=>
    {
        setState(states.loading); 
    }, [props.date]);

    return (
        <contextState.Provider value={{state: state, setState: setState, states: states}}>
            <Container>
                { state == states.ready ? 
                    <><FiltersForm columns={columns} filters={[filters, setFilters, resetFilters, isFiltered]}/>
                    <ThesisTable columns={columns} thesis={thesis}/></>  
                    :  <Alert>{state}</Alert>
                }
            </Container>
        </contextState.Provider>
        
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

