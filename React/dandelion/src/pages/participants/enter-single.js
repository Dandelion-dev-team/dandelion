import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import { createRecordNavigate } from "../../utils/CRUD"
export default function EnterSingleData(props) {
  const [observation, setLength] = useState("")

  const handleLengthChange = e => {
    setLength(e.target.value)
  }

  const onUpdate = e => {
    let student_id = localStorage.getItem("user_id");
    console.log("Updated body")
    let body = JSON.stringify({
      timestamp: null,
      value: parseInt(observation),
      created_by: student_id,
      status: "valid",
      comment: "",
      unit_id: 1,
      response_variable_id: props.location.state.variable.id,
    })

    createRecordNavigate("/observation", body).then(navigate("/participants/experiment-dashboard"));
  }

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state.variable)
    }
  }, []);


  return (
    <div>
      <div className="enter-single-container">
        <div className="content">
          <div className="title-content">
            <h3>Scientist Observations</h3>
            <p>Here you can enter the data you’ve collected!</p>
          </div>
          <div className="data-form">
            <div className="data-pane">
              <div className="inputItem">
                <div className="item-title">
                  <h3>Observation:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="text"
                    value={observation}
                    placeholder=""
                    name="nameBox"
                    onChange={handleLengthChange}
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="item-title">
                  {/* <h3>Recording Date:</h3> */}
                </div>
                {/* <div className="item-input">
                  <input
                    type="date"
                    name="codeBox"
                    onChange={handleRecordDateChange}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <div className="finish-btn">
            <input
              type="submit"
              className="submitButton"
              value="Finished"
              onClick={() => {
                onUpdate();
              }}
            ></input>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </div>
  )
}
