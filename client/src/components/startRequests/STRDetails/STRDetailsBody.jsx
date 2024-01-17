import STRDetailsBodyCenter from "./STRDetailsBodyCenter";
import STRDetailsBodyTop from "./STRDetailsBodyTop";


function STRDetailsBody(props) {
    
    return (
        <div>
            <STRDetailsBodyTop req={props.req}/>
            <hr />
            <STRDetailsBodyCenter req={props.req}/>
        </div>
    );
}

export default STRDetailsBody;