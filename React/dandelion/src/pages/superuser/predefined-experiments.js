import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import ExperimentComponent from "../../components/cards/experimentComponent"
import ExperimentPane from "../../components/panes/experimentPane"
import ExperimentModal from "../../components/modals/experimentModal"
import "../../styles/App.scss"
import { verify_superuser_storage } from "../../utils/logins"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { readAdminRecord, readRecord } from "../../utils/CRUD"
import Header from "../../components/navigation/header";
import SideNav from "../../components/navigation/superUserSideNav";
import {isProjectOwner} from "../../utils/validation"

export default function PredefinedExperiments(props) {
  const [search_value, changeSearch] = useState("")
  const [experiments, setExperiments] = useState(null)
  const [selected_experiment, setSelectedExperiment] = useState("")
  const [logged, setLogged] = useState("")
  const [showExperiment, setShowExperiment] = useState(false)
  const [blankExperiment, setBlankExperiment] = useState({})

  useEffect(() => {
    if (verify_superuser_storage() === true) {
        readRecord("/experiment/filtered/" + props.location.state.project.id, setExperiments)
        readRecord("/experiment/blank", setBlankExperiment)
        setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const loadExperiment = experiment => {
    readAdminRecord("/experiment/" + experiment.id).then(data =>
      setSelectedExperiment(data)
    )
  }

  const updateExperiment = experiment => {
    navigate("/superuser/experiment-maintenance", {
      state: {
        project: props.location.state.project,
        experiment_id: experiment.id
      },
    })
  }

    const goToActivity = () => {
        navigate("/superuser/activity-maintenance", {
          state: {
            project_id: props.location.state.project.id
          },
        })
    }


  if (logged) {
    return (
      <div className="dandelion">
        <Header />
          {props.location.state.project ?
            <div className="page-container">
              <SideNav />
              <ToastContainer />
              <div className="main-content">
                <div className="content-area">
                    <div className="left-panel">
                      <div className="panel-body scrollable-container">
                          <div className="scrollable-header">
                            <h2>Available experiments</h2>
                              <p>Creating an experiment for the activity <b>{props.location.state.title}</b></p>
                            <div>
                              <input
                                type="text"
                                className="search-box"
                                placeholder="Search"
                                value={search_value}
                                onChange={handleSearchValueChange}
                              />
                            </div>
                          </div>

                            <div className="scrollable-content">
                              <div className="scrollable-inner">
                                  {experiments ?
                                      <ExperimentComponent
                                          experiments={experiments.data}
                                          search={search_value}
                                          loadExperiment={loadExperiment}
                                      />
                                      : null
                                  }
                              </div>
                            </div>

                          <div className="scrollable-footer">
                              <div className="btn-container">
                                  <button
                                      className="dandelion-button large-button"
                                      onClick={() => {
                                          goToActivity()
                                      }}
                                  >
                                      Back
                                  </button>
                                  {isProjectOwner(props.location.state.project) ?
                                      <button
                                          className="dandelion-button large-button"
                                          onClick={() => {
                                              setShowExperiment(true)
                                          }}
                                      >
                                          New Experiment
                                      </button> : null
                                  }
                              </div>
                        </div>
                      </div>
                    </div>
                    <div className="right-panel">
                        <div className="panel-body">
                          {selected_experiment ? (
                            <ExperimentPane
                              experiment={selected_experiment}
                              show_use_option={true}
                              show_edit_options={false}
                              project_id={props.location.state.project.id}
                              update_experiment={updateExperiment}
                              logged={logged}
                            />
                          ) :
                            <div className="dandelion-hint">
                                {isProjectOwner(props.location.state.project) ?
                                    <span>
                                        &larr; Click an existing experiment to see its details. Then choose
                                        whether you want to copy and adapt it for your activity, or whether
                                        you want to create your own experiment from scratch.
                                    </span>
                                    :
                                    <span>
                                        Because this is a shared activity, you can't create new
                                        experiments. You can only do the ones already defined.
                                        <br/><br/>
                                        &larr; Click on an item in the list to get started.
                                    </span>
                                }
                            </div>
                          }
                        </div>
                      </div>
                </div>
              </div>
            </div>
          : null
          }
          {blankExperiment ?
            <ExperimentModal
                show={showExperiment}
                setShow={setShowExperiment}
                experiment={blankExperiment}
                // setReload={setReload}
                updateExperiment={updateExperiment}
                project={props.location.state.project}
            /> : null
          }
      </div>
    )
  } else return null
}
