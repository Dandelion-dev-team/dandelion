import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import CombinationListComponent from "../../../components/cards/combinationListCard"
import "../../../styles/App.scss"
import { verify_superuser_storage } from "../../../utils/logins"
import HypothesisCard from "../../../components/cards/hypothesisCard"

export default function EnterHypotheses(props) {
  const [treatment_variables, setTreatment] = useState("")
  const [response_variables, setResponse] = useState("")
  const [hypothesis_text_box, setHypothesisTextbox] = useState("")

  const [combinations_selected, setCombinations] = useState([])
  const [experiment_details, setExperimentDetails] = useState("")
  const [logged, setLogged] = useState("")

  const [hypothesesList, setHypothesesList] = useState([])

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      if (props.location.state) {
        setExperimentDetails(props.location.state.experimentDetails)
        setTreatment(props.location.state.treatmentVariables)
        setResponse(props.location.state.responseVariables)
        setCombinations(props.location.state.combinations)
      } else {
        if (typeof window !== `undefined`) {
          navigate("/activities/create-experiment/enter-details")
        }
      }
      setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  const handleHypothesisTextboxChange = e => {
    setHypothesisTextbox(e.target.value)
  }

  const AddHypothesis = e => {
    let copy = [...hypothesesList]
    copy.push(hypothesis_text_box)
    setHypothesesList(copy)
  }

  if (logged) {
    return (
      <div className="hypotheses-container">
        <div className="content">
          <div className="text-content">
            <h3>Enter your Hypotheses</h3>
            <p>What do you think will happen to the plants during the experiment?</p>
          </div>
          <div className="hypotheses-content">
            <div className="hypotheses-row">
              <div className="list">
                {hypothesesList.length > 0
                  ? hypothesesList.map(hypothesis => (
                    <HypothesisCard hypothesisItem={hypothesis} />
                  ))
                  : null}
                <div className="input-row">
                  <div className="title">
                    <h3>Hypothesis</h3>
                  </div>
                  <div className="input">
                    <input
                      type="text"
                      placeholder="Level"
                      name="descBox"
                      onChange={handleHypothesisTextboxChange}
                      value={hypothesis_text_box}
                    />
                  </div>
                </div>
                <div className="add-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Add Level"
                    onClick={() => {
                      {
                        AddHypothesis()
                      }
                    }}
                  ></input>
                </div>
                <input
                  type="submit"
                  className="continue-btn"
                  value="Continue"
                  onClick={() => {
                    if (typeof window !== `undefined`) {
                      navigate("/activities/create-experiment/configure-units",
                        {
                          state: { hypotheses: hypothesesList,treatmentVariables: treatment_variables, responseVariables: response_variables, experimentDetails: experiment_details , combinations: combinations_selected },
                        });
                    }
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
