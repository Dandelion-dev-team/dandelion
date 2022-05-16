import React, { useEffect, useState } from "react"
import { editRecord } from "../../utils/CRUD"

export default function EditUserModal(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notes, setNotes] = useState("")



  useEffect(() => {
    setUsername(props.user.username)
    setNotes(props.user.notes)
  }, [])

  return (
    <div className="edit-student-modal">
      <div className="inner-panel">
        <div className="panel-content">
          <h2>Edit Student</h2>

          <div className="label-textbox">
            <h3>Username:</h3>
            <input
              type="text"
              value={username}
            //   onChange={handleUsernameChange}
            />
          </div>
          <div className="label-textbox">
            <h3>Password:</h3>
            <input
              type="text"
            //   onChange={handlePasswordChange}
            />
          </div>
          <div className="label-textbox">
            <h3>Notes:</h3>
            <input
              type="text"
              value={notes}
            //   onChange={handleNotesChange}
            />
          </div>

          <div className="btn-row">
            <input
              type="submit"
              className="submitButton"
              value="Update User"
              onClick={() => {
                // createUser()
              }}
            ></input>
            <input
              type="submit"
              className="submitButton"
              value="Close"
              onClick={() => {
                props.closeModal()
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  )
}
