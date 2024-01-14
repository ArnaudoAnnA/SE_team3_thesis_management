function STRDetailsBody(props){
    return(
        <div>
            <h1>{props.req.title}</h1>
            <h2>{props.req.description}</h2>
            <h3>{props.req.professor}</h3>
            <h4>{props.req.student}</h4>
            <h5>{props.req.status}</h5>
        </div>
    );
}

export default STRDetailsBody;