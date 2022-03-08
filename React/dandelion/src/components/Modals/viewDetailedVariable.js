import React, { useState, useEffect } from "react"
import EditIcon from "@mui/icons-material/Edit"

export default function ViewDetailedVariable(props) {
  const [editing, setEditing] = useState("")
  const [description, setDescription] = useState("")
  const [tutorial, setTutorial] = useState("")
  const [unit, setUnit] = useState("")
  const [upperLimit, setUpperLimit] = useState("")
  const [lowerLimit, setLowerLimit] = useState("")

  useEffect(() => {
    if (props.startEditing == true) {
      setEditing(true)
      setDescription(props.variable.description)
      setTutorial(props.variable.procedure)
      setUnit(props.variable.unit)
      setUpperLimit(props.variable.upper_limit)
      setLowerLimit(props.variable.lower_limit)
    }
  }, [])

  const handleDescChange = e => {
    setDescription(e.target.value)
  }
  const handleTutChange = e => {
    setTutorial(e.target.value)
  }
  const handleUnitChange = e => {
    setUnit(e.target.value)
  }
  const handleLowerLimitChange = e => {
    setLowerLimit(e.target.value)
  }
  const handleUpperLimitChange = e => {
    setUpperLimit(e.target.value)
  }

  const handleEditing = e => {
    setEditing(!editing)
    setDescription(props.variable.description)
    setTutorial(props.variable.procedure)
    setUnit(props.variable.unit)
    setUpperLimit(props.variable.upper_limit)
    setLowerLimit(props.variable.lower_limit)
  }

  return (
    <div className="variable-modal-container">
      <div className="inner-panel">
        <div className="panel-content">
          <div className="name-edit-row">
            <h3>{props.variable.name}</h3>
            <EditIcon
              className="edit-icon"
              onClick={() => {
                handleEditing()
              }}
            />
          </div>
          <h3>{props.variable.type}</h3>
          <div className="item-row">
            <div className="item-title">
              <h3>Description: </h3>
            </div>
            <div className="item-text">
              {editing ? (
                <textarea
                  type="text"
                  className="text-box"
                  name="usernameBox"
                  value={description}
                  onChange={handleDescChange}
                />
              ) : (
                <h3>{props.variable.description}</h3>
              )}
            </div>
          </div>
          <div className="item-row">
            <div className="item-title">
              <h3>Tutorial Text: </h3>
            </div>
            <div className="item-text">
              {editing ? (
                <textarea
                  type="text"
                  className="text-box"
                  name="usernameBox"
                  value={tutorial}
                  onChange={handleTutChange}
                />
              ) : (
                <h3>{props.variable.procedure}</h3>
              )}
            </div>
          </div>
          <div className="item-row">
            <div className="item-title">
              <h3>Unit: </h3>
            </div>
            <div className="item-text">
              {editing ? (
                <input
                  type="text"
                  className="text-line"
                  name="usernameBox"
                  maxLength={"5"}
                  value={unit}
                  onChange={handleUnitChange}
                />
              ) : (
                <h3>{props.variable.unit}</h3>
              )}
            </div>
          </div>
          <div className="item-row">
            <div className="item-title">
              <h3>Upper Limit: </h3>
            </div>
            <div className="item-text">
              {editing ? (
                <input
                  type="text"
                  className="text-line"
                  name="usernameBox"
                  maxLength={"5"}
                  value={upperLimit}
                  onChange={setUpperLimit}
                />
              ) : (
                <h3>{props.variable.upper_limit}</h3>
              )}
            </div>
          </div>
          <div className="item-row">
            <div className="item-title">
              <h3>Lower Limit: </h3>
            </div>
            <div className="item-text">
              {editing ? (
                <input
                  type="text"
                  className="text-line"
                  name="usernameBox"
                  maxLength={"5"}
                  value={lowerLimit}
                  onChange={setLowerLimit}
                />
              ) : (
                <h3>{props.variable.lower_limit}</h3>
              )}
            </div>
          </div>
          <div className="close-btn">
            <input
              type="submit"
              className="closeButton"
              value="Close"
              onClick={() => {
                props.callback()
              }}
            ></input>

            {editing ? (
              <input
                type="submit"
                className="closeButton"
                value="Save"
                onClick={() => {
                  props.callback()
                }}
              ></input>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
