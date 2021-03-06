import React, { useState, useEffect } from "react"
import { createRecord, readRecord } from "../../utils/CRUD"
import Select from "react-select"
import DiscreteCard from "../cards/discreteCard"
import { toast } from "react-toastify"

export default function DiscreteVariableModal(props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [procedure, setProcedure] = useState("")
  const [levelName, setLevelName] = useState("")
  const [levelDescription, setLevelDescription] = useState("")
  const [levelProcedure, setLevelProcedure] = useState("")

  const [level_list, setLevelList] = useState([])
  const [is_sensor_selected, setIsSensorQuantity] = useState(false)

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleDescChange = e => {
    setDescription(e.target.value)
  }
  const handleProcedureChange = e => {
    setProcedure(e.target.value)
  }

  const handleLevelNameChange = e => {
    setLevelName(e.target.value)
  }

  const handleLevelDescriptionChange = e => {
    setLevelDescription(e.target.value)
  }

  const handleLevelProcedureChange = e => {
    setLevelProcedure(e.target.value)
  }

  const handleLevelListChange = e => {
    setLevelList(e)
  }

  const onChangeCheckbox = e => {
    setIsSensorQuantity(!is_sensor_selected)
  }

  const onFinish = e => {
    if (name && description && procedure && level_list) {
      let arr = new Array()
      for (let index = 0; index < level_list.length; index++) {
        const element = level_list[index]
        arr.push({
          treatment_name: name,
          sequence: index,
          name: element.name,
          description: element.description,
          procedure: element.procedure,
        })
      }

      let body = JSON.stringify({
        type: "Discrete",
        name: name,
        description: description,
        procedure: procedure,
        levels: arr,
        is_sensor_quantity: false,
      })
      props.callback(body)
    } else {
      toast.error("More information needed.")
    }
  }

  const AddLevel = e => {
    let copy = [...level_list]
    copy.push({
      name: levelName,
      description: levelDescription,
      procedure: levelProcedure,
    })
    setLevelName("")
    setLevelDescription("")
    setLevelProcedure("")
    setLevelList(copy)
  }

  return (
    <div>
      <div className="discrete-modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="left-pane">
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
                  <textarea
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
                  <h3>Treatment Procedure:</h3>
                </div>
                <div className="desc-input">
                  <textarea
                    type="text"
                    placeholder="Treatment Procedure"
                    name="descBox"
                    value={procedure}
                    onChange={handleProcedureChange}
                  />
                </div>
              </div>
            </div>
            {/* Typescript files */}
              {/* Response Card List - w/ typescript component */}
              {/* <DiscreteCardList
                    levelList={level_list}

                    // addLevel={AddLevel}
                    // reorderLevels={handleLevelListChange}
                  /> */}
            <div className="right-pane">
              <div className="level-input">
                <div className="input-item">
                  <div className="input-title">
                    <h3>Name:</h3>
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Level name"
                      name="descBox"
                      onChange={handleLevelNameChange}
                      value={levelName}
                    />
                  </div>
                </div>
                <div className="input-item">
                  <div className="input-title">
                    <h3>Description:</h3>
                  </div>
                  <div className="input-box">
                    <textarea
                      type="text"
                      placeholder="Level Description"
                      name="descBox"
                      onChange={handleLevelDescriptionChange}
                      value={levelDescription}
                    />
                  </div>
                </div>
                <div className="input-item">
                  <div className="input-title">
                    <h3>Procedure:</h3>
                  </div>
                  <div className="input-box">
                    <textarea
                      type="text"
                      placeholder="Level Procedure"
                      name="descBox"
                      onChange={handleLevelProcedureChange}
                      value={levelProcedure}
                    />
                  </div>
                </div>
                <div className="spacer" />
                <div className="add-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Add Level"
                    onClick={() => {
                      {
                        AddLevel()
                      }
                    }}
                  />
                </div>
              </div>
              <div className="card-list">
                {level_list.length > 0
                  ? level_list.map(card => <DiscreteCard card={card} />)
                  : null}
              </div>
              <div className="btn-row">
                <div className="close-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Close"
                    onClick={() => {
                      {
                        props.callback()
                      }
                    }}
                  ></input>
                </div>
                <div className="spacer" />
                <div className="finish-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Finish"
                    onClick={() => {
                      {
                        onFinish()
                      }
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
