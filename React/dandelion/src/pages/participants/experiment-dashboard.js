import React, { useEffect, useState, useRef } from "react"
import ParticipantCard from "../../components/cards/participantCard"
import ParticipantPane from "../../components/panes/participantPane"
import Header from "../../components/navigation/header"
import FriendsComponent from "../../components/tables/friendsComponent"
import "../../styles/App.scss"

export default function ExperimentDashboard(props) {
  const [selected_experiment, setSelectedExperiment] = useState("")
  const [show_type, setShowType] = useState("")

  const handleCallback = childData => {
    console.log("id: " + childData.id)
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

  return (
    <div>
      <Header />
      <div className="dash-container">
        <div className="dash-content">
          <div className="experiment-list">
            <div className="title">
              <h3>Experiments you're a part of:</h3>
            </div>
            <div className="card-list">
              <ParticipantCard parentCallback={handleCallback} />
            </div>
          </div>
          <div className="experiment-details">
            {selected_experiment ? (
              <ParticipantPane dataProp={selected_experiment} />
            ) : null}
          </div>
          <div className="friends-pane">
            <div className="title">
              <h3>Your friends on this activity:</h3>
            </div>
            <div className="friends-list">
              <FriendsComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
