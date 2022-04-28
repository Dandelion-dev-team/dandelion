import React, { useState, useEffect } from "react"
import { createRecord, readRecord } from "../../utils/CRUD"
import Select from "react-select"
import { toast } from "react-toastify"

export default function ContinuousVariableModal(props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [procedure, setProcedure] = useState("")
  const [unit, setUnit] = useState("")
  const [upperLimit, setUpperLimit] = useState("")
  const [lowerLimit, setLowerLimit] = useState("")

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

  const handleUnitChange = e => {
    setUnit(e.target.value)
  }

  const handleUpperLimitChange = e => {
    setUpperLimit(e.target.value)
  }

  const handleLowerLimitChange = e => {
    setLowerLimit(e.target.value)
  }

  const onChangeCheckbox = e => {
    setIsSensorQuantity(!is_sensor_selected);
  }

  const onCreateVariable = e => {
    if (name && description && procedure && unit && upperLimit && lowerLimit) {
      let quantity_check = null;
      if (quantity_selected != null) {
        quantity_check = quantity_selected.id;
      }
      let body = JSON.stringify({
        type: "Continuous",
        name: name,
        description: description,
        procedure: procedure,
        unit: unit,
        upper_limit: upperLimit,
        lower_limit: lowerLimit,
        is_sensor_quantity: false,
        quantity_id: quantity_check,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        once: false,
        final: false
      })
      props.callback(body);
    } else {
      toast.error("Not enough information.")
    }
  }

  useEffect(() => {
    readRecord("/quantity", setQuantityList)
  }, [])

  const onChangeQuantity = e => {
    setSelectedQuantity(e)
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
                <h3>Measurement Procedure:</h3>
              </div>
              <div className="desc-input">
                <textarea
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

            {quantity_selected ?
              <div className="inputItem">
                <div className="item-title">

                </div>
                <div className="item-input">
                  <a target="_blank" href={quantity_selected.help_url}>{quantity_selected.help_url}</a>
                </div>
              </div>
              : null}
            {quantity_selected != null ?
              <div className="experimentCheck">
                <input type="checkbox" id="experiment_id" name="topping" value="experiment_ID" onChange={onChangeCheckbox} />
                <h3>Is sensor quantity</h3>
              </div> : null}
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
