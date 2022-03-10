import React, { useState, useEffect } from "react"
import "../../styles/App.scss"

export default function UnitCard(props) {
  return (
    <div className="unit-card">
      <div className="card-content">
        <input
          type="checkbox"
          id="experiment_id"
          className="checkbox"
          disabled="disabled"
        />
        <h3></h3>
        
      </div>
    </div>
  )
}
