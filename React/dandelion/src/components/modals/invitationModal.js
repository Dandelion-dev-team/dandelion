import { navigate } from "gatsby"
import React, { useEffect, useState, Image } from "react"
import {readRecord, createRecord} from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container"
import {arrayRemove} from "../../utils/functions"

export default function InvitationModal(props) {
    const [schoolList, setSchoolList] = useState(undefined)
    const [search_value, changeSearch] = useState("")
    const [selectedSchools, setSelectedSchools] = useState([])

    // Column widths
    const col1 = 1
    let col2 = 12 - col1

    const formRef = React.createRef()

    useEffect(() => {
        if (verify_superuser_storage() == true) {
            readRecord("/school", setSchoolList)
        } else {
            navigate("/signin")
        }
    }, [])

    const handleCheckboxChange = e => {
        let clicked = parseInt(e.target.id)
        let buffer = []

        if (selectedSchools.includes(clicked)) {
            for (let i=0; i< selectedSchools.length; i++) {
                if (selectedSchools[i] != clicked) {
                     buffer.push(selectedSchools[i])
                }
            }
            setSelectedSchools(buffer)
        }
        else {
            setSelectedSchools([...selectedSchools, clicked])
        }
    }

    const toggle = () => {
        let visible = [...schoolList.data].filter(school =>
            school.name
              .toUpperCase()
              .includes(search_value.toUpperCase())
        )

        let select = false
        visible.forEach(school => {
            if (!selectedSchools.includes(parseInt(school.id))) {
                select = true
            }
        })

        let copy = [...selectedSchools]
        visible.forEach((school) => {
            let school_id = parseInt(school.id)

            if (!selectedSchools.includes(school_id) && select) {
                copy.push(school_id)
            }
            else if (selectedSchools.includes(school_id) && !select) {
                copy = arrayRemove(copy, school_id)
            }
        })
        setSelectedSchools(copy)
    }

    const afterSaveCallback = () => {
        props.setReload(!props.reload)
        props.setShow(false)
    }

    const save = e => {
        let body = JSON.stringify({
            project_id: props.project.id,
            schools: selectedSchools
        })

        createRecord("/project_partner/invitation", body, afterSaveCallback)
    }

    return (
        <Modal
            show={props.show}
            // show={true}
            dialogClassName="dandelion-modal"
            centered
            size="lg"
        >
            <Modal.Header closeButton onClick={() => props.setShow(false)}>
                <Modal.Title>
                        <h2>Invite schools</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="scrollable-modal">
                    <div className="scrollable-container">
                        <div className="scrollable-header">
                            <p>
                              Invite other schools to collaborate on <b>{props.project.title}</b> so you can share results and compare your observations.
                            </p>
                            <p>
                                Invited schools will not be able to create experiments or edit the activity information - they will only be able to copy any active experiments and upload their own data.
                            </p>
                            <p>
                                Please check that a school wants to collaborate before inviting them.
                            </p>

                            <Container>
                                <div className="row">
                                    <div className="col-1"></div>
                                <div className="col">
                                    <input
                                      type="text"
                                      className="search-box"
                                      placeholder="Search"
                                      value={search_value}
                                      onChange={e => changeSearch(e.target.value)}
                                    />
                                </div>
                                <div className="col">
                                    <Button className="dandelion-button" onClick={() => toggle()}>Toggle all visible</Button>
                                </div>
                                </div>
                            </Container>
                        </div>
                        <div className="scrollable-content school-list">
                            <div>
                              <Form
                                  noValidate
                                  ref={formRef}
                              >
                                {schoolList
                                    ? schoolList.data
                                      .filter(school =>
                                        school.name
                                          .toUpperCase()
                                          .includes(search_value.toUpperCase())
                                      )
                                      .map((school, idx) =>
                                        <Form.Group as={Row} className="mb-0">
                                          <Col sm={col1}>
                                            <Form.Check
                                                inline
                                                id={school.id}
                                                data-index={idx}
                                                size={"lg"}
                                                checked={selectedSchools.includes(parseInt(school.id))}
                                                onChange={handleCheckboxChange}
                                            />
                                          </Col>
                                          <Form.Label column sm={col2}>
                                                  {school.name}, {school.town}
                                          </Form.Label>
                                        </Form.Group>
                                      )
                                    : null
                                }
                              </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="dandelion-button-group">
                    <Button className="dandelion-button" onClick={() => {props.setShow(false)}}>Cancel</Button>
                    <Button className="dandelion-button" onClick={() => save()}>Save</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
