import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"

export default function ExperimentPane(props) {
  const [treatment_variables, setTreatmentVariables] = useState([])
  const [response_variables, setResponseVariables] = useState([])
  const [experiment_details, setExperimentDetails] = useState([])
  const [combinations, setCombinations] = useState([])

  useEffect(() => {
    setTreatmentVariables(props.dataProp.treatmentVariables)
    setResponseVariables(props.dataProp.responseVariables)
    setExperimentDetails(props.dataProp.experimentDetails)
    setCombinations(props.dataProp.combinations)
  }, [])

  return (
    <div>
      {props.dataProp ? (
        <div className="experiment-panel-content">
          <div className="experiment-title">
            <h2>{props.dataProp.name} </h2>
            <h3>
              {new Date(props.dataProp.start_date).toDateString()} -{" "}
              {new Date(props.dataProp.end_date).toDateString()}{" "}
            </h3>
            <h3>Created by Dandelion</h3>
          </div>

          <div className="experiment-img">
            <img src={props.dataProp.image_full} />
          </div>

          <div className="experiment-desc">
            <h2>Description:</h2>
            <h3>{props.dataProp.description}</h3>
            <h2>Tutorial:</h2>
            <h3>{props.dataProp.tutorial}</h3>
          </div>

          <div className="exp-btn-row">
            <div className="spacer" />
            <div className="continue-btn">
              <button
                className="submitButton"
                onClick={() => {
                  if (typeof window !== `undefined`) {
                    navigate("/activities/create-experiment/summary", {
                      state: {
                        treatmentVariables: treatment_variables,
                        responseVariables: response_variables,
                        experimentDetails: experiment_details,
                        combinations: combinations,
                      },
                    })
                  }
                }}
              >
                Use This Experiment
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
