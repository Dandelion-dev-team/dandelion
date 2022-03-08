import React, { useState, useEffect } from "react";
import "../../styles/App.scss"

export default function CombinationListComponent(props) {
    const [checkbox_value, setCheckboxValue] = useState("");
    const [treatments_JSON, setTreatments] = useState([]);

    useEffect(() => {
        if(treatments_JSON.length == 0){
            var treatments = props.condition.split('-');
            console.log(treatments);
            
            treatments.forEach(element => setTreatments(arr => [...arr, JSON.parse(element)]));
        }
    }, []);


    const onChangeCheckbox = e => {
        setCheckboxValue(!checkbox_value);
    }
    return (
        <div className="combination-container">
            <div className="combination-content">
                <input type="checkbox" id="experiment_id" className="checkbox" value="experiment_ID" checked={checkbox_value} onChange={onChangeCheckbox} />

                {treatments_JSON ? treatments_JSON.map(variable => <h3>{variable.name} ({variable.treatment_name})</h3>) : null}
            </div>
        </div>
    )

}