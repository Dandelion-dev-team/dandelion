import React, { useEffect, useState } from "react"
import Select from "react-select"
import { toast, ToastContainer } from "react-toastify"

export default function EnterObservationModal(props) {
  const [responseList, setResponses] = React.useState([])
  const [label_list, setLabels] = useState([])

  const handleResponseChange = React.useCallback(event => {
    const index = parseInt(event.target.dataset.index, 10)
    setResponses(inviteEmails => {
      const newResponse = [...inviteEmails]
      newResponse[index].value = event.target.value
      return newResponse
    })
  }, [])

  const handleSelectChange = React.useCallback(event => {
    const index = parseInt(event.target.dataset.index, 10)
    setResponses(inviteEmails => {
      const newResponse = [...inviteEmails]
      newResponse[index].value = parseInt(event.target.value)
      return newResponse
    })
  }, [])

  const handleCommentChange = React.useCallback(event => {
    const index = parseInt(event.target.dataset.index, 10)
    setResponses(inviteEmails => {
      const newResponse = [...inviteEmails]
      newResponse[index].comment = event.target.value
      return newResponse
    })
  }, [])

  const addResponse = React.useCallback(
    () =>
      setResponses(inviteEmails => [
        ...inviteEmails,
        { value: "", comment: "", unit_id: props.unit.id },
      ]),
    []
  )

  useEffect(() => {
    let copy = []
    props.props.forEach(variable => {
      addResponse()
      copy.push({
        name: variable.name,
        levels: variable.levels,
        variable_id: variable.id,
      })
    })
    setLabels(copy)
  }, [])

  const onSave = e => {
    let valid_inputs = true;
    responseList.forEach((response, idx) => {
      responseList[idx].variable_id = label_list[idx].variable_id

      if (parseInt(response.value)) {
        responseList[idx].value = parseInt(response.value);
      } else {
        valid_inputs = false;
        toast.error("Value not an integer.")
      }
    })

    if(valid_inputs){
      props.saveObservation(responseList)
    }
  }

  return (
    <div className="modal-container">
      <div className="inner-content">
        <div className="panel-content">
          <div className="title">
            <h3>Enter Observations</h3>
          </div>
          <div className="inputs">
            {responseList.map((condition, idx) => (
              <div key={idx}>
                <div className="inputItem">
                  <div className="item-title">
                    <h3>{label_list[idx].name}</h3>
                  </div>
                  <div className="item-input">
                    {label_list[idx].levels.length > 0 ? (
                      <select
                        value={condition.value}
                        onChange={handleSelectChange}
                        data-index={idx}
                      >
                        <option value="" disabled selected>Select your option</option>
                        {label_list[idx].levels.map(level => (
                          <option value={level.id}>{level.name}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={condition.value}
                        data-index={idx}
                        onChange={handleResponseChange}
                        placeholder="Value..."
                      />
                    )}
                  </div>
                </div>

                <div className="inputItem">
                  <div className="item-title"></div>
                  <div className="item-input">
                    <input
                      value={condition.comment}
                      data-index={idx}
                      onChange={handleCommentChange}
                      placeholder="Comment..."
                    />
                  </div>
                </div>
              </div>
            ))}
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
