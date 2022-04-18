import React, { useEffect, useState, useRef } from "react"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import "../../styles/App.scss"
import Select from "react-select"
import UserComponent from "../../components/tables/superuserComponent"
import { createRecord, readRecord, updateRecord } from "../../utils/CRUD"
import { navigate } from "gatsby"
import { verify_sysadmin_storage } from "../../utils/logins"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SuperuserMaintenance(props) {
  const selectInputRef = useRef()
  const [schoolList, setSchools] = useState(0)
  const [school_selected, setDropdown] = useState(0)
  const [entered_username, setName] = useState("")
  const [password, setPassword] = useState("")
  const [editing, setEditing] = useState("")
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState("")
  const [sys_admin_checkbox, setAdminCheckbox] = useState(false)
  const [superuser_checkbox, setSuperuserCheckbox] = useState(true)
  const [school_name, setSchoolName] = useState("")
  const [is_active, setActive] = useState("")
  const [editing_user, setEditingUser] = useState("")
  const [logged, setLogged] = useState("");

  useEffect(() => {
    if (verify_sysadmin_storage() == true) {
      setLogged(true);
      readRecord("/school", setSchools);
    } else {
      navigate("/signin");
    }
  }, [])

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  const handleNotesChange = e => {
    setNotes(e.target.value)
  }

  const handleCallback = childData => {
    setEditingUser(childData)
    setSchoolName(childData.school_id)
    setAdminCheckbox(childData.is_sysadmin)
    setSuperuserCheckbox(childData.is_superuser)
    setStatus(childData.status)
    setName(childData.username)
    setNotes(childData.notes)
    setPassword("")
    if (childData.status == "active") {
      setActive(true)
    } else {
      setActive(false)
    }
    setEditing(true)
  }

  const onCreateUser = e => {
    if (school_selected && entered_username && password) {
      let body = JSON.stringify({
        school_id: school_selected.id,
        username: entered_username,
        password: password,
        is_sysadmin: false,
        is_superuser: true,
        status: "active",
        notes: " ",
      })
      createRecord("/user", body);
    } else {
      toast.error("More information needed.")
    }
  }

  const onChangeIsActive = e => {
    setActive(!is_active)
  }

  const onChangeIsSysAdmin = e => {
    setAdminCheckbox(!sys_admin_checkbox)
  }

  const onChangeIsSuperuser = e => {
    setSuperuserCheckbox(!superuser_checkbox)
  }

  const onUpdateUser = e => {
    setName("")
    setPassword("")
    setEditing(false)

    let password_edited = editing_user.password
    if (password !== "") {
      password_edited = password
    }
    let is_active_val = ""
    if (is_active == true) {
      is_active_val = "active"
    } else {
      is_active_val = "deactivated"
    }

    let body = JSON.stringify({
      id: editing_user.id,
      school_id: editing_user.school_id,
      username: entered_username,
      password: password_edited,
      is_sysadmin: sys_admin_checkbox,
      is_superuser: superuser_checkbox,
      status: is_active_val,
      notes: notes,
    });

    updateRecord("/user/" + editing_user.id, body);
  }

  return (
    <div>
      <SysSideNav />
      <div className="superuser-maintenance-container">
        <div className="superuser-content">
          <div className="content-wrapper">
            <div className="table">
              <UserComponent parentCallback={handleCallback} />
            </div>
            <div className="edit-superuser">
              <div className="authorityPicker">
                <h3>School Name: </h3>
                {editing ? (
                  <h3>{school_name}</h3>
                ) : (
                  <Select
                    name="authority_id_picker"
                    className="authority_id_picker"
                    ref={selectInputRef}
                    options={schoolList.data}
                    value={school_selected}
                    defaultValue={school_selected}
                    onChange={setDropdown}
                    getOptionLabel={schoolList => schoolList.name}
                    getOptionValue={schoolList => schoolList.id} // It should be unique value in the options. E.g. ID
                  />
                )}
              </div>
              <div className="textbox">
                <h3>Username:</h3>
                <input
                  type="text"
                  placeholder="Username"
                  name="usernameBox"
                  value={entered_username}
                  onChange={handleNameChange}
                />
              </div>
              <div className="textbox">
                <h3>New password:</h3>
                <input
                  type="text"
                  placeholder="If required"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {editing ? (
                //IF EDITING
                <div className="textbox">
                  <div className="checkboxDiv">
                    <h3>Is Sysadmin:</h3>
                    <div className="checkboxPadding">
                      <input
                        type="checkbox"
                        id="experiment_id"
                        name="topping"
                        checked={sys_admin_checkbox}
                        onChange={onChangeIsSysAdmin}
                      />
                    </div>
                  </div>

                  <div className="textbox">
                    <h3>Is SuperUser:</h3>
                    <div className="checkboxPadding">
                      <input
                        type="checkbox"
                        id="experiment_id"
                        name="topping"
                        checked={superuser_checkbox}
                        onChange={onChangeIsSuperuser}
                      />
                    </div>
                  </div>
                  <div className="textbox">
                    <h3>Is active:</h3>
                    <div className="checkboxPadding">
                      <input
                        type="checkbox"
                        id="experiment_id"
                        name="topping"
                        checked={is_active}
                        onChange={onChangeIsActive}
                      />
                    </div>
                  </div>
                  <h3>Notes:</h3>
                  <input
                    type="text"
                    placeholder="Notes"
                    name="usernameBox"
                    value={notes}
                    onChange={handleNotesChange}
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
                      onClick={onUpdateUser}
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
                    onClick={onCreateUser}
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
