import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function SchoolUserPane(props) {

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
            
          </div>
        </div>
      ) : null}
    </div>
  )
}
