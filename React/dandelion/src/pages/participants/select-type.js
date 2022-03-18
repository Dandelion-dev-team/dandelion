import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import PaginationComponent from "../../components/navigation/pagination"

export default function SelectType(props) {
  const handleSingle = e => {
    navigate("/participants/enter-single", {
      state: {
        response: props.location.state.responseVariables,
      },
    })
  }

  return (
    <div>
      <div className="type-container">
        <div className="content">
          <div className="title-content">
            <h3>Scientist Observations</h3>
            <p>Are you entering single or multiple pieces of data</p>
          </div>
          <div className="select-form">
            <div className="select-pane">
              <p>
                You can enter many readings for your experiment at one time, in
                case you have missed a day or have several pieces of bulk data
                to add.
              </p>
              <div className="data-type-btns">
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
        <div className="pagination">
          <div className="spacer" />
          <div className="pag-component">
            <PaginationComponent pageIndex={1} numPages={2} />
          </div>
        </div>
      </div>
    </div>
  )
}
