import React, { useState, useEffect } from "react";
import "../../styles/App.scss"

export default function CombinationListComponent(props) {
    const [checkbox_value, setCheckboxValue] = useState("");
    const [treatments_JSON, setTreatments] = useState([]);

    useEffect(() => {
        setCheckboxValue(true);
        props.checkCallback({ data: props.condition, value: checkbox_value });
    }, [checkbox_value]);

    const onChangeCheckbox = e => {
        setCheckboxValue(!checkbox_value);
    }

    return (
        <div className="combination-container">
            <div className="combination-content">
                <input type="checkbox" id="experiment_id" className="checkbox" value="experiment_ID" checked={checkbox_value} onChange={onChangeCheckbox} />
                    {Array.isArray(props.condition) ? props.condition.map(variable => <h3>{variable[0].name} ({variable[0].treatment_name})</h3>) 
                        :
                        <h3>{props.condition.name} ({props.condition.treatment_name})</h3>
                    } 
            </div>
        </div>
    )

}