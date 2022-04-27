import { navigate } from "gatsby"
import * as React from "react"

export default function activityCreatedModal(props) {
  return (
    <div className="invite-modal-container">
      <div className="inner-panel">
        <div className="panel-content">
          <h2>Invite A School To Your Activity</h2>
          <p>
            As part of running an activity. Sometimes you may want to collaborate with another school on an activity so you can share results and compare your observations across multiple schools. 
          </p>
          <p>
            The other school will not be able to create experiments or edit the activity information - they will have their own copy of it with the ability to upload their own data.
          </p>
          <p>
            It is a good idea to check with a school to ensure they want to collaborate and work out who will be leading the activity before inviting them here.
          </p>
          <div className="submit-btn">
            <input
              type="submit"
              className="submitButton"
              value="Next"
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
