import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function ExperimentPane(props) {
  const [experimentList, setExperiment] = useState(0)
  const [editing_experiment, setEditingExperiment] = useState("")

  return (
    <div>
      {props.dataProp ? (
        <div className="panel">
          <div className="panel-content">
            <div className="experiment-title">
              <h3>{props.dataProp.title} </h3>
              <h3>
                {new Date(props.dataProp.start_date).toDateString()} -{" "}
                {new Date(props.dataProp.end_date).toDateString()}{" "}
              </h3>
              <h3>Created by Dandelion</h3>
            </div>

            <div className="experiment-img">
              <img src={props.dataProp.experiment_image_link} />
            </div>

            <div className="experiment-desc">
              <h2>Description:</h2>
              <h3>{props.dataProp.description}</h3>
              <h2>Tutorial:</h2>
              <h3>{props.dataProp.desc2}</h3>
            </div>

            <div className="btn-row">
              <button className="submitButton">Use This Experiment</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
