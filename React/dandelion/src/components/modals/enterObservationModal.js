import * as React from "react"

export default function EnterObservationModal(props) {
  return (
    <div className="modal-container">
      <div className="inner-content">
        <div className="panel-content">
          <div className="title">
            <h2>{props.props.name}</h2>
          </div>
          <div className="inputs">
            <h3>Hello :)</h3>
          </div>
          <div className="btn-row">
            <div className="submit-btn">
              <input
                type="submit"
                className="submitButton"
                value="Single"
                onClick={() => {
                  console.log("details:")
                }}
              />
            </div>
            <div className="submit-btn">
              <input
                type="submit"
                className="submitButton"
                value="Single"
                onClick={() => {
                  console.log("details:")
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
