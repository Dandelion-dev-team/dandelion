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
    props.props.map((condition => {
      if (condition.levels.length > 0) {
        obs = observation.id;
      } else {
        obs = observation;
      }
      if (observation || comment) {
        props.saveObservation({ observation: parseInt(obs), comment: comment })
      } else {
        toast.error("More data needed.")
      }
    }))
  }
  return (
    <div className="modal-container">
      {console.log(props)}
      <div className="inner-content">
        <div className="panel-content">
          {props.props.map((condition => {
            return (
              <div>
                {console.log}
                <div className="inputs">
                  <div className="inputItem">
                    <div className="item-title">
                      <h3>{condition.name}:</h3>
                    </div>
                    <div className="item-input">
                      {condition.levels.length > 0 ? (
                    <Select
                      name="authority_id_picker"
                      options={condition.levels}
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
              </div>
            )
          }))}
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
