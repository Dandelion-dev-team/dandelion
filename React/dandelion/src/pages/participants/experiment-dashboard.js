import React, { useEffect, useState, useRef } from "react"
import ParticipantCard from "../../components/cards/participantCard"
import ParticipantPane from "../../components/panes/participantPane"
import Header from "../../components/navigation/header"
import FriendsComponent from "../../components/tables/friendsComponent"
import "../../styles/App.scss"
import { readAdminRecord, readRecord } from "../../utils/CRUD"

export default function ExperimentDashboard(props) {
  const [selected_experiment, setSelectedExperiment] = useState(null)
  const [project_user_list, setUsersOnProject] = useState(null)

  const handleCallback = childData => {
    readAdminRecord("/experiment/" + childData.experiment_id).then(data => {
      setSelectedExperiment(data);
      readRecord("/user/byproject/" + data.project_id, setUsersOnProject)
    })
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
              {project_user_list ? <FriendsComponent users={project_user_list.users}/>
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
