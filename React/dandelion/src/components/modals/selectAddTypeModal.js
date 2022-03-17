import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"

export default function SelectAddTypeModal(props) {
  const [experiment_details, setExperimentDetails] = useState([])
  const [participant_details, setParticipantDetails] = useState([])
  const [response_variables, setResponseVariables] = useState([])

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state);
      console.log(JSON.stringify(props.location.state));
      setResponseVariables(props.location.state.responseVariables);
      setExperimentDetails(props.location.state.experimentDetails);
      setParticipantDetails(props.location.state.participantDetails)
      console.log("details:" + props.location.state.participantDetails)
    } else {
      if (typeof window !== `undefined`) {
        navigate(
          "/participants/experiments-dashboard")
      }
    }
  }, []);

  return (
    <div>
      <div className="select-type-modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            <h3>Are you entering single or multiple pieces of data?</h3>
            <h3>{experiment_details.name}</h3>
            <p>
              You can enter many readings for your experiment at one time, in
              case you missed a day or have several pieces of bulk data to add.
            </p>
          </div>
          <div className="data-type-btns">
            <div className="spacer" />
            <div className="btn-row">
              <div className="submit-btn">
                <input
                  type="submit"
                  className="submitButton"
                  value="Single"
                    onClick={() => {
                      console.log("details:")
                    }}
                ></input>
              </div>
              <div className="submit-btn">
                <input
                  type="submit"
                  className="submitButton"
                  value="Multiple"
                  //   onClick={() => {
                  //     props.discreteCallback()
                  //   }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
