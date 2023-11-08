import { useParams } from "react-router-dom";
import {Container, Table} from "react-bootstrap";

function ThesisDetails(props)
{
    const {id} =  useParams();

    return <Container>
        {id}
    </Container>;
}

export {ThesisDetails}