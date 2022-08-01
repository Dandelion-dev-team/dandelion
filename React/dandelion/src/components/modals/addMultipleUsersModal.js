import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { createRecord } from "../../utils/CRUD"
import CloseIcon from "@mui/icons-material/Close"
import {Button, Modal} from "react-bootstrap";

export default function AddMultipleUsersModal(props) {
  const [enteredNumber, setEnteredNumber] = useState("")
  const [missing_info, setMissingInfo] = useState(false)

  const createUsers = number => {
    let school = localStorage.getItem("school_id")
    let account_number = parseInt(enteredNumber)
    if (school && account_number) {
      let body = JSON.stringify({
        school_id: school,
        accounts_number: account_number,
      })
      createRecord("/user/create_account/multiple", body)
    } else {
      toast.error("Information incorrect.")
    }
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title><h2>Add Users</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="enter-row">
            <div className="enter-container">
              <div className="title">
                <h3>Enter the number of accounts you would like to create:</h3>
              </div>
              <div className="item-input">
                <input
                  type="text"
                  name="descBox"
                  value={enteredNumber}
                  onChange={e => {
                    setEnteredNumber(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => props.setShow(false)}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => createUsers()}>Create accounts</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
