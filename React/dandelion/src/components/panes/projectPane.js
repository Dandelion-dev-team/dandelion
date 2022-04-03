import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"
import ExperimentCard from "../cards/experimentCard"

export default function ProjectPane(props) {
  const [experimentList, setExperiments] = useState([]);
  //Tested
  useEffect(() => {
    readRecord("/project/" + props.dataProp.Project.project_id + "/experiment", setExperiments)
  }, [])


  const cardClickCallback = (childData) => {
    navigate("/superuser/user-maintenance", {
      state: { experiment: childData },
    })
  }
  return (
    <div>
      {props.dataProp.Project ? (
        <div className="project-panel-content">
          {console.log(props.dataProp.Project)}
          <div className="project-title">
            <h3>{props.dataProp.Project.title} </h3>
            <h3>
              {new Date(props.dataProp.Project.start_date).toDateString()} - {" "}
              {new Date(props.dataProp.Project.end_date).toDateString()}{" "}
            </h3>
            <h3>{props.dataProp.Project.status}</h3>
            <div className="feat-img">
              <img src={props.dataProp.Project.image_full} />
            </div>
            <div className="experiment-row">
              {experimentList.data ? experimentList.data.map(experiment => (<ExperimentCard callback={cardClickCallback} dataProp={experiment} />)) : null}
            </div>
          </div>
          <div className="btn-row">
            <button className="submitButton" id="exp" onClick={() => {
              navigate("/activities/create-experiment/predefined-experiments",
                {
                  state: {project_id: props.dataProp.Project.project_id},
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
