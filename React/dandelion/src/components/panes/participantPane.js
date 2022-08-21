import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import SelectAddTypeModal from "../modals/selectAddTypeModal"
import { readAdminRecord } from "../../utils/CRUD"
import { useStaticQuery, graphql } from "gatsby"
import Accordion from 'react-bootstrap/Accordion';
import LatestCard from "../cards/latestCard"

export default function ParticipantPane(props) {
  // const data = useStaticQuery(graphql`
  //   query {
  //     heroImage: file(relativePath: { eq: "home-image.png" }) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //
  //     mobileHeroImage: file(relativePath: { eq: "Group.png" }) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)

  const [show_type, setShowType] = useState("")
  const [latestObservations, setLatestObservations] = useState([])
  const [milestones, setMilestones] = useState([])
  const [experiment_finished, setExperimentFinished] = useState(false)
  const [filtered, setFiltered] = useState([])

  const get_response_day = e => {
    let days = ""
    var today = new Date().getDay()
    let current_day_int = []
    let show_button = false
    if (e.monday === true) {
      days = days + "Monday "
      current_day_int.push(1)
    }
    if (e.tuesday === true) {
      days = days + "Tuesday "
      current_day_int.push(2)
    }
    if (e.wednesday === true) {
      days = days + "Wednesday "
      current_day_int.push(3)
    }
    if (e.thursday === true) {
      days = days + "Thursday "
      current_day_int.push(4)
    }
    if (e.friday === true) {
      days = days + "Friday "
      current_day_int.push(5)
    }
    if (e.saturday === true) {
      days = days + "Saturday "
      current_day_int.push(6)
    }
    if (e.sunday === true) {
      days = days + "Sunday "
      current_day_int.push(0)
    }
    if (e.once === true) {
      days = days + "Once "
    }
    if (e.final === true) {
      days = days + "Final "
      if (experiment_finished === true) {
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
    if (min === Infinity) {
      min = props.experiment.end_date
    } else if (min === 1) {
      min = min + " day until"
    } else {
      min = min + " days until"
    }
    return (
      <div className="days-until">
        <p>
          Your response day is {days} - there are {min} you need to enter
          observations.
        </p>
      </div>
    )
  }

  const get_variable_observations = variable => {
    let filtered = latestObservations.filter(
      item => item.response_variable_id === variable.id
    )

    if (filtered.length > 0) {
      return <span>{filtered[filtered.length - 1].display_value} {filtered[filtered.length - 1].units}</span>
    } else {
      return <span>No observations have been made</span>
    }
  }

  useEffect(() => {
    if (props.experiment.responseVariables) {
      const filtered_variables = props.experiment.responseVariables.filter(
        variable =>
          variable.monday === true ||
          variable.tuesday === true ||
          variable.wednesday === true ||
          variable.thursday === true ||
          variable.friday === true ||
          variable.saturday === true ||
          variable.sunday === true
      )
      setFiltered(filtered_variables)
    }
    let user_id = localStorage.getItem("user_id")
    let today = new Date()
    let end_date = new Date(props.experiment.end_date)
    if (today < end_date) {
      setExperimentFinished(false)
    } else {
      setExperimentFinished(true)
    }
    readAdminRecord("/observation/byuser/" + user_id).then(observations => {
      setLatestObservations(observations.data)
    })
  }, [props.experiment])

  return (
    <div className="participant-panel">
      {show_type ? <SelectAddTypeModal props={props.experiment} /> : null}
      {props.experiment ? (
          <div className="scrollable-container">
            <div className="scrollable-header">
              <h2>{props.experiment.title}</h2>
                <p>
                  {new Date(props.experiment.start_date).toDateString()} -{" "}
                  {new Date(props.experiment.end_date).toDateString()}{" "}
                </p>
            </div>
            <div className="scrollable-content">
              <div className="scrollable-inner">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Details</Accordion.Header>
                    <Accordion.Body>
                      <h3>Description</h3>
                      <p>{props.experiment.description}</p>
                        {props.experiment.hypotheses ? (
                            <div>
                              <h3>Hypotheses</h3>
                              {props.experiment.hypotheses.map(hypothesis => (
                                  <p>
                                    {hypothesis.hypothesis_no}. {hypothesis.description}
                                  </p>))}
                            </div>
                          )
                         : null}

                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <div className="btn-container">
                  <div className="dandelion-button-group">
                    <button
                      className="dandelion-button large-button"
                      onClick={() => {navigate("/participants/enter-single", {
                              state: {
                                experiment: props.experiment
                              },
                            })}}
                    >
                      Add observations
                    </button>
                      {filtered.length > 0 ? get_response_day(filtered[0]) : null}

                  </div>
                </div>
                <div className="worksheet">
                  <h3>Latest observations</h3>
                  {props.experiment.response_variables ? (
                    props.experiment.response_variables
                      .filter(
                        variable => variable.once !== true && variable.final !== true
                      )
                      .map(variable => (
                          <LatestCard
                            name = {variable.name}
                            value = {get_variable_observations(variable)}
                            message = {get_response_day(variable)}
                          />)

                        // <div className="worksheet-item">
                        //   <div className="item-content">
                        //     <div className="value-row">
                        //         <h4>{variable.name}:</h4>
                        //         {get_variable_observations(variable)}
                        //     </div>
                        //     <div className="schedule-row">
                        //       {get_response_day(variable)}
                        //     </div>
                        //     {/*<div className="image">*/}
                        //     {/*  <Img fluid={data.heroImage.childImageSharp.fluid} />*/}
                        //     {/*</div>*/}
                        //   </div>
                        // </div>
                      )
                  ) : (
                    <h4>No Response Variables found.</h4>
                  )}
                  <h3>Milestones</h3>
                  {props.experiment.response_variables ? (
                    props.experiment.response_variables
                      .filter(
                        variable => variable.once && !variable.final
                      )
                      .map(variable => (
                        <div className="worksheet-item">
                          <div className="item-content">
                            <div className="name-column">
                              <div className="name">
                                <p>{variable.name}</p>
                              </div>
                              <div className="latest-observation">
                                {/*{response_observations.length > 0 ? (*/}
                                {/*  get_variable_observations(variable)*/}
                                {/*) : (*/}
                                {/*  <p>No Observations Have Been Made.</p>*/}
                                {/*)}*/}
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
                                        state: props.experiment,
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
                    <h4>No milestones found.</h4>
                  )}
                  <h3>Post-Harvest</h3>
                  {props.experiment.response_variables ? (
                    props.experiment.response_variables
                      .filter(
                        variable => !variable.once && variable.final
                      )
                      .map(variable => (
                        <div className="worksheet-item">
                          <div className="item-content">
                            <div className="name-column">
                              <div className="name">
                                <p>{variable.name}</p>
                              </div>
                              <div className="latest-observation">
                                {latestObservations.length > 0 ? (
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
                                        state: props.experiment,
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
                    <h4>No post-harvest variables found.</h4>
                  )}
                </div>
              </div>
            </div>
         </div>
      ) : null}
    </div>
  )
}
