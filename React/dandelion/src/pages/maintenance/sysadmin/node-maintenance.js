import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../../components/sysSideNav"
import "../../../styles/App.scss"
import NodeComponent from "../../../components/nodeTable"
import Select from "react-select"

export default function SuperuserMaintenance(props) {
  const [schoolList, setSchoolList] = useState("")

  const [school_selected, setDropdown] = useState("")
  const [entered_code, setCode] = useState("")
  const [entered_MAC_address, setMAC] = useState("")
  const [entered_status, setStatus] = useState("")

  const [editing, setEditing] = useState("")
  const [editing_node, setEditingNode] = useState("")

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/schools", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setSchoolList(Array.from(data)))
  }, [])

  const handleCallback = childData => {
    setEditing(true)
    setCode(childData.growcube_code)
    setMAC(childData.mac_address)
    setStatus(childData.status)
    setEditingNode(childData)
  }
  const handleCodeChange = e => {
    setCode(e.target.value)
  }
  const handleMACChange = e => {
    setMAC(e.target.value)
  }
  const handleStatusChange = e => {
    setStatus(e.target.value)
  }
  const onCreateQuantity = e => {
    if (
      school_selected &&
      entered_MAC_address &&
      entered_code &&
      entered_status
    ) {
      fetch("http://localhost:3000/nodes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 3,
          school_id: school_selected.id,
          growcube_code: entered_code,
          mac_address: entered_MAC_address,
          last_communication_date: "",
          next_communication_expected: "",
          health_status: "",
          status: entered_status,
        }),
      })
        .then(console.log("PUT new node"))
        .then(window.location.reload(false))
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateQuantity = e => {
    if (
      school_selected &&
      entered_MAC_address &&
      entered_code &&
      entered_status
    ) {
      fetch("http://localhost:3000/nodes/" + editing_node.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editing_node.id,
          school_id: school_selected.id,
          growcube_code: entered_code,
          mac_address: entered_MAC_address,
          last_communication_date: editing_node.last_communication_date,
          next_communication_expected: editing_node.next_communication_expected,
          health_status: editing_node.health_status,
          status: entered_status,
        }),
      })
        .then(console.log("PUT new node"))
        .then(window.location.reload(false))
    }
  }
  return (
    <div>
      <SysSideNav />
      <div className="node-maintenance-container">
        <div className="node-content">
          <div className="content-wrapper">
            <div className="table">
              <NodeComponent parentCallback={handleCallback} />
            </div>
            <div className="edit-content">
              <div className="quantityPicker">
                  <h3>School:</h3>
                <Select
                  name="authority_id_picker"
                  options={schoolList}
                  value={school_selected}
                  defaultValue={school_selected}
                  onChange={setDropdown}
                  getOptionLabel={schoolList => schoolList.name}
                  getOptionValue={schoolList => schoolList.id} // It should be unique value in the options. E.g. ID
                />
              </div>
              <div className="textbox">
                <h3>Crowcube Code:</h3>
                <input
                  type="text"
                  placeholder="Growcube Code"
                  name="usernameBox"
                  value={entered_code}
                  onChange={handleCodeChange}
                />
              </div>
              <div className="textbox">
                <h3>MAC Address:</h3>
                <input
                  type="text"
                  placeholder="Enter MAC Address"
                  name="usernameBox"
                  value={entered_MAC_address}
                  onChange={handleMACChange}
                />
              </div>
              <div className="textbox">
                <h3>Status:</h3>
                <input
                  type="text"
                  placeholder="Enter Status"
                  name="usernameBox"
                  value={entered_status}
                  onChange={handleStatusChange}
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
