
import {Row, Col, Button, Form, Table} from "react-bootstrap";
import { Search, Filter } from "react-bootstrap-icons";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../Utils";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


import API from "../../API";
import contextState from "./contextState";

function ThesisFieldFilterForm(props)
{

    switch(props.DBfield)
    {
        case "expirationDate":
            return <>
                        <Col><Form.Label>From:</Form.Label><Form.Control defaultValue={props.filters.expirationDate.from} id={"expirationDateFrom"} type="date" onChange={(event) => props.onChangeFiltersForm(DBfield, event.target.value)}/></Col>
                        <Col><Form.Label>To:</Form.Label><Form.Control defaultValue={props.filters.expirationDate.to} id={"expirationDateTo"} type="date" onChange={(event) => props.onChangeFiltersForm(DBfield, event.target.value)}/></Col>
                </>;
        default:
            return <Autocomplete
            options={API.getValuesForField(props.DBfield) /*.map(e => {return {value: e, label: e};}) */}
            autoComplete
            autoSelect
            onChange={(event) => {
                props.onChangeFiltersForm(props.DBfield, event.target.outerText);
            }}
            renderInput={(params) => <TextField {...params} variant="standard"   style={{ paddingLeft: "2px", borderRadius: "6px", width: '100%', fontSize: "12px"}}/>}
          />//<Form.Control defaultValue={props.filters[props.DBfield]} id={props.DBfield} type="text" onChange={(event) => props.onChangeFiltersForm(event)}/>;
    }
}


function AdvancedFiltersTable(props)
{
    const user = useContext(userContext);
    let is_std = user.role === "student"; //used only to make following code shorter

    let form_fields = [];
        if(is_std) form_fields.push({ DBfield: "supervisor", title: "Supervisor",  });
        form_fields.push({ DBfield: "coSupervisors", title: "Co-Supervisors",  }); //array
        form_fields.push({ DBfield: "type", title: "Type",  });
        form_fields.push({ DBfield: "groups", title: "Groups",  }); //array
        form_fields.push({ DBfield: "expirationDate", title: "Expiration date",  });
        form_fields.push({ DBfield: "level", title: "Level",  });
        if (!is_std) form_fields.push({ DBfield: "programmes", title: "Programmes",  });


    return <>
    <Row className="bg-light">
    <hr size={15}/>
    <h4>{"Advanced filters"}</h4>
    <Row >
        {form_fields.map(c =><div key={c.title} className=" m-2 advanced-filters-col"><Row>{c.title}</Row>
                                    <Row><ThesisFieldFilterForm filters={props.filters} onChangeFiltersForm={props.onChangeFiltersForm} DBfield={c.DBfield} /></Row>
                            </div>)}
    </Row>
    
    </Row>
    
    </>;
}

function FiltersForm(props)
{
    let [filters, setFilters, resetFilters, isFiltered] = props.filters;
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [mediaLarge, setMediaLarge] = useState(window.matchMedia("(min-width: 700px)").matches);
    const ctxState = useContext(contextState);

    /* --------- FUNCTIONS ------------------- */
    function onChangeFiltersForm(id, value)
    {
        setFilters(f => {
                            if (id == "expirationDateFrom")
                            {
                                f.expirationDate.from = value;
                            }else if (id == "expirationDateTo")
                            {
                                f.expirationDate.to = value;
                            }else if(id == "coSupervisors")
                            {
                                f.coSupervisors = [value];
                            }else
                            {
                                f[id] = value;
                            }
                            
                            //setFiltersActive(isFiltered(f));
                            return Object.assign({}, f);
        });
    }

    /* ------------------------------------ */

    useEffect(() =>
    {
        setMediaLarge(window.matchMedia("(min-width: 700px)").matches);
    }, []);

    return (
        <>
        <Row className="mb-3 justify-content-around">
            <Col className="col-xl-9 col-lg-9 col-md-9 col-s-9 col-xs-8"><Form.Control value={props.filters.title} id='title' type="text" placeholder="Search title..." onChange={(event) => onChangeFiltersForm(event)} /></Col>
            <Col className="col-1" style={{backgroundColor: "#fff0"}}><Search className="flexible_icons icons" onClick={() => ctxState.setState(ctxState.states.loading)}/></Col>
            <Col className="col-2" style={{backgroundColor: "#fff0"}}>
                {
                    mediaLarge ?
                    <Button onClick={() => setShowAdvancedFilters(s => !s)}>More filters...</Button>
                    : <Filter className="flexible_icons icons" onClick={() => setShowAdvancedFilters(s => !s)} />
                }
            </Col>
        </Row>
        <Row>
            {showAdvancedFilters ? <AdvancedFiltersTable filters={filters} onChangeFiltersForm={onChangeFiltersForm}/>
                : ""}
        </Row>
        </>
    )
}

export {FiltersForm};