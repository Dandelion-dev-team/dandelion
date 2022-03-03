import React, { useEffect, useState, useRef } from "react"
import Header from "../../../components/header"
import "../../../styles/App.scss"

export default function firstExpPage(props) {
  return (
    <div>

      <div className="activity-container">
        <div className="content">
          <div className="text-content">
            <h3>Activity Creation</h3>
            <p>Tell us about your activity.</p>
          </div>
          <div className="activity-form">
            <div className="activity-pane">
              <div className="inputItem">
                <h3>Name:</h3>
                <input
                  type="text"
                  placeholder="Activity Name"
                  name="nameBox"
                  //value={entered_school_name}
                  //onChange={handleNameChange}
                />
              </div>
              <div className="inputItem">
                <h3>Code:</h3>
                <input
                  type="text"
                  placeholder="Activity Code"
                  name="codeBox"
                  //value={entered_school_name}
                  //onChange={handleNameChange}
                />
              </div>
              <div className="descItem">
                <h3>Description:</h3>
                <input
                  type="text"
                  placeholder="Description"
                  name="activityBox"
                  //value={entered_school_name}
                  //onChange={handleNameChange}
                />
              </div>
              <div className="descItem">
                <h3>Deeeeeeeeescription:</h3>
                <input
                  type="text"
                  placeholder="Description"
                  name="activityBox"
                  //value={entered_school_name}
                  //onChange={handleNameChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <div className="continue-btn">
            <input
              type="submit"
              className="submitButton"
              value="Create"
            ></input>
          </div>
        </div>
      </div>
    </div>
  )
}
