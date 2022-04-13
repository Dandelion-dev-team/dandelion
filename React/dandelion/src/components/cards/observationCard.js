import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"

export default function ObservationItem(props) {
  return (
    <div onClick={() => {props.clickItem(props)}} className="square" >
      <div className="square-container" style={{backgroundColor:props.gridData.colour}}>
        {props.gridData.code != "SENSOR" ? <h3>{props.gridData.code}</h3> : null}
      </div>
    </div>
  )
}
