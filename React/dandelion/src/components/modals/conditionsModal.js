import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {updateRecord} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {equals} from '../../utils/functions'

export default function ConditionsModal(props) {
    const [experiment, setExperiment] = useState({})
    const [selectedConditions, setSelectedConditions] = useState([])
    const [originalConditions, setOriginalConditions] = useState([])

    const formRef = React.createRef()
    const restricted = !!props.experiment.parent_id

    // Column widths
    const col1 = 1
    let col2 = 12 - col1

    useEffect(() => {
        console.log(props.experiment)
        setExperiment(props.experiment)
        let selected = props.experiment.conditions.filter(condition => condition.status === 'active')
        console.log("selected: ", selected )
        let copy = []
        selected.forEach(activeCondition => {copy.push(activeCondition.id)})
        console.log("copy: ", copy)
        setSelectedConditions(copy)
        setOriginalConditions(copy)
    }, [props.experiment])

    const handleCheckboxChange = e => {
        let clicked = parseInt(e.target.id)
        let buffer = []

        if (selectedConditions.includes(clicked)) {
            for (let i=0; i< selectedConditions.length; i++) {
                if (selectedConditions[i] !== clicked) {
                     buffer.push(selectedConditions[i])
                }
            }
            setSelectedConditions(buffer)
        }
        else {
            setSelectedConditions([...selectedConditions, clicked])
        }
    }

  const afterSaveCallback = () => {
    props.setReload(!props.reload)
    props.setShow(false)
  }

    const save = e => {
        if (equals(selectedConditions.sort(), originalConditions.sort())) {
            console.log("Nothing to do")
            return
        }
        let body = JSON.stringify({'selected_conditions': selectedConditions})
        updateRecord("/experiment/" + experiment.id + "/conditions", body, afterSaveCallback)

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
                    <h2>Select conditions</h2>
            </Modal.Title>
        </Modal.Header>
        {props.experiment ?
            <Modal.Body>
                {props.experiment.conditions.length ?
                    <div className="scrollable-modal">
                        <div className="scrollable-container">
                            <div className="scrollable-header">
                                {props.experiment.parent_id ?
                                    <p>
                                        This is a shared experiment so you can't change these values
                                    </p>
                                    :
                                    <span>
                            <p>Choose the conditions to observe during this experiment</p>
                            <p>Choosing all of them (the default) is called a <b>full factorial</b> design</p>
                        </span>
                                }
                            </div>
                            <div className="scrollable-content">
                                <Form
                                    noValidate
                                    ref={formRef}
                                >
                                    {props.experiment.conditions.map((condition) => (
                                        <Form.Group as={Row} className="mb-3">
                                            <Col sm={col1}>
                                                <Form.Check
                                                    inline
                                                    id={condition.id}
                                                    size={"lg"}
                                                    disabled={restricted}
                                                    checked={selectedConditions.includes(parseInt(condition.id))}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </Col>
                                            <Form.Label column sm={col2}>
                                                <p>
                                                    <h4>{condition.code}</h4>: ({condition.description})
                                                </p>
                                            </Form.Label>
                                        </Form.Group>
                                    ))}
                                </Form>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="dandelion-hint">
                        There are no conditions yet. Please choose your treatment variables - the
                        conditions will be generated as a combination of their levels.
                    </div>
                }
            </Modal.Body>
            : null
        }
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => {props.setShow(false)}}>
                    {props.experiment.conditions.length ?
                        "Cancel" : "OK"
                    }
                </Button>
                {props.experiment.conditions.length ?
                    <Button className="dandelion-button" onClick={() => save()}>Save</Button>
                    : null
                }
            </div>
        </Modal.Footer>
    </Modal>
  )
}
