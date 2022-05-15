import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import { verify_superuser_storage } from "../../../utils/logins"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { ToastContainer, toast } from "react-toastify"
import Select from "react-select"

export default function YourObservations(props) {
  const [treatment_selected, setTreatmentVariables] = useState([])
  const [response_selected, setResponseVariables] = useState([])
  const [experiment_details, setExperimentDetails] = useState([])
  const [combinations_selected, setCombinations] = useState([])
  const [hypotheses, setHypotheses] = useState([])
  const [milestone_textbox, setMilestone] = useState("")

  const [day_selected, setDay] = useState("")

  const [logged, setLogged] = useState("")
  const [milestone_list, setMilestoneList] = useState([])
  const [final_list, setFinalList] = useState([])

  const day_list = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ]

  const onAdd = e => {
    let copy = [...milestone_list]
    let body = {
      name: milestone_textbox,
      description: "",
      procedure: "",
      unit: null,
      upper_limit: null,
      lower_limit: null,
      is_sensor_quantity: false,
      quantity_id: null,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      once: true,
      final: false,
    }
    setMilestone("")
    copy.push(body)
    setMilestoneList(copy)
  }
  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
      if (props.location.state) {
        var result = []
        setTreatmentVariables(props.location.state.treatmentVariables)
        setResponseVariables(props.location.state.responseVariables)
        setExperimentDetails(props.location.state.experimentDetails)
        setCombinations(props.location.state.combinations)
        setHypotheses(props.location.state.hypotheses)

        props.location.state.combinations.forEach(array => {
          result.push(array)
        })
      } else {
        if (typeof window !== `undefined`) {
          navigate("/activities/create-experiment/enter-details")
        }
      }
    } else {
      navigate("/signin")
    }
  }, [])

  const onResponseChange = variable => {
    let copy = [...final_list]
    if (copy.includes(variable.response_ref)) {
      copy = copy.filter(item => item !== variable.response_ref)
    } else {
      copy.push(variable.response_ref)
    }
    setFinalList(copy)
  }

  const OnContinueClick = e => {
    console.log(day_selected)
    let concat_array = []
    if (day_selected) {
      response_selected.forEach(response_variable => {
        response_variable.monday = false
        response_variable.tuesday = false
        response_variable.wednesday = false
        response_variable.thursday = false
        response_variable.friday = false
        response_variable.saturday = false
        response_variable.sunday = false
        response_variable.final = false
        response_variable.once = false
        if (final_list.includes(response_variable)) {
          response_variable.final = true
        } else {
          if (day_selected.value == "monday") {
            response_variable.monday = true
          }
          if (day_selected.value == "tuesday") {
            response_variable.tuesday = true
          }
          if (day_selected.value == "wednesday") {
            response_variable.wednesday = true
          }
          if (day_selected.value == "thursday") {
            response_variable.thursday = true
          }
          if (day_selected.value == "friday") {
            response_variable.friday = true
          }
          if (day_selected.value == "saturday") {
            response_variable.saturday = true
          }
          if (day_selected.value == "sunday") {
            response_variable.sunday = true
          }
        }
      })
      console.log(milestone_list)
      concat_array = response_selected.concat(milestone_list)
    } else {
      toast.error("No day selected.")
    }
    if (typeof window !== `undefined`) {
      navigate("/activities/create-experiment/summary", {
        state: {
          hypotheses: hypotheses,
          treatmentVariables: treatment_selected,
          responseVariables: concat_array,
          experimentDetails: experiment_details,
          combinations: combinations_selected,
        },
      })
    }
  }
  const ResponseVariable = variable => {
    const [checked_value, setCheckedValue] = useState(false)
    useEffect(() => {
      if (final_list.includes(variable.response_ref)) {
        setCheckedValue(true)
      }
    }, [])
    return (
      <div className="variable-list-item">
        <div className="label">
          <h3>{variable.response_ref.name}</h3>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            checked={checked_value}
            onChange={() => {
              onResponseChange(variable)
            }}
          />
        </div>
      </div>
    )
  }

  if (logged) {
    return (
      <div className="your-observations-container">
        <div className="left-container">
          <ToastContainer />
          <div className="title">
            <h3>Your Observations</h3>
          </div>
          <div className="content">
            <div className="content-wrapper">
              <div className="response-pane">
                <div className="response-pane-wrapper">
                  <div className="title">
                    <h2>Your Response Variables</h2>
                    <h3>
                      Select the variables that are to be recorded post-harvest.
                    </h3>
                  </div>
                  <div className="variable-list">
                    {response_selected
                      ? response_selected.map(function (r, idx) {
                          return <ResponseVariable response_ref={r} />
                        })
                      : null}
                  </div>
                  <div className="recording-date">
                    <div className="date-label">
                      <h3>Response Day:</h3>
                    </div>
                    <div className="date-input">
                      <Select
                        value={day_selected}
                        options={day_list}
                        onChange={setDay}
                        placeholder={"Select day."}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="confirmation-pane">
                <div className="confirmation-pane-wrapper">
                  <div className="milestones">
                    <div className="add-milestone">
                      <div className="title">
                        <h2>Milestones</h2>
                        <h3>
                          A milestone is an event that occurs once in a
                          project's duration i.e. leaves appearing.
                        </h3>
                      </div>
                      <div className="input-row">
                        <div className="text-input">
                          <input
                            type="text"
                            placeholder="Milestone"
                            value={milestone_textbox}
                            onChange={e => {
                              setMilestone(e.target.value)
                            }}
                          />
                        </div>
                        <div className="add-btn">
                          <input
                            type="submit"
                            className="submitButton"
                            value="Add"
                            onClick={() => {
                              onAdd()
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="milestone-list">
                      <div className="list-wrapper">
                        {milestone_list.map(e => {
                          return <h3>{e.name}</h3>
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="final">
                    <div className="add-final">
                      <div className="title">
                        <h2>Post-Harvest</h2>
                        <h3>Observations you wish to capture post-harvest.</h3>
                      </div>
                    </div>
                    <div className="final-list">
                      <div className="list-wrapper">
                        {final_list.map(e => (
                          <h3>{e.name}</h3>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="btn-column">
                    <div className="spacer" />
                    <div className="continue-button">
                      {milestone_textbox.length > 0 ? (
                        <input
                          type="submit"
                          className="submitButton-disabled"
                          value="Continue"
                          onClick={() => {
                            OnContinueClick()
                          }}
                        />
                      ) : (
                        <input
                          type="submit"
                          className="submitButton"
                          value="Continue"
                          onClick={() => {
                            OnContinueClick()
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-button">
          <HelpOutlineIcon
            className="help-icon"
            onClick={() => {
              //setModalShown(true)
            }}
          />
        </div>
      </div>
    )
  } else return null
}
