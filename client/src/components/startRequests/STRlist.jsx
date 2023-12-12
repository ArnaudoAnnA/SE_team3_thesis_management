
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';
import {TableWithOrderBy} from '../TableWithOrderBy';
import { useEffect, useState } from 'react';
import API from '../../API';
import dayjs from 'dayjs';
import ClipLoader from "react-spinners/ClipLoader";

/**
 * 
 * @param {{date: dayjs, }} props 
 * @returns 
 */
function STRlist(props)
{
    /*------------COSTANTS----------------*/
    const COLUMNS = [
        {title: 'Title', DBfield: 'title'},
        {title: "Supervisor", DBfield: "supervisor"},
        {title: "Programmes", DBfield: "programmes"} 
    ];

    const DEFAULT_ORDERBY = [
        {DBfield: "title", mode: "ASC" , },
        {DBfield: "supervisor", mode: "ASC" , },
        {DBfield: "programmes",mode: "ASC" , } 
    ]; 

    const STATES = {loading: "Loading...", show_more: "Fetching...", error: "An error occoured", ready: "Ready" };


    /*------------STATES----------------*/
    const [state, setState] = useState(STATES.loading);
    const [STRlist, setSTRlist] = useState([]);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDERBY);
    const [STRlistLength, setSTRListLength] = useState(0);

    /*------------VARIABLES----------------*/
    let entry_per_page = Math.floor(window.innerHeight / 100);

    /*------------FUNCTIONS----------------*/
    async function load_from_start()
    {
        let temp = 0;
        await API.getSTRlistLength()
        .then(ret =>
            {
                if (ret.status == 200)
                {
                    temp = ret.length;
                    setSTRListLength(ret.length);
                }else 
                {
                    setState(STATES.error);
                }
            })
        .catch(e =>{console.log(e); setState(STATES.error)} );

        if (state!= STATES.error && temp != 0) API.getSTRlist(orderBy, true, entry_per_page)
                                                        .then((ret) =>
                                                        {
                                                            if (ret.status == 200)
                                                            {
                                                                setSTRlist(ret.STRlist);
                                                                setState(STATES.ready);
                                                            }else 
                                                            {
                                                                setState(STATES.error);
                                                            }
                                                        })
                                                        .catch(e =>{console.log(e); setState(STATES.error)});

        else if(temp == 0) {setState(STATES.ready); setSTRlist([]);}
    }

    function load_more()
    {
        API.getSTRlist(orderBy, false, entry_per_page)
        .then((ret) =>
        {
            if (ret.status == 200)
            {
                setSTRlist(l => {l.push(...ret.STRlist); return Object.assign({}, l); });
                setState(STATES.ready);
            }else 
            {
                setState(STATES.error);
            }
        })
        .catch(e =>{console.log(e); setState(STATES.error)});
    }

    function orderByField(DBfield, asc)
    {
        let new_orderBy = orderBy.filter(e => e.DBfield != DBfield);
        new_orderBy.unshift({DBfield: DBfield, mode: asc ? "ASC" : "DESC"});
        setOrderBy(new_orderBy);
    }


    /*--------------------------------------------------------*/

    useEffect(() =>
    {
        setState(STATES.loading);
        load_from_start();
    }, [props.date, orderBy]);


    return <Container>
        {
            state == STATES.ready || state == STATES.show_more ? 
            <>
            <hr />
                <p className="text-info">Number of items: {STRlistLength}</p>
                <TableWithOrderBy columns={COLUMNS} data={STRlist} orderBy={orderBy} orderByField={orderByField} detailsPageURL={"/STRlist/"}/>
                <Row className="justify-content-center"><Col className="col-2 justify-content-center" style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
                {
                    state == STATES.show_more ? 
                        <ClipLoader />
                    : (STRlist.length < STRlistLength ? 
                            <Button onClick={() => {setState(STATES.show_more); load_more(); }}>Show More</Button> 
                            : "")
                }
                </Col></Row>
            </>
            : <Alert>{state}</Alert>
        }
        
                        
    </Container>
}

export {STRlist};