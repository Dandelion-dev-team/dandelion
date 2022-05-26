import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { createRecord } from "../../utils/CRUD"
import CloseIcon from "@mui/icons-material/Close"

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
    <div className="add-student-modal">
      <div className="inner-panel">
        <div className="close-btn">
          <CloseIcon
            className="btn"
            onClick={() => {
              props.closeModal()
            }}
          />
        </div>
        <div className="panel-content">
          <div className="title">
            <h2>Create Student</h2>
          </div>
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
              <input
                type="text"
                value={entered_notes}
                onChange={handleNotesChange}
              />
            </div>
          </div>

          {missing_info ? (
            <div className="missing-info">
              <h3>Missing Information</h3>
            </div>
          ) : null}

          <div className="btn-row">
            <div className="btn-container">
              <input
                type="submit"
                className="submitButton"
                value="Create User"
                onClick={() => {
                  createUser()
                }}
              />
            </div>
            <div className="btn-container">
              <input
                type="submit"
                className="submitButton"
                value="Close"
                onClick={() => {
                  props.closeModal()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
