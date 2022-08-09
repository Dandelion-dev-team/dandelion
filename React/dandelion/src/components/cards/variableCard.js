import React, { useState, useEffect } from "react";
import "../../styles/App.scss"
import Card from "react-bootstrap/Card";

export default function VariableCard(props) {
    const [checkbox_value, setCheckboxValue] = useState("")

    return (

        <Card className="variable-card" onClick={() => {
           props.callback(props.dataProp);
          }}>
            <Card.Body>
                <Card.Title as="div"><h4>{props.variable.name}</h4></Card.Title>
                <Card.Text as="div">
                    {props.variable.levels.length <= 0 ? (
                        props.variable.unit ? <p>
                            Unit: {props.variable.unit} ({props.variable.lower_limit} - {" "}
                            {props.variable.upper_limit})
                        </p> : null
                    ) : (
                        <ul>
                            {props.variable.levels.map(variable => <li>{variable.name}{'\u00A0'}</li>)}
                        </ul>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>

        //
        // <div className="variable-description-item">
        //     <div className="first-third">
        //         <h3>{props.variable.name}</h3>
        //     </div>
        //
        //     <div className="vl"></div>
        //     <div className="second-third">
        //         {props.variable.levels.length <= 0 ? (
        //             props.variable.unit ? <h3>
        //                 Unit: {props.variable.unit} ({props.variable.lower_limit} - {" "}
        //                 {props.variable.upper_limit})
        //             </h3> : null
        //         ) : (
        //             <div className="levels-list">
        //             {props.variable.levels.map(variable => <h3>{variable.name}{'\u00A0'}</h3>)}
        //             </div>
        //         )}
        //     </div>
        // </div>
    )
}
