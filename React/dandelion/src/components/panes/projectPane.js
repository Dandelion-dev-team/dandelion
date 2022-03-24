import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import ExperimentCard from "../cards/experimentCard"

export default function ProjectPane(props) {
  //Tested

  const cardClickCallback = (childData) => {
   navigate("/superuser/user-maintenance", {
    state: { experiment: childData },
})
  }
  return (
    <div>
      {props.dataProp ? (
        <div className="project-panel-content">
          <div className="project-title">
            <h3>{props.dataProp.title} </h3>
            <h3>
              {new Date(props.dataProp.start_date).toDateString()} -{" "}
              {new Date(props.dataProp.end_date).toDateString()}{" "}
            </h3>
            <h3>{props.dataProp.partner}</h3>
            <h3>Owner - {props.dataProp.owner}</h3>
            <div className="feat-img">
              <img src={props.dataProp.project_image_link} />
            </div>
            <div className="experiment-row">
            {props.dataProp.experiments.map(experiment => ( <ExperimentCard callback={cardClickCallback} dataProp={experiment}/>))}
            </div>
          </div>
          <div className="btn-row">
            <button className="submitButton" id="inv">
              Invite School
            </button>
            <button className="submitButton">Edit Project</button>
            <button className="submitButton" id="comp">
              Project Complete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
