import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import ExperimentComponent from "../../../components/cards/experimentComponent"
import ExperimentPane from "../../../components/panes/experimentPane"
import "../../../styles/App.scss"
import TuneIcon from "@mui/icons-material/Tune"

export default function PredefinedExperiments(props) {
  const [search_value, changeSearch] = useState("")

  const [selected_experiment, setSelectedExperiment] = useState("")
  const [modal_shown, setModalShown] = useState("")

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const handleCallback = childData => {
    console.log("id: " + childData.id);
    fetch(process.env.ROOT_URL + "/experiment_full/" + childData.id, {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setSelectedExperiment(data))
  }

  var isActive = true
  var className = isActive ? "active" : ""

  return (
    <div>
      <div className="exp-container">
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
                        console.log("clicked tune")
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
                  <div className="spacer" />
                  <button
                    className="submitButton"
                    onClick={() => {
                      if (typeof window !== `undefined`) {
                        navigate("/activities/create-experiment/enter-details")
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
}
