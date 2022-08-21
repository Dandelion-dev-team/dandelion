import React from "react";
import "../../styles/App.scss"
import Card from "react-bootstrap/Card";

export default function VariableCard(props) {
    return (

        <Card className="variable-card" onClick={() => {
           props.callback(props.dataProp);
          }}>
            <Card.Body>
                <Card.Title as="div"><h4>{props.variable.name}</h4></Card.Title>
                <Card.Text as="div">
                    {props.variable.levels.length <= 0 ?
                        <p>
                            Continuous variable
                            {props.variable.unit ?
                                <span>
                                    &nbsp;measured in {props.variable.unit}
                                </span> : null
                            }
                        </p>
                    : (
                        <ul>
                            {props.variable.levels.map(variable => <li>{variable.name}{'\u00A0'}</li>)}
                        </ul>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
