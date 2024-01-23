import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from "react";
import {Alert, Container, Row, Col, Button} from 'react-bootstrap';
import API from '../../API';
import { FiltersForm } from "./FiltersForm";
import { TableWithOrderBy } from "../TableWithOrderBy";
import ClipLoader from "react-spinners/ClipLoader";
import { userContext } from "../Utils";
import contextState from "./contextState";





function ThesisList(props)
{
    /* ------ COSTANTS ------------ */
    const user = useContext(userContext);

    const COLUMNS = user.role == 'student' ? [  
                                                { DBfield: "title", title: "Title",  },
                                                { DBfield: "supervisor", title: "Supervisor",  },
                                                { DBfield: "expirationDate", title: "Expiration",  },
                                            ] 
                                            : [  
                                                { DBfield: "title", title: "Title",  },
                                                { DBfield: "programmes", title: "programmes",  },
                                                { DBfield: "expirationDate", title: "Expiration",  },
                                            ] ;


    const STATES = {loading: "Loading...", ready: "", error: "Error", show_more: "Fetching..."};

    const DEFAULT_FILTERS =  {
        expirationDate: {to: "", from: ""},
        title: "",
        supervisor: "",
        coSupervisors: "",
        type: "",
        groups: "",
        level: "",
        programmes: "",
        keywords: []
    };

    const DEFAULT_ORDERBY = COLUMNS.map(c => {return {DBfield: c.DBfield, mode: "ASC"}; });

    const ENTRIES_PER_PAGE = Math.floor(window.innerHeight /130);
    

    /*--------------- STATES ------------------*/
    const [thesis, setThesis] = useState([]);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDERBY);

    const [state, setState] = useState(STATES.loading);
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
            if (typeof(filters[prop]) == "string"  && filters[prop] != "")
            {
                return true;
            }
            if (Array.isArray(filters[prop]))
            {
                return filters[prop].find(v => (v && v!="") );
            }
        }

        return false;
    }

    function orderByField(DBfield, asc)
    {
        let new_orderBy = orderBy.filter(e => e.DBfield != DBfield);
        new_orderBy.unshift({DBfield: DBfield, mode: asc ? "ASC" : "DESC"});
        setOrderBy(new_orderBy);
    }
    

    function reloadThesisFromBeginning()
    {
        //changing the format of filters object:
        let nf = Object.assign({}, filters, {coSupervisors: filters.coSupervisors ? [filters.coSupervisors] : []});

        API.getThesis(nf, orderBy, undefined, ENTRIES_PER_PAGE, (props.archive == true))
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

        API.getThesis(nf, orderBy, thesis[thesis.length -1].id, ENTRIES_PER_PAGE, (props.archive == true))
            .then(ret => 
                {
                    if (ret.status == 200)
                    {
                        let count = 0; //counter necessary to avoid the next lambda to be called twice
                        setThesis(t =>
                            {
                                count = count+1;
                                if (count==1) t.push(...ret.thesis);
                                setState(STATES.ready);
                                return [...t];
                            });
                        
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

    return (
        <contextState.Provider value={{state: state, setState: setState, states: STATES}}>
            <Container style={{marginTop: "20px"}}>
                {props.archive ? <><hr size={10}/><h1>Archive 📁</h1><hr /><Alert dismissible><b>ⓘ</b> You are in the archive: information inside the archive cannot be seen by others</Alert></> : ""/*<><hr size={10}/><h1>Home 🎓 <i className="bi bi-mortarboard-fill"></i></h1><hr/></>*/ }
            <FiltersForm filters={[filters, setFilters, resetFilters, isFiltered]}/>
                { (state == STATES.ready || state == STATES.show_more) ? 
                    <>
                        
                        <p className="text-info">Number of items: {thesisNumber}</p>
                        <hr />
                        <TableWithOrderBy columns={COLUMNS} data={thesis} orderBy={orderBy} orderByField={orderByField} detailsPageURL={"/thesis/"}/>
                        {
                            <Row className="justify-content-center mb-3"><Col className="col-2 justify-content-center" style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
                            {
                                state == STATES.show_more ? 
                                    <ClipLoader />
                                : (thesis.length < thesisNumber ? <Button className='blueButton' onClick={() => setState(STATES.show_more)}>Show More</Button> : "")
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

ThesisList.propTypes = {
    date: PropTypes.string.isRequired
};


export { ThesisList };

