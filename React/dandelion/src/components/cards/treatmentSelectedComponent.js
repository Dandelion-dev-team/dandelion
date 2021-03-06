import React, { useState, useEffect } from "react"
import "../../styles/App.scss"
import Select from "react-select"

export default function VariableSelectedComponent(props) {

  const [selected_dates, setDates] = useState("")

  const handleSelection = e => {
    setDates(e)
  }

  return (
    <div className="selected-item">
      <div className="treatment-text-content">
        <div className="title-text">
          <h3>{props.data.name}</h3>
        </div>
        <div className="sub-text">
          {props.data.levels.length <= 0 ? (
            <h3>
              Unit: {props.data.unit}, {props.data.lower_limit} - {" "}
              {props.data.upper_limit}
            </h3>
          ) : (
            props.data.levels.map(variable => <h3>{variable.name}{'\u00A0'}</h3>)
          )}
        </div>
      </div>

    </div>
  )
}
