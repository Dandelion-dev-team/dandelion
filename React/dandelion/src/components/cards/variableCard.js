import React, { useState, useEffect } from "react";
import "../../styles/App.scss"

export default function VariableCard(props) {
    const [checkbox_value, setCheckboxValue] = useState("")

    return (
        <div className="variable-description-item">
            <div className="first-third">
                <h3>{props.mappedValue.name}</h3>
            </div>

            <div className="vl"></div>
            <div className="second-third">
                {props.mappedValue.levels.length <= 0 ? (
                    props.mappedValue.unit ? <h3>
                        Unit: {props.mappedValue.unit}, {props.mappedValue.lower_limit} - {" "}
                        {props.mappedValue.upper_limit}
                    </h3> : null
                ) : (
                    <div className="levels-list">
                        {props.mappedValue.levels.map(variable => <h3>{variable.name}{'\u00A0'}</h3>)}
                    </div>
                )}
            </div>
        </div>
    )
}