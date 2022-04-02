import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import { verify_superuser_storage } from "../../../utils/logins";

export default function Summary(props) {
  const [treatment_selected, setTreatmentVariables] = useState([]);
  const [response_selected, setResponseVariables] = useState([]);
  const [experiment_details, setExperimentDetails] = useState([]);
  const [combinations_selected, setCombinations] = useState([]);

  const [combinations_renderable, setRenderable] = useState([]);
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [logged, setLogged] = useState("");

  const handleStartChange = e => {
    setStartDate(e.target.value)
  }

  const handleEndChange = e => {
    setEndDate(e.target.value)
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleCodeChange = e => {
    setCode(e.target.value)
  }

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true);
      if (props.location.state) {
        var result = [];
        setTreatmentVariables(props.location.state.treatmentVariables);
        setResponseVariables(props.location.state.responseVariables);
        setExperimentDetails(props.location.state.experimentDetails);
        setCombinations(props.location.state.combinations);
        setName(props.location.state.experimentDetails.name);
        setCode(props.location.state.experimentDetails.code);
        setStartDate(props.location.state.experimentDetails.startDate);
        setEndDate(props.location.state.experimentDetails.endDate);
        props.location.state.combinations.forEach(array => { result.push(array); });

        result.forEach(array => { setRenderable(arr => [...arr, array]); });
      } else {
        if (typeof window !== `undefined`) {
          navigate(
            "/activities/create-experiment/enter-details")
        }
      }
    } else {
      navigate("/signin");
    }
  }, []);

  if (logged) {
    return (
      <div>
        <div className="summary-container">
          <div className="title">
            <h3>Your Experiment</h3>
          </div>
          <div className="content">
            <div className="content-wrapper">
              <div className="exp-pane">
                <div className="exp-pane-wrapper">
                  <div className="title">
                    <h2>{experiment_details.name}</h2>
                    <h3>Dandelion School</h3>
                  </div>
                  <div className="exp-item">
                    <div className="item-title">
                      <h3>Conditions:</h3>
                    </div>
                    <div className="condition-list">
                      <h3>1 - Touch × Length </h3>
                      <h3>2 - Touch × Stalk Strength </h3>
                    </div>
                  </div>
                  <div className="exp-item">
                    <div className="item-title">
                      <h3>Description:</h3>
                    </div>
                    <div className="item-content">
                      <h3>{experiment_details.description}</h3>
                    </div>
                  </div>
                  <div className="exp-item">
                    <div className="item-title">
                      <h3>Tutorial Text:</h3>
                    </div>
                    <div className="item-content">
                      <h3>
                        <h3>{experiment_details.tutorial}</h3>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-pane">
                <div className="user-pane-wrapper">
                  <div className="title">
                    <h3>Your Information</h3>
                  </div>
                  <div className="info-items-wrapper">
                    <div className="info-item">
                      <div className="item-title">
                        <h3>Code:</h3>
                      </div>
                      <div className="item-input">
                        <input type="text" placeholder="Code" name="descBox" onChange={handleCodeChange} value={code} />
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="item-title">
                        <h3>Name:</h3>
                      </div>
                      <div className="item-input">
                        <input type="text"
                          placeholder="Experiment Name"
                          value={name}
                          name="descBox"
                          onChange={handleNameChange} />
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="item-title">
                        <h3>Start Date:</h3>
                      </div>
                      <div className="item-input">
                        <input
                          type="date"
                          value={startDate}
                          name="descBox"
                          onChange={handleStartChange}
                        />
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="item-title">
                        <h3>End Date:</h3>
                      </div>
                      <div className="item-input">
                        <input
                          type="date"
                          value={endDate}
                          onChange={handleEndChange}
                          name="descBox"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-container">
                  <div className="continue-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Continue"
                      onClick={() => {
                        if (typeof window !== `undefined`) {
                          navigate("/activities/create-experiment/configure-units",
                            {
                              state: { treatmentVariables: treatment_selected, responseVariables: response_selected, experimentDetails: experiment_details, combinations: combinations_selected },
                            })
                        }
                      }}
                    ></input>
                  </div>
                  <div className="spacer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null;
}
