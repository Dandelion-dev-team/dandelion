import { navigate } from "gatsby"
import * as React from "react"
import "../../styles/App.scss"

export default function AddUserTypeModal(props) {
  return (
    <div>
      <div className="user-type-modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            <h3>Are you adding one or multiple users?</h3>
            <p>
              You can choose to add one user or add multiple users at once.
              Adding multiple users is useful if, for example, you wish to add
              an entire class at once. Usernames will be automated. Adding one
              user will give you control over their username. Please note that
              on a user's first log-in, their password will be the same as their
              username.
            </p>
            <div className="type-btns">
              <div className="spacer" />
              <div className="btn-row">
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Add One"
                    onClick={() => {
                      props.singleCallback()
                    }}
                  ></input>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Add Multiple"
                    onClick={() => {
                      props.multipleCallback()
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
