import React, { useState, useEffect } from "react"
import "../../styles/App.scss"

export default function UnitCard(props) {

  console.log(props);
  return (
    <div className="unit-card">
      <div className="card-content">
        <input
          type="checkbox"
          id="experiment_id"
          className="checkbox"
          disabled="disabled"
        />
        {Array.isArray(props.combination) ? props.combination.map(variable => <h3>{variable[0].name} ({variable[0].treatment_name})</h3>) 
                        :
                        <h3>{props.combination.name} ({props.combination.treatment_name})</h3>
                    } 
        
      </div>
    </div>
  )
}
