import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import CheckIcon from "@mui/icons-material/Check"
export default function ObservationItem(props) {
  const [observed, setObserved] = useState(false)
  return (
    <div
      onClick={() => {
        props.clickItem(props)
        setObserved(true)
      }}
      className="square"
    >
      <div
        className="square-container"
        style={{ backgroundColor: props.gridData.colour }}
      >
        {props.gridData.code != "SENSOR" ? (
          observed ? (
            <CheckIcon className="check-icon" />
          ) : (
            <h3>{props.gridData.code}</h3>
          )
        ) : null}
      </div>
    </div>
  )
}
