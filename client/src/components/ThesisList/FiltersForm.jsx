
import {Row, Col, Button, Form, Table} from "react-bootstrap";
import { Search, Filter } from "react-bootstrap-icons";
import { useState } from "react";


import API from "../../API";

function ThesisFieldFilterForm(props)
{
    switch(props.DBfield)
    {
        case "expirationDate":
            return <Form.Control defaultValue={""} id={props.DBfield} type="date"/>;

        default:
            return <Form.Control id={props.DBfield} type="text" />;
    }
}


function AdvancedFiltersTable(props)
{
    return <>
    <Row className="bg-light">
    <hr size={15}/>
    <h4>{"Advanced filters"}</h4>
    <Row >
        {props.columns.map(c =><div className=" m-2 advanced-filters-col"><Row>{c.title}</Row>
                                    <Row><ThesisFieldFilterForm DBfield={c.DBfield} /></Row>
                            </div>)}
    </Row>
    </Row>
    <hr size={15}/>
    </>;
}

function FiltersForm(props)
{
    let [filters, setFilters] = props.filters;
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    function loadAllFilters()
    {
        setFilters(f => {
            let ret = Object.assign({}, f, {searchKeyWord : document.getElementById('searchKeyWord').value});
            for (let c of props.columns)
            {
                ret[c.DBfield] = document.getElementById(c.DBfield).value;
            }

            return ret;
        });

    }


    return (
        <>
        <Row className="mb-3 justify-content-around">
            <Col className="col-10"><Form.Control id='searchKeyWord' type="text" placeholder="Search..."/></Col>
            <Col><Row>
                <Col className="col-3 hover-zoom"><Search className="flexible_icons icons" onClick={(event) => loadAllFilters()}/></Col>
                <Col className="col-3 hover-zoom"><Filter className="flexible_icons icons" onClick={() => setShowAdvancedFilters(s => !s)}/></Col>
            </Row></Col>
        </Row>
        <Row>
            {showAdvancedFilters ? <AdvancedFiltersTable columns={props.columns}/>
                : ""}
        </Row>
        </>
    )
}

export {FiltersForm};