import React from "react"
import "../styles/App.scss"

export default function UnitGrid(props) {
    let colour = '#666677'
    if (props.gridData.colour) {
        colour = props.gridData.colour
    }
  return (
    <div onMouseUp={() => {props.setItemCallback(props)}} className="square" >
      <div className="square-container" style={{backgroundColor:colour}}>
          {props.gridData.code !== "SENSOR" ? <span>{props.gridData.code}</span> : null}
      </div>
    </div>
  )
}
