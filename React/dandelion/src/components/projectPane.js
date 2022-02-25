import React, { useEffect, useState } from "react"
import "../styles/App.scss"
import ExperimentCard from "./experimentCard"

export default function ProjectPane(props) {
  const [projectList, setProjects] = useState(0)
  const [editing_project, setEditingProject] = useState("")

  //Tested
  return (
    <div>
      {props.dataProp ? (
        <div className="panel-content">
          <div className="project-title">
            <h3>{props.dataProp.title} Project</h3>
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
              <ExperimentCard dataProp={editing_project}/>
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
