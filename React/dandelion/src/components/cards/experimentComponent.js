import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function ExperimentComponent(props) {
  const [experiments, setExperiment] = useState(0)
  //TESTED
  useEffect(() => {
    // fetch(process.env.ROOT_URL + "/experiment_summary", {
    //   method: "GET",
    //   headers: new Headers({
    //     "Cache-Control": "no-cache, no-store, must-revalidate",
    //     Pragma: "no-cache",
    //     Expires: 0,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => setExperiment(data))
  }, [])

  const cardClickCallback = experiment => {
    props.parentCallback(experiment)
  }

  var isActive = true
  var className = isActive ? "active" : ""

  return (
    <div>
      {experiments
        ? experiments.map(experiment => (
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
        : <h3>No Experiments Found.</h3>}
    </div>
  )
}
