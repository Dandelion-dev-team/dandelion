import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {readRecord, updateRecord} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {equals} from '../../utils/functions'

export default function TreatmentModal(props) {
    const [experiment, setExperiment] = useState({})
    const [selectedVariables, setSelectedVariables] = useState({})
    const [originalVariables, setOriginalVariables] = useState({})
    const [availableVariables, setAvailableVariables] = useState(null)

    const formRef = React.createRef()
    const restricted = !!props.experiment.parent_id

    // Column widths
    const col1 = 1
    let col2 = 12 - col1

    useEffect(() => {
        setExperiment(props.experiment)
        let initial_variables = []
        for (let i=0; i<props.experiment.treatment_variables.length; i++) {
            initial_variables.push(props.experiment.treatment_variables[i].variable_id)
        }
        setSelectedVariables(initial_variables)
        setOriginalVariables(initial_variables)
        readRecord("/variable/treatment", setAvailableVariables)
        if (formRef.current) {
          formRef.current.reset()
        }
    }, [props.experiment])

    const handleCheckboxChange = e => {
        let clicked = parseInt(e.target.id)
        let buffer = []

        if (selectedVariables.includes(clicked)) {
            for (let i=0; i< selectedVariables.length; i++) {
                if (selectedVariables[i] !== clicked) {
                     buffer.push(selectedVariables[i])
                }
            }
            setSelectedVariables(buffer)
        }
        else {
            setSelectedVariables([...selectedVariables, clicked])
        }
    }

    const afterSaveCallback = () => {
        props.setReload(!props.reload)
    }

    const save = e => {
        if (equals(selectedVariables.sort(), originalVariables.sort())) {
            console.log("Nothing to do")
            return
        }

        let variable_ids = []
        Array.prototype.forEach.call(formRef.current, (element) => {
            if (element.checked) {
            variable_ids.push(element.id)
            }
        })

        let body = JSON.stringify({'variables': variable_ids})
        updateRecord("/experiment/" + experiment.id + "/treatment", body, afterSaveCallback)

        props.setShow(false)
    }

    const showVariable = (variable) => {
        if (props.experiment.parent_id) {
            return selectedVariables.includes(variable.id);
        }
        return true
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
                    <h2>Treatment variables</h2>
            </Modal.Title>
        </Modal.Header>
        {props.experiment ?
            <Modal.Body>
                <div className={"left-panel"}>
                    <div className="scrollable-modal">
                        <div className="scrollable-container">
                            <div className="scrollable-header">
                                {props.experiment.parent_id ?
                                    <p>
                                        This is a shared experiment so you can't change these values
                                    </p>
                                    :
                                    <span>
                            <p>Choose the variables that you want to test in this experiment.</p>
                            <p>Need to create a new variable? Use the option in the left-hand menu, then come back to this page afterwards.</p>
                        </span>
                                }
                            </div>
                            <div className="scrollable-content">
                                <Form
                                    noValidate
                                    ref={formRef}
                                >
                                    {availableVariables
                                        ? availableVariables.data.filter(variable => showVariable(variable)).map((variable) => (
                                            <div>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Col sm={col1}>
                                                        <Form.Check
                                                            inline
                                                            id={variable.id}
                                                            size={"lg"}
                                                            checked={selectedVariables.includes(parseInt(variable.id))}
                                                            disabled={restricted}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </Col>
                                                    <Form.Label column sm={col2}>
                                                        <h4>{variable.name}</h4>
                                                        <p>(
                                                            {variable.levels.map((level, index) => (
                                                                <span>{index > 0 ? ", " : null}{level.name}</span>
                                                            ))}
                                                            )</p>
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
