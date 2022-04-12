import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function SchoolUserPane(props) {
  const [editing, setEditing] = useEffect(false);
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
              {editing ?                  
               <input
                    type="submit"
                    className="submitButton"
                    value="Edit User"
                    onClick={() => {
                      setEditing(true)
                    }}
                  ></input> 
                  :
                <div>
                  <input
                    type="submit"
                    className="submitButton"
                    value="Update User"
                    onClick={() => {

                    }}
                  ></input>
                  <input
                    type="submit"
                    className="submitButton"
                    value="Cancel"
                    onClick={() => {
                      setEditing(false)
                    }}
                  ></input>
                </div>
              }

            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
