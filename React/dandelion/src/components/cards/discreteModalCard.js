import React, { useState, useEffect } from "react"
import "../../styles/App.scss"
import MenuIcon from "@mui/icons-material/Menu"

export default function DiscreteModalCard(props) {
  return (
    <div className="discrete-card">
      <div className="card-content">
        <div className="title">
          <h3>Light Touch</h3>
        </div>
        <div className="drag-icon">
          <MenuIcon className="card-icon" />
        </div>
      </div>
    </div>
  )
}
