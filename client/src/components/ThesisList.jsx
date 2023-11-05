import "@glideapps/glide-data-grid/dist/index.css";
import {DataEditor, GridCellKind} from "@glideapps/glide-data-grid";

//MOC DATA
const data = [{firstName: 'Giovanni', lastName: 'Malnati'}, {firstName: 'Marco', lastName: 'Torchiano'}];

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getData([col, row]) {
    
    /*
        fetch here
    */

    const person = data[row];

    if (col === 0) {
        return {
            kind: GridCellKind.Text,
            data: person.firstName,
            allowOverlay: false,
            displayData: person.firstName,
        };
    } else if (col === 1) {
        return {
            kind: GridCellKind.Text,
            data: person.lastName,
            allowOverlay: false,
            displayData: person.lastName,
        };
    } else {
        throw new Error();
    }
}



function ThesisList(props)
{
    // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
    const columns = [
        { title: "Title", width: 150 },
        { title: "Supervisor", width: 150 },
        { title: "Co-Supervisor", width: 150 },
        { title: "Type", width: 150 },
        { title: "Groups", width: 150 },
        { title: "Expiration", width: 150 },
        { title: "Level", width: 150 }
        //further info in the thesis dedicated page
    ];

    return (
        <DataEditor getCellContent={getData} columns={columns} rows={2} />
    )
}

export { ThesisList };