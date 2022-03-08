import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function SchoolUserPane(props) {
  //TESTED
  return (
    <div>
      {props.dataProp ? (
        <div className="pane-container">
          <div className="title">
            <h2>
              Student {props.dataProp.school_id} - {props.dataProp.school_class}
            </h2>
            <h2>{props.dataProp.project} Project </h2>
            <h3>{props.dataProp.experiment} Experiment</h3>
          </div>
          <div className="project-column">
            <p>Description</p>
            <div className="description-box">
              <p>{props.dataProp.description}</p>
            </div>
            <p>Hypotheses</p>
            <div className="description-box">
              <p>{props.dataProp.hypotheses}</p>
            </div>
            <p>Variables</p>
            <div className="description-box">
              <p>{props.dataProp.variables}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
