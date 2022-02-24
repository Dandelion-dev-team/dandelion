import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../../components/sysSideNav"
import "../../../styles/App.scss"
import SensorComponent from "../../../components/sensorComponent"
import Select from "react-select"

export default function SuperuserMaintenance(props) {
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
      fetch("http://localhost:3000/sensor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 3,
          code: entered_code,
          description: entered_desc,
          url: entered_url,
          datasheet_link: entered_datasheet,
          quantities: selected_quantities,
        }),
      })
        .then(console.log("PUT new quantity"))
        .then(window.location.reload(false))
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
      fetch("http://localhost:3000/sensor/" + editing_ID, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 3,
          code: entered_code,
          description: entered_desc,
          url: entered_url,
          datasheet_link: entered_datasheet,
          quantities: selected_quantities,
        }),
      })
        .then(console.log("PUT new sensor"))
        .then(window.location.reload(false))
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/quantity", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setQuantityList(Array.from(data)))
  }, [])

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
                <Select
                  value={selected_quantities}
                  closeMenuOnSelect={false}
                  options={quantityList}
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
}
