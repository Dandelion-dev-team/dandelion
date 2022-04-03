import React, { useState, useEffect } from "react"
import "../../styles/App.scss"

export default function HypothesisCard(props) {
  return (
    <div className="hypothesis-card">
      <div className="desc">
        <h3>{props.hypothesisItem.description}</h3>
      </div>
    </div>
  )
}
