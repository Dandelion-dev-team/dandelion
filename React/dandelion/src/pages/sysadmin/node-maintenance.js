import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import "../../styles/App.scss"
import NodeComponent from "../../components/tables/nodeComponent"
import Select from "react-select"
import { createRecord, readAdminRecord, readRecord, updateRecord } from "../../utils/CRUD"
import { verify_sysadmin_storage } from "../../utils/logins"
import { navigate } from "gatsby"

export default function NodeMaintenance(props) {
  const [schoolList, setSchoolList] = useState("")
  const [logged, setLogged] = useState("");

  const [school_selected, setDropdown] = useState("")
  const [entered_code, setCode] = useState("")
  const [entered_MAC_address, setMAC] = useState("")
  const [entered_status, setStatus] = useState("")

  const [editing, setEditing] = useState("")
  const [editing_node, setEditingNode] = useState("")

  useEffect(() => {
    if (verify_sysadmin_storage() == true) {
      setLogged(true);
      readRecord("/school", setSchoolList);
    } else {
      navigate("/signin");
    }
  }, [])

  const handleCallback = childData => {
    setEditing(true)
    console.log(childData.id);
    readAdminRecord("/node/" + childData.id).then(data => 
      {
        setCode(data.Node.growcube_code)
        setMAC(data.Node.mac_address)
        setStatus(data.Node.status)
        setEditingNode(data.Node);
      }
    )
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
      let body = JSON.stringify({
        id: 3,
        school_id: school_selected.id,
        growcube_code: entered_code,
        mac_address: entered_MAC_address,
        last_communication_date: "",
        next_communication_expected: "",
        health_status: "",
        status: entered_status,
      })
      createRecord("/node", body);
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
      let body = JSON.stringify({
        id: editing_node.node_id,
        school_id: school_selected.id,
        growcube_code: entered_code,
        mac_address: entered_MAC_address,
        last_communication_date: editing_node.last_communication_date,
        next_communication_expected: editing_node.next_communication_expected,
        health_status: editing_node.health_status,
        status: entered_status,
      });
      updateRecord("/node/" + editing_node.id, body)
    } else {
      console.log("did not have all information")
    }
  }
  if (logged) {
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
                  <h3>School {editing ? "ID" : null}: </h3>
                  {editing ? <h3>{editing_node.school_id}</h3>
                  :                   
                  <Select
                    options={schoolList.data}
                    value={school_selected}
                    defaultValue={school_selected}
                    onChange={setDropdown}
                    getOptionLabel={schoolList => schoolList.name}
                    getOptionValue={schoolList => schoolList.id} // It should be unique value in the options. E.g. ID
                  />}

                </div>
                <div className="textbox">
                  <h3>Growcube Code:</h3>
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
  } else return null;
}
