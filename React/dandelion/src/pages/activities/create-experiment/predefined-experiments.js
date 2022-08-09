import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import ExperimentComponent from "../../../components/cards/experimentComponent"
import ExperimentPane from "../../../components/panes/experimentPane"
import "../../../styles/App.scss"
import { verify_superuser_storage } from "../../../utils/logins"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { readAdminRecord, readRecord } from "../../../utils/CRUD"
import Header from "../../../components/navigation/header";
import SideNav from "../../../components/navigation/superUserSideNav";

export default function PredefinedExperiments(props) {
  const [search_value, changeSearch] = useState("")
  const [experiments, setExperiments] = useState(null)
  const [selected_experiment, setSelectedExperiment] = useState("")
  const [modal_shown, setModalShown] = useState("")
  const [logged, setLogged] = useState("")

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const handleCallback = childData => {
    readAdminRecord("/experiment/" + childData.id).then(data =>
      setSelectedExperiment(data)
    )
  }

  useEffect(() => {
    if (verify_superuser_storage() == true) {
        readRecord("/experiment/filtered", setExperiments)
        setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  if (logged) {
    return (
      <div className="dandelion">
        <Header />
        <div className="page-container">
            <SideNav />
            <ToastContainer />
            <div className="main-content">
              <div className="content-area">
                  <div className="left-panel">
                    <div className="panel-body scrollable-container">
                        <div className="scrollable-header">
                          <h2>Pre-Defined Experiments</h2>
                            <p>Creating an experiment for the activity <b>{props.location.state.title}</b></p>
                          <div className="search-tune-row">
                            <input
                              type="text"
                              className="search-box"
                              placeholder="Search"
                              value={search_value}
                              onChange={handleSearchValueChange}
                            />
                            <div className="tune-margin"></div>
                          </div>
                        </div>

                          <div className="scrollable-content">
                              {experiments ?
                                  <ExperimentComponent
                                      experiments={experiments.data}
                                      search={search_value}
                                      parentCallback={handleCallback}
                                  />
                                  : null
                              }
                          </div>

                        <div className="scrollable-footer">
                        <div className="btn-container">
                          <button
                            className="dandelion-button"
                            onClick={() => {
                              if (typeof window !== `undefined`) {
                                navigate(
                                  "/activities/create-experiment/enter-details",
                                  {
                                    state: {
                                      project_id: props.location.state.project.project_id,
                                      start_date: props.location.state.start_date,
                                      end_date: props.location.state.end_date,
                                    },
                                  }
                                )
                              }
                            }}
                          >
                            Create Own Experiment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-panel">
                      <div className="panel-body">
                        {selected_experiment ? (
                          <ExperimentPane
                            experiment={selected_experiment}
                            project={props.location.state.project}
                            show_use_option={true}
                            show_edit_options={false}
                          />
                        ) : (
                              <div className="dandelion-hint">
                                  &larr; Click an existing experiment to see its details. Then choose
                                  whether you want to copy and adapt it for your activity, or whether
                                  you want to create your own experiment from scratch.
                              </div>
                        )}
                      </div>
                    </div>
              </div>
            </div>
        </div>
      </div>
    )
  } else return null
}
