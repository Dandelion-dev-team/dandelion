import React, { useEffect, useState } from "react"
import { createRecord } from "../../utils/CRUD"

export default function AddMultipleUsersModal(props) {
  const [enteredNumber, setEnteredNumber] = useState("")
  const [missing_info, setMissingInfo] = useState(false)

  const createUsers = number => {
    let school = localStorage.getItem("school_id")
    if (school && enteredNumber) {
      let body = JSON.stringify({
        school_id: school.id,
        accounts_number: enteredNumber,
      })
      createRecord("/user/create_account/multiple", body)
    } else {
      setMissingInfo(true)
    }
  }

  return (
    <div className="add-multiple-students-modal">
      <div className="inner-panel">
        <div className="panel-content">
          <div className="title">
            <h2>Add Users</h2>
            <p>Enter the amount of users you wish to create.</p>
          </div>
          <div className="enter-row">
            <div className="enter-container">
              <div className="title">
                <h3>Number:</h3>
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

          {missing_info ? (
            <div className="missing-info">
              <h3>Missing Information</h3>
            </div>
          ) : null}


          <div className="finish-row">
            <div className="add-btn">
              <input
                type="submit"
                className="add-btn"
                value="Update"
                onClick={() => {
                  createUsers()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
