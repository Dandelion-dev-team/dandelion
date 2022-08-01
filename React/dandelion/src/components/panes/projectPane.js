import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { createRecord, readAdminRecord, readRecord } from "../../utils/CRUD"
import ExperimentCard from "../cards/experimentCard"
import InviteModal from "../../components/modals/inviteModal"
import SchoolModal from "../../components/modals/inviteSchoolModal"
import EditActivityModal from "../modals/editActivityModal"
import NoNodeModal from "../modals/noNodeModal"
import { NonceProvider } from "react-select"
export default function ProjectPane(props) {
  const [showDisclaimer, setDisclaimer] = useState(false)
  const [showAddModal, setAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [show_no_node, setNoNode] = useState(false);
  //Tested
  useEffect(() => {
    //readRecord("/project/" + props.dataProp.Project.project_id + "/experiment", setExperiments)
  }, [])

  const cardClickCallback = childData => {
    navigate("/superuser/user-maintenance", {
      state: { experiment: childData },
    })
  }

  const create_experiment_click = data => {
    let school_id = localStorage.getItem("school_id")
    readAdminRecord("/node/byschool/" + school_id).then(response => {
      if(response.Node !== null){
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
      }else {setNoNode(true)}
    });
  }
  const nextModal = e => {
    setDisclaimer(false)
    setAddModal(true)
  }

  const closeNoNode = e => {
    setNoNode(false);
  }

  const addSchool = e => {
    setAddModal(false)
    createRecord("/project_partner/" + props.project.project_id + "/" + e, null)
  }

  return (
    <div>
      {props.project ? (
        <div className="project-panel-content">
          {showDisclaimer ? <InviteModal callback={nextModal} /> : null}
          {showAddModal ? <SchoolModal callback={addSchool} /> : null}
          {/*{showEditModal ? <EditActivityModal project={props.project}/> : null}*/}
          {show_no_node ? <NoNodeModal callback={closeNoNode}/> : null}
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
                      id="activity-card"
                    />
                  ))
                : null}
                </div>
              
              <div className="btn-row">
                <button
                  className="submitButton"
                  id="exp"
                  onClick={() => {
                    create_experiment_click()
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

      <EditActivityModal
          show={showEditModal}
          setShow={setShowEditModal}
          project={props.project}
      />

    </div>
  )
}
