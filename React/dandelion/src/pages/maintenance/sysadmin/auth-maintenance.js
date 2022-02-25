import React, { useEffect, useState, useRef } from "react"
import Header from "../../../components/header"
import SysSideNav from "../../../components/sysSideNav"
import "../../../styles/App.scss"
import AuthComponent from "../../../components/authComponent"

export default function AuthMaintenance(props) {
  const selectInputRef = useRef()
  const [authList, setauths] = useState(0)
  const [auth_name, setAuthName] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [is_active, setActive] = useState("")
  const [editing, setEditing] = useState("")
  const [editing_auth, setEditingAuth] = useState("")

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/authority", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setauths(Array.from(data)))
  }, [])

  const handleAuthChange = e => {
    setAuthName(e.target.value)
  }
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  const handleTelephoneChange = e => {
    setTelephone(e.target.value)
  }

  const onChangeIsActive = e => {
    setActive(!is_active)
  }

  const handleCallback = childData => {
    setEditingAuth(childData)
    setAuthName(childData.name)
    setTelephone(childData.telephone)
    setEmail(childData.email)
    if (childData.status == "active") {
      setActive(true)
    } else {
      setActive(false)
    }
    setEditing(true)
  }

  const onCreateAuth = e => {
    if (auth_name && telephone && email) {
      fetch("http://localhost:3000/authority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1234,
          name: auth_name,
          telephone: telephone,
          email: email,
        }),
      })
        .then(console.log("PUT new user"))
        .then(window.location.reload(false))
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateAuth = e => {
    setAuthName("")
    setTelephone("")
    setEmail("")
    setEditing(false)

    fetch("http://localhost:3000/authority/" + editing_auth.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing_auth.id,
        name: auth_name,
        telephone: telephone,
        email: email,
      }),
    })
      .then(console.log("EDITED user:" + editing_auth.username))
      .then(window.location.reload(false))
  }

  const onCancelAuth = e => {
    setAuthName("")
    setTelephone("")
    setEmail("")
    setEditing(false)
  }

  return (
    <div>
      <SysSideNav />
      <div className="auth-maintenance-container">
        <div className="auth-content">
          <div className="content-wrapper">
            <div className="table">
              <AuthComponent parentCallback={handleCallback} />
            </div>
            <div className="create-panel">
              <div className="authorityPicker">
                <h3>Local Authority: </h3>
                <input
                  type="text"
                  placeholder="Local Authority"
                  name="authNameBox"
                  value={auth_name}
                  onChange={handleAuthChange}
                />
              </div>

              <div className="nameBox">
              <h3>Telephone:</h3>
              <input
                type="text"
                placeholder="Tel. No"
                name="telephoneBox"
                value={telephone}
                onChange={handleTelephoneChange}
              />
            </div>

            <div className="nameBox">
              <h3>Email:</h3>
              <input
                type="text"
                placeholder="Email Address"
                name="password"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {editing ? (
              <div className="btn-row">
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Update"
                      onClick={onUpdateAuth}
                    ></input>
                  </div>
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Cancel"
                      onClick={onCancelAuth}
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

