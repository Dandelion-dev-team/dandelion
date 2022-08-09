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
    console.log(props.project)
  }, [])

  const cardClickCallback = (childData) => {
    navigate("/superuser/experiment-maintenance", {
      state: {
        project: props.project,
        experiment: childData
      },
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
              project: props.project,
              title: props.project.title,
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
    <div className="project-details-container">
      {props.project ? (
        <div className="scrollable-container">
          {showDisclaimer ? <InviteModal callback={nextModal} /> : null}
          {showAddModal ? <SchoolModal callback={addSchool} /> : null}
          {/*{showEditModal ? <EditActivityModal project={props.project}/> : null}*/}
          {show_no_node ? <NoNodeModal callback={closeNoNode}/> : null}

          <div className="scrollable-header">
            <h2>{props.project.title} </h2>
            <p>
              {new Date(props.project.start_date).toDateString()} -{" "}
              {new Date(props.project.end_date).toDateString()}{" "}
            </p>
            <p>Status: {props.project.status}</p>

            <div className="panel-column-section">
              <div className="img-container">
                <img src={props.project.image_full} />
              </div>
              <div className="panel-button-section">
                <button
                  className="dandelion-button pink-btn"
                  onClick={() => {
                    // setShowEditModal(true)
                    props.editActivity(props.project.id)
                  }}
                >
                  Edit Activity
                </button>
                <button
                  className="dandelion-button purple-btn"
                  // id="inv"
                  onClick={() => {
                    setDisclaimer(true)
                  }}
                >
                  Invite School
                </button>
                <button className="dandelion-button red-btn">
                  Project Complete
                </button>
                <button
                  className="dandelion-button green-btn"
                  // id="exp"
                  onClick={() => {
                    create_experiment_click()
                  }}
                >
                  Create Experiment
                </button>
              </div>
            </div>
            <h4>Experiments</h4>
          </div>
          <div className="project-details scrollable-content">
            {/*<div className="experiment-row">*/}
            {/*  <div className="experiments">*/}

              {props.experiments
                ? (props.experiments.data.length)
                      ? props.experiments.data.map(experiment => (
                          <ExperimentCard
                            callback={cardClickCallback}
                            dataProp={experiment}
                            id="activity-card"
                          />
                        ))
                      : (
                <div className="dandelion-hint">
                    Click the button &#8599; to create a new experiment in this activity
                </div>
              ) : null }
            {/*    </div>*/}
            {/*</div>*/}
          </div>
        </div>
      ) : null }

      <EditActivityModal
          show={showEditModal}
          setShow={setShowEditModal}
          project={props.project}
      />

    </div>
  )
}
