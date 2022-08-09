import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function VariablePane(props) {

  useEffect(() => {
    console.log(props.variable)
  }, [])

  return (
    <div>
      {props.variable ? (
        <div className="variable-pane scrollable-container">
          <div className="scrollable-header">
              <h2>
                {props.variable.name}
              </h2>
          </div>
          <div className={"scrollable-content"}>
            {props.variable.quantity_id ?
                <h4>Quantity</h4> : null
            }
            {props.variable.quantity_id ?
                <p>{props.variable.quantity} ({props.variable.unit})</p> : null
            }
              <h4>Procedure</h4>
              <p>{props.variable.procedure}</p>
            {props.variable.levels ?
                <div>
                {props.variable.levels.length ?
                  <div>
                    <h4>Levels</h4>
                    <ol>
                      {props.levels.data ? props.levels.data.map(level => (
                          <li>{level.name}</li>
                      )) : null}
                    </ol>
                  </div> : null
                }
                </div> : null
            }
          </div>
          <div className={"scrollable-footer"}>
            <div className={"btn-container"}>
              <button className={"dandelion-button"}
                      onClick={() => {
                        props.editVariable(props.variable)
                      }}
                      >
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
