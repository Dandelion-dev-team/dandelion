import React, { useState, useEffect } from "react";
import "../../styles/App.scss"

export default function VariableSelectedComponent(props) {
    return (
        <div className="selected-item">
            <div className="text-content">
                <div className="title-text">
                    <h3>{props.data.name}</h3>
                </div>
                <div className="sub-text">
                {props.data.type == "Continuous" ?
                    <h3>Unit: {props.data.unit}, {props.data.lower_limit} - {props.data.upper_limit}</h3>
                    :
                    props.data.levels.map(variable => (<h3>{variable.name}, &nbsp;</h3>))}  
                   
                </div>
            </div>
            <div className="button-content">
            <input
                value="Edit"
                type="submit"
                className="submitButton"
                onClick={() => {props.editCallback(props.data.id)}}>
            </input> 
            </div>
        </div>
    )
}