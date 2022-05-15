import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { createRecord, readRecord } from "../../utils/CRUD"
import ExperimentCard from "../cards/experimentCard"
import InviteModal from "../../components/modals/inviteModal"
import SchoolModal from "../../components/modals/inviteSchoolModal"
import EditActivityModal from "../modals/editActivityModal"

export default function ProjectPane(props) {
  const [showDisclaimer, setDisclaimer] = useState(false)
  const [showAddModal, setAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  //Tested
  useEffect(() => {
    //readRecord("/project/" + props.dataProp.Project.project_id + "/experiment", setExperiments)
  }, [])

  const cardClickCallback = childData => {
    navigate("/superuser/user-maintenance", {
      state: { experiment: childData },
    })
  }

  const nextModal = e => {
    setDisclaimer(false)
    setAddModal(true)
  }

  const addSchool = e => {
    setAddModal(false)
    console.log(e)
    //createRecord('/project_partner/<int:project_id>/<int:school_id>')
    createRecord("/project_partner/" + props.project.project_id + "/" + e, null)
  }

  return (
    <div>
      {props.project ? (
        <div className="project-panel-content">
          {showDisclaimer ? <InviteModal callback={nextModal} /> : null}
          {showAddModal ? <SchoolModal callback={addSchool} /> : null}
          {showEditModal ? <EditActivityModal project={props.project} /> : null}

          <div className="project-details">
            <h3>{props.project.title} </h3>
            <h3>
              {new Date(props.project.start_date).toDateString()} -{" "}
              {new Date(props.project.end_date).toDateString()}{" "}
            </h3>
            <h3>{props.project.status}</h3>
            <div className="feat-img">
              <img src={props.project.image_full} />
            </div>
            <div className="experiment-row">
              <div className="experiments">
              {props.experiments
                ? props.experiments.data.map(experiment => (
                    <ExperimentCard
                      callback={cardClickCallback}
                      dataProp={experiment}
                    />
                  ))
                : null}
                </div>
              
              <div className="btn-row">
                <button
                  className="submitButton"
                  id="exp"
                  onClick={() => {
                    navigate(
                      "/activities/create-experiment/predefined-experiments",
                      {
                        state: {
                          project_id: props.project.project_id,
                          start_date: props.project.start_date,
                          end_date: props.project.end_date,
                        },
                      }
                    )
                  }}
                >
                  Create Experiment
                </button>
                <button
                  className="submitButton"
                  id="edit"
                  onClick={() => {
                    setShowEditModal(true)
                  }}
                >
                  Edit Activity
                </button>
                <button
                  className="submitButton"
                  id="inv"
                  onClick={() => {
                    setDisclaimer(true)
                  }}
                >
                  Invite School
                </button>
                <button className="submitButton" id="comp">
                  Project Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
