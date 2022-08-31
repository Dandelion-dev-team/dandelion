import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {readAdminRecord, updateRecord} from "../../utils/CRUD";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {navigate} from "gatsby";

export default function PasswordResetModal(props) {
  const [currentPassword, setCurrentPass] = useState("")
  const [newPassword, setNewPass] = useState("")
  const [validated, setValidated] = useState(false);

  const formRef = React.createRef()
  const col1 = 3;
  const col2 = 12 - col1;

  const handleCurrentCharge = e => {setCurrentPass(e.target.value)}
  const handleNewCharge = e => {setNewPass(e.target.value)}

  const afterSave = () => {
    props.setShow(false)
    navigate("/signin")
  }

  const save = e => {
    if (formRef.current.checkValidity()) {
      if(currentPassword === props.password){
        if(newPassword !== currentPassword){

          let body = JSON.stringify({
            password: newPassword,
          })
          updateRecord("/user/access/" + props.username, body, afterSave)
        } else {
          toast.error("New password must be different from the old one")
        }
      } else {
        toast.error("Old password is incorrect")
      }
    }
    setValidated(true);
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title><h2>Choose your password</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You need to reset your password. Make sure it is something unique
            that cannot be guessed by someone else.
          </p>
          <Form
              noValidate
              ref={formRef}
              validated={validated}
          >
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={col1}>Current password</Form.Label>
              <Col sm={col2}>
                <Form.Control
                    name="title"
                    type="password"
                    value={currentPassword}
                    required
                    onChange={handleCurrentCharge}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your current password
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={col1}>New password</Form.Label>
              <Col sm={col2}>
                <Form.Control
                    name="title"
                    type="password"
                    value={newPassword}
                    required
                    onChange={handleNewCharge}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your new password
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Form>

          {/*<div className="password-row">*/}
          {/*  <div className="current-pass">*/}
          {/*    <div className="current-pass-input">*/}
          {/*      <div className="title">*/}
          {/*        <h3>Current Password:</h3>*/}
          {/*      </div>*/}
          {/*      <div className="pass-input">*/}
          {/*        <input type="password" placeholder="Current Password" value={current_pass} onChange={(e) => {setCurrentPass(e.target.value)}}/>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="new-pass">*/}
          {/*    <div className="new-pass-input">*/}
          {/*      <div className="title">*/}
          {/*        <h3>New Password:</h3>*/}
          {/*      </div>*/}
          {/*      <div className="pass-input">*/}
          {/*        <input type="password" placeholder="New Password" value={new_pass} onChange={(e) => {setNewpass(e.target.value)}}/>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </Modal.Body>
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => {props.setShow(false)}}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => save()}>Save</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )

    {/*      <div className="submit-btn">*/}
    {/*      <input*/}
    {/*          type="submit"*/}
    {/*          className="submitButton"*/}
    {/*          value="Submit"*/}
    {/*          onClick={() => {*/}
    {/*            onSubmit()*/}
    {/*          }}*/}
    {/*        />*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*</div>*/}
  // )
}
