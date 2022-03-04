import React, { useState, useEffect } from "react";
import "../styles/App.scss"

export default function VariableSelectedComponent(props) {
    console.log(props.data);
    return (
        <div className="selected-item">
            <div className="text-content">
                <div className="title-text">
                    <h3>{props.data.name}</h3>
                </div>
                <div className="sub-text">
                    <h3>Unit: {props.data.unit}, {props.data.type}, {props.data.lower_limit} - {props.data.upper_limit}</h3>
                </div>
            </div>
            <div className="button-content">
            <input
                value="Details"
                type="submit"
                className="submitButton"
                onClick={() => { console.log("guy") }}>
            </input> 
            </div>
        </div>
    )
}