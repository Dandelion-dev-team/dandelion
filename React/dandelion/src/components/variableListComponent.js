import React, { useState, useEffect } from "react";
import "../styles/App.scss"

export default function VariableListComponent(props) {
    const [checkbox_value, setCheckboxValue] = useState("")

    const onChangeCheckbox = e => {
        setCheckboxValue(!checkbox_value);
      }

    return (
        <div className="list-item">
            <input type="checkbox" id="experiment_id" className="checkbox" value="experiment_ID" checked={checkbox_value}
                        onChange={onChangeCheckbox}/>
            <div className="first-third">
                <h3>{props.mappedValue.name}</h3>
            </div>

            <div class="vl"></div>
            <div className="second-third">
                <h3>{props.mappedValue.unit} ({props.mappedValue.lower_limit} - {props.mappedValue.upper_limit})</h3>
            </div>
            <div class="vl"></div>

            <div className="last-third">
            <input
                value="Details"
                type="submit"
                className="submitButton"
                onClick={() => { props.parentCallback(props.mappedValue.id) }}>
            </input> 
            </div>
        </div>
    )
}