import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import BackupIcon from "@mui/icons-material/Backup"
import CheckIcon from "@mui/icons-material/Check"
import { verify_superuser_storage } from "../../../utils/logins"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export default function EnterDetails(props) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [tutorial, setTutorial] = useState("")
  const [image, setImage] = useState(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [logged, setLogged] = useState("")

  useEffect(() => {
    if (props.location.state.name) {
      setName(props.location.state.name)
    }
    if (props.location.state.code) {
      setCode(props.location.state.code)
    }
    if (props.location.state.description) {
      setDescription(props.location.state.description)
    }
    if (props.location.state.tutorial) {
      setTutorial(props.location.state.tutorial)
    }
    if (props.location.state.image) {
      setImage(props.location.state.image)
    }
    if (props.location.state.startDate) {
      setStartDate(props.location.state.startDate)
    }
    if (props.location.state.endDate) {
      setEndDate(props.location.state.endDate)
    }

    if (verify_superuser_storage() == true) {
      setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

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
  }

  const handleStartChange = e => {
    setStartDate(e.target.value)
  }

  const handleEndChange = e => {
    setEndDate(e.target.value)
  }

  const handleNav = e => {
    let project_id = props.location.state.project_id
    if (
      name &&
      code &&
      description &&
      tutorial &&
      startDate &&
      endDate
    ) {
      if (typeof window !== `undefined`) {
        navigate("/activities/create-experiment/treatment-variables", {
          state: {
            project_id: project_id,
            name: name,
            code: code,
            description: description,
            tutorial: tutorial,
            image: image,
            startDate: startDate,
            endDate: endDate,
            parent_id: null,
          },
        })
      }
    }
  }
  if (logged) {
    return (
      <div>
        <div className="create-exp-container">
          <ToastContainer />
          <div className="content">
            <div className="title-content">
              <h3>Experiment Creation</h3>
              <p>Tell us about your experiment</p>
            </div>
            <div className="experiment-form">
              <div className="experiment-pane">
                <div className="inputItem">
                  <div className="item-title">
                    <h3>Name:</h3>
                  </div>
                  <div className="item-input">
                    <input
                      type="text"
                      placeholder="Experiment Name"
                      value={name}
                      name="nameBox"
                      onChange={handleNameChange}
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
                      maxLength={4}
                      value={code}
                      placeholder="Experiment Code"
                      name="codeBox"
                      onChange={handleCodeChange}
                    />
                  </div>
                </div>
                <div className="inputItem">
                  <div className="desc-title">
                    <h3>Description:</h3>
                  </div>
                  <div className="desc-input">
                    <textarea
                      value={description}
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
                      value={tutorial}
                      placeholder="Tutorial Text"
                      name="tutBox"
                      onChange={handleTutChange}
                    />
                  </div>
                </div>
                <div className="inputItem">
                  <div className="item-title">
                    <h3>Image Upload:</h3>
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
                      min={props.location.state.start_date}
                      value={startDate}
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
                      min={startDate}
                      max={props.location.state.end_date}
                      value={endDate}
                      type="date"
                      name="codeBox"
                      onChange={handleEndChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div className="spacer"/>
            <div className="btn-row">
            <div className="continue-btn">
              <input
                type="submit"
                className="submitButton"
                value="Back"
                onClick={() => {
                  if (typeof window !== `undefined`) {
                    navigate(
                      "/activities/create-experiment/predefined-experiments/",
                      {
                        state: { project_id: props.location.state.project_id },
                      }
                    )
                  }
                }}
              />
            </div>
            <div className="continue-btn">
              <input
                type="submit"
                className="submitButton"
                value="Finished"
                onClick={() => {
                  handleNav()
                }}
             />
            </div>
            </div>
            
          </div>
        </div>
      </div>
    )
  } else return null
}
