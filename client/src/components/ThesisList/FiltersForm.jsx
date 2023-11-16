
import {Row, Col, Button, Form, Table} from "react-bootstrap";
import { Search, Filter } from "react-bootstrap-icons";
import { useState, useContext } from "react";


import API from "../../API";
import contextState from "./contextState";

function ThesisFieldFilterForm(props)
{
    switch(props.DBfield)
    {
        case "expirationDate":
            return <>
                        <Col><Form.Label>From:</Form.Label><Form.Control defaultValue={props.filters.expirationDate.from} id={"expirationDateFrom"} type="date" onChange={(event) => onChangeFiltersForm(event)}/></Col>
                        <Col><Form.Label>To:</Form.Label><Form.Control defaultValue={props.filters.expirationDate.to} id={"expirationDateTo"} type="date" onChange={(event) => onChangeFiltersForm(event)}/></Col>
                </>;
        default:
            return <Form.Control defaultValue={props.filters[props.DBfield]} id={props.DBfield} type="text" onChange={(event) => props.onChangeFiltersForm(event)}/>;
    }
}


function AdvancedFiltersTable(props)
{
    return <>
    <Row className="bg-light">
    <hr size={15}/>
    <h4>{"Advanced filters"}</h4>
    <Row >
        {props.columns.map(c =><div key={c.title} className=" m-2 advanced-filters-col"><Row>{c.title}</Row>
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
            <Col className="col-10"><Form.Control value={props.filters.searchKeyWord} id='searchKeyWord' type="text" placeholder="Search..." onChange={(event) => onChangeFiltersForm(event)} /></Col>
            <Col><Row>
                <Col className="col-3 hover-zoom"><Search className="flexible_icons icons" onClick={() => ctxState.setState(ctxState.states.loading)}/></Col>
                <Col className="col-3 hover-zoom"><Filter className="flexible_icons icons" onClick={() => setShowAdvancedFilters(s => !s)}/></Col>
                <Col className="col-3"><Button className="blueButton" disabled={!isFiltered()} onClick={() => resetFilters()}>Reset</Button></Col>
            </Row></Col>
        </Row>
        <Row>
            {showAdvancedFilters ? <AdvancedFiltersTable columns={props.columns} filters={filters} onChangeFiltersForm={onChangeFiltersForm}/>
                : ""}
        </Row>
        </>
    )
}

export {FiltersForm};