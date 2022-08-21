import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import VariableCard from "../cards/variableCard";
import {createRecord} from "../../utils/CRUD";
export default function ExperimentPane(props) {
  const [title, setTitle] = useState(null)
  const [projectTitle, setProjectTitle] = useState("")
  const [code, setCode] = useState(null)
  const [description, setDescription] = useState(null)
  const [text, setText] = useState(null)
  const [start_date, setStartDate] = useState(null)
  const [end_date, setEndDate] = useState(null)
  const [treatment_variables, setTreatmentVariables] = useState([])
  const [response_variables, setResponseVariables] = useState([])

  const [imgSrc, setImgSrc] = useState("")

  useEffect(() => {
    setTitle(props.experiment.title)
    setProjectTitle(props.experiment.project_title)
    setCode(props.experiment.code)
    setDescription(props.experiment.description)
    setText(props.experiment.text)
    setStartDate(props.experiment.start_date)
    setEndDate(props.experiment.end_date)
    setTreatmentVariables(props.experiment.treatment_variables)
    setResponseVariables(props.experiment.response_variables)
    var timestamp = Date.now()
    setImgSrc(props.experiment.image_full + "?" + timestamp)
  }, [props.experiment])

  useEffect(() => {
    var timestamp = Date.now()
    setImgSrc(props.experiment.image_full + "?" + timestamp)
  }, [props.reload])

  const clickUseExperiment = e =>{
    let body = JSON.stringify({
      project_id: props.project_id
    })
    createRecord("/experiment/" + props.experiment.id + "/clone", body, props.update_experiment)
  }

  return (
    <div className="experiment-pane">
      {props.experiment && props.logged ? (
        <div className="scrollable-container">
          <div className="scrollable-header">
            <h2>{title} </h2>
            <p>
              {new Date(start_date).toDateString()} -{" "}
              {new Date(end_date).toDateString()}{" "}
            </p>
            <p>Created by <b>{props.experiment.owner}</b> for activity <b>{projectTitle}</b></p>
          </div>
          <div className="scrollable-content">
            <div className="scrollable-inner">
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
                      Experiment details
                    </button>
                    <button
                      className="dandelion-button purple-btn"
                      onClick={() => {
                        props.editTreatment(true)
                      }}
                    >
                      Treatment variables
                    </button>
                    <button className="dandelion-button red-btn"
                      onClick={() => {
                        props.editResponse(true)
                      }}
                    >
                      Response variables
                    </button>
                    <button className="dandelion-button brown-btn"
                      onClick={() => {
                        props.editHypotheses(true)
                      }}
                    >
                      Hypotheses
                    </button>
                  </div>
                  : null
                }
                {props.show_edit_options ?
                  <div className="panel-button-section">
                    <button
                      className="dandelion-button blue-btn"
                      onClick={() => {
                        props.editConditions(true)
                      }}
                    >
                      Select conditions
                    </button>
                    <button
                      className="dandelion-button green-btn"
                      onClick={() => {
                        props.editUnits(true)
                      }}
                    >
                      GrowCube layout
                    </button>
                    <button
                      className="dandelion-button orange-btn"
                      onClick={() => {
                        props.editParticipants(true)
                      }}
                    >
                      Participants
                    </button>
                    <button
                      className="dandelion-button grey-btn"
                      onClick={() => {
                        props.editStatus(true)
                      }}
                    >
                      Change status
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
            </div>
          </div>

          {props.show_use_option ?
            <div className="scrollable-footer">
              <div className="btn-container">
                <button
                  className="dandelion-button large-button"
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
      ) : null}
    </div>
  )
}
