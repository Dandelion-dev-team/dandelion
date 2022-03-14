import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import BackupIcon from "@mui/icons-material/Backup"
import CheckIcon from '@mui/icons-material/Check';

export default function EnterActivityDetails(props) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [tutorial, setTutorial] = useState("")
  const [image, setImage] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleCodeChange = e => {
    setCode(e.target.value)
  }

  const handleDescChange = e => {
    setDescription(e.target.value)
  }

  const handleTutChange = e => {
    setTutorial(e.target.value)
  }

  const handleImageChange = async e => {
    setImage(e.target.files[0])
    console.log(image)

  }

  const handleStartChange = e => {
    setStartDate(e.target.value)
    console.log(startDate)
  }

  const handleEndChange = e => {
    setEndDate(e.target.value)
    console.log(endDate)
  }

  return (
    <div>
      <div className="activity-container">
        <div className="content">
          <div className="text-content">
            <h3>Activity Creation</h3>
            <p>Tell us about your activity.</p>
          </div>
          <div className="activity-form">
            <div className="activity-pane">
              <div className="inputItem">
                <div className="item-title">
                  <h3>Name:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="text"
                    placeholder="Activity Name"
                    name="nameBox"
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="item-title">
                  <h3>Code:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="text"
                    placeholder="Activity Code"
                    name="codeBox"
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="desc-title">
                  <h3>Description:</h3>
                </div>
                <div className="desc-input">
                  <input
                    type="text"
                    placeholder="Description"
                    name="descBox"
                  />
                </div>
              </div>

              <div className="inputItem">
                <div className="item-title">
                  <h3>Image Upload</h3>
                </div>
                <div className="img-btn">
                  <label className="image-upload-btn">
                    <input type="file" accept=".jpg,.png" onChange={handleImageChange} hidden />
                    {image ? <CheckIcon className="imageIcon" /> : <BackupIcon className="imageIcon" />}
                  </label>
                </div>
              </div>
              <div className="inputItem">
                <div className="item-title">
                  <h3>Start Date:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="date"
                    // placeholder="Activity Code"
                    name="codeBox"
                    onChange={handleStartChange}
                  />
                </div>
              </div>
              <div className="inputItem">
                <div className="item-title">
                  <h3>End Date:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="date"
                    min={startDate}
                    //placeholder="Activity Code"
                    name="codeBox"
                    onChange={handleEndChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <div className="continue-btn">
            <input
              type="submit"
              className="submitButton"
              value="Finished"
              onClick={() => {
                if (typeof window !== `undefined`) {
                  navigate("/superuser/project-maintenance",                             {
                    state: {
                      show_modal: true
                    },
                  })
                }
              }}
            ></input>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </div>
  )
}
