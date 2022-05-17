import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD";

export default function ExperimentComponent(props) {
  const [experiments, setExperiment] = useState([])
  //TESTED
  useEffect(() => {
    readRecord("/experiment/filtered", setExperiment);
  }, [])

  const cardClickCallback = experiment => {
    props.parentCallback(experiment)
  }

  var isActive = true
  var className = isActive ? "active" : ""

  return (
      experiments.data
        ? experiments.data.map(experiment => (
            <div
              className="preset-card"
              onClick={() => {
                cardClickCallback(experiment)
                isActive = true
              }}
            >
              <div className="card-img">
                <img src={experiment.thumbnail} />
              </div>
              <div className="item-details">
                <div className="owner">
                  <h2>{experiment.owner}</h2>
                </div>
                <div className="title">
                  <h2>{experiment.title}</h2>
                </div>
              </div>
            </div>
          ))
        : <h3>No Experiments Found.</h3>
  )
}
