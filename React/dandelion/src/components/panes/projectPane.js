import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"
import ExperimentCard from "../cards/experimentCard"

export default function ProjectPane(props) {
  //Tested
  useEffect(() => {
    //readRecord("/project/" + props.dataProp.Project.project_id + "/experiment", setExperiments)
  }, [])

  const cardClickCallback = (childData) => {
    navigate("/superuser/user-maintenance", {
      state: { experiment: childData },
    })
  }
  return (
    <div>
      {props.project ? (
        <div className="project-panel-content">
          <div className="project-title">
            <h3>{props.project.title} </h3>
            <h3>
              {new Date(props.project.start_date).toDateString()} - {" "}
              {new Date(props.project.end_date).toDateString()}{" "}
            </h3>
            <h3>{props.project.status}</h3>
            <div className="feat-img">
              <img src={props.project.image_full} />
            </div>
            <div className="experiment-row">
              {props.experiments ? props.experiments.data.map(experiment => (<ExperimentCard callback={cardClickCallback} dataProp={experiment} />)) : null}
            </div>
          </div>
          <div className="btn-row">
            <button className="submitButton" id="exp" onClick={() => {
              navigate("/activities/create-experiment/predefined-experiments",
                {
                  state: {project_id: props.project.project_id, start_date: props.project.start_date, end_date: props.project.end_date},
                })
            }}>
              Create Experiment
            </button>
            <button className="submitButton">
              Edit Project
            </button>
            <button className="submitButton" id="inv">
              Invite School
            </button>
            <button className="submitButton" id="comp">
              Project Complete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
