import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function ExperimentComponent(props) {
  const [experiments, setExperiment] = useState(0)
  //TESTED
  useEffect(() => {
    fetch("http://localhost:3000/experiment", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setExperiment(data))
  }, [])

  const editAuth = experiment => {
    props.parentCallback(experiment)
  }

  var isActive = true
  var className = isActive ? "active" : ""

  return (
    <div className="experiment-list">
      {/* {experiments
        ? experiments.map(experiment => (
            <div className="preset-card">
              <div className="card-img">
                <img src={experiment.experiment_image_link} />
              </div>
              <div className="title">
                <h2>{experiment_experiment_text}</h2>
              </div>
              <div className="center">
                <div class="vl" />
              </div>
              <div className="description">
                <h2>{experiment.description}</h2>
              </div>
            </div>
          ))
        : null} */}
        <table className="cardList">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>

        {experiments
          ? experiments.map(experiment => (
            <tbody
              key={experiments.id}
              className={className}
              onClick={() => {
                editAuth(experiment)
                isActive = true
              }}
            >
              <td>{experiment.title}</td>
              <td>{experiment.description}</td>
            </tbody>
          ))
          : null}
      </table>
    </div>
  )
}
