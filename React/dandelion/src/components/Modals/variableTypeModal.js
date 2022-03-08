import { navigate } from "gatsby"
import * as React from "react"
import "../../styles/App.scss"

export default function VariableTypeModal(props) {
  return (
    <div>
      <div className="type-modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            <h3>Is your variable discrete or continuous?</h3>
            <p>
              A continuous variable is one which takes its value from
              measurement. A discrete variable is one which obtains its value
              from counting. An example of a discrete variable could be
              temperature, while an example of a continuous variable could be
              stalk length.
            </p>
            <div className="type-btns">
              <div className="spacer" />
              <div className="btn-row">
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Continuous"
                    onClick={() => {
                     
                    }}
                  ></input>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Discrete"
                    onClick={() => {
                      props.callback("prop")
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
