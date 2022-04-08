import React, { useState, useEffect } from "react";
import "../../styles/App.scss"

export default function VariableListComponent(props) {
    const [checkbox_value, setCheckboxValue] = useState("")

    useEffect(() => {
        props.checkCallback({ data: props.mappedValue, value: checkbox_value });
    }, [checkbox_value])

    const onChangeCheckbox = e => {
        setCheckboxValue(!checkbox_value);
    }

    return (
        <div className="list-item">
            <input type="checkbox" id="experiment_id" className="checkbox" value="experiment_ID" checked={checkbox_value}
                onChange={onChangeCheckbox} />
            <div className="first-third">
                <h3>{props.mappedValue.name}</h3>
            </div>

            <div className="vl"></div>
            <div className="second-third">
                {/* {props.mappedValue.type == "Continuous" ?
                    <h3>{props.mappedValue.unit} ({props.mappedValue.lower_limit} - {props.mappedValue.upper_limit})</h3>
                    :
                    props.mappedValue.levels.map(variable => (<h3>{variable.name}, </h3>))}        */}
            </div>
            <div className="vl"></div>

            <div className="last-third">
                <input
                    value="Details"
                    type="submit"
                    className="submitButton"
                    onClick={() => { props.detailCallback(props.mappedValue.id) }}>
                </input>
            </div>
        </div>
    )
}