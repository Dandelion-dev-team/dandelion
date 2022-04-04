import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import SelectAddTypeModal from "../modals/selectAddTypeModal"

export default function ParticipantPane(props) {
  const [experiment_details, setExperimentDetails] = useState([])
  const [participant_details, setParticipantDetails] = useState([])
  const [response_variables, setResponseVariables] = useState([])
  const [show_type, setShowType] = useState("")
  const [observations, setObservations] = useState("");
  useEffect(() => {
    setParticipantDetails(props.dataProp.participantDetails)
    setExperimentDetails(props.dataProp.experimentDetails)
    setResponseVariables(props.dataProp.responseVariables)
    // fetch(process.env.ROOT_URL + "/observation/" + 1, {
    //   method: "GET",
    //   headers: new Headers({
    //     'Cache-Control': 'no-cache, no-store, must-revalidate',
    //     'Pragma': 'no-cache',
    //     'Expires': 0,
    //   })
    // }).then(response => {if(response.status == 200) {return response.json()}})
    //   .then(
    //     data => setObservations(data));
  }, [])

  return (
    <div>
      {show_type ? <SelectAddTypeModal props={props.dataProp} /> : null}
      {props.dataProp ? (
        <div className="participant-pane-content">
          <div className="title">
            <div className="title-btn-row">
              <h2>{props.dataProp.participantDetails.title}</h2>
              <div className="exercise-btn">
                {observations ? null : <button
                  className="exerciseBtn"
                  onClick={() => {
                    if (typeof window !== `undefined`) {
                      navigate("/participants/select-type", {
                        state: {
                          participantDetails: participant_details,
                          responseVariables: response_variables,
                          experimentDetails: experiment_details,
                        },
                      })
                    }
                  }}
                >
                  Complete Exercise
                </button>}
              </div>
            </div>
            <h3>
              {new Date(participant_details.start_date).toDateString()} -{" "}
              {new Date(participant_details.end_date).toDateString()}{" "}
            </h3>
            <h3>
              Observation frequency: {participant_details.observation_freq}
            </h3>
          </div>
          <div className="description">
            <h3>{participant_details.description}</h3>
          </div>
          <div className="info-column">
            <p>Hypotheses</p>
            <div className="info-box">
              <p>{participant_details.hypotheses}</p>
            </div>
            <p>Observations</p>
            <div className="info-box">
              {observations ?
                <div>
                  <p id='observation'>{observations.value}</p> <p id='date'>{new Date(observations.timestamp).toDateString()}</p> </div> : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
