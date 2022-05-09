import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import EditIcon from "@mui/icons-material/Edit"
import { updateRecord, uploadExperimentImage } from "../../utils/CRUD"
import { ToastContainer, toast } from "react-toastify"

import { Projection } from "leaflet"

// const handleImageChange = async e => {
//     uploadExperimentImage("/school/" + fetchedSchool.school.school_id + "/uploadImage", e.target.files[0]).then(window.location.reload(false))
//   }

export default function EditActivityModal(props) {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    setProjectName(props.project.title)
    setProjectDescription(props.project.description)
    setStartDate(props.project.start_date)
    setEndDate(props.project.end_date)
  }, [])

  const handleImageChange = async e => {
    uploadExperimentImage(
      "/project/" + props.project.id + "/uploadImage",
      e.target.files[0]
    ).then(window.location.reload(false))
  }

  const updateClicked = e => {
    if (projectName && projectDescription && startDate && endDate) {
      let body = JSON.stringify({
        id: props.project.project_id,
        title: projectName,
        description: projectDescription,
        project_text: props.project.project_text,
        project_image_link: null,
        start_date: startDate,
        end_date: endDate,
        status: "active",
      })
      updateRecord("project/" + props.project.project_id, body)
    } else {
      toast.error("Need more information.")
    }
  }

  return (
    <div>
      <div className="edit-activity-modal">
        <div className="modal-wrapper">
          <div className="modal-content">
            <h2>Edit Project Name</h2>
            <div className="update-content">
              <div className="info-item">
                <div className="item-title">
                  <h3>Name:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="text"
                    placeholder="Name"
                    name="descBox"
                    value={projectName}
                    onChange={e => {
                      setProjectName(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="desc-item">
                <div className="item-title">
                  <h3>Description:</h3>
                </div>
                <div className="item-input">
                  <textarea
                    placeholder="Description"
                    onChange={e => {
                      setProjectDescription(e.target.value)
                    }}
                    value={projectDescription}
                  />
                </div>
              </div>
              <div className="info-item">
                <div className="item-title">
                  <h3>Start Date:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => {
                      setStartDate(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="info-item">
                <div className="item-title">
                  <h3>End Date:</h3>
                </div>
                <div className="item-input">
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => {
                      setEndDate(e.target.value)
                    }}
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
            <div className="btn-row">
              <input
                type="submit"
                className="update-btn"
                value="Update"
                onClick={() => {
                  updateClicked()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
