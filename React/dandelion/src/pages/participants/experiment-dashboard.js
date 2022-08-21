import React, { useEffect, useState, useRef } from "react"
import ParticipantCard from "../../components/cards/participantCard"
import ParticipantPane from "../../components/panes/participantPane"
import Header from "../../components/navigation/header"
import FriendsComponent from "../../components/tables/friendsComponent"
import "../../styles/App.scss"
import { readAdminRecord, readRecord } from "../../utils/CRUD"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ExperimentCard from "../../components/cards/experimentCard";
import {verify_superuser_storage} from "../../utils/logins";

export default function ExperimentDashboard(props) {
  const [selected_experiment, setSelectedExperiment] = useState(null)
  const [project_user_list, setUsersOnProject] = useState(null)
  const [experiments, setExperiments] = useState(null)
  const [logged, setLogged] = useState("")

  useEffect(() => {
    let user_id = localStorage.getItem('user_id');
    if (user_id) {
      setLogged(true)
      readRecord("/experiment_participant/" + user_id, setExperiments)
    }
    if (props.location.state.experiment_id) {
      loadExperiment(props.location.state.experiment_id)
    }

}, []);

  const loadExperiment = experiment => {
    console.log(experiment)
      readAdminRecord("/experiment/" + experiment.id).then(data => {
      setSelectedExperiment(data)
      readRecord("/user/byproject/" + data.project_id, setUsersOnProject)
    })
  }

  return (
    <div className="dandelion">
      <Header />
      <div className="school-user-dashboard page-container">
        <ToastContainer />
          <div className="main-content">
            <div className="content-area">
              <div className="left-panel">
                <div className="panel-body">
                  <div className="scrollable-container">
                    <div className="scrollable-header">
                      <h2>Experiments you're a part of:</h2>
                    </div>
                    <div className="scrollable-content">
                      <div className="scrollable-inner">
                        <div className="card-list">
                      {/*<ParticipantCard parentCallback={handleCallback} />*/}

                      {experiments
                        ? experiments.data
                              ? experiments.data.map(experiment => (
                                  <ExperimentCard
                                    loadExperiment={loadExperiment}
                                    experiment={experiment}
                                    id="activity-card"
                                  />
                                ))
                               : null : (
                        <div>
                          <p>Nothing here yet!</p>
                          <p>Check with the teacher in charge that you have been added to an experiment</p>
                        </div>
                      ) }

                    </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="middle-panel">
                <div className="panel-body">
                    {selected_experiment ? (
                      <ParticipantPane experiment={selected_experiment} />
                    ) :
                    <div className="dandelion-hint">
                        &larr; Click on an experiment in the list and its details will appear here. You can then
                        record your measurements by clicking on the <h3>Add observations</h3> button.
                      <br/><br/>
                        The usernames of other people from your school who are working on the same
                        experiment will be shown on the right &rarr;
                    </div>
                    }
                </div>
              </div>
              <div className="right-panel">
                <div className="panel-body">
                  <div className="scrollable-container">
                    <div className="scrollable-header">
                      <h3>Your friends on this activity:</h3>
                    </div>
                    <div className="scrollable-content">
                      <div className="scrollable-inner">
                        {project_user_list ? (
                          <FriendsComponent users={project_user_list.users} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
