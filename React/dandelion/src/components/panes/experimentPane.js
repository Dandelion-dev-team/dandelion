import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import VariableCard from "../cards/variableCard"; 
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

  const clickUseExperiment = e =>{
    let experiment_details = {
      code: props.dataProp.code,
      name: props.dataProp.name,
      description: props.dataProp.description,
      tutorial: props.dataProp.tutorial,
      startDate: props.dataProp.start_date,
      endDate: props.dataProp.end_date,
      project_id: props.project_id,
    }
    var variables = []
    let treatments = props.dataProp.treatmentVariables
    if (props) {
      treatments.forEach(treatment => variables.push(treatment.levels))
    }
    let combinations = allPossibleCases(variables)
    if (typeof window !== `undefined`) {
      navigate("/activities/create-experiment/summary", {
        state: {
          treatmentVariables: props.dataProp.treatmentVariables,
          responseVariables: props.dataProp.responseVariables,
          experimentDetails: experiment_details,
          combinations: combinations,
          hypotheses: props.dataProp.hypotheses,
        },
      })
    }
  }

  function allPossibleCases(arr) {
    if (arr.length == 1) {
      return arr[0]
    } else {
      var result = []
      var allCasesOfRest = allPossibleCases(arr.slice(1))
      for (var i = 0; i < allCasesOfRest.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
          result.push([[arr[0][j]], [allCasesOfRest[i]]])
        }
      }
      return result
    }
  }

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

          <div className="experiment-desc">
            {props.dataProp.hypotheses.map(e => (<h3>
              {e.hypothesis_no} - {e.description}
            </h3>))}
          </div>
          <div className="experiment-desc">
            <h3>
              Treatment variables:
            </h3>
            {props.dataProp.treatmentVariables.map(e => { return <VariableCard mappedValue={e}/>})}
          </div>
          <div className="experiment-desc">
            <h3>
              Response variables:
            </h3>
            {props.dataProp.responseVariables.map(e => { return <VariableCard mappedValue={e}/>})}
          </div>
          <div>
          </div>

          <div className="exp-btn-row">
            <div className="spacer" />
            <div className="continue-btn">
              <button
                className="submitButton"
                onClick={() => {
                  clickUseExperiment()
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
