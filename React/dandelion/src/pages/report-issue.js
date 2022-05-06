import React, { useEffect, useState, useRef } from "react"
import "../styles/App.scss"
import { ToastContainer, toast } from "react-toastify"
import { updateRecord, uploadExperimentImage } from "../utils/CRUD"
import EditIcon from "@mui/icons-material/Edit"
import Header from "../components/navigation/header"
import SchoolIssuesComponent from "../components/tables/schoolIssuesComponent"
import AllIssuesComponent from "../components/tables/allIssuesComponent"

export default function ReportIssue(props) {
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])
  const [tab_state, setTabState] = useState(0)

  const [issueName, setIssueName] = useState("")
  const [issueSymptoms, setIssueSymptoms] = useState("")
  const [issueSteps, setIssueSteps] = useState("")
  const [issueNotes, setIssueNotes] = useState("")

  const changeTab = e => {
    if (e == 0) {
      setTabState(0)
      setColourIndex(["#E3C3CA", "#e6e6e6"])
    } else {
      setTabState(1)
      setColourIndex(["#e6e6e6", "#E3C3CA"])
    }
  }

  const handleImageChange = async e => {
    uploadExperimentImage(
      "/project/" + props.project.id + "/uploadImage",
      e.target.files[0]
    ).then(window.location.reload(false))
  }

  return (
    <div>
      <Header />
      <div className="issue-container">
        <ToastContainer />
        <div className="issue-content">
          <div className="left-pane">
            <div className="create-pane">
              <div className="spacer" />
              <div className="create-content">
                <h2>Report Issue</h2>
                <div className="create-form">
                  <div className="info-item">
                    <div className="item-title">
                      <h3>Name:</h3>
                    </div>
                    <div className="item-input">
                      <input
                        type="text"
                        placeholder="Name"
                        name="descBox"
                        value={issueName}
                        onChange={e => {
                          setIssueName(e.target.value)
                        }}
                      />
                    </div>
                  </div>

                  <div className="desc-item">
                    <div className="item-title">
                      <h3>Symptoms:</h3>
                    </div>
                    <div className="item-input">
                      <textarea
                        placeholder="Symptoms"
                        onChange={e => {
                          setIssueSymptoms(e.target.value)
                        }}
                        value={issueSymptoms}
                      />
                    </div>
                  </div>
                  <div className="desc-item">
                    <div className="item-title">
                      <h3>Steps to Reproduce:</h3>
                    </div>
                    <div className="item-input">
                      <textarea
                        placeholder="Description"
                        onChange={e => {
                          setIssueSteps(e.target.value)
                        }}
                        value={issueSteps}
                      />
                    </div>
                  </div>
                  <div className="desc-item">
                    <div className="item-title">
                      <h3>Notes:</h3>
                    </div>
                    <div className="item-input">
                      <textarea
                        placeholder="Description"
                        onChange={e => {
                          setIssueNotes(e.target.value)
                        }}
                        value={issueNotes}
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="item-title">
                      <h3>Activity Image:</h3>
                    </div>
                    <div className="item-input">
                      <div className="school-image">
                        {/* <img src={props.project.image_full} /> */}

                        <img src="https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
                        <label className="edit-circle">
                          <input
                            type="file"
                            accept=".jpg,.png"
                            onChange={handleImageChange}
                            hidden
                          />
                          <EditIcon className="edit-icon" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="issue-list">
              <div className="tabs">
                <div
                  className="tab"
                  style={{ backgroundColor: colour_index[0] }}
                  onClick={() => {
                    changeTab(0)
                  }}
                >
                  <h3>Hello</h3>
                </div>
                <div
                  className="tab"
                  style={{ backgroundColor: colour_index[0] }}
                  onClick={() => {
                    changeTab(1)
                  }}
                >
                  <h3>world</h3>
                </div>
              </div>
              <div className="list-content">
                {tab_state == 0 ? (
                  <SchoolIssuesComponent />
                ) : (
                  <AllIssuesComponent />
                )}
              </div>
            </div>
          </div>
          <div className="right-pane">
            <div className="issue-panel">
              <div className="issue-panel-content">
                <div className="title">
                  <h2>Example Issue</h2>
                  <h3>17/04/2024</h3>
                </div>
                <div className="issue-img">
                  <img src="https://townsquare.media/site/295/files/2017/10/rhino.jpg"/>
                </div>
                <div className="symptoms">
                  <p>Symptoms</p>
                  <div className="info-box">
                    <p>The website is very very sic.</p>
                  </div>
                </div>
                <div className="steps">
                  <p>Steps to reproduce:</p>
                  <div className="info-box">
                    <p>Kick in the door, wave in the 44.</p>
                  </div>
                </div>
                <div className="notes">
                  <div className="title-btn-row">
                    <div className="title">
                      <h3>Notes</h3>
                    </div>
                    <div className="btn">
                      <h3>Button</h3>
                    </div>
                  </div>
                  <div className="info-box">
                    <p>I think she's reached the end</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
