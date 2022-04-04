import { navigate } from "gatsby"
import * as React from "react"

export default function activityCreatedModal(props) {
  return (
    <div className="modal-container">
      <div className="inner-panel">
        <div className="panel-content">
          <h2>Activity Created Successfully</h2>
          <h3>Would you like to add an experiment?</h3>
          <p>
            As part of running an activity, you will be conducting experiments.
            In order to have these represented on the system, you have to either
            choose from the list of available experiments or create your own.
          </p>
          <p>
            To add an experiment, simply click the activity you have just created and hit the green "Create experiment" button in the right hand panel.
          </p>
          <div className="submit-btn">
            <input
              type="submit"
              className="submitButton"
              value="Close"
              onClick={() => {
                props.callback("prop")
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  )
}
