import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import BackupIcon from "@mui/icons-material/Backup"
import CheckIcon from "@mui/icons-material/Check"
import { verify_superuser_storage } from "../../../utils/logins"
import {
  createRecordNavigate,
  uploadExperimentImage,
} from "../../../utils/CRUD"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function EnterActivityDetails(props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tutorial, setTutorial] = useState("")
  const [image, setImage] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [logged, setLogged] = useState("")

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleDescChange = e => {
    setDescription(e.target.value)
  }

  const handleTutChange = e => {
    setTutorial(e.target.value)
  }

  const handleImageChange = async e => {
    setImage(e.target.files[0])
  }

  const handleStartChange = e => {
    setStartDate(e.target.value)
  }

  const handleEndChange = e => {
    setEndDate(e.target.value)
  }

  const createActivity = e => {
    let body = JSON.stringify({
      title: name,
      description: description,
      project_text: tutorial,
      start_date: startDate,
      end_date: endDate,
      status: "active",
    })

    createRecordNavigate("/project", body).then(response =>
      uploadExperimentImage(
        "/project/" + response.id + "/uploadImage",
        image
      ).then(
        navigate("/superuser/project-maintenance", {
          state: {
            show_modal: true,
          },
        })
      )
    )
  }

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  if (logged) {
    return (
      <div>
        <div className="activity-container">
          <ToastContainer />
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
                      onChange={handleNameChange}
                    />
                  </div>
                </div>
                <div className="inputItem">
                  <div className="desc-title">
                    <h3>Description:</h3>
                  </div>
                  <div className="desc-input">
                    <textarea
                      type="text"
                      placeholder="Description"
                      name="descBox"
                      onChange={handleDescChange}
                    />
                  </div>
                </div>
                <div className="inputItem">
                  <div className="desc-title">
                    <h3>Tutorial Text:</h3>
                  </div>
                  <div className="desc-input">
                    <textarea
                      type="text"
                      placeholder="Tutorial"
                      name="descBox"
                      onChange={handleTutChange}
                    />
                  </div>
                </div>
                <div className="inputItem">
                  <div className="item-title">
                    <h3>Image Upload</h3>
                  </div>
                  <div className="img-btn">
                    <label className="image-upload-btn">
                      <input
                        type="file"
                        accept=".jpg,.png"
                        onChange={handleImageChange}
                        hidden
                      />
                      {image ? (
                        <CheckIcon className="imageIcon" />
                      ) : (
                        <BackupIcon className="imageIcon" />
                      )}
                    </label>
                    <div className="spacer" />
                    <div className="file-name">
                      {image ? <h3>{image.name}</h3> : null}
                    </div>
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
                className="back-button"
                value="Back"
                onClick={() => {
                  if (typeof window !== `undefined`) {
                    createActivity()
                  }
                }}
              ></input>
            </div>
            <div className="continue-btn">
              <input
                type="submit"
                className="submitButton"
                value="Finished"
                onClick={() => {
                  if (typeof window !== `undefined`) {
                    createActivity()
                  }
                }}
              ></input>
            </div>
            <div className="spacer"/>
          </div>
        </div>
      </div>
    )
  } else return null
}
