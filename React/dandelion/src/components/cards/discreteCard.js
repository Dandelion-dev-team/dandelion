import React, { useState, useEffect } from "react"
import "../../styles/App.scss"

export default function DiscreteCard(props) {
  return (
    <div className="discrete-card">
      <div className="card-content">
          <div className="title">
              <h3>{props.card.name}</h3>
          </div>
          <div className="drag-icon"/>
      </div>
    </div>
  )
}
