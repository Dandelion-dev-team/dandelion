import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../../components/sysSideNav"
import "../../../styles/App.scss"
import TagComponent from "../../../components/TagComponent"

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
    fetch("http://localhost:3000/tags", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setTags(Array.from(data)))
  }, [])

  const handleTagChange = e => {
    setTagLabel(e.target.value)
  }

  const handleTagStatus = e => {
    setTagStatus(e.target.value)
  }

  const handleCallback = childData => {
    setEditingTag(childData)
    setTagLabel(childData.tagLabel)
    setTagStatus(childData.tagStatus)
    if (childData.status == "active") {
      setActive(true)
    } else {
      setActive(false)
    }
    setEditing(true)
  }

  const onCreateAuth = e => {
    if (tagLabel && tagStatus) {
      fetch("http://localhost:3000/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1234,
          label: tagLabel,
          status: tagStatus,
        }),
      })
        .then(console.log("PUT new user"))
        .then(window.location.reload(false))
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateAuth = e => {
    setTagLabel("")
    setTagStatus("")
    setEditing(false)

    // fetch("http://localhost:3000/authorities/" + editing_auth.id, {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       id: editing_user.id,
    //       name: nauth
    //       school_id: school_selected.school_id,
    //       username: entered_username,
    //       password_hash: password_edited,
    //       is_sysadmin: sys_admin_checkbox,
    //       is_superuser: superuser_checkbox,
    //       status: is_active_val,
    //       notes: notes,
    //     }),
    //   })
    //     .then(console.log("EDITED user:" + editing_user.username))
    //     .then(window.location.reload(false))
    // }
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
            <div className="edit-quantity">
              <div className="authorityPicker">
                <h3>Tag Label: </h3>
                {editing ? (
                  <h3>{tagLabel}</h3>
                ) : (
                  <input
                    type="text"
                    placeholder="Label"
                    name="authNameBox"
                    value={tagLabel}
                    onChange={handleTagChange}
                  />
                )}
              </div>

              <div className="nameBox">
                <h3>Status:</h3>
                <input
                  type="text"
                  placeholder="Status"
                  name="telephoneBox"
                  value={tagStatus}
                  onChange={handleTagStatus}
                />
              </div>

              {editing ? (
                //IF EDITING
                <div className="nameBox">
                  <h3>Label:</h3>
                  <input
                    type="text"
                    placeholder="Notes"
                    name="usernameBox"
                    value={tagLabel}
                    onChange={handleTagChange}
                    style={{
                      width: "300px",
                      height: "50px",
                      lineHeight: "10px",
                    }}
                  />
                  <h3>Status:</h3>
                  <input
                    type="text"
                    placeholder="Notes"
                    name="usernameBox"
                    value={tagStatus}
                    onChange={handleTagStatus}
                    style={{
                      width: "300px",
                      height: "50px",
                      lineHeight: "10px",
                    }}
                  />

                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Update"
                      onClick={onUpdateAuth}
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
                    onClick={onCreateAuth}
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