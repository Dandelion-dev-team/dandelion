import { navigate } from "gatsby"
import * as React from "react"

export default function NoNodeModal(props) {
  return (
    <div className="node-modal-container">
      <div className="inner-panel">
        <div className="panel-content">
          <h2>There is no node registered</h2>
          <h3>Without a registered node, you cannot create an experiment</h3>
          <p>
            A node is a vital part of running an experiment - and this application requires that one is registered before you create an experiment. To register a node, 
            click "settings" and then "register a node" in the bottom left panel.
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
