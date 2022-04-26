import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"

export default function YourObservations(props) {
  return (
    <div className="your-observations-container">
      <div className="title">
        <h3>Your Observations</h3>
      </div>
      <div className="content">
        <div className="content-wrapper">
          <div className="response-pane">
            <div className="response-pane-wrapper">
              <div className="title">
                <h2>Your Response Variables</h2>
                <h3>
                  Select the variables that are to be recorded post-harvest.
                </h3>
              </div>
              <div className="variable-list">
                huh
              </div>
              <div className="recording-date">

              </div>
            </div>
          </div>
          <div className="confirmation-pane">
            <div className="confirmation-pane-wrapper">
              <div className="milestones">
                  <div className="add-milestone">
                      <div className="title">
                        milestones
                        text that goes below it
                      </div>
                      <div className="input-row">
                          copy from modals - input above button
                      </div>
                  </div>
                  <div className="milestone-list">

                  </div>
              </div>
              <div className="final">
                  <div className="add-final">
                      <div className="title">
                          post-harvest
                          text that goes below it
                      </div>
                  </div>
                  <div className="final-list">

                  </div>
              </div>
              <div className="btn-column">
                
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
