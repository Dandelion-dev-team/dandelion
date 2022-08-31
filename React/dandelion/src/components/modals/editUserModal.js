import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { updateRecord } from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function EditUserModal(props) {
  const [username, setUsername] = useState("")
  const [notes, setNotes] = useState("")
  const [validated, setValidated] = useState(false);
  const [dirty, setDirty] = useState(false)

  const formRef = React.createRef()
  const col1 = 3;
  const col2 = 12 - col1;

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

    const handleUsernameChange = e => {setDirty(true); setUsername(e.target.value)}
    const handleNotesChange = e => {setDirty(true); setNotes(e.target.value)}

    const afterSave = () => {
        props.setReload(!props.reload)
        props.setShow(false)
    }

    const save = e => {
        if (formRef.current.checkValidity()) {
            if (dirty) {
                let body = JSON.stringify({
                    username: username,
                    status: props.user.status,
                    notes: notes,
                })
                updateRecord("/user/" + props.user.user_id, body, afterSave)
            }
        }
        setValidated(true);
    }

    const resetPassword = e => {
        let body = JSON.stringify({
            data: "password reset"
        })
        updateRecord("/user/reset/" + props.user.user_id, body)
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
          <Form
              noValidate
              ref={formRef}
          >
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={col1}>Username</Form.Label>
              <Col sm={col2}>
                <Form.Control
                    name="mac"
                    type="text"
                    value={username}
                    required
                    onChange={handleUsernameChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the username
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={col1}>Notes</Form.Label>
              <Col sm={col2}>
                <Form.Control
                    name="notes"
                    as="textarea"
                    rows={3}
                    value={notes}
                    onChange={handleNotesChange}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => props.setShow(false)}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => save()}>Save</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
