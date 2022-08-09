import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import VariableCard from "../cards/variableCard"; 
export default function ExperimentPane(props) {
  const [title, setTitle] = useState(null)
  const [code, setCode] = useState(null)
  const [description, setDescription] = useState(null)
  const [text, setText] = useState(null)
  const [start_date, setStartDate] = useState(null)
  const [end_date, setEndDate] = useState(null)
  const [treatment_variables, setTreatmentVariables] = useState([])
  const [response_variables, setResponseVariables] = useState([])
  const [experiment_details, setExperimentDetails] = useState([])
  const [combinations, setCombinations] = useState([])

  const [imgSrc, setImgSrc] = useState("")

  useEffect(() => {
    setTitle(props.experiment.title)
    setCode(props.experiment.code)
    setDescription(props.experiment.description)
    setText(props.experiment.text)
    setStartDate(props.experiment.start_date)
    setEndDate(props.experiment.end_date)
    setTreatmentVariables(props.experiment.treatmentVariables)
    setResponseVariables(props.experiment.responseVariables)
    setExperimentDetails(props.experiment.experimentDetails)
    setCombinations(props.experiment.combinations)

    var timestamp = Date.now()
    setImgSrc(props.experiment.image_full + "?" + timestamp)
  }, [props.experiment])

  const clickUseExperiment = e =>{
    let experiment_details = {
      code: props.experiment.code,
      name: props.experiment.name,
      description: props.experiment.description,
      tutorial: props.experiment.tutorial,
      startDate: props.experiment.start_date,
      endDate: props.experiment.end_date,
      project_id: props.project.id,
      parent_id: props.experiment.experiment_id
    }
    var variables = []
    let treatments = props.experiment.treatmentVariables
    if (props) {
      treatments.forEach(treatment => variables.push(treatment.levels))
    }
    let combinations = allPossibleCases(variables)
    if (typeof window !== `undefined`) {
      navigate("/activities/create-experiment/summary", {
        state: {
          treatmentVariables: props.experiment.treatmentVariables,
          responseVariables: props.experiment.responseVariables,
          experimentDetails: experiment_details,
          combinations: combinations,
          hypotheses: props.experiment.hypotheses,
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
    <div className="experiment-pane">
      {/*{props.experiment ? (*/}
        <div className="scrollable-container">
          <div className="scrollable-header">
            <h2>{title} </h2>
            <p>
              {new Date(start_date).toDateString()} -{" "}
              {new Date(end_date).toDateString()}{" "}
            </p>
            <p>Created by <b>Dandelion</b> for activity <b>{props.project.title}</b></p>
          </div>
          <div className="scrollable-content">
            <p>Code: {code}</p>
            <div className="panel-column-section">
              <div className="img-container">
                <img src={imgSrc} />
              </div>
              {props.show_edit_options ?
                <div className="panel-button-section">
                  <button
                    className="dandelion-button pink-btn"
                    onClick={() => {
                      props.editExperiment(props.experiment.id)
                    }}
                  >
                    Edit details
                  </button>
                  <button
                    className="dandelion-button purple-btn"
                    // onClick={() => {
                    //   setDisclaimer(true)
                    // }}
                  >
                    Treatment variables
                  </button>
                  <button className="dandelion-button red-btn">
                    Response variables
                  </button>
                </div>
                : null
              }
              {props.show_edit_options ?
                <div className="panel-button-section">
                  <button
                    className="dandelion-button blue-btn"
                    // onClick={() => {
                    //   create_experiment_click()
                    // }}
                  >
                    Select conditions
                  </button>
                  <button
                    className="dandelion-button green-btn"
                    // onClick={() => {
                    //   create_experiment_click()
                    // }}
                  >
                    Configure GrowCube
                  </button>
                  <button
                    className="dandelion-button orange-btn"
                    // onClick={() => {
                    //   create_experiment_click()
                    // }}
                  >
                    Participants
                  </button>
                </div>
                : null
              }
            </div>

            <div className="experiment-desc">
              <h4>Description:</h4>
              <p>{description}</p>
              {props.experiment.text ?
                  <span>
                    <h4>Tutorial:</h4>
                    <p>{text}</p>
                  </span> : null
              }
            </div>

            <div className="experiment-desc">
              {props.experiment.hypotheses.length ?
                  <span>
                    <h4>Hypotheses</h4>
                    {props.experiment.hypotheses.map(e => (<p>
                      {e.hypothesis_no} - {e.description}
                    </p>))}
                  </span> : null
              }
            </div>
            <div className="experiment-desc">
              <h4>
                Treatment variables:
              </h4>
              {treatment_variables.map(tv => { return <VariableCard variable={tv}/>})}
            </div>
            <div className="experiment-desc">
              <h4>
                Response variables:
              </h4>
              {response_variables.map(rv => { return <VariableCard variable={rv}/>})}
            </div>
            <div>
            </div>
          </div>

          {props.show_use_option ?
            <div className="scrollable-footer">
              <div className="btn-container">
                <button
                  className="dandelion-button"
                  onClick={() => {
                    clickUseExperiment()
                  }}
                >
                  Use This Experiment
                </button>
              </div>
            </div>
            : null
          }
        </div>
      {/*) : null}*/}
    </div>
  )
}
