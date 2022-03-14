import React, { useState, useEffect } from "react"
import { createRecord } from "../../utils/CRUD"
import DiscreteModalCard from "../cards/discreteModalCard"
import DiscreteCardList from "../cards/discreteCardList"

export default function DiscreteVariableModal(props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [procedure, setProcedure] = useState("")
  const [level_text_box, setLevelTextbox] = useState("");

  const [level_list, setLevelList] = useState([]);

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleDescChange = e => {
    setDescription(e.target.value)
  }
  const handleProcedureChange = e => {
    setProcedure(e.target.value)
  }

  const handleLevelTextboxChange = e => {
    setLevelTextbox(e.target.value)
  }

  const handleLevelListChange = e => {
    setLevelList(e);
  }

  const onFinish = e => {
    if (name && description && procedure) {
      let body = JSON.stringify({
        id: 1,
        type: "Discrete",
        name: name,
        description: description,
        procedure: procedure,
        levels: [{name: "Touch"}, {name: "Control"}],
      })
      props.callback(body);
    } else {
      console.log("did not have all information")
    }
  }

  const AddLevel = e => {
    let copy = [...level_list];
    copy.push(level_text_box)
    setLevelList(copy);
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
            </div>
            <div className="level-row">
              <div className="card-list">
                <DiscreteCardList levelList={level_list} addLevel={AddLevel} reorderLevels={handleLevelListChange}/>
                <div className="level-bar">
                  <div className="title">
                    <h3>Level:</h3>
                  </div>
                  <div className="input">
                    <input
                      type="text"
                      placeholder="Level"
                      name="descBox"
                      onChange={handleLevelTextboxChange}
                      value={level_text_box}
                    />
                  </div>
                </div>
                <div className="add-btn">
                <input
                  type="submit"
                  className="submitButton"
                  value="Add Level"
                  onClick={() => {
                    {AddLevel()}
                  }}

                ></input>
              </div>
              </div>
              <div className="finish-btn-row">
                <div className="spacer" />
                <div className="finish-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Finish"
                    onClick={() => {
                      {onFinish()}
                    }}
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
