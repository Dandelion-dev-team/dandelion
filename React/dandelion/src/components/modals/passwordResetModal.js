import * as React from "react"

export default function PasswordResetModal(props) {
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
                  <input type="text" placeholder="Current Password" />
                </div>
              </div>
            </div>
            <div className="new-pass">
              <div className="new-pass-input">
                <div className="title">
                  <h3>New Password:</h3>
                </div>
                <div className="pass-input">
                  <input type="text" placeholder="New Password" />
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
                props.callback("prop")
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
