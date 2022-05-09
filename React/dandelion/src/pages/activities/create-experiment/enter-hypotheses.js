import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import CombinationListComponent from "../../../components/cards/combinationListCard"
import "../../../styles/App.scss"
import { verify_superuser_storage } from "../../../utils/logins"
import HypothesisCard from "../../../components/cards/hypothesisCard"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export default function EnterHypotheses(props) {
  const [treatment_variables, setTreatment] = useState("")
  const [response_variables, setResponse] = useState("")
  const [hypothesis_text_box, setHypothesisTextbox] = useState("")
  const [hypothesis_desc_box, setHypothesisDesc] = useState("")

  const [combinations_selected, setCombinations] = useState([])
  const [experiment_details, setExperimentDetails] = useState("")
  const [logged, setLogged] = useState("")

  const [hypothesesList, setHypothesesList] = useState([])
  const [hypotheses_number, setHypothesesNumer] = useState(0)

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

  const handleHypothesisDescChange = e => {
    setHypothesisDesc(e.target.value)
  }

  const AddHypothesis = e => {
    let copy = [...hypothesesList]
    let hypothesis = {
      description: hypothesis_text_box,
      hypothesis_no: hypotheses_number,
      status: "Active",
      text: hypothesis_desc_box,
    }
    setHypothesesNumer(hypotheses_number + 1)
    copy.push(hypothesis)
    setHypothesesList(copy)

    setHypothesisTextbox("")
    setHypothesisDesc("")
  }

  if (logged) {
    return (
      <div className="hypotheses-container">
        <ToastContainer />
        <div className="content">
          <div className="text-content">
            <h3>Enter your Hypotheses</h3>
            <p>
              What do you think will happen to the plants during the experiment?
            </p>
          </div>
          <div className="hypotheses-content">
            <div className="hypotheses-row">
              <div className="list">
                <div className="card-list">
                  {hypothesesList.length > 0
                    ? hypothesesList.map(hypothesis => (
                        <HypothesisCard hypothesisItem={hypothesis} />
                      ))
                    : null}
                </div>

                <div className="input-area">
                  <div className="input-row">
                    <div className="title">
                      <h3>{hypotheses_number}. Hypothesis</h3>
                    </div>
                    <div className="input">
                      <input
                        type="text"
                        placeholder="Hypothesis title"
                        name="descBox"
                        onChange={handleHypothesisTextboxChange}
                        value={hypothesis_text_box}
                      />
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="title">
                      <h3>Description</h3>
                    </div>
                    <div className="desc-input">
                      <textarea
                        type="text"
                        placeholder="Description"
                        name="descBox"
                        onChange={handleHypothesisDescChange}
                        value={hypothesis_desc_box}
                      />
                    </div>
                  </div>
                  <div className="add-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Add Hypothesis"
                      onClick={() => {
                        {
                          AddHypothesis()
                        }
                      }}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="cont-btn">
                <div className="button">
                  <input
                    type="submit"
                    className="continue-btn"
                    value="Back"
                    onClick={() => {
                      if (typeof window !== `undefined`) {
                        navigate(
                          "/activities/create-experiment/select-conditions",
                          {
                            state: {
                              treatmentVariables:
                                props.location.state.treatmentVariables,
                              responseVariables:
                                props.location.state.responseVariables,
                              experimentDetails:
                                props.location.state.experimentDetails,
                            },
                          }
                        )
                      }
                    }}
                  />
                </div>
                {/* <div className="spacer" /> */}
                <div className="button">
                  <input
                    type="submit"
                    className="continue-btn"
                    value="Continue"
                    onClick={() => {
                      if (
                        typeof window !== `undefined`) {
                        navigate(
                          "/activities/create-experiment/your-observations",
                          {
                            state: {
                              hypotheses: hypothesesList,
                              treatmentVariables: treatment_variables,
                              responseVariables: response_variables,
                              experimentDetails: experiment_details,
                              combinations: combinations_selected,
                            },
                          }
                        )
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
