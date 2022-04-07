import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import SelectAddTypeModal from "../modals/selectAddTypeModal"

export default function ParticipantPane(props) {
  const [show_type, setShowType] = useState("")

  const get_response_day = e => {
    let days = "";

    if (e.monday == true) { days = days + "Monday " }
    if (e.tuesday == true) { days = days + "Tuesday " }
    if (e.wednesday == true) { days = days + "Wednesday " }
    if (e.thursday == true) { days = days + "Thursday " }
    if (e.friday == true) { days = days + "Friday " }
    if (e.saturday == true) { days = days + "Saturday " }
    if (e.sunday == true) { days = days + "Sunday " }
    if (e.once == true) { days = days + "Once " }
    if (e.final == true) { days = days + "Final " }

    console.log(days)
    return (<h3>{days}</h3>);
  }

  return (
    <div className="participant-panel">
      {show_type ? <SelectAddTypeModal props={props.dataProp} /> : null}
      {props.dataProp ? (
        <div className="participant-pane-content">
          <div className="title">
            <div className="title-btn-row">
              <h2>{props.dataProp.name}</h2>
              {console.log(props.dataProp)}
              <div className="exercise-btn">
              </div>
            </div>
            <h3>
              {new Date(props.dataProp.start_date).toDateString()} -{" "}
              {new Date(props.dataProp.end_date).toDateString()}{" "}
            </h3>
            <h3>
              {/* Observation frequency: {participant_details.observation_freq} */}
            </h3>
          </div>
          <div className="description">
            <h3>{props.dataProp.description}</h3>
          </div>
          <div className="info-column">
            <p>Hypotheses</p>
            <div className="info-box">
              {props.dataProp.hypotheses ?
                props.dataProp.hypotheses.map(hypothesis => (
                  <p>{hypothesis.hypothesis_no}. {hypothesis.description}</p>
                ))
                :
                <h3>No hypotheses found.</h3>}
            </div>
            <div className="description">
              <p>Variables: </p>
              {props.dataProp.responseVariables ?
                props.dataProp.responseVariables.map(variable => (
                  <div>
                    <h3>{variable.name}</h3>
                    <h3>{variable.tutorial}</h3>
                    {get_response_day(variable)}
                  </div>
                ))
                :
                <h3>No Response Variables found.</h3>}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
