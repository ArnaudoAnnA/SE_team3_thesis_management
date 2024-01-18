import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../API";
import STRDetailsHeader from "./STRDetailsHeader";
import STRDetailsBody from "./STRDetailsBody";
import STRDetailsBottom from "./STRDetailsBottom";
import { Container } from "react-bootstrap";

function STRDetails(props) {
    const { id } = useParams();
    const [req, setReq] = useState();

    useEffect(() => {

        const fetchRequestDetails = () => {
            API.getSTRWithId(id)
                .then(res => {
                    if (!res.error) {
                        console.log(res.STR)
                        setReq(res.STR);
                    } else {
                        console.log(res.error)
                    }

                })
        }

        fetchRequestDetails();

    }, []);


    return (
        <Container>
            {req ?
                (<div>
                    <STRDetailsHeader req={req} />
                    <STRDetailsBody req={req} />
                    <STRDetailsBottom reqId={id} req={req}/>
                </div>)
                :
                (<div>
                    <h1>loading...</h1>
                </div>
                )
            }

        </Container>
    );
}

export default STRDetails;