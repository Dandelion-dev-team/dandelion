import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import "../../styles/App.scss"
import SensorComponent from "../../components/tables/sensorComponent"
import Select from "react-select"
import { createRecord, readRecord, updateRecord } from "../../utils/CRUD"
import { verify_sysadmin_storage } from "../../utils/logins"
import { navigate } from "gatsby"

export default function SuperuserMaintenance(props) {
  const [logged, setLogged] = useState("")
  const [entered_code, setCode] = useState("")
  const [entered_desc, setDesc] = useState("")
  const [entered_url, setURL] = useState("")
  const [entered_datasheet, setDatasheet] = useState("")

  const [quantityList, setQuantityList] = useState("")
  const [selected_quantities, setQuantites] = useState("")

  //EDITING
  const [editing, setEditing] = useState("")
  const [editing_ID, setEditingID] = useState("")

  const handleCallback = childData => {
    setEditing(true)
    setCode(childData.code)
    setDesc(childData.description)
    setURL(childData.url)
    setDatasheet(childData.datasheet_link)
    setQuantites(childData.quantities)
    setEditingID(childData.id)
  }

  const handleCodeChange = e => {
    setCode(e.target.value)
  }
  const handleDescChange = e => {
    setDesc(e.target.value)
  }
  const handleURLChange = e => {
    setURL(e.target.value)
  }
  const handleDatasheetChange = e => {
    setDatasheet(e.target.value)
  }

  const handleSelection = e => {
    setQuantites(e)
  }

  const onCreateClick = e => {
    if (
      entered_code &&
      entered_desc &&
      entered_url &&
      entered_datasheet &&
      selected_quantities
    ) {
      let body = JSON.stringify({
        id: 3,
        code: entered_code,
        description: entered_desc,
        url: entered_url,
        datasheet_link: entered_datasheet,
        quantities: selected_quantities,
      })
      createRecord("/sensor", body)
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateClick = e => {
    if (
      entered_code &&
      entered_desc &&
      entered_url &&
      entered_datasheet &&
      selected_quantities
    ) {
      let body = JSON.stringify({
        id: editing_ID,
        code: entered_code,
        description: entered_desc,
        url: entered_url,
        datasheet_link: entered_datasheet,
        quantities: selected_quantities,
      })

      updateRecord("/sensor/" + editing_ID, body)
    }
  }

  useEffect(() => {
    if (verify_sysadmin_storage() == true) {
      setLogged(true)
      readRecord("/sensorQuantity", setQuantityList);
    } else {
      navigate("/signin")
    }
  }, [])
  if (logged) {
    return (
      <div>
        <SysSideNav />
        <div className="sensor-maintenance-container">
          <div className="sensor-content">
            <div className="content-wrapper">
              <div className="table">
                <SensorComponent parentCallback={handleCallback} />
              </div>
              <div className="edit-pane">
                <div className="textbox">
                  <h3>Code:</h3>
                  <input
                    type="text"
                    placeholder="Code"
                    name="usernameBox"
                    value={entered_code}
                    onChange={handleCodeChange}
                  />
                </div>
                <div className="textbox">
                  <h3>Description:</h3>
                  <textarea
                    type="text"
                    placeholder="Code"
                    name="usernameBox"
                    value={entered_desc}
                    onChange={handleDescChange}
                  />
                </div>
                <div className="textbox">
                  <h3>URL:</h3>
                  <input
                    type="text"
                    placeholder="Code"
                    name="usernameBox"
                    value={entered_url}
                    onChange={handleURLChange}
                  />
                </div>
                <div className="nameBox">
                  <h3>Datasheet link:</h3>
                  <input
                    type="text"
                    placeholder="Code"
                    name="usernameBox"
                    value={entered_datasheet}
                    onChange={handleDatasheetChange}
                  />
                </div>
                <div className="quantityPicker">
                  <h3>Quantity:</h3>
                  <Select
                    value={selected_quantities}
                    closeMenuOnSelect={false}
                    options={quantityList.data}
                    onChange={handleSelection}
                    getOptionLabel={quantity => quantity.name}
                    getOptionValue={quantity => quantity.id} // It should be unique value in the options. E.g. ID
                    isMulti={true}
                  />
                </div>
                {editing ? (
                  //IF EDITING SHOW UPDATE BUTTON
                  <div>
                    <input
                      type="submit"
                      className="createButton"
                      value="Update"
                      onClick={onUpdateClick}
                    ></input>
                  </div>
                ) : (
                  //IF NOT EDITING SHOW CREATE BUTTON
                  <div>
                    <input
                      type="submit"
                      className="createButton"
                      value="Create"
                      onClick={onCreateClick}
                    ></input>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
