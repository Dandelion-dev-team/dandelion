import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import "../../styles/App.scss"
import AuthComponent from "../../components/tables/authComponent"
import { createRecord, readRecord, updateRecord } from "../../utils/CRUD"
import { user_logout, verify_sysadmin_storage } from "../../utils/logins"
import { navigate } from "gatsby"

export default function AuthMaintenance(props) {
  const selectInputRef = useRef()
  const [logged, setLogged] = useState("");
  const [authList, setAuths] = useState(0)
  const [auth_name, setAuthName] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [is_active, setActive] = useState("")
  const [editing, setEditing] = useState("")
  const [editing_auth, setEditingAuth] = useState("")

  useEffect(() => {
    if(verify_sysadmin_storage() == true){
      setLogged(true);
      readRecord("/authority", setAuths)
    }else{
      navigate("/signin");
    }
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
      let body = JSON.stringify({name: auth_name, telephone: telephone, email: email })
      createRecord("/authority", body);
    } else {
      console.log("did not have all information")
    }
  }

  const onUpdateAuth = e => {
    if (auth_name && telephone && email) {
      setAuthName("")
      setTelephone("")
      setEmail("")
      setEditing(false)

      let body = JSON.stringify({id: editing_auth.id,name: auth_name, telephone: telephone,email: email})
      updateRecord("/authority/" + editing_auth.id, body);
    }else 
    {
      console.log("did not have all the information")
    }
  }

  const onCancelAuth = e => {
    setAuthName("")
    setTelephone("")
    setEmail("")
    setEditing(false)
  }

  if(logged){
    return (
      <div>
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
    </div>
    )
  } else return null;
}

