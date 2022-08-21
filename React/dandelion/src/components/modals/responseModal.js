import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {readRecord, updateRecord} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function ResponseModal(props) {
    const [experiment, setExperiment] = useState({})
    const [selectedVariables, setSelectedVariables] = useState({})
    const [availableVariables, setAvailableVariables] = useState(null)
    const [blank, setBlank] = useState(null)

    const formRef = React.createRef()
    const restricted = !!props.experiment.parent_id

    // Column widths
    const col1 = 1
    let col2 = 12 - col1

    useEffect(() => {
        setExperiment(props.experiment)
        setSelectedVariables(props.experiment.response_variables)
        readRecord("/variable/response", setAvailableVariables)
        readRecord("/response_variable/blank", setBlank)
        if (formRef.current) {
          formRef.current.reset()
        }
    }, [props.experiment])

    const getVariableIds = variableList => {
        let ids = []
        for (let i=0; i<variableList.length; i++) {
            ids.push(variableList[i].variable_id)
        }
        return ids
    }

    const handleCheckboxChange = e => {
        let clicked = parseInt(e.target.id)
        let buffer = []

        if (getVariableIds(selectedVariables).includes(clicked)) {
            selectedVariables.forEach((rv) => {
                if (rv.variable_id !== clicked) {
                     buffer.push(rv)
            }})
            setSelectedVariables(buffer)
        }
        else {
            let newResponseVariable = JSON.parse(JSON.stringify(blank.response_variable))
            newResponseVariable.variable_id = clicked
            newResponseVariable.experiment_id = props.experiment.id

            setSelectedVariables([...selectedVariables, newResponseVariable])
        }
    }

    const getMeasurementDay = rv => {
        if (rv.monday) return 'monday'
        if (rv.tuesday) return 'tuesday'
        if (rv.wednesday) return 'wednesday'
        if (rv.thursday) return 'thursday'
        if (rv.friday) return 'friday'
        if (rv.saturday) return 'saturday'
        if (rv.sunday) return 'sunday'
    }

    const setMeasurementDay = (rv, day) => {
        rv.monday = day === 'monday'
        rv.tuesday = day === 'tuesday'
        rv.wednesday = day === 'wednesday'
        rv.thursday = day === 'thursday'
        rv.friday = day === 'friday'
        rv.saturday = day === 'saturday'
        rv.sunday = day === 'sunday'

        return rv
    }

    const popVariable = (variableList, id) => {
        let copy = []
        let variable = undefined

        variableList.forEach((rv) => {
            if (rv.variable_id === parseInt(id)) {
                variable = rv
            }
            else {
                copy.push(rv)
            }
        })

        return {rest: copy, popped: variable}
    }

    const handleDayChange = e => {
        let extract = popVariable(selectedVariables, e.target.dataset.variable_id)
        setMeasurementDay(extract.popped, e.target.value)
        let copy = [...extract.rest, extract.popped]
        setSelectedVariables(copy)
    }

    const handleMilestoneChange = e => {
        let extract = popVariable(selectedVariables, e.target.dataset.variable_id)
        extract.popped.once = e.target.checked
        let copy = [...extract.rest, extract.popped]
        setSelectedVariables(copy)
    }

    const handleFinalChange = e => {
        let extract = popVariable(selectedVariables, e.target.dataset.variable_id)
        extract.popped.final = e.target.checked
        let copy = [...extract.rest, extract.popped]
        setSelectedVariables(copy)
    }

    const afterSaveCallback = () => {
        props.setReload(!props.reload)
    }

    const save = e => {
        let body = JSON.stringify(selectedVariables)
        updateRecord("/experiment/" + experiment.id + "/response", body, afterSaveCallback)

        props.setShow(false)
    }

    const showVariable = (variable) => {
        if (props.experiment.parent_id) {
            return getVariableIds(selectedVariables).includes(variable.id);
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
                <h2>Response variables</h2>
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
                                        This is a shared experiment so you can only change the measurement day
                                    </p>
                                    :
                                    <span>
                            <p>Choose the variables that you plan to measure in this experiment.</p>
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
                                                            checked={getVariableIds(selectedVariables).includes(parseInt(variable.id))}
                                                            disabled={restricted}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </Col>
                                                    <Form.Label column sm={col2}>
                                                        <h4>
                                                            {variable.name}
                                                            &nbsp;
                                                            {variable.unit ? <span>({variable.unit})</span> : null}
                                                        </h4>
                                                    </Form.Label>
                                                </Form.Group>
                                                {getVariableIds(selectedVariables).includes(parseInt(variable.id)) ?
                                                    <div className="variable-schedule">
                                                        <Form id={variable.id + "_schedule"}>
                                                            <Form.Group>
                                                                <Form.Label>Measurement day</Form.Label>
                                                                <Form.Select
                                                                    data-variable_id={variable.id}
                                                                    id={variable.id + "_day"}
                                                                    name="measurement_day"
                                                                    // value={extractMeasurementDay(selectedVariables, variable.id)}
                                                                    onChange={handleDayChange}
                                                                >
                                                                    <option value="">Select...</option>
                                                                    <option
                                                                        value="monday"
                                                                        selected={popVariable(selectedVariables, variable.id).popped.monday}
                                                                    >Monday
                                                                    </option>
                                                                    <option
                                                                        value="tuesday"
                                                                        selected={popVariable(selectedVariables, variable.id).popped.tuesday}
                                                                    >Tuesday
                                                                    </option>
                                                                    <option
                                                                        value="wednesday"
                                                                        selected={popVariable(selectedVariables, variable.id).popped.wednesday}
                                                                    >Wednesday
                                                                    </option>
                                                                    <option
                                                                        value="thursday"
                                                                        selected={popVariable(selectedVariables, variable.id).popped.thursday}
                                                                    >Thursday
                                                                    </option>
                                                                    <option
                                                                        value="friday"
                                                                        selected={popVariable(selectedVariables, variable.id).popped.friday}
                                                                    >Friday
                                                                    </option>
                                                                    <option
                                                                        value="saturday"
                                                                        selected={popVariable(selectedVariables, variable.id).popped.saturday}
                                                                    >Saturday
                                                                    </option>
                                                                    <option
                                                                        value="sunday"
                                                                        selected={popVariable(selectedVariables, variable.id).popped.sunday}
                                                                    >Sunday
                                                                    </option>
                                                                </Form.Select>
                                                            </Form.Group>

                                                            <Form.Group>
                                                                <Form.Check
                                                                    inline
                                                                    data-variable_id={variable.id}
                                                                    id={variable.id + "_once"}
                                                                    name="schedule"
                                                                    size={"lg"}
                                                                    checked={popVariable(selectedVariables, variable.id).popped.once}
                                                                    disabled={restricted}
                                                                    onChange={handleMilestoneChange}
                                                                />
                                                                <Form.Label column>
                                                                    Milestone
                                                                </Form.Label>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Check
                                                                    inline
                                                                    data-variable_id={variable.id}
                                                                    id={variable.id + "_final"}
                                                                    name="schedule"
                                                                    size={"lg"}
                                                                    checked={popVariable(selectedVariables, variable.id).popped.final}
                                                                    disabled={restricted}
                                                                    onChange={handleFinalChange}
                                                                />
                                                                <Form.Label column>
                                                                    Post-harvest
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Form>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        ))
                                        : null
                                    }
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"right-panel"}>

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
