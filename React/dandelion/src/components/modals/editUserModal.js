import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { updateRecord } from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";

export default function EditUserModal(props) {
  const [username, setUsername] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
      if (props.user) {
        setUsername(props.user.username)
        setNotes(props.user.notes)
        console.log(props.user)
      }
      else {
        setUsername(null)
        setNotes(null)
      }
  }, [props.user])

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
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title><h2>Edit Student</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <textarea
              value={notes}
              onChange={e => {
                setNotes(e.target.value)
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => props.setShow(false)}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => updateClicked()}>Save</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
