import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import { createRecordNavigate } from "../../utils/CRUD"
import Select from "react-select"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EnterSingleData(props) {

  const [observation, setObservation] = useState("")
  const [levels, setLevels] = useState([])
  const [comment, setComment] = useState("")

  const handleLengthChange = e => {
    setObservation(e.target.value)
  }

  const onCommentChange = e => {
    setComment(e.target.value)
  }

  const onUpdate = e => {
    let student_id = localStorage.getItem("user_id");
    console.log("Updated body")
    let obs;
    if(levels.length > 0){
      obs = observation.id;
    }else{
      obs = observation;
    }

    if(obs){
      let date = new Date();
      let timestamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let body = JSON.stringify({
        timestamp: date,
        value: parseInt(obs),
        created_by: student_id,
        status: "valid",
        comment: "",
        unit_id: 24,
        response_variable_id: props.location.state.variable.id,
      })
      console.log(JSON.parse(body))
      createRecordNavigate("/observation", body)//.then(navigate("/participants/experiment-dashboard"));
    }
  }

  useEffect(() => {
    if (props.location.state) {
      let variable = props.location.state.variable;
      if (variable.levels.length > 0) {
        setLevels(variable.levels);
      } else {
        console.log("false")
      }
    }
  }, []);


  return (
    <div>
      <div className="enter-single-container">
      <ToastContainer />
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
                  {levels.length > 0 ? 
                  <Select
                    name="authority_id_picker"
                    options={levels}
                    value={observation}
                    onChange={setObservation}
                    getOptionLabel={(level) => level.name}
                    getOptionValue={(level) => level.id} // It should be unique value in the options. E.g. ID
                  /> 
                  :
                    <input
                      type="text"
                      value={observation}
                      placeholder=""
                      name="nameBox"
                      onChange={handleLengthChange}
                    />}
                </div>
              </div>
              <div className="inputItem">
                <div className="item-title">
                  <h3>Comment:</h3>
                </div>
                 <div className="item-input">
                  <textarea
                    value={comment}
                    onChange={onCommentChange}
                    type="date"
                    name="codeBox"
                  />
                </div>
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
