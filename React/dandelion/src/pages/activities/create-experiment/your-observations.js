import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import { verify_superuser_storage } from "../../../utils/logins"

export default function YourObservations(props) {
  const [treatment_selected, setTreatmentVariables] = useState([])
  const [response_selected, setResponseVariables] = useState([])
  const [experiment_details, setExperimentDetails] = useState([])
  const [combinations_selected, setCombinations] = useState([])
  const [hypotheses, setHypotheses] = useState([])
  const [milestone_textbox, setMilestone] = useState("")


  const [logged, setLogged] = useState("")
  const [milestone_list, setMilestoneList] = useState([])
  const [final_list, setFinalList] = useState([])

  const onAdd = e => {
    let copy = [...milestone_list];
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
      final: false
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

  const onResponseChange = (variable) => {
    let copy = [...final_list];
    if (copy.includes(variable.response_ref)) {
        copy = (copy.filter(item => item !== variable.response_ref))
    } else {
        copy.push(variable.response_ref)
    }
    setFinalList(copy);
}

const OnContinueClick = e => {

  treatment_selected.forEach(treatment_variable => {
    
  });

  if (typeof window !== `undefined`) {
    navigate("/activities/create-experiment/summary", {
      state: {
        hypotheses: hypotheses,
        treatmentVariables: treatment_selected,
        responseVariables: response_selected,
        experimentDetails: experiment_details,
        combinations: combinations_selected,
      },
    })
  }
}
const ResponseVariable = variable => {
    const [checked_value, setCheckedValue] = useState(false);
    useEffect(() => {
        if (final_list.includes(variable.response_ref)) {
            setCheckedValue(true);
        }
    }, [])
    return (
        <div className="variable-list-item">
          <div className="label">
            <h3>{variable.response_ref.name}</h3>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked={checked_value} onChange={() => {onResponseChange(variable)}}/>
          </div>
        </div>
    )
}

  if (logged) {
    return (
      <div className="your-observations-container">
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
                        return (<ResponseVariable response_ref={r}/>)
                      })
                    : null}
                </div>
                <div className="recording-date">
                  <div className="date-label">
                    <h3>Response Day:</h3>
                    </div>
                  <div className="date-input">
                    <select>
                    <option value="" disabled selected>Select...</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
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
                        A milestone is an event that occurs once in a project's
                        duration i.e. leaves appearing.
                      </h3>
                    </div>
                    <div className="input-row">
                      <div className="text-input">
                        <input type="text" placeholder="Milestone" value={milestone_textbox} onChange={(e) => {setMilestone(e.target.value)}}/>
                      </div>
                      <div className="add-btn">
                        <input
                          type="submit"
                          className="submitButton"
                          value="Add"
                          onClick={() => {onAdd()}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="milestone-list">
                    <div className="list-wrapper">
                      {milestone_list.map(e => {
                        return (<h3>{e.name}</h3>)
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
                      {console.log(final_list)}
                      {final_list.map(e => (
                        <h3>{e.name}</h3>
                      ))}

                    </div>
                  </div>
                </div>
                <div className="btn-column">
                  <div className="spacer" />
                  <div className="continue-button">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Continue"
                      onClick={() => {
                       OnContinueClick();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
