import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import NodeInfoComponent from "../../components/cards/nodeInfoCard"
import {
  readRecord,
  updateRecord,
  uploadImage,
  readAdminRecord,
} from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import { navigate } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EditIcon from "@mui/icons-material/Edit"
import RegisterNodeModal from "../../components/modals/registerNodeModal"
import Header from "../../components/navigation/header";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

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
  const [authority, setAuthority] = useState()

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      let school_id = localStorage.getItem("school_id")
      readAdminRecord("/school/" + school_id).then(response => {
        setSchool(response)
        console.log(response)
        readRecord("/authority/" + response.school.authority_id, setAuthority)
      })
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
    uploadImage(
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
      <div className="dandelion">
        <Header />
        <div className="page-container">
          <SideNav />
          <ToastContainer />
          <div className="main-content">
            <div className="content-area">
                <div className="left-panel">
                  {showRegisterModal ? <RegisterNodeModal /> : null}
                  <div className="panel-body scrollable-container">
                    <div className="scrollable-header">
                      <h2>Your school</h2>
                    </div>
                    <div className="scrollable-content">
                      <div className="scrollable-inner">
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
                            <div className="btn-container">
                              <input
                                type="submit"
                                className="dandelion-button"
                                value="Cancel"
                                onClick={() => {
                                  setEditing(false)
                                }}
                              ></input>
                              <input
                                type="submit"
                                className="dandelion-button"
                                value="Update"
                                onClick={() => {
                                  updateClicked()
                                }}
                              ></input>
                            </div>
                          </div>
                        ) : (
                        fetchedSchool && authority ? (
                          <Container fluid="sm">
                                <Row>
                                  <Col sm={3}><h4>Name:</h4></Col>
                                  <Col><p>{fetchedSchool.school.name}</p></Col>
                                </Row>
                                <Row>
                                  <Col sm={3}><h4>Authority:</h4></Col>
                                  <Col><p>{authority.Authority.name}</p></Col>
                                </Row>
                                <Row>
                                  <Col sm={3}><h4>Address 1:</h4></Col>
                                  <Col><p>{fetchedSchool.school.address_line_1}</p></Col>
                                </Row>
                                <Row>
                                  <Col sm={3}><h4>Address 2:</h4></Col>
                                  <Col><p>{fetchedSchool.school.address_line_2}</p></Col>
                                </Row>
                                <Row>
                                  <Col sm={3}><h4>Town:</h4></Col>
                                  <Col><p>{fetchedSchool.school.town}</p></Col>
                                </Row>
                                <Row>
                                  <Col sm={3}><h4>Email:</h4></Col>
                                  <Col><p>{fetchedSchool.school.email}</p></Col>
                                </Row>
                                <Row>
                                  <Col sm={3}><h4>Phone:</h4></Col>
                                  <Col><p>{fetchedSchool.school.telephone}</p></Col>
                                </Row>

                            <div className="btn-container">
                              <input
                                type="submit"
                                className="dandelion-button"
                                value="Edit"
                                onClick={() => {
                                  editClicked()
                                }}
                              ></input>
                            </div>
                          </Container>
                          ) : null
                        )}
                        <h4>Image:</h4>
                        <div className="dandelion-image">
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right-panel">
                  <div className="pane-container">
                    <div className="pane-content">
                        <div className="node-settings">
                          <h2>Node</h2>
                          {school_node ? (
                            school_node.Node !== null ? (
                              <p>Node Registered</p>
                            ) : (
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
                            )
                          ) : null}
                        </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
