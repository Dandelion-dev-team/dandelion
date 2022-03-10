import { navigate } from "gatsby"
import * as React from "react"
import "../../styles/App.scss"

export default function UnitHelpModal(props) {
  return (
    <div>
      <div className="help-modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            <h3>Assigning Experiment Levels?</h3>
            <p>
              The right hand panel is a graphical view of the cube. To change
              levels, click on either “Top Level”, “Middle Level”, or “Bottom
              Level”. Once a level has been chosen, you can assign replicates of
              experiments to individual plots by dragging and dropping the tile.
            </p>
            <div className="btn">
              <div className="btn-row">
                <div className="finish-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Got It"
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
