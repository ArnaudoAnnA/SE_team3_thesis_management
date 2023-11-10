import { size } from "lodash";
import {Row, Col, Button, Form} from "react-bootstrap";

function FiltersForm(props)
{
    let [filters, setFilters] = props.filters;

    return (
        <Row className="mb-3">
            <Col><Form.Control id='searchKeyWord' type="text" /></Col>
            <Col><Button onClick={(event) => setFilters(f => Object.assign({}, f, {searchKeyWord : document.getElementById('searchKeyWord') }))}>Search</Button></Col>
        </Row>
    )
}

export {FiltersForm};