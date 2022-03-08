import React, { useEffect, useState, useRef } from "react"
import ExperimentComponent from "../../../components/activities/experimentComponent"
import { navigate } from "gatsby"
import ExperimentPane from "../../../components/activities/experimentPane"
import "../../../styles/App.scss"

export default function SecondExpPage(props) {
  const [treatment_selected, setTreatmentVariables] = useState([]);
  const [response_selected, setResponseVariables] = useState([]);

  useEffect(() => {
    if (props) {
      setTreatmentVariables(props.location.state.treatmentVariables);
      setResponseVariables(props.location.state.responseVariables);

      console.log(props.location.state.treatmentVariables);
      console.log(props.location.state.responseVariables);
    }
  }, []);

  return (
    <div>
      <div className="your-exp-container">
        <div className="title">
          <h3>Your Experiment</h3>
        </div>
        <div className="content">
          <div className="content-wrapper">
            <div className="exp-pane">
              <div className="exp-pane-wrapper">
                <div className="title">
                  <h2>Thigmomorphogenesis Experiment</h2>
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
                    <h3>How do plants react to being touched?</h3>
                  </div>
                </div>
                <div className="exp-item">
                  <div className="item-title">
                    <h3>Tutorial Text:</h3>
                  </div>
                  <div className="item-content">
                    <h3>
                      When they are growing outside, the wind blows plants
                      about...
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
                      <input type="text" placeholder="Code" name="descBox" />
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="item-title">
                      <h3>Name:</h3>
                    </div>
                    <div className="item-input">
                      <input type="text" placeholder="Name" name="descBox" />
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="item-title">
                      <h3>Start Date:</h3>
                    </div>
                    <div className="item-input">
                      <input
                        type="date"
                        //placeholder="Name"
                        name="descBox"
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
                        //placeholder="Name"
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
                      navigate("/activities/create-experiment/3")
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
}
