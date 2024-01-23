
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';
import { TableWithOrderBy } from '../TableWithOrderBy';
import { useContext, useEffect, useState } from 'react';
import API from '../../API';
import dayjs from 'dayjs';
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from 'prop-types';
import { userContext } from '../Utils';

/**
 * 
 * @param {{date: dayjs, }} props 
 * @returns 
 */
function STRlist(props) {
    /*------------COSTANTS----------------*/
    const COLUMNS = [
        { title: 'Title', DBfield: 'title' },
        { title: "Supervisor", DBfield: "supervisor" },
        { title: "Programmes", DBfield: "programmes" }
    ];

    const DEFAULT_ORDERBY = [
        { DBfield: "title", mode: "ASC", },
        { DBfield: "supervisor", mode: "ASC", },
        { DBfield: "programmes", mode: "ASC", }
    ];

    const STATES = { loading: "Loading...", show_more: "Fetching...", error: "An error occoured", ready: "Ready" };

    const user = useContext(userContext);


    /*------------STATES----------------*/
    const [state, setState] = useState(STATES.loading);
    const [STRlist, setSTRlist] = useState([]);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDERBY);
    const [STRlistLength, setSTRListLength] = useState(0);

    /*------------VARIABLES----------------*/
    let entry_per_page = Math.floor(window.innerHeight / 130);

    /*------------FUNCTIONS----------------*/
    async function load_from_start() {
        let temp = 0;
        await API.getSTRlistLength()
            .then(ret => {
                if (ret.status == 200) {
                    temp = ret.length;
                    setSTRListLength(ret.length);
                } else {
                    setState(STATES.error);
                }
            })
            .catch(e => { console.log(e); setState(STATES.error) });

        if (state != STATES.error && temp != 0)
            API.getSTRlist(orderBy, true, entry_per_page)
                .then((ret) => {
                    if (ret.status == 200) {
                        setSTRlist(ret.STRlist);
                        // console.log(STRlist)
                        setState(STATES.ready);
                    } else {
                        setState(STATES.error);
                    }
                })
                .catch(e => { console.log(e); setState(STATES.error) });

        else if (temp == 0) { setState(STATES.ready); setSTRlist([]); }
    }

    function load_more() {
        
        console.log(STRlist)
        API.getSTRlist(orderBy, false, entry_per_page)
            .then((ret) => {
                if (ret.status == 200) {
                    let count = 0; //counter necessary to avoid the next lambda to be called twice
                    setSTRlist(l =>
                        {
                            count= count+1;
                            if (count==1) l.push(...ret.STRlist);
                            setState(STATES.ready);
                            return [...l];
                        }
                    );
                    
                } else {
                    setState(STATES.error);
                }
            })
            .catch(e => { console.log(e); setState(STATES.error) });
    }

    function orderByField(DBfield, asc) {
        let new_orderBy = orderBy.filter(e => e.DBfield != DBfield);
        new_orderBy.unshift({ DBfield: DBfield, mode: asc ? "ASC" : "DESC" });
        setOrderBy(new_orderBy);
    }


    /*--------------------------------------------------------*/

    useEffect(() => {
        setState(STATES.loading);
        load_from_start();

    }, [props.date, orderBy]);


    return <Container>
        { user.role == 'teacher' ? <><hr size={10}/><h1>Thesis Requests <i className="bi bi-hourglass-split"></i></h1><hr /><Alert dismissible><b>ⓘ</b> You are in the Thesis Requests: here you find all the thesis requests that have been accepted by secretary</Alert></> : "" /*<><hr size={10}/><h1>Home 🎓 <i className="bi bi-mortarboard-fill"></i></h1></>*/ }
        {
            state == STATES.ready || state == STATES.show_more ?
                <>
                    <hr />
                    <p className="text-info">Number of items: {STRlistLength}</p>
                    <TableWithOrderBy columns={COLUMNS} data={STRlist} orderBy={orderBy} orderByField={orderByField} detailsPageURL={"/STRlist/"} />
                    <Row className="justify-content-center mb-3"><Col className="col-2 justify-content-center" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        {
                            state == STATES.show_more ?
                                <ClipLoader />
                                : (STRlist.length < STRlistLength ?
                                    <Button className='blueButton' onClick={() => { setState(STATES.show_more); load_more(); } }>Show More</Button>
                                    : "")
                        }
                    </Col></Row>
                </>
                : <Alert>{state}</Alert>
        }


    </Container>
}

STRlist.propTypes = {
    date: PropTypes.string.isRequired
};

export { STRlist };