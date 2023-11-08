import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import {Alert, Container} from 'react-bootstrap';
import API from '../../API';
import { FiltersForm } from "./FiltersForm";
import { ThesisTable } from "./ThesisTable";





function ThesisList(props)
{
    /*--------------- COSTANTS ------------------*/
    

    /*--------------- STATES ------------------*/
    //const [entry_per_page, setEntry_per_page] = useState(0);
    const [page, setPage] = useState(1);
    const [n_pages, setN_pages] = useState(0);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({searchKeyWord: ""}); /*TO DO: add filters */ 

    /*--------------- VARIABLES ------------------*/
    let entry_per_page = Math.floor(window.innerHeight / 100);

    /*-----------------------------------------*/

    /*
    useEffect(() => 
    {
        setEntry_per_page(Math.floor(window.innerHeight / 60));
    }, [window.innerHeight]);*/

    useEffect(()=>
    {
        /* TO DO: call a different API basing on the applyied filter */
        API.getThesis(filters, get_index_range_of_page(page, entry_per_page))
        .then(d => setData(d))
        .catch();  // TO DO: define global error state

        API.getThesisNumber(filters)
        .then(n => setN_pages(n/entry_per_page + (n%entry_per_page == 0 ? 0 : 1)))
        .catch();  // TO DO: define global error state

    }, [page, filters, entry_per_page]);

    return (
        <>
            <Container>
                <FiltersForm filters={[filters, setFilters]}/>
                <ThesisTable data={data}/>
                <TablePagination active={[page, setPage]} n_pages={n_pages}/>
                
            </Container>
        </>
        
    )
}

function TablePagination(props)
{
    let [active, setActive] = props.active;
    let n_pages = props.n_pages;
    let items = [];

    for (let number = 1; number <= n_pages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={event => setActive(event.target.innerText)}>
                {number}
            </Pagination.Item>,
        );
    }

    return <Pagination size="sm">{items}</Pagination>;

}


/* ---------- UTILITY FUNCTIONS -------- */
function get_index_range_of_page(page, entry_per_page)
{
    return [(page-1)*entry_per_page, page*entry_per_page -1];
}

export { ThesisList };

