import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function ObservationItem(props) {

    const [hasValue, setHasValue] = useState(false)

    useEffect(() => {
        // console.log("OBSERVATION CARD")
        // console.log(props.gridData)
        let has_value = false
        if (props.gridData.observations) {
            for (let i=0; i< props.gridData.observations.length; i++) {
                if (props.gridData.observations[i].value) {
                    has_value = true
                    break
                }
            }
        }
        setHasValue(has_value)
        console.log(has_value)
    })

  return (
    <div
      onClick={() => {
        props.clickItem(props)
      }}
      className="square"
    >
      <div
        className="square-container"
        style={{ backgroundColor: props.gridData.colour }}
      >
      {hasValue ?
          <div className="unit-tick">
            <CheckCircleIcon className="check-icon" />
          </div> : null
      }
      {props.gridData.code != "SENSOR" ?
        <span>{props.gridData.code}</span> : null
      }
      </div>
    </div>
  )
}
