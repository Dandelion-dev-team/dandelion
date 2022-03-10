import React, { useState, useEffect } from "react"
import { createRecord } from "../../utils/CRUD"
import DiscreteModalCard from "../cards/discreteModalCard"

export default function DiscreteVariableModal(props) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [procedure, setProcedure] = useState("")

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleDescChange = e => {
    setDescription(e.target.value)
  }
  const handleProcedureChange = e => {
    setProcedure(e.target.value)
  }

  const onCreateVariable = e => {
    if (name && description && procedure) {
      let body = JSON.stringify({
        id: 1,
        type: "Discrete",
        name: name,
        description: description,
        procedure: procedure,
      })
      createRecord("/discreteVariableFull", body)
    } else {
      console.log("did not have all information")
    }
  }

  return (
    <div>
      <div className="discrete-modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="input-row">
              <div className="inputItem">
                <div className="item-title">
                  <h3>Name:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="text"
                    placeholder="Variable Name"
                    name="nameBox"
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="desc-title">
                  <h3>Description:</h3>
                </div>
                <div className="desc-input">
                  <input type="text" placeholder="Description" name="descBox" />
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
                  />
                </div>
              </div>
              <div className="add-btn">
                <input
                  type="submit"
                  className="submitButton"
                  value="Add Level"
                ></input>
              </div>
            </div>
            <div className="level-row">
             <DiscreteModalCard/>
              <div className="finish-btn-row">
                <div className="spacer" />
                <div className="finish-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Finish"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
