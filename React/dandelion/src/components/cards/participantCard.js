import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD";

export default function ParticipantCard(props) {
  const [experiments, setExperiment] = useState([])

  useEffect(() => {
    let user_id = localStorage.getItem('user_id');
    readRecord("/experiment_participant/" + user_id, setExperiment)
}, []);


  const cardClickCallback = experiment => {
    props.parentCallback(experiment)
  }

  var isActive = true
  var className = isActive ? "active" : ""
  return (
    <div>
      {experiments.data
        ? experiments.data.map(experiment => (
            <div
              className="participant-card"
              onClick={() => {
                cardClickCallback(experiment)
                isActive = true
              }}
            >
              <div className="card-img">
                <img src={experiment.image_thumb} />
              </div>
              <div className="item-details">
                <div className="card-owner">
                </div>
                <div className="card-title">
                  <h2>{experiment.title}</h2>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
