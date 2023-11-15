
import {Row, Col, Button, Form, Table} from "react-bootstrap";
import { Search, Filter } from "react-bootstrap-icons";
import { useState } from "react";


import API from "../../API";

function ThesisFieldFilterForm(props)
{
    switch(props.DBfield)
    {
        case "expirationDate":
            return <Form.Control value={props.filters[props.DBfield]} id={props.DBfield} type="date" onChange={(event) => onChangeFiltersForm(event)}/>;

        default:
            return <Form.Control value={props.filters[props.DBfield]} id={props.DBfield} type="text" onChange={(event) => props.onChangeFiltersForm(event)}/>;
    }
}


function AdvancedFiltersTable(props)
{
    return <>
    <Row className="bg-light">
    <hr size={15}/>
    <h4>{"Advanced filters"}</h4>
    <Row >
        {props.columns.map(c =><div key={c} className=" m-2 advanced-filters-col"><Row>{c}</Row>
                                    <Row><ThesisFieldFilterForm filters={props.filters} onChangeFiltersForm={props.onChangeFiltersForm} DBfield={c} /></Row>
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

    /* --------- FUNCTIONS ------------------- */
    function onChangeFiltersForm(event)
    {
        setFilters(f => {
                            f[event.target.id] = event.target.value;
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
                <Col className="col-3 hover-zoom"><Search className="flexible_icons icons" onClick={(event) => loadAllFilters()}/></Col>
                <Col className="col-3 hover-zoom"><Filter className="flexible_icons icons" onClick={() => setShowAdvancedFilters(s => !s)}/></Col>
                <Col className="col-3"><Button disabled={isFiltered()} onClick={() => resetFilters()}>Reset</Button></Col>
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