import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { updateRecord } from "../../utils/CRUD"

export default function EditUserModal(props) {
  const [username, setUsername] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    setUsername(props.user.username)
    setNotes(props.user.notes)
    console.log(props.user)
  }, [])

  const updateClicked = e => {
    if (username && notes) {
      let body = JSON.stringify({
        id: props.user.user_id,
        school_id: props.user.school_id,
        username: username,
        status: props.user.status,
        notes: notes,
      })
      updateRecord("/user/" + props.user.user_id, body)
    } else if (username) {
      let body = JSON.stringify({
        id: props.user.user_id,
        school_id: props.user.school_id,
        username: username,
        status: props.user.status,
        notes: props.user.notes,
      })
      updateRecord("/user/" + props.user.user_id, body)
    } else {
      toast.error("Need more information.")
    }
  }

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
              onChange={e => {
                setUsername(e.target.value)
              }}
            />
          </div>

          <div className="label-textbox">
            <h3>Notes:</h3>
            <input
              type="text"
              value={notes}
              onChange={e => {
                setNotes(e.target.value)
              }}
            />
          </div>

          <div className="btn-row">
            <input
              type="submit"
              className="submitButton"
              value="Update User"
              onClick={() => {
                updateClicked()
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
