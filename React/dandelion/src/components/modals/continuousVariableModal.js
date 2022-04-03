import React, { useState, useEffect } from "react"
import { createRecord, readRecord } from "../../utils/CRUD"
import Select from "react-select"

export default function ContinuousVariableModal(props) {
  const [name, setName] = useState("variable_1")
  const [description, setDescription] = useState("desc")
  const [procedure, setProcedure] = useState("proc")
  const [unit, setUnit] = useState("mm")
  const [upperLimit, setUpperLimit] = useState("100")
  const [lowerLimit, setLowerLimit] = useState("0")

  const [quantitiy_list, setQuantityList] = useState()
  const [quantity_selected, setSelectedQuantity] = useState(null)

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
        type: "Continuous",
        name: name,
        description: description,
        procedure: procedure,
        unit: unit,
        upper_limit: upperLimit,
        lower_limit: lowerLimit,
        is_sensor_quantity: false,
        quantity_id: quantity_selected,
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
      props.callback(body);
    } else {
      console.log("did not have all information")
    }
  }

  useEffect(() => {
    readRecord("/quantity", setQuantityList)
  }, [])

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
              <div className="inputItem">
                <div className="item-title">
                  <h3>Quantity relation:</h3>
                </div>
                <div className="item-input">
                  <Select
                    name="authority_id_picker"
                    options={quantitiy_list}
                    value={quantity_selected}
                    defaultValue={"No Quantity Relation"}
                    onChange={setQuantityList}
                    getOptionLabel={quantitiy_list => quantitiy_list.name}
                    getOptionValue={quantitiy_list => quantitiy_list.id} // It should be unique value in the options. E.g. ID
                  />
                </div>
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
