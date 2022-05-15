import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD";
import ExperimentCard from "../cards/experimentCard";

export default function SchoolUserPane(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");
  const [experiments, setExperiments] = useState([]);



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
            <div className="experiments-container">
              {props.experiment_list.data ? props.experiment_list.data.map(e => (
                <ExperimentCard dataProp={e}/>
              )) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
