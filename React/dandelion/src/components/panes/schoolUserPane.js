import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function SchoolUserPane(props) {
  //TESTED
  return (
    <div>
      {props.dataProp ? (
        <div className="pane-container">
          <div className="pane-content">
            <div className="title">
              <h2>
                {props.dataProp.username}
              </h2>
              <h3>{props.dataProp.notes}</h3>
            </div>
            <div className="btn-row">
              <input
                type="submit"
                className="submitButton"
                value="Create User"
                onClick={() => {

                }}
              ></input>
              <input
                type="submit"
                className="submitButton"
                value="Close"
                onClick={() => {

                }}
              ></input>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
