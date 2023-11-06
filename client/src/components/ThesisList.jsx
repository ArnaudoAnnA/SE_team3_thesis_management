import "@glideapps/glide-data-grid/dist/index.css";
import {DataEditor, GridCellKind} from "@glideapps/glide-data-grid"; // https://github.com/glideapps/glide-data-grid/blob/main/README.md
import { useEffect, useState } from "react";
import {getAllThesis} from "../API";

 /*-------------- GLOBAL CONSTS -----------------*/

    // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
    const columns = [   //TO DO: dynamic width of columns
        { title: "Title", width: 150 },
        { title: "Supervisor", width: 150 },
        { title: "Co_Supervisor", width: 150 },
        { title: "Type", width: 150 },
        { title: "Groups", width: 150 },
        { title: "Expiration", width: 150 },
        { title: "Level", width: 150 }
        //further info in the thesis dedicated page
    ];

/*--------------- GLOBAL VARIABLES ---------------*/
//let data = [];

/*-----------------------------------------------*/





function ThesisList(props)
{

    /*--------------- STATES ------------------*/
    const [searchKeyword, setSearchKeyword] = useState('');
    const [data, setData] = useState([]);

    /*-----------------------------------------*/

    useEffect(()=>
    {
        /* TO DO: call a different API basing on the applyied filter */
        getAllThesis()
        .then(d => setData(d))
        .catch();  // TO DO: define global error state

    }, [searchKeyword /*TO DO: add filters */ ]);

    return (
        <DataEditor getCellContent={getData} columns={columns} rows={data.length} />
    );


    
    
    // If fetching data is slow you can use the DataEditor ref to send updates for cells
    // once data is loaded.
    function getData([col, row]) {

        const thesis = data[row];

        let prop = columns[col].title.toLowerCase();

        if (!thesis[prop]) 
        {
            console.log("ERROR: Trying to read an undefined prop "+prop+" (row n. "+row+")");
            return {
                kind: GridCellKind.Text,
                data: "Undefined",
                allowOverlay: false,
                displayData: "Undefined",
            };
        }

        return {
            kind: GridCellKind.Text, //TO DO: switch on prop to assign proper cell kind
            data: thesis[prop],
            allowOverlay: false,
            displayData: thesis[prop],
        };
    }
}

export { ThesisList };