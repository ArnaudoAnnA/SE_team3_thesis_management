
import {Row, Col, Button, Form} from "react-bootstrap";
import { Search, Filter, BootstrapReboot } from "react-bootstrap-icons";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../Utils";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import API from "../../API";
import contextState from "./contextState";
import PropTypes from 'prop-types';

function KeywordsFiltersForm(props)
{
    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        e.preventDefault(); 
        const value = e.target.value.trim();
        if(!value.trim()) return
        props.onChangeFiltersForm("keywords", [...props.filters.keywords, value]);
        e.target.value = ''
      }
      
      function removeTag(index){
        props.onChangeFiltersForm("keywords", props.filters.keywords.filter((el, i) => i !== index))
      }

      function handleBlur(e) {
        const value = e.target.value.trim();
        if (!value.trim()) return;
        props.onChangeFiltersForm("keywords", [...props.filters.keywords, value]);
        e.target.value = '';
      }
    return (
        <div className="form-group input-group ml-2" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: "column", flex: 1 }}>
                <div className="tags-input-container" style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
                    {props.filters.keywords.map((tag, index) => (
                        <div className="tag-item" key={tag} style={{ cursor: "pointer", marginBottom: "2px", marginRight: "5px", borderBlockColor: "black" }}>
                            <span className="text">{tag}</span>
                            <span className="close" role="button" onClick={() => removeTag(index)} onKeyDown={(e) => handleKeyDown(e)}>&times;</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2px' }}>
                    <input onKeyDown={handleKeyDown} onBlur={handleBlur} style={{ borderRadius: "3px", marginTop: "2px", marginBottom: "2px", borderWidth: "1px", flex: 1 }} type="text" className="form-control" placeholder="Insert Keywords and press Enter.." />
                </div>
            </div>
        </div > 
    );

}

KeywordsFiltersForm.propTypes = 
{
    onChangeFiltersForm: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,

}


function ThesisFieldFilterForm(props)
{

    switch(props.DBfield)
    {
        case "expirationDate":
            return <>
                        <Col><Form.Label>From:</Form.Label><Form.Control value={props.filters.expirationDate.from} id={"expirationDateFrom"} type="date" onChange={(event) => props.onChangeFiltersForm(event.target.id, event.target.value)}/></Col>
                        <Col><Form.Label>To:</Form.Label><Form.Control value={props.filters.expirationDate.to} id={"expirationDateTo"} type="date" onChange={(event) => props.onChangeFiltersForm(event.target.id, event.target.value)}/></Col>
                </>;

        case "keywords":
            return <KeywordsFiltersForm filters={props.filters} onChangeFiltersForm={props.onChangeFiltersForm} />;


        default:
            return <Autocomplete
            options={API.getValuesForField(props.DBfield)}
            
            autoSelect
            selectOnFocus
            inputValue={props.filters[props.DBfield]}
            onChange={(event) => { 
                props.onChangeFiltersForm(props.DBfield, event.target.outerText);
            }}
            renderInput={(params) => <TextField {...params} variant="standard"   style={{ paddingLeft: "2px", borderRadius: "6px", width: '100%', fontSize: "12px"}}/>}
          />
    }
}

ThesisFieldFilterForm.propTypes = {
    DBfield: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    onChangeFiltersForm: PropTypes.func.isRequired
}

function AdvancedFiltersTable(props)
{
    const user = useContext(userContext);
    let is_std = user.role === "student"; //used only to make following code shorter

    let form_fields = [];
        if(is_std) form_fields.push({ DBfield: "supervisor", title: "Supervisor",  });
        form_fields.push({ DBfield: "coSupervisors", title: "Co-Supervisors",  }); //array
        form_fields.push({ DBfield: "type", title: "Type",  });
        form_fields.push({ DBfield: "groups", title: "Groups",  }); //array
        form_fields.push({ DBfield: "expirationDate", title: "Expiration date",  });
        form_fields.push({ DBfield: "level", title: "Level",  });
        if (!is_std) form_fields.push({ DBfield: "programmes", title: "Programmes",  });


    return <>
    <Row className="bg-light">
    <hr size={15}/>
    <h4>{"Advanced filters"}</h4>

    <div className="ml-20">Keywords:</div>
    <Row className="mb-3 justify-content-around">
        <Col ><KeywordsFiltersForm filters={props.filters} onChangeFiltersForm={props.onChangeFiltersForm} /> </Col>
    </Row>

    <Row >
        {form_fields.map(c =><div key={c.title} className=" m-2 advanced-filters-col"><Row>{c.title}</Row>
                                    <Row><ThesisFieldFilterForm filters={props.filters} onChangeFiltersForm={props.onChangeFiltersForm} DBfield={c.DBfield} /></Row>
                            </div>)}
    </Row>
    
    </Row>
    
    </>;
}

function FiltersForm(props)
{
    let [filters, setFilters, resetFilters] = props.filters;
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [mediaLarge, setMediaLarge] = useState(window.matchMedia("(min-width: 700px)").matches);
    const ctxState = useContext(contextState);

    /* --------- FUNCTIONS ------------------- */
    function onChangeFiltersForm(id, value)
    {
        setFilters(f => {
                            if(!value) value = "";
                            if (id == "expirationDateFrom")
                            {
                                f.expirationDate.from = value;
                            }else if (id == "expirationDateTo")
                            {
                                f.expirationDate.to = value;
                            }else
                            {
                                f[id] = value;
                            }
                        
                            return {...f};
        });
    }
      

    /* ------------------------------------ */

    useEffect(() => {setMediaLarge(window.matchMedia("(min-width: 700px)").matches)});

    return (
        <Form onSubmit={(e) => {e.preventDefault(); ctxState.setState(ctxState.states.loading); }}>
        <Row className="mb-3 justify-content-around">
            <Col className="col-7" ><Form.Control value={filters.title} id='title' type="text" placeholder="Search title..." onChange={(event) => onChangeFiltersForm("title", event.target.value)} /></Col>
            <Col  style={{backgroundColor: "#fff0"}}><Search className="flexible_icons icons change-bg-on-hover" onClick={() => ctxState.setState(ctxState.states.loading)}/></Col>
            <Col style={{backgroundColor: "#fff0"}}>
                {
                    mediaLarge ?
                    <Button onClick={() => setShowAdvancedFilters(s => !s)} className="blueButton" >{showAdvancedFilters ? "Less filters" : "More filters..."}</Button>
                    : <Filter className="flexible_icons icons change-bg-on-hover" onClick={() => setShowAdvancedFilters(s => !s)} />
                }
            </Col>
            <Col>
                {
                    mediaLarge ?
                    <Button onClick={() => {resetFilters(); ctxState.setState(ctxState.states.loading);}} className="blueButton" >Reset filters</Button>
                    : <BootstrapReboot className="flexible_icons icons change-bg-on-hover" onClick={() => {resetFilters(); ctxState.setState(ctxState.states.loading);}} />
                }
            </Col>
        </Row>

        
        
        <Row>
            {showAdvancedFilters ? <AdvancedFiltersTable filters={filters} onChangeFiltersForm={onChangeFiltersForm}/>
                : ""}
        </Row>
        </Form>
    )
}

export {FiltersForm};