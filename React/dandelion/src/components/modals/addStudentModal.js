import React, { useEffect, useState } from "react"
import { createRecord } from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";

export default function AddStudentModal(props) {
  const [entered_username, setUsername] = useState("")
  const [entered_notes, setNotes] = useState("")

  const [missing_info, setMissingInfo] = useState(false)
  const createUser = user => {
    let school = localStorage.getItem("school_id")
    if (school && entered_username) {
      let body = JSON.stringify({
        school_id: school,
        username: entered_username,
        password: entered_username,
        is_sysadmin: false,
        is_superuser: false,
        status: "Active",
        notes: entered_notes,
      })
      createRecord("/user", body)
    } else {
      setMissingInfo(true)
    }
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handleNotesChange = e => {
    setNotes(e.target.value)
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title><h2>Create Student</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-row">
            <div className="label-textbox">
              <h3>Username:</h3>
              <input
                type="text"
                value={entered_username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="label-textbox">
              <h3>Notes:</h3>
              <textarea
                // type="text"
                value={entered_notes}
                onChange={handleNotesChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => props.setShow(false)}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => createUser()}>Create user</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
