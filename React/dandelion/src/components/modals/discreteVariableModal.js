import React, { useState, useEffect } from "react"
import { createRecord, readRecord } from "../../utils/CRUD"
import DiscreteModalCard from "../cards/discreteModalCard"
import DiscreteCardList from "../cards/discreteCardList"
import Select from "react-select"

export default function DiscreteVariableModal(props) {
  const [name, setName] = useState("discrete_v")
  const [description, setDescription] = useState("desc")
  const [procedure, setProcedure] = useState("proc")
  const [level_text_box, setLevelTextbox] = useState("")

  const [level_list, setLevelList] = useState([])

  const [quantitiy_list, setQuantityList] = useState()
  const [quantity_selected, setSelectedQuantity] = useState(null)
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

  const handleLevelTextboxChange = e => {
    setLevelTextbox(e.target.value)
  }

  const handleLevelListChange = e => {
    setLevelList(e)
  }

  const onChangeQuantity = e => {
    setSelectedQuantity(e)
  }

  const onChangeCheckbox = e => {
    setIsSensorQuantity(!is_sensor_selected);
  }

  const onFinish = e => {
    if (name && description && procedure && level_list) {
      let arr = new Array()
      for (let index = 0; index < level_list.length; index++) {
        const element = level_list[index]
        arr.push({ treatment_name: name, sequence: index, name: element, description: "", procedure: "" })
      }
      let quantity_check = null;
      if(quantity_selected != null){
        quantity_check = quantity_selected.id;
      }
      let body = JSON.stringify({
        type: "Discrete",
        name: name,
        description: description,
        procedure: procedure,
        levels: arr,
        is_sensor_quantity: is_sensor_selected,
        quantity_id: quantity_check,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        once: true,
        final: true,
      })
      props.callback(body)
    } else {
      console.log("did not have all information")
    }
  }

  useEffect(() => {
    readRecord("/quantity", setQuantityList)
  }, [])

  const AddLevel = e => {
    let copy = [...level_list]
    copy.push(level_text_box)
    setLevelList(copy)
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
              <div className="inputItem">
                <div className="item-title">
                  <h3>Quantity relation:</h3>
                </div>
                <div className="item-input">
                  {quantitiy_list ? <Select
                    name="authority_id_picker"
                    options={quantitiy_list.data}
                    value={quantity_selected}
                    defaultValue={"No Quantity Relation"}
                    onChange={onChangeQuantity}
                    getOptionLabel={quantitiy_list => quantitiy_list.name}
                    getOptionValue={quantitiy_list => quantitiy_list.id} // It should be unique value in the options. E.g. ID
                  /> : <h3>Could not retrieve quantities.</h3>}
                </div>
              </div>
              {quantity_selected != null ? 
              <div className="experimentCheck">
                <input type="checkbox" id="experiment_id" name="topping" value="experiment_ID" onChange={onChangeCheckbox}/>
                <h3>Is sensor quantity</h3>
              </div> : null}

            </div>
            <div className="level-row">
              <div className="card-list">
                <DiscreteCardList
                  levelList={level_list}
                  addLevel={AddLevel}
                  reorderLevels={handleLevelListChange}
                />
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
                      {
                        AddLevel()
                      }
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
                    value="Close"
                    onClick={() => {
                      { props.callback() }
                    }}
                  ></input>
                </div>
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
