import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"

export default function enterDetails(props) {
  return (
    <div>
      <div className="create-exp-container">
        <div className="content">
          <div className="title-content">
            <h3>Experiment Creation</h3>
            <p>Tell us about your experiment</p>
          </div>
          <div className="experiment-form">
            <div className="experiment-pane">
              <div className="inputItem">
                <div className="item-title">
                  <h3>Name:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="text"
                    placeholder="Activity Name"
                    name="nameBox"
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="desc-title">
                  <h3>Description:</h3>
                </div>
                <div className="desc-input">
                  <input type="text" placeholder="Description" name="descBox" />
                </div>
              </div>           
             
              <div className="inputItem">
                <div className="item-title">
                  <h3>Start Date:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="date"
                    // placeholder="Activity Code"
                    name="codeBox"
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="item-title">
                  <h3>End Date:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="date"
                    //placeholder="Activity Code"
                    name="codeBox"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <div className="continue-btn">
            <input
              type="submit"
              className="submitButton"
              value="Finished"
              onClick={() => {
                navigate("/activities/create-experiment/treatment-variables")
              }}
            ></input>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </div>
  )
}