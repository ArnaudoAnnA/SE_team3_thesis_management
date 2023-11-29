import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import {Alert, Container, Row, Col, Button} from 'react-bootstrap';
import API from '../../API';
import { FiltersForm } from "./FiltersForm";
import { ThesisTable } from "./ThesisTable";
import ClipLoader from "react-spinners/ClipLoader";

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
        { DBfield: "expirationDate", title: "Expiration",  },
        { DBfield: "level", title: "Level",  },
        { DBfield: "programmes", title: "Programmes",  }
        //further info in the thesis dedicated page
    ];

    const STATES = {loading: "Loading...", ready: "", error: "Error", show_more: "Fetching..."};

    const DEFAULT_FILTERS =  {
        expirationDate: {to: "", from: ""},
        title: "",
        supervisor: "",
        coSupervisors: "",
        type: "",
        groups: "",
        level: "",
        programmes: ""
    };

    const DEFAULT_ORDERBY = COLUMNS.map(c => {return {DBfield: c.DBfield, mode: "ASC"}; });

    const ENTRIES_PER_PAGE = Math.floor(window.innerHeight /100);
    

    /*--------------- STATES ------------------*/
    const [thesis, setThesis] = useState([]);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    //const [old_filters, setOld_filters] = useState();
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDERBY);
    //const [old_orderBy, setOld_orderBy] = useState();

    const [state, setState] = useState(STATES.loading);
    //const [page, setPage] = useState(0); //ATTENTION: pages numeration starts from 1
    //const [old_page, setOld_page] = useState();
    //const [entry_per_page, setEntry_per_page] = useState(0);
    //const [nPages, setNPages] = useState(0);
    const [thesisNumber, setThesisNumber] = useState(0);

    /*--------------- FUNCTIONS ------------------*/

    /** After this function, the filters object is in the initial state. 
     */
    function resetFilters()
    {
        setFilters(Object.assign({}, DEFAULT_FILTERS));
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

    function orderByField(DBfield, asc)
    {
        orderBy.filter(e => e.DBfield != DBfield);
        orderBy.unshift({DBfield: DBfield, mode: asc ? "ASC" : "DESC"});
        setOrderBy([...orderBy]);
    }
    

    function reloadThesisFromBeginning()
    {
        //changing the format of filters object:
        let nf = Object.assign({}, filters, {coSupervisors: filters.coSupervisors ? [filters.coSupervisors] : [], groups: filters.groups ? [filters.groups] : []});

        API.getThesis(nf, orderBy, undefined, ENTRIES_PER_PAGE)
            .then(ret => 
                {
                    if (ret.status == 200)
                    {
                        setThesis(ret.thesis);
                        setState(STATES.ready);

                        API.getThesisNumber(filters)
                        .then(ret2 => {if(ret2.status == 200) setThesisNumber(ret2.number); else setState(STATES.error);})
                        .catch(e => {console.log(e); setState(STATES.error);});
                    } else
                    {
                        setState(STATES.error);
                    }
                    
                })
            .catch(e => setState(STATES.error));
    }

    function showMoreThesis()
    {
        //changing the format of filters object:
        let nf = Object.assign({}, filters, {coSupervisors: filters.coSupervisors ? [filters.coSupervisors] : [], groups: filters.groups ? [filters.groups] : []});

        API.getThesis(nf, orderBy, thesis[thesis.length -1].id, ENTRIES_PER_PAGE)
            .then(ret => 
                {
                    if (ret.status == 200)
                    {
                        thesis.push(...ret.thesis);
                        setThesis([...thesis]);
                        setState(STATES.ready);
                    } else
                    {
                        setState(STATES.error);
                    }
                })
            .catch(e => {console.log(e); setState(STATES.error);});
    }

    /*-----------------------------------------*/

    useEffect(()=>
    {
        if(state == STATES.loading)
        {
            reloadThesisFromBeginning();
        }else if (state == STATES.show_more)
        {
            showMoreThesis();
        }
        

    }, [state]);

    useEffect(()=>
    {
        if(state != STATES.loading) setState(STATES.loading); 
    }, [props.date, orderBy, filters]);

    /*
    useEffect(() =>
    {
        let new_epp = window.innerHeight / 100;
        setEntry_per_page( new_epp ) ;

        API.getThesisNumber()
        .then(n => setNPages(n/new_epp + (n%new_epp == 0 ? 0 : 1)))
        .catch(e => {console.log(e); setState(STATES.error);})
    
    });*/

    return (
        <contextState.Provider value={{state: state, setState: setState, states: STATES}}>
            <Container>
            <FiltersForm filters={[filters, setFilters, resetFilters, isFiltered]}/>
                { (state == STATES.ready || state == STATES.show_more) ? 
                    <>
                        
                        <p className="text-info">Number of items: {thesisNumber}</p>
                        <hr />
                        <ThesisTable columns={COLUMNS} thesis={thesis} orderBy={orderBy} orderByField={orderByField}/>
                        {
                            <Row className="justify-content-center"><Col className="col-2 justify-content-center" style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
                            {
                                state == STATES.show_more ? 
                                    <ClipLoader />
                                : (thesis.length < thesisNumber ? <Button onClick={() => setState(STATES.show_more)}>Show More</Button> : "")
                            }
                            </Col></Row>
                            
                        }  
                    </>
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
    return [(page)*entry_per_page, (page+1)*entry_per_page -1];
}

export { ThesisList };

