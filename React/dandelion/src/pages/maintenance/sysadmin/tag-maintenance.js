import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../../components/sysSideNav"
import "../../../styles/App.scss"
import TagComponent from "../../../components/tagComponent"
import { createRecord, readRecord, updateRecord } from "../../../utils/CRUD"

export default function TagMaintenance(props) {
  const selectInputRef = useRef()
  const [tagList, setTags] = useState(0)
  const [tagLabel, setTagLabel] = useState("")
  const [tagStatus, setTagStatus] = useState("")
  const [is_active, setActive] = useState("")
  const [editing, setEditing] = useState("")
  const [editing_tag, setEditingTag] = useState("")

  useEffect(() => {
    // Update the document title using the browser API
    readRecord("/tagreference", setTags);
  }, [])

  const handleTagChange = e => {
    setTagLabel(e.target.value)
  }

  const handleTagStatus = e => {
    setTagStatus(e.target.value)
  }

  const handleCallback = childData => {
    setEditingTag(childData)
    setTagLabel(childData.label)
    setTagStatus(childData.status)
    if (childData.status == "active") {
      setActive(true)
    } else {
      setActive(false)
    }
    setEditing(true)
  }

  const onCreateTag = e => {
    if (tagLabel && tagStatus) {
      let body = JSON.stringify({
        label: tagLabel,
        status: tagStatus,
      });

      createRecord("/tagreference", body)
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateTag = e => {
    setTagLabel("")
    setTagStatus("")
    setEditing(false)

    if (tagLabel && tagStatus) {
      let body = JSON.stringify({
        id: editing_tag.id,
        label: tagLabel,
        status: tagStatus,
      });
      updateRecord("/tagreference/" + editing_tag.id, body)
    }
  }

  return (
    <div>
      <SysSideNav />
      <div className="tag-maintenance-container">
        <div className="tag-content">
          <div className="content-wrapper">
            <div className="table">
              <TagComponent parentCallback={handleCallback} />
            </div>
            <div className="edit-tag">
              <div>
                <h3>Tag Label: </h3>
                <input
                  type="text"
                  placeholder="Label"
                  name="labelBox"
                  value={tagLabel}
                  onChange={handleTagChange}
                />
              </div>

              <div className="textbox">
                <h3>Status:</h3>
                <input
                  type="text"
                  placeholder="Status"
                  name="statusBox"
                  value={tagStatus}
                  onChange={handleTagStatus}
                />
              </div>

              {editing ? (
                //IF EDITING
                <div className="nameBox">
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Update"
                      onClick={onUpdateTag}
                    ></input>
                  </div>
                </div>
              ) : (
                //IF NOT EDITING
                <div className="submit-btn">
                  <input
                    type="submit"
                    className="submitButton"
                    value="Create"
                    onClick={onCreateTag}
                  ></input>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
