import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {readRecord, updateRecord} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {equals} from '../../utils/functions'

export default function ParticipantsModal(props) {
    const [experiment, setExperiment] = useState({})
    const [availableUsers, setAvailableUsers] = useState(null)
    const [selectedUsers, setSelectedUsers] = useState({})
    const [originalUsers, setOriginalUsers] = useState({})

    const formRef = React.createRef()

    // Column widths
    const col1 = 1
    let col2 = 12 - col1

    useEffect(() => {
        setExperiment(props.experiment)
        setSelectedUsers(props.experiment.participants)
        setOriginalUsers(props.experiment.participants)
        let school_id = localStorage.getItem("school_id")
        readRecord(
          "/user/byschoolandexperiment/" +
            school_id +
            "/" +
            props.experiment.id,
          setAvailableUsers
        )
        if (formRef.current) {
          formRef.current.reset()
        }
    }, [props.experiment])

    const handleCheckboxChange = e => {
        let clicked = parseInt(e.target.id)
        let buffer = []

        if (selectedUsers.includes(clicked)) {
            for (let i=0; i< selectedUsers.length; i++) {
                if (selectedUsers[i] !== clicked) {
                     buffer.push(selectedUsers[i])
                }
            }
            setSelectedUsers(buffer)
        }
        else {
            setSelectedUsers([...selectedUsers, clicked])
        }
    }

    const save = e => {
        if (equals(selectedUsers.sort(), originalUsers.sort())) {
            console.log("Nothing to do")
            return
        }

        let user_ids = []
        Array.prototype.forEach.call(formRef.current, (element) => {
            if (element.checked) {
            user_ids.push(element.id)
            }
        })

        let body = JSON.stringify({'selected_users': user_ids})
        updateRecord("/experiment/" + experiment.id + "/participants", body)

        props.setShow(false)
    }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
        size="lg"
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title>
                    <h2>Participants</h2>
            </Modal.Title>
        </Modal.Header>
        {props.experiment ?
            <Modal.Body>
                <div className={"left-panel"}>
                    <div className="scrollable-modal">
                        <div className="scrollable-container">
                            <div className="scrollable-header">
                                <p>Choose the people participating in this experiment.</p>
                                <p>This allows them to record observations</p>
                            </div>
                            <div className="scrollable-content">
                                <Form
                                    noValidate
                                    ref={formRef}
                                >
                                    {availableUsers
                                        ? availableUsers.data.map((user) => (
                                            <div>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Col sm={col1}>
                                                        <Form.Check
                                                            inline
                                                            id={user.id}
                                                            size={"lg"}
                                                            checked={selectedUsers.includes(parseInt(user.id))}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </Col>
                                                    <Form.Label column sm={col2}>
                                                        <h4>{user.username}</h4>
                                                    </Form.Label>
                                                </Form.Group>
                                            </div>

                                        ))
                                        : null
                                    }

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            : null
        }
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => {props.setShow(false)}}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => save()}>Save</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
