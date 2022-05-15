import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import SelectAddTypeModal from "../modals/selectAddTypeModal"
import { readAdminRecord } from "../../utils/CRUD"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function ParticipantPane(props) {
  const data = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "home-image.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      mobileHeroImage: file(relativePath: { eq: "Group.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [show_type, setShowType] = useState("")
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const [response_observations, setObservations] = useState([])
  const [milestones, setMilestones] = useState([])
  const [experiment_finished, setExperimentFinished] = useState(false)

  const get_response_day = e => {
    let days = ""
    var today = new Date().getDay()
    let current_day_int = []
    let show_button = false
    if (e.monday == true) {
      days = days + "Monday "
      current_day_int.push(1)
    }
    if (e.tuesday == true) {
      days = days + "Tuesday "
      current_day_int.push(2)
    }
    if (e.wednesday == true) {
      days = days + "Wednesday "
      current_day_int.push(3)
    }
    if (e.thursday == true) {
      days = days + "Thursday "
      current_day_int.push(4)
    }
    if (e.friday == true) {
      days = days + "Friday "
      current_day_int.push(5)
    }
    if (e.saturday == true) {
      days = days + "Saturday "
      current_day_int.push(6)
    }
    if (e.sunday == true) {
      days = days + "Sunday "
      current_day_int.push(0)
    }
    if (e.once == true) {
      days = days + "Once "
    }
    if (e.final == true) {
      days = days + "Final "
      if (experiment_finished == true) {
        show_button = true
      }
    }

    if (current_day_int.includes(today)) {
      console.log("There is an observation required today.")
    }

    let days_until = []
    current_day_int.forEach(day => {
      let day_int = day - today
      if (day_int < 0) {
        day_int = day_int + 7
      }
      days_until.push(day_int)
    })

    let min = Math.min(...days_until)
    if (min == Infinity) {
      min = props.dataProp.end_date
    } else {
      min = min + " days until."
    }
    return (
      <div className="days-until">
        <div className="day">{days}</div>
        <div className="days-remaining">
          <p>{min}</p>
        </div>
      </div>
    )
  }

  const get_variable_observations = e => {
    let filtered = response_observations.filter(
      item => item.response_variable_id == e.id
    )

    if (filtered.length > 0) {
      return <p>{filtered[filtered.length - 1].value}</p>
    } else {
    }
  }

  useEffect(() => {
    let user_id = localStorage.getItem("user_id")
    let today = new Date()
    let end_date = new Date(props.dataProp.end_date)
    if (today < end_date) {
      setExperimentFinished(false)
    } else {
      setExperimentFinished(true)
    }
    readAdminRecord("/observation/byuser/" + user_id).then(data => {
      let observations = data.users
      setObservations(observations)
    })
  }, [])

  const add_observation = e => {
    navigate("/participants/enter-single", {
      state: props.dataProp,
    })
  }

  return (
    <div className="participant-panel">
      {show_type ? <SelectAddTypeModal props={props.dataProp} /> : null}
      {props.dataProp ? (
        <div className="participant-pane-content">
          <div className="title">
            <div className="title-btn-row">
              <h2>{props.dataProp.name}</h2>
              {get_response_day(props.dataProp.responseVariables[2])}
              <h3></h3>
              <div className="btn-row">
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Add Observations"
                    onClick={() => {
                      add_observation();
                    }}
                  />
                </div>
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
          <div className="hypotheses">
            <p>Hypotheses</p>
            <div className="info-box">
              {props.dataProp.hypotheses ? (
                props.dataProp.hypotheses.map(hypothesis => (
                  <p>
                    {hypothesis.hypothesis_no}. {hypothesis.description}
                  </p>
                ))
              ) : (
                <h3>No hypotheses found.</h3>
              )}
            </div>
            <div className="worksheet">
              <p>Observations</p>
              {props.dataProp.responseVariables ? (
                props.dataProp.responseVariables
                  .filter(
                    variable => variable.once != true && variable.final != true
                  )
                  .map(variable => (
                    <div className="worksheet-item">
                      <div className="item-content">
                        <div className="name-column">
                          <div className="name">
                            <p>{variable.name}</p>
                          </div>
                          <div className="latest-observation">
                            {response_observations.length > 0 ? (
                              get_variable_observations(variable)
                            ) : (
                              <p>No Observations Have Been Made.</p>
                            )}
                          </div>
                        </div>
                        <div className="spacer" />
                        <div className="observation-column">
                          {get_response_day(variable)}
                        </div>
                        <div className="image">
                          <Img fluid={data.heroImage.childImageSharp.fluid} />
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <h3>No Response Variables found.</h3>
              )}
              <p>Milestones</p>
              {props.dataProp.responseVariables ? (
                props.dataProp.responseVariables
                  .filter(
                    variable => variable.once == true && variable.final != true
                  )
                  .map(variable => (
                    <div className="worksheet-item">
                      <div className="item-content">
                        <div className="name-column">
                          <div className="name">
                            <p>{variable.name}</p>
                          </div>
                          <div className="latest-observation">
                            {response_observations.length > 0 ? (
                              get_variable_observations(variable)
                            ) : (
                              <p>No Observations Have Been Made.</p>
                            )}
                          </div>
                        </div>
                        <div className="spacer" />
                        <div className="observation-column">
                          <div className="btn-row">
                            <div className="submit-btn">
                              <input
                                type="submit"
                                className="submitButton"
                                value="Add Milestone"
                                onClick={() => {
                                  navigate("/participants/enter-single", {
                                    state: props.dataProp,
                                  })
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <h3>No Response Variables found.</h3>
              )}
              <p>Post-Harvest</p>
              {props.dataProp.responseVariables ? (
                props.dataProp.responseVariables
                  .filter(
                    variable => variable.once != true && variable.final == true
                  )
                  .map(variable => (
                    <div className="worksheet-item">
                      <div className="item-content">
                        <div className="name-column">
                          <div className="name">
                            <p>{variable.name}</p>
                          </div>
                          <div className="latest-observation">
                            {response_observations.length > 0 ? (
                              get_variable_observations(variable)
                            ) : (
                              <p>No Observations Have Been Made.</p>
                            )}
                          </div>
                        </div>
                        <div className="spacer" />
                        <div className="observation-column">
                          <div className="btn-row">
                            <div className="submit-btn">
                              <input
                                type="submit"
                                className="submitButton"
                                value="Add Post-Harvest"
                                onClick={() => {
                                  navigate("/participants/enter-single", {
                                    state: props.dataProp,
                                  })
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <h3>No Response Variables found.</h3>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
