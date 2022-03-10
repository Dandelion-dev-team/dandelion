import React, { useState, useEffect } from "react"
import { createRecord } from "../../utils/CRUD"

export default function ContinuousVariableModal(props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [procedure, setProcedure] = useState("")
  const [unit, setUnit] = useState("")
  const [upperLimit, setUpperLimit] = useState("")
  const [lowerLimit, setLowerLimit] = useState("")

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleDescChange = e => {
    setDescription(e.target.value)
  }
  const handleProcedureChange = e => {
    setProcedure(e.target.value)
  }

  const handleUnitChange = e => {
    setUnit(e.target.value)
  }

  const handleUpperLimitChange = e => {
    setUpperLimit(e.target.value)
  }

  const handleLowerLimitChange = e => {
    setLowerLimit(e.target.value)
  }

  const onCreateVariable = e => {
    if (name && description && procedure && unit && upperLimit && lowerLimit) {
      let body = JSON.stringify({
        id: 1,
        type: "Continuous",
        name: name,
        description: description,
        procedure: procedure,
        unit: unit,
        upper_limit: upperLimit,
        lower_limit: lowerLimit,
      })
      createRecord("/responseVariableFull", body)
    } else {
      console.log("did not have all information")
    }
  }

  return (
    <div>
      <div className="continuous-modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="inputItem">
              <div className="item-title">
                <h3>Name:</h3>
              </div>
              <div className="item-input">
                <input
                  type="text"
                  placeholder="Variable Name"
                  name="nameBox"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="inputItem">
              <div className="desc-title">
                <h3>Description:</h3>
              </div>
              <div className="desc-input">
                <input
                  type="text"
                  placeholder="Description"
                  name="descBox"
                  value={description}
                  onChange={handleDescChange}
                />
              </div>
            </div>
            <div className="inputItem">
              <div className="desc-title">
                <h3>Measurement Procedure:</h3>
              </div>
              <div className="desc-input">
                <input
                  type="text"
                  placeholder="Measurement Procedure"
                  name="descBox"
                  value={procedure}
                  onChange={handleProcedureChange}
                />
              </div>
            </div>
            <div className="inputItem">
              <div className="item-title">
                <h3>Unit:</h3>
              </div>
              <div className="item-input">
                <input
                  type="text"
                  placeholder="Unit"
                  name="codeBox"
                  value={unit}
                  onChange={handleUnitChange}
                />
              </div>
            </div>
            <div className="inputItem">
              <div className="item-title">
                <h3>Upper Limit:</h3>
              </div>
              <div className="item-input">
                <input
                  type="text"
                  placeholder="Upper Limit"
                  name="codeBox"
                  value={upperLimit}
                  onChange={handleUpperLimitChange}
                />
              </div>
            </div>
            <div className="inputItem">
              <div className="item-title">
                <h3>Lower Limit:</h3>
              </div>
              <div className="item-input">
                <input
                  type="text"
                  placeholder="Lower Limit"
                  name="codeBox"
                  value={lowerLimit}
                  onChange={handleLowerLimitChange}
                />
              </div>
            </div>
            <div className="finish-btn">
              <input
                type="submit"
                className="submitButton"
                value="Finished"
                onClick={onCreateVariable}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
