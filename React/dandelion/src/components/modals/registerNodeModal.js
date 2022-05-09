import { navigate } from "gatsby"
import React, { useEffect, useState, useRef } from "react"
import {createRecord, readRecord} from "../../utils/CRUD";

export default function RegisterNodeModal(props) {
  const [GCCode, setCode] = useState()
  const [mac_address, setMacAddress] = useState()

  const registerNode = e => {
    let date = new Date()
    let useDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    (date.getDay() + 1)

    let school_id = localStorage.getItem("school_id");
    let body = JSON.stringify({
      school_id: school_id,
      growcube_code: GCCode,
      mac_address: mac_address,
      last_communication_date: useDate,
      next_communication_date: useDate,
      health_status: "online",
      status: "active",
    })
    createRecord("/node", body)
  }

  return (
    <div className="modal-container">
      <div className="node-inner-panel">
        <div className="panel-content">
          <h2>Register A Node</h2>

          <div className="desc-item">
            <div className="item-title">
              <h3>Growcube Code:</h3>
            </div>
            <div className="item-input">
              <input
                placeholder="The code associated with your growcube."
                onChange={e => {
                  setCode(e.target.value)
                }}
                //value={issueSteps}
              />
            </div>
          </div>
          <div className="desc-item">
            <div className="item-title">
              <h3>Mac Address:</h3>
            </div>
            <div className="item-input">
              <input
                placeholder="The mac address provided with your growcube."
                onChange={e => {
                  setMacAddress(e.target.value)
                }}
                //value={issueSteps}
              />
            </div>
          </div>
          <div className="submit-btn">
            <input
              type="submit"
              className="submitButton"
              value="Register Node"
              onClick={() => {
                registerNode()
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  )
}
