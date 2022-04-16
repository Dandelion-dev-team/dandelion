import React, { useEffect, useState } from "react"
import Select from "react-select"
import { toast, ToastContainer } from "react-toastify"

export default function EnterObservationModal(props) {
  const [observation, setObservation] = useState("")
  const [comment, setComment] = useState("")

  const handleLengthChange = e => {
    setObservation(e.target.value)
  }

  const onCommentChange = e => {
    setComment(e.target.value)
  }

  const onSave = e => {
    let obs;
    if(props.props.levels.length > 0){
      obs = observation.id;
    }else{
      obs = observation;
    }
    if(observation || comment){
      props.saveObservation({observation: parseInt(obs), comment: comment})
    }else{
      toast.error("More data needed.")
    }
  }
  return (
    <div className="modal-container">
      <div className="inner-content">
        <div className="panel-content">
          <div className="title">
            <h2>{props.props.name}</h2>
          </div>
          <div className="inputs">
              <div className="inputItem">
                <div className="item-title">
                  <h3>Observation:</h3>
                </div>
                <div className="item-input">
                  {props.props.levels.length > 0 ? (
                    <Select
                      name="authority_id_picker"
                      options={props.props.levels}
                      value={observation}
                      onChange={setObservation}
                      getOptionLabel={level => level.name}
                      getOptionValue={level => level.id}
                    />
                  ) : (
                    <input
                      type="text"
                      value={observation}
                      placeholder=""
                      name="nameBox"
                       onChange={handleLengthChange}
                    />
                  )}
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
          <div className="btn-row">
            <div className="submit-btn">
              <input
                type="submit"
                className="submitButton"
                value="Save"
                onClick={() => {
                  onSave()
                  
                }}
              />
            </div>
            <div className="submit-btn">
              <input
                type="submit"
                className="submitButton"
                value="Close"
                onClick={() => {
                  props.closeModal()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}