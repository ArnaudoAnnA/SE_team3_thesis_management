
import {Row, Col, Button, Form, Table} from "react-bootstrap";
import { Search, Filter } from "react-bootstrap-icons";
import { useState, useContext } from "react";
import { userContext } from "../Utils";


import API from "../../API";
import contextState from "./contextState";

function ThesisFieldFilterForm(props)
{
    switch(props.DBfield)
    {
        case "expirationDate":
            return <>
                        <Col><Form.Label>From:</Form.Label><Form.Control defaultValue={props.filters.expirationDate.from} id={"expirationDateFrom"} type="date" onChange={(event) => props.onChangeFiltersForm(event)}/></Col>
                        <Col><Form.Label>To:</Form.Label><Form.Control defaultValue={props.filters.expirationDate.to} id={"expirationDateTo"} type="date" onChange={(event) => props.onChangeFiltersForm(event)}/></Col>
                </>;
        default:
            return <Form.Control defaultValue={props.filters[props.DBfield]} id={props.DBfield} type="text" onChange={(event) => props.onChangeFiltersForm(event)}/>;
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
    <hr size={15}/>
    </>;
}

function FiltersForm(props)
{
    let [filters, setFilters, resetFilters, isFiltered] = props.filters;
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const ctxState = useContext(contextState);

    /* --------- FUNCTIONS ------------------- */
    function onChangeFiltersForm(event)
    {
        setFilters(f => {
                            if (event.target.id == "expirationDateFrom")
                            {
                                f.expirationDate.from = event.target.value;
                            }else if (event.target.id == "expirationDateTo")
                            {
                                f.expirationDate.to = event.target.value;
                            }else if(event.target.id == "coSupervisors")
                            {
                                f.coSupervisors = [event.target.value];
                            }else
                            {
                                f[event.target.id] = event.target.value;
                            }
                            
                            //setFiltersActive(isFiltered(f));
                            return Object.assign({}, f);
        });
    }

    /* ------------------------------------ */


    return (
        <>
        <Row className="mb-3 justify-content-around">
            <Col className="col-xl-9 col-lg-9 col-md-9 col-s-7 col-xs-5"><Form.Control value={props.filters.title} id='title' type="text" placeholder="Search title..." onChange={(event) => onChangeFiltersForm(event)} /></Col>
            <Col><Table borderless><tbody><tr>
                <td style={{backgroundColor: "#fff0"}} className="col-3 hover-zoom"><Search className="flexible_icons icons" onClick={() => ctxState.setState(ctxState.states.loading)}/></td>
                <td style={{backgroundColor: "#fff0"}} className="col-3 hover-zoom"><Filter className="flexible_icons icons" onClick={() => setShowAdvancedFilters(s => !s)}/></td>
                <td style={{backgroundColor: "#fff0"}} className="col-3"><Button className="blueButton" disabled={!isFiltered()} onClick={() => resetFilters()}>Reset</Button></td>
            </tr></tbody></Table></Col>
        </Row>
        <Row>
            {showAdvancedFilters ? <AdvancedFiltersTable filters={filters} onChangeFiltersForm={onChangeFiltersForm}/>
                : ""}
        </Row>
        </>
    )
}

export {FiltersForm};