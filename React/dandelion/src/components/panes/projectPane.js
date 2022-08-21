import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {readAdminRecord, updateRecord } from "../../utils/CRUD"
import ExperimentCard from "../cards/experimentCard"
import NoNodeModal from "../modals/noNodeModal"
import ViewExperimentModal from "../modals/viewExperimentModal"


export default function ProjectPane(props) {

  const [show_no_node, setNoNode] = useState(false);
  const [isProjectOwner, setIsProjectOwner] = useState(false)
  const [invitation, setInvitation] = useState(false)
  const [viewingExperiment, setViewingExperiment] = useState(undefined)
  const [showViewExperiment, setShowViewExperiment] = useState(false)

  useEffect(() => {
    console.log("Project pane")
    console.log(props)
    setIsProjectOwner(parseInt(props.project.owner_id) === parseInt(localStorage.getItem("school_id")))
    setInvitation(props.project.project_partner_status === 'invited')
  }, [props.project])

  const goToExperiment = (experiment) => {
    if (parseInt(experiment.owner_id) === parseInt(localStorage.getItem("school_id"))) {
      navigate("/superuser/experiment-maintenance", {
        state: {
          project: props.project,
          experiment_id: experiment.id
        },
      })
    }
    else {
      setViewingExperiment(experiment)
      setShowViewExperiment(true)
    }
  }

  const create_experiment_click = data => {
    let school_id = localStorage.getItem("school_id")
    readAdminRecord("/node/byschool/" + school_id).then(response => {
      if(response.data !== null){
        navigate(
          "/superuser/predefined-experiments",
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

  const afterSaveCallback = () => {
    props.reload(props.project.id)
  }

  const respond = (answer) => {
    let body = JSON.stringify({
      accept: answer
    })
    updateRecord("/project_partner/update_invitation/" + props.project.project_partner_id, body, afterSaveCallback)
  }

  const closeNoNode = e => {
    setNoNode(false);
  }

  const filterExperiment = experiment => {
    if (parseInt(experiment.owner_id) === parseInt(localStorage.getItem("school_id"))) {
      return true
    }
    return false
  }

  return (
    <div className="project-details-container">
      {props.project ? (
        <div className="scrollable-container">
          {show_no_node ? <NoNodeModal callback={closeNoNode}/> : null}

          <div className="scrollable-header">
            <h2>{props.project.title} </h2>
            <p>
              {new Date(props.project.start_date).toDateString()} -{" "}
              {new Date(props.project.end_date).toDateString()}{" "}
            </p>
            <p>Created by <b>{props.project.owner}</b>. Status: {props.project.status}</p>

            <div className="panel-column-section">
              <div className="img-container">
                <img src={props.project.image_full} />
              </div>
              <div className="panel-button-section">
                {isProjectOwner ?
                  <button
                    className="dandelion-button pink-btn"
                    onClick={() => {
                      props.editActivity(props.project.id)
                    }}
                  >
                    Edit Activity
                  </button>
                  :
                  <button
                    className="dandelion-button blue-btn"
                    onClick={() => {
                      console.log(props.project)
                      console.log(props.experiments)
                      props.viewActivity(true)
                    }}
                  >
                    View details
                  </button>
                }
                {isProjectOwner ?
                  <button
                    className="dandelion-button purple-btn"
                    onClick={() => {
                      props.inviteSchools(props.project.id)
                    }}
                  >
                    Invite Schools
                  </button>
                  : null
                }
                {isProjectOwner ?
                  <button className="dandelion-button red-btn">
                    Project Complete
                  </button>
                  : null
                }
                {isProjectOwner || props.project.project_partner_status === 'active' ?
                  <button
                    className="dandelion-button green-btn"
                    onClick={() => {
                      create_experiment_click()
                    }}
                  >
                    Create Experiment
                  </button>
                  : null
                }
                {invitation ?
                  <button
                    className="dandelion-button green-btn"
                    onClick={() => {
                      respond(true)
                    }}
                  >
                    Accept invitation
                  </button> : null
                }
                {invitation ?
                  <button
                    className="dandelion-button orange-btn"
                    onClick={() => {
                      respond(false)
                    }}
                  >
                    Decline invitation
                  </button> : null
                }
              </div>
            </div>
          </div>
          {invitation ?
            <div className="dandelion-hint">
              Accept the invitation &#8599; to join this activity and
              create a new experiment.
            </div>
            :
            props.experiments ?
                props.experiments.data.filter(experiment => filterExperiment(experiment)).length ?
                  <div className="scrollable-container">
                    <div className="scrollable-header">
                      <h4>Experiments</h4>
                    </div>
                    <div className="project-details scrollable-content">
                      <div className="scrollable-inner">
                        {props.experiments.data.filter(experiment => filterExperiment(experiment)).map(experiment => (
                            <ExperimentCard
                                loadExperiment={goToExperiment}
                                experiment={experiment}
                                id="activity-card"
                            />
                        ))}
                      </div>
                    </div>
                  </div>
                :
                <div className="dandelion-hint">
                  Click the button &#8599; to create a new experiment in this activity
                </div>
              : null
          }
        </div>
      ) : null }
      {viewingExperiment ?
          <ViewExperimentModal
              experiment={viewingExperiment}
              show={showViewExperiment}
              setShow={setShowViewExperiment}
          />
          : null
      }
    </div>
  )
}
