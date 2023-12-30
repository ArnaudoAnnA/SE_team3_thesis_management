
import { Table } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';



/*--------- UTILITY FUNCTIONS ------------- */

/**
 * 
 * @param {*} row_id 
 * @param {*} field_name 
 * @param {*} field_content
 * @returns a link to the specific item if exists, or the content of the field itself
 */
function row_field_to_td(data_id, field_name, field_content) {
    // TO DO: add links to professor, group, ...

    if (field_name == "expirationDate") return dayjs(field_content).format('YYYY/MM/DD');

    if (field_name == "title") return <h5>{field_content}</h5>

    if (Array.isArray(field_content)) {
        let counter = 0;
        return <>{field_content.map(e => <div key={counter++}>{e}</div>)}</>
    }

    return field_content;
}


/* ------------------------------------- */

function TableWithOrderByRow(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const state = { nextpage: location.pathname };

    return (
        <tr key={props.row.id} onClick={() => navigate(props.linkURL, { state: state })}>
            {
                props.columns.map((c, i) => <td style={{ paddingLeft: "3vw" }} key={c.DBfield}>{row_field_to_td(props.row.id, c.DBfield, props.row[c.DBfield] || " ")}</td>)
            }
            <td><Link to={props.linkURL} className='text-info' style={{ width: "1px" }} state={{ nextpage: location.pathname }}>Details</Link></td>
            <td className='text-info' style={{ width: "1px" }}>▷</td>
        </tr>
    )
}

TableWithOrderByRow.propTypes =
{
    row: PropTypes.object.isRequired,
    linkURL: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired
}

function ToggleArrow(props) {
    let temp = props.orderBy.find(i => i.DBfield == props.col.DBfield);
    let asc = (temp.mode == "ASC");

    return asc ? <th className='text-center icons change-bg-on-hover text-info' onClick={() => { props.orderByField(props.col.DBfield, false); }}>{"▿"}</th>
        : <th className='text-center icons change-bg-on-hover text-info' onClick={() => { props.orderByField(props.col.DBfield, true); }}>{"▵"}</th>;
}

ToggleArrow.propTypes = 
{
    orderBy: PropTypes.array.isRequired,
    col: PropTypes.object.isRequired,
    orderByField: PropTypes.func.isRequired
}

function InteractiveTh(props) {

    return <th key={props.col.DBfield}><Table borderless>
        <tbody>
            <tr>
                {
                    !props.isArray ? <ToggleArrow orderBy={props.orderBy} col={props.col} orderByField={props.orderByField}/> : <th></th>
                }
                <th>{props.col.title}</th>
            </tr>
        </tbody>
    </Table></th>
}

InteractiveTh.propTypes = {
    orderBy: PropTypes.array.isRequired,
    col: PropTypes.object.isRequired,
    orderByField: PropTypes.func.isRequired,
    isArray: PropTypes.bool.isRequired
}


/**
 * 
 * @param {{columns: [{title: string, DBfield: string}, ...], 
 * data: Array, 
 * orderBy: [{DBfield: string, mode: string ("ASC"|"DESC") }, ...],
 * orderByField: function(string, bool),
 * detailsPageURL: string}} props 
 *  
 */
function TableWithOrderBy(props) {
    const columns = props.columns;
    let key = 0;


    return (
        <Table responsive hover>
            <thead>
                <tr>
                    {
                        columns.map(col => <InteractiveTh key={col.title} col={col} orderBy={props.orderBy} orderByField={props.orderByField} isArray={props.data?.[0] ? Array.isArray(props.data[0][col.DBfield]) : false} />)
                    }
                    <th style={{ width: "1px" }}></th><th style={{ width: "1px" }}></th>
                </tr>
            </thead>

            <tbody>
                {
                    props.data.map(r => <TableWithOrderByRow key={key++} row={r} columns={columns} linkURL={props.detailsPageURL + r.id} />)
                }
            </tbody>
        </Table>
    )
}

TableWithOrderBy.propTypes = {
    columns: PropTypes.array.isRequired,
    orderBy: PropTypes.array.isRequired,
    orderByField: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    detailsPageURL: PropTypes.string.isRequired
}


export { TableWithOrderBy };

