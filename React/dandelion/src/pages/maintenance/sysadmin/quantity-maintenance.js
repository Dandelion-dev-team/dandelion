import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../../components/sysSideNav"
import "../../../styles/App.scss"
import QuantityComponent from "../../../components/quantityComponent"
import { createRecord, updateRecord } from "../../../utils/CRUD"

export default function SuperuserMaintenance(props) {
  const [entered_name, setName] = useState("")
  const [entered_unit, setUnit] = useState("")
  const [entered_link, setLink] = useState("")
  const [editing_id, setQuantity] = useState("")

  const [editing, setEditing] = useState("")

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleUnitChange = e => {
    setUnit(e.target.value)
  }
  const handleLinkChange = e => {
    setLink(e.target.value)
  }

  const handleCallback = childData => {
    //SET FIELDS USING PASSED DATA FROM CHILD
    setName(childData.name)
    setUnit(childData.unit)
    setLink(childData.help_url)
    setQuantity(childData.id)

    setEditing(true)
  }

  const onCreateQuantity = e => {
    if (entered_name && entered_unit && entered_link) {
      let appended_url = entered_link
      if (
        !appended_url.startsWith("https://") &&
        !appended_url.startsWith("http://")
      ) {
        appended_url = `https://${appended_url}`
        console.log("appended URL:" + appended_url)
      }
      let body = JSON.stringify({id: 3, name: entered_name, unit: entered_unit,help_url: appended_url,
    });
      createRecord("http://localhost:3000/quantity", body);
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateQuantity = e => {
    if (entered_name && entered_link && entered_unit) {
      let body = JSON.stringify({id: editing_id, name: entered_name, unit: entered_unit, help_url: entered_link,
      });
      updateRecord("http://localhost:3000/quantity/" + editing_id, body);
    }
  }

  return (
    <div>
      <SysSideNav />
      <div className="quantity-maintenance-container">
        <div className="quantity-content">
          <div className="content-wrapper">
            <div className="table">
              <QuantityComponent parentCallback={handleCallback} />
            </div>
            <div className="edit-quantity">
              <div className="textbox">
                <h3>Name:</h3>
                <input
                  type="text"
                  placeholder="Quantity name"
                  name="usernameBox"
                  value={entered_name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="textbox">
                <h3>Unit:</h3>
                <input
                  type="text"
                  placeholder="Measurement"
                  name="usernameBox"
                  value={entered_unit}
                  onChange={handleUnitChange}
                />
              </div>
              <div className="textbox">
                <h3>Help URL:</h3>
                <input
                  type="text"
                  placeholder="Help URL"
                  name="usernameBox"
                  value={entered_link}
                  onChange={handleLinkChange}
                />
              </div>
              {editing ? (
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Update"
                    onClick={onUpdateQuantity}
                  ></input>
                </div>
              ) : (
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Create"
                    onClick={onCreateQuantity}
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
