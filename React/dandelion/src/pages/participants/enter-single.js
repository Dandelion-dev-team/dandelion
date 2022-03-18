import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"

export default function EnterSingleData(props) {
  const [length, setLength] = useState("")
  const [recordingDate, setRecordingDate] = useState("")

  const handleLengthChange = e => {
    setLength(e.target.value)
  }

  const handleRecordDateChange = e => {
    setRecordingDate(e.target.value)
  }

  const onUpdate = e => {
    let update_body = JSON.stringify({
      id: 0,
      timestamp: "2022-03-17T23:40:30.642Z",
      value: 140,
      status: "valid",
      unit: "mm"
    })
    fetch(process.env.ROOT_URL + "/observation/" + 0, {
      method: "PATCH",
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      }),
      body: update_body,
    }).then(navigate("/participants/experiment-dashboard"))
  }


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
                  <h3>Length:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="text"
                    value={length}
                    placeholder="Length (mm)"
                    name="nameBox"
                    onChange={handleLengthChange}
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="item-title">
                  <h3>Recording Date:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="date"
                    name="codeBox"
                    onChange={handleRecordDateChange}
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
