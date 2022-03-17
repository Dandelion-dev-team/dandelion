import React, { useEffect, useState, useRef } from "react"
import "../styles/App.scss"

export default function UnitGrid(props) {
  return (
    <div onMouseUp={() => {props.setItemCallback(props)}} className="square" >
      <div className="square-container" style={{backgroundColor:props.gridData.colour}}>
        <h3>{props.gridData.code}</h3>
      </div>
    </div>
  )
}
