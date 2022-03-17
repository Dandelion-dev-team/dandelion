import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"

export default function SelectType(props) {


  const handleSingle = e => {
    navigate("/participants/enter-single", 
    {state: {
      response: props.location.state.responseVariables
    }})
  }

  return (
    <div>
      <div className="type-container">
        <div className="title">
          <h3>Enter Data</h3>
        </div>
        <div className="content">
          <div className="dummy-content">
            <h3>Single or multiple?</h3>
            <h3>{props.location.state.participantDetails.title}</h3>
            <p>
              Placeholder text while implementing modal.
            </p>
            
          </div>

          <div className="type-btns">
            <div className="spacer" />
            <div className="btn-row">
              <div className="submit-btn">
                <input
                  type="submit"
                  className="submitButton"
                  value="Single"
                    onClick={() => {
                      handleSingle()
                    }}
                ></input>
              </div>
              <div className="submit-btn">
                <input
                  type="submit"
                  className="submitButton"
                  value="Multiple"
                  //   onClick={() => {
                  //     props.discreteCallback()
                  //   }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
