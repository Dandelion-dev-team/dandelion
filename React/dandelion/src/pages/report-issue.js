import React, { useEffect, useState, useRef } from "react"
import "../styles/App.scss"
import { ToastContainer, toast } from "react-toastify"
import {
  createRecord,
  createRecordNavigate,
  readRecord,
  updateRecord,
  uploadExperimentImage,
} from "../utils/CRUD"
import EditIcon from "@mui/icons-material/Edit"
import Header from "../components/navigation/header"
import SchoolIssuesComponent from "../components/tables/schoolIssuesComponent"
import AllIssuesComponent from "../components/tables/allIssuesComponent"
import Select from "react-select"
import AddNoteModal from "../components/modals/addNoteModal"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"

export default function ReportIssue(props) {
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])
  const [tab_state, setTabState] = useState(0)

  const [issueName, setIssueName] = useState("")
  const [issueSymptoms, setIssueSymptoms] = useState("")
  const [issueSteps, setIssueSteps] = useState("")
  const [issueNotes, setIssueNotes] = useState("")
  const [issue_type, setIssueType] = useState("")
  const [issue_priority, setIssuePriority] = useState("")
  const [clickedIssue, setClickedIssue] = useState()
  const [image, setImage] = useState()
  const [displayImage, setDisplayImage] = useState()

  const [show_modal, setShowModal] = useState(false)

  const changeTab = e => {
    if (e == 0) {
      setTabState(0)
      setColourIndex(["#E3C3CA", "#e6e6e6"])
    } else {
      setTabState(1)
      setColourIndex(["#e6e6e6", "#E3C3CA"])
    }
  }

  const issue_type_list = [
    { value: "bug", label: "Bug" },
    { value: "request", label: "Request" },
    { value: "other", label: "Other" },
  ]

  const issues_priority_list = [
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "low", label: "Low" },
  ]

  const handleImageChange = async e => {
    setImage(e.target.files[0])
    setDisplayImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleIssueCallback = e => {
    console.log(e)
    readRecord("/issue/" + e, setClickedIssue)
  }

  const submitIssue = e => {
    let user_id = localStorage.getItem("user_id")
    let date = new Date()
    let useDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      (date.getDay() + 1)
    let body = JSON.stringify({
      user_id: parseInt(user_id),
      name: issueName,
      reported_date: useDate,
      symptoms: issueSymptoms,
      steps_to_reproduce: issueSteps,
      notes: issueNotes,
      type: issue_type.value,
      priority: issue_priority.value,
      status: "open",
    })
    console.log(JSON.parse(body))

    if (!image) {
      createRecord("/project", body)
    } else {
      createRecordNavigate("/issue", body).then(response =>
        uploadExperimentImage("/issue/" + response.id + "/uploadImage", image)
      )
    }
  }

  return (
    <div>
      <Header />
      <div className="issue-container">
        {show_modal ? <AddNoteModal closeModal={setShowModal} /> : null}

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
                      <h3>Issue Type:</h3>
                    </div>
                    <div className="item-input">
                      <Select
                        value={issue_type}
                        options={issue_type_list}
                        onChange={setIssueType}
                        placeholder={"Select type."}
                      />
                    </div>
                  </div>

                  <div className="desc-item">
                    <div className="item-title">
                      <h3>Issue Priority:</h3>
                    </div>
                    <div className="item-input">
                      <Select
                        value={issue_priority}
                        options={issues_priority_list}
                        onChange={setIssuePriority}
                        placeholder={"Select how important this issue is."}
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
                        placeholder="The steps you took to encounter this error."
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
                        placeholder="Any other details about the issue."
                        onChange={e => {
                          setIssueNotes(e.target.value)
                        }}
                        value={issueNotes}
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="item-title">
                      <h3>Issue Image:</h3>
                    </div>
                    <div className="item-input">
                      <div className="school-image">
                        {displayImage ? (
                          <img src={displayImage} />
                        ) : (
                          <img src="https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
                        )}
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
                  <div className="btn-row">
                    <input
                      type="submit"
                      className="update-btn"
                      value="Submit Issue"
                      onClick={() => {
                        submitIssue()
                      }}
                    />
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
                 <AssignmentIcon className="edit-icon" />

                </div>
                <div
                  className="tab"
                  style={{ backgroundColor: colour_index[1] }}
                  onClick={() => {
                    changeTab(1)
                  }}
                >
                 <AssignmentTurnedInIcon className="edit-icon" />

                </div>
              </div>
              <div className="list-content">
                {tab_state == 0 ? (
                  <SchoolIssuesComponent issueCallback={handleIssueCallback} />
                ) : (
                  <AllIssuesComponent issueCallback={handleIssueCallback} />
                )}
              </div>
            </div>
          </div>
          <div className="right-pane">
            <div className="issue-panel">
              {clickedIssue ? (
                <div className="issue-panel-content">
                  <div className="title">
                    <h2>
                      {clickedIssue.issue.name} - {clickedIssue.issue.priority}
                    </h2>
                    <h2>{clickedIssue.issue.type}</h2>
                    <h3>
                      Reported on:{" "}
                      {new Date(
                        clickedIssue.issue.reported_date
                      ).toDateString()}
                    </h3>
                  </div>
                  <div className="issue-img">
                    <img src={clickedIssue.issue.image_full} />
                  </div>
                  <div className="symptoms">
                    <p>Symptoms</p>
                    <div className="info-box">
                      <p>{clickedIssue.issue.symptoms}</p>
                    </div>
                  </div>
                  <div className="steps">
                    <p>Steps to reproduce:</p>
                    <div className="info-box">
                      <p>{clickedIssue.issue.steps_to_reproduce}</p>
                    </div>
                  </div>
                  <div className="notes">
                    <div className="title-btn-row">
                      <div className="title">
                        <h3>Notes</h3>
                      </div>
                      <div className="btn-row">
                        <input
                          type="submit"
                          className="update-btn"
                          value="Add a Note"
                          onClick={() => {
                            setShowModal(true)
                          }}
                        />
                      </div>
                    </div>
                    <div className="info-box">
                      <p>{clickedIssue.issue.notes}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
