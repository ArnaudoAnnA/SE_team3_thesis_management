import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../../../API";
import STRDetailsHeader from "./STRDetailsHeader";
import STRDetailsBody from "./STRDetailsBody";
import STRDetailsBottom from "./STRDetailsBottom";

function STRDetails(props) {
    const { id } = useParams();
    const [req, setReq] = useState();

    useEffect(() => {

        API.getSTRWithId(id)
            .then(res => {
                if (!res.error) {
                    console.log(res.STR)
                    setReq(res.STR);
                } else {
                    console.log(res.error)
                }

            })


    }, []);


    return (
        <div>
            {
                req ?
                    <div>
                        <STRDetailsHeader req={req}/>
                        <STRDetailsBody req={req} />
                        <STRDetailsBottom reqId={id} />
                    </div>
                    :
                    <div>
                        <h1>loading...</h1>
                    </div>
            }

        </div>
    );
}

export default STRDetails;