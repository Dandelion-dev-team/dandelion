import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import ExperimentComponent from "../../../components/cards/experimentComponent"
import ExperimentPane from "../../../components/panes/experimentPane"
import "../../../styles/App.scss"
import TuneIcon from "@mui/icons-material/Tune"

export default function PredefinedExperiments(props) {
  const [search_value, changeSearch] = useState("")

  const [editing_project, setEditingProject] = useState("")
  const [modal_shown, setModalShown] = useState("")

  useEffect(() => {
    setModalShown(true)
  }, [])

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const handleCallback = childData => {
    setEditingProject(childData)
  }

  const modalCallback = prop => {
    console.log("called + " + prop)
    setModalShown(false)
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
                      navigate("/activities/create-experiment/4")
                    }}
                  >
                    Create Own Experiment
                  </button>
                </div>
              </div>
            </div>
            <div className="details-pane">
              <ExperimentPane dataProp={editing_project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
