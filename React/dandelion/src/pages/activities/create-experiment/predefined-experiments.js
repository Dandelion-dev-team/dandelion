import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import ExperimentComponent from "../../../components/cards/experimentComponent"
import ExperimentPane from "../../../components/panes/experimentPane"
import "../../../styles/App.scss"
import TuneIcon from "@mui/icons-material/Tune"
import { verify_superuser_storage } from "../../../utils/logins"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { readAdminRecord, readRecord } from "../../../utils/CRUD"

export default function PredefinedExperiments(props) {
  const [search_value, changeSearch] = useState("")

  const [selected_experiment, setSelectedExperiment] = useState("")
  const [modal_shown, setModalShown] = useState("")
  const [logged, setLogged] = useState("");

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const handleCallback = childData => {
    readAdminRecord("/experiment/" + childData.id).then(data => setSelectedExperiment(data));
  }

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true);
    } else {
      navigate("/signin");
    }
  }, [])
  if (logged) {
    return (
      <div>
        <div className="exp-container">
          <ToastContainer/>
          <div className="content">
            <div className="content-wrapper">
              <div className="exp-list">
                <div className="list-header">
                  <div className="header-text">
                    <h3>Pre-Defined Experiments</h3>
                  </div>
                  <div className="search-tune-row">
                    <input
                      type="text"
                      className="search-box"
                      placeholder="Search"
                      value={search_value}
                      onChange={handleSearchValueChange}
                    />
                    <div className="tune-margin">
                      <TuneIcon
                        onClick={() => {
                          //console.log("clicked tune")
                        }}
                        className="tune-icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="list-content">
                  <div className="experiment-list">
                    <ExperimentComponent parentCallback={handleCallback} />
                  </div>
                  <div className="use-own-btn">
                    <button
                      className="submitButton"
                      onClick={() => {
                        if (typeof window !== `undefined`) {
                          navigate("/superuser/project-maintenance/")}
                      }}
                    >
                      Back
                    </button>
                    <div className="spacer" />
                    <button
                      className="submitButton"
                      onClick={() => {
                        if (typeof window !== `undefined`) {
                          navigate("/activities/create-experiment/enter-details",
                          {
                            state: { project_id: props.location.state.project_id},
                          })
                        }
                      }}
                    >
                      Create Own Experiment
                    </button>                
                  </div>
                </div>
              </div>
              <div className="details-pane">
                {selected_experiment ?
                  <ExperimentPane dataProp={selected_experiment} /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null;
}
