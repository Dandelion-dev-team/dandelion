import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import BackupIcon from "@mui/icons-material/Backup"
import CheckIcon from '@mui/icons-material/Check';
import { verify_superuser_storage } from "../../../utils/logins";

export default function EnterDetails(props) {
  const [name, setName] = useState("name")
  const [code, setCode] = useState("code")
  const [description, setDescription] = useState("desc")
  const [tutorial, setTutorial] = useState("e")
  const [image, setImage] = useState(null)
  const [startDate, setStartDate] = useState("2022-01-01")
  const [endDate, setEndDate] = useState("2022-02-02")

  const [logged, setLogged] = useState("");

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true);
    } else {
      navigate("/signin");
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
    let project_id = props.location.state.project_id;
    if (
      name &&
      code &&
      description &&
      tutorial &&
      image &&
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
          },
        })
      }
    }
  }
  if (logged) {
    return (
      <div>
        <div className="create-exp-container">
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
                    <input type="text" value={description} placeholder="Description" name="descBox" onChange={handleDescChange} />
                  </div>
                </div>
                <div className="inputItem">
                  <div className="desc-title">
                    <h3>Tutorial Text:</h3>
                  </div>
                  <div className="desc-input">
                    <input
                      type="text"
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
            <div className="continue-btn">
              <input
                type="submit"
                className="submitButton"
                value="Finished"
                onClick={() => {
                  handleNav()

                }}
              ></input>
            </div>
            <div className="spacer"></div>
          </div>
        </div>
      </div>
    )
  } else return null;
}
