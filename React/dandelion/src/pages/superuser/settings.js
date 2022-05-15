import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import NodeInfoComponent from "../../components/cards/nodeInfoCard"
import {
  readRecord,
  updateRecord,
  uploadExperimentImage,
} from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import { navigate } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EditIcon from "@mui/icons-material/Edit"
import RegisterNodeModal from "../../components/modals/registerNodeModal"

export default function SuperuserSettings() {
  const [fetchedSchool, setSchool] = useState("")
  const [logged, setLogged] = useState("")
  const [editing, setEditing] = useState(false)
  const [schoolName, setSchoolName] = useState("")
  const [schoolAddress, setSchoolAddress] = useState("")
  const [schoolTown, setSchoolTown] = useState("")
  const [schoolEmail, setSchoolEmail] = useState("")
  const [schoolPhone, setSchoolPhone] = useState("")

  const [showRegisterModal, setRegisterModal] = useState(false)
  const [school_node, setSchoolNode] = useState()

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      let school_id = localStorage.getItem("school_id")
      readRecord("/school/" + school_id, setSchool)
      readRecord("/node/byschool/" + school_id, setSchoolNode)
      setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  const editClicked = e => {
    setSchoolName(fetchedSchool.school.name)
    setSchoolAddress(fetchedSchool.school.address_line_1)
    setSchoolTown(fetchedSchool.school.town)
    setSchoolEmail(fetchedSchool.school.email)
    setSchoolPhone(fetchedSchool.school.telephone)
    setEditing(true)
  }

  const handleImageChange = async e => {
    uploadExperimentImage(
      "/school/" + fetchedSchool.school.school_id + "/uploadImage",
      e.target.files[0]
    ).then(window.location.reload(false))
  }

  const updateClicked = e => {
    if (
      schoolName &&
      schoolAddress &&
      schoolTown &&
      schoolEmail &&
      schoolPhone
    ) {
      console.log(fetchedSchool.school)
      let body = JSON.stringify({
        id: fetchedSchool.school.school_id,
        authority_id: fetchedSchool.school.authority_id,
        name: schoolName,
        address_line_1: schoolAddress,
        address_line_2: fetchedSchool.school.address_line_2,
        town: schoolTown,
        school_image_link: null,
        postcode: fetchedSchool.school.postcode,
        latitude: fetchedSchool.school.latitude,
        longitude: fetchedSchool.school.longitude,
        telephone: schoolPhone,
        email: schoolEmail,
        status: "active",
      })
      updateRecord("/school/" + fetchedSchool.school.school_id, body)
    } else {
      toast.error("Need more information.")
    }
  }

  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        <SideNav />
        {showRegisterModal ? <RegisterNodeModal /> : null}
        <div className="settings-container">
          <ToastContainer />
          <div className="title">
            {fetchedSchool ? <h3>{fetchedSchool.school.name}</h3> : null}
          </div>
          <div className="content">
            <div className="settings-pane">
              <div className="school-image">
                {fetchedSchool ? (
                  <img src={fetchedSchool.school.image_full} />
                ) : null}
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
              <div className="spacer" />
              <div className="node-settings">
                <h3>Node Settings</h3>
                {school_node ? school_node.Node !== null ? <h3>Node Registered</h3> : (
                  <div className="btn-row">
                    <input
                      type="submit"
                      className="update-btn"
                      value="Register a Node"
                      onClick={() => {
                        setRegisterModal(true)
                      }}
                    />
                  </div>
                ) : null}

              </div>
            </div>
            <div className="details-pane">
              {editing ? (
                <div className="details">
                  {fetchedSchool ? (
                    <h3>Authority ID: {fetchedSchool.school.authority_id}</h3>
                  ) : null}
                  <input
                    className="item-input"
                    type="text"
                    value={schoolName}
                    placeholder="School Name"
                    name="usernameBox"
                    onChange={e => {
                      setSchoolName(e.target.value)
                    }}
                  />
                  <input
                    className="item-input"
                    type="text"
                    value={schoolAddress}
                    placeholder="School Address"
                    name="usernameBox"
                    onChange={e => {
                      setSchoolAddress(e.target.value)
                    }}
                  />
                  <input
                    className="item-input"
                    type="text"
                    value={schoolTown}
                    placeholder="Town"
                    name="usernameBox"
                    onChange={e => {
                      setSchoolTown(e.target.value)
                    }}
                  />
                  <input
                    className="item-input"
                    type="text"
                    value={schoolEmail}
                    placeholder="School Email"
                    name="usernameBox"
                    onChange={e => {
                      setSchoolEmail(e.target.value)
                    }}
                  />
                  <input
                    className="item-input"
                    type="text"
                    value={schoolPhone}
                    placeholder="School Phone"
                    name="usernameBox"
                    onChange={e => {
                      setSchoolPhone(e.target.value)
                    }}
                  />
                  <div className="btn-update-delete">
                    <input
                      type="submit"
                      className="update-button"
                      value="Cancel"
                      onClick={() => {
                        setEditing(false)
                      }}
                    ></input>
                    <input
                      type="submit"
                      className="update-button"
                      value="Update"
                      onClick={() => {
                        updateClicked()
                      }}
                    ></input>
                  </div>
                </div>
              ) : (
                <div className="details">
                
                  {fetchedSchool ? (
                    <h3>Name: {fetchedSchool.school.name}</h3>
                  ) : null}
                  {fetchedSchool ? (
                    <h3>Address: {fetchedSchool.school.address_line_1}</h3>
                  ) : null}
                  {fetchedSchool ? (
                    <h3>Town: {fetchedSchool.school.town}</h3>
                  ) : null}
                  {fetchedSchool ? (
                    <h3>Email: {fetchedSchool.school.email}</h3>
                  ) : null}
                  {fetchedSchool ? (
                    <h3>Phone: {fetchedSchool.school.telephone}</h3>
                  ) : null}

                  <div className="btn-update-delete">
                    <input
                      type="submit"
                      className="update-button"
                      value="Edit"
                      onClick={() => {
                        editClicked()
                      }}
                    ></input>
                  </div>
                </div>
              )}
            </div>
            <div className="spacer" />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
