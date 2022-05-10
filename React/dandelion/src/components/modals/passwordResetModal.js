import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {readAdminRecord, updateRecord} from "../../utils/CRUD";

export default function PasswordResetModal(props) {
  const [current_pass, setCurrentPass] = useState("")
  const [new_pass, setNewpass] = useState("")

  const onSubmit = e => {
    if(current_pass == props.password){
      if(new_pass != null && new_pass != current_pass){
        console.log("matching")
        readAdminRecord("/user/" + props.username).then(data => {
          let body = JSON.stringify({
            password: new_pass,
          })
          updateRecord("/user/access/" + data.user_id, body)
        })
      }else{
        toast.error("No new password entered.")
      }
    }else{
      toast.error("Old password is incorrect.")
    }
  }

  return (
    <div className="reset-modal-container">
      <div className="inner-modal">
        <div className="modal-content">
          <div className="text-content">
            <h2>Password Reset</h2>
            <h3>
              You need to reset your password. Make sure it is something unique
              that cannot be guessed by someone else.
            </h3>
          </div>
          <div className="password-row">
            <div className="current-pass">
              <div className="current-pass-input">
                <div className="title">
                  <h3>Current Password:</h3>
                </div>
                <div className="pass-input">
                  <input type="password" placeholder="Current Password" value={current_pass} onChange={(e) => {setCurrentPass(e.target.value)}}/>
                </div>
              </div>
            </div>
            <div className="new-pass">
              <div className="new-pass-input">
                <div className="title">
                  <h3>New Password:</h3>
                </div>
                <div className="pass-input">
                  <input type="password" placeholder="New Password" value={new_pass} onChange={(e) => {setNewpass(e.target.value)}}/>
                </div>
              </div>
            </div>
          </div>

          <div className="submit-btn">
          <input
              type="submit"
              className="submitButton"
              value="Submit"
              onClick={() => {
                onSubmit()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
