import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function SchoolUserPane(props) {
  const [editing, setEditing] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");

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
            {editing == false ?
              <div className="btn-row">
                <input
                  type="submit"
                  className="submitButton"
                  value="Edit User"
                  onClick={() => {
                    setEditing(true)
                  }}
                ></input>
              </div>
              :
              <div>
                <div className="inputItem">
                  <div className="item-title">
                    <h3>Username:</h3>
                  </div>
                  <div className="item-input">
                    <input
                      type="text"
                      placeholder="Username"
                      name="codeBox"
                    // value={unit}
                    // onChange={handleUnitChange}
                    />
                  </div>
                  
                </div>
                <div className="inputItem">
                  <div className="item-title">
                    <h3>Password:</h3>
                  </div>
                  <div className="item-input">
                    <input
                      type="text"
                      placeholder="Password"
                      name="codeBox"
                    // value={unit}
                    // onChange={handleUnitChange}
                    />
                  </div>
                </div>
                <div className="inputItem">
                  <div className="item-title">
                    <h3>Notes:</h3>
                  </div>
                  <div className="item-input">
                    <input
                      type="text"
                      placeholder="Notes"
                      name="codeBox"
                    // value={unit}
                    // onChange={handleUnitChange}
                    />
                  </div>
                  
                </div>
                <div className="btn-row">
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
              </div>
            }
          </div>
        </div>
      ) : null}
    </div>
  )
}
