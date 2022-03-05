import React, { useEffect, useState, useRef } from "react"
import ExperimentComponent from "../../../components/activities/experimentComponent"
import ExperimentPane from "../../../components/activities/experimentPane"
import "../../../styles/App.scss"
import TuneIcon from "@mui/icons-material/Tune"

export default function FirstExpPage(props) {
  const [editing_project, setEditingProject] = useState("")
  const [modal_shown, setModalShown] = useState("")

  useEffect(() => {
    setModalShown(true)
  }, [])

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
                <div className="search-bar">
                  <input type="text" placeholder="Search.." />
                </div>
              </div>
              <div className="list-content">
                <div className="experiment-list">
                  <ExperimentComponent parentCallback={handleCallback} />
                </div>
                <div className="use-own-btn">
                  <div className="spacer"/>
                  <button className="submitButton">
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
