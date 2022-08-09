import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {createRecord, updateRecord, uploadImage} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function VariableModal(props) {
  const [variable, setVariable] = useState({})
  const [selectedQuantity, setSelectedQuantity] = useState({})
  const [levels, setLevels] = useState(["", ""])

  const [variableType, setVariableType] = useState("continuous")
  const [levelCount, setLevelCount] = useState(2)
  const [validated, setValidated] = useState(false);
  const [dirty, setDirty] = useState(false)

  const formRef = React.createRef()

  // Column widths
  const col1 = 3
  var col2 = 12 - col1

  const makeOption = data => {
    return (
        <option value={data.id}>{data.name}</option>
    )
  }

  useEffect(() => {
    setVariable(props.variable)
    setSelectedQuantity(null)
    if (props.variable.id) {
      setSelectedQuantity(props.variable.quantity_id.toString())
    }
    setVariableType("continuous")
    if (props.variable.levels) {
      if (props.variable.levels.length > 0) {
        setVariableType("discrete")
        setLevelCount(props.variable.levels.length)
        let newLevels = []
        for (let level = 0; level < props.variable.levels.length; level++) {
          newLevels[level] = props.variable.levels[level].name
        }
        setLevels(newLevels)
        setVariableType("discrete")
      }
    }
    setValidated(false)
    setDirty(false)
    if (formRef.current) {
      formRef.current.reset()
    }
  }, [props.variable])

  const handleNameChange = e => {setDirty(true); setVariable({...variable, name: e.target.value})}
  const handleQuantityChange = e => {setDirty(true); setVariable({...variable, quantity_id: e.target.value})}
  const handleSensorQuantityChange = e => {setDirty(true); setVariable({...variable, is_sensor_quantity: e.target.checked})}
  const handleTreatmentChange = e => {setDirty(true); setVariable({...variable, is_treatment: e.target.checked})}
  const handleResponseChange = e => {setDirty(true); setVariable({...variable, is_response: e.target.checked})}
  const handleProcedureChange = e => {setDirty(true); setVariable({...variable, procedure: e.target.value})}
  const handleStatusChange = e => {setDirty(true); setVariable({...variable, status: e.target.value})}
  const handleLevelChange = e => {
    let newLevels = [...levels]
    newLevels[e.target.index] = e.target.value
    setLevels(newLevels)
  }

  const handleVariableTypeChange = e => {setVariableType(e.target.id)}
  const handleLevelCountChange = e => {
    resizeLevels(e.target.value)
  }

  const resizeLevels = (size) => {
    setLevelCount(size)
    if (size > levels.length) {
      for (let level = levels.length; level < size; level++) {
        levels[level] = ""
      }
    }
    if (size < levels.length) {
      let newLevels = []
      for (let level = 0; level < size; level++) {
        newLevels[level] = levels[level]
      }
      setLevels(newLevels)
    }
  }


  const updateId = data => {
    setVariable({...variable, id: data.id})

    console.log(variable)
    console.log(variableType)

    if (variableType === "discrete") {
      for (let level = 0; level < levelCount; level++) {
        console.log("Creating level ", level)
        let body = JSON.stringify({
          variable_id: data.id,
          name: levels[level],
          sequence: level + 1,
          description: "",
          procedure: ""
        })
        console.log(body)
        createRecord("/level", body)
      }
    }
  }

  const clearForm = e => {
    props.setShow(false)
    setVariable(null)
    formRef.current.reset()
    setLevels(["", ""])
    setLevelCount(2)
    setValidated(false)
    setDirty(false)
  }

  const save = e => {
    console.log(formRef.current)
    if (formRef.current.checkValidity())
    {
      let body = JSON.stringify(variable)

      if (variable.id) {
        if (dirty) {
          updateRecord("/variable/" + variable.id, body)
        }
      } else {
        createRecord("/variable", body, updateId)
      }
      clearForm()
    }
    setValidated(true)
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
        size="lg"
    >
        <Modal.Header closeButton onClick={() => clearForm()}>
            <Modal.Title><h2>Variable details</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scrollable-modal">
            <div className="scrollable-container">
                <div className="scrollable-content">
                  {variable ?
                      <Form
                          noValidate
                          ref={formRef}
                          validated={validated}
                      >
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Name</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                type="text"
                                size={"lg"}
                                value={variable.name}
                                required
                                onChange={handleNameChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the variable's name
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Variable type</Form.Label>
                          <Col sm={col2}>
                            <Form.Check
                                inline
                                size={"lg"}
                                label="Continuous"
                                name="variableType"
                                checked={variableType == "continuous"}
                                type={"radio"}
                                id={"continuous"}
                                onChange={handleVariableTypeChange}
                            />
                            <Form.Check
                                inline
                                size={"lg"}
                                label="Discrete"
                                name="variableType"
                                checked={variableType == "discrete"}
                                type={"radio"}
                                id={"discrete"}
                                onChange={handleVariableTypeChange}
                            />
                          </Col>
                        </Form.Group>
                        {variableType === "continuous" ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Quantity (optional)</Form.Label>
                              <Col sm={9}>
                                <Form.Select
                                    size={"lg"}
                                    value={variable.quantity_id}
                                    onChange={handleQuantityChange}
                                >
                                  <option value="">Select...</option>
                                  {props.quantities.data.map(makeOption)}
                                </Form.Select>
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {(variableType === "continuous" && variable.quantity_id) ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Sensor quantity?</Form.Label>
                              <Col sm={col2}>
                                <Form.Check
                                    size={"lg"}
                                    checked={variable.is_sensor_quantity}
                                    onChange={handleSensorQuantityChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {variableType === "discrete" ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Number of levels</Form.Label>
                              <Col sm={col2}>
                                <Form.Control
                                    type={"number"}
                                    size={"lg"}
                                    min={2}
                                    max={6}
                                    value={levelCount}
                                    onChange={handleLevelCountChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {(variableType === "discrete" && levelCount >= 1) ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Level 1</Form.Label>
                              <Col sm={col2}>
                                <Form.Control
                                    type={"text"}
                                    size={"lg"}
                                    index={0}
                                    value={levels[0]}
                                    onChange={handleLevelChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {(variableType === "discrete" && levelCount >= 2) ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Level 2</Form.Label>
                              <Col sm={col2}>
                                <Form.Control
                                    type={"text"}
                                    size={"lg"}
                                    index={1}
                                    value={levels[1]}
                                    onChange={handleLevelChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {(variableType === "discrete" && levelCount >= 3) ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Level 3</Form.Label>
                              <Col sm={col2}>
                                <Form.Control
                                    type={"text"}
                                    size={"lg"}
                                    index={2}
                                    value={levels[2]}
                                    onChange={handleLevelChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {(variableType === "discrete" && levelCount >= 4) ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Level 4</Form.Label>
                              <Col sm={col2}>
                                <Form.Control
                                    type={"text"}
                                    size={"lg"}
                                    index={3}
                                    value={levels[3]}
                                    onChange={handleLevelChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {(variableType === "discrete" && levelCount >= 5) ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Level 5</Form.Label>
                              <Col sm={col2}>
                                <Form.Control
                                    type={"text"}
                                    size={"lg"}
                                    index={4}
                                    value={levels[4]}
                                    onChange={handleLevelChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        {(variableType === "discrete" && levelCount >= 6) ?
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={col1}>Level 6</Form.Label>
                              <Col sm={col2}>
                                <Form.Control
                                    type={"text"}
                                    size={"lg"}
                                    index={5}
                                    value={levels[5]}
                                    onChange={handleLevelChange}
                                />
                              </Col>
                            </Form.Group>
                            : null
                        }
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Treatment?</Form.Label>
                          <Col sm={col2}>
                            <Form.Check
                                inline
                                name={"useAs"}
                                size={"lg"}
                                checked={variable.is_treatment}
                                onChange={handleTreatmentChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Response?</Form.Label>
                          <Col sm={col2}>
                            <Form.Check
                                inline
                                name={"useAs"}
                                size={"lg"}
                                checked={variable.is_response}
                                onChange={handleResponseChange}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Procedure</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                size={"lg"}
                                value={variable.procedure}
                                placeholder={"How the variable is applied and/or measured"}
                                required
                                onChange={handleProcedureChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please describe how the variable is applied/measured
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Status</Form.Label>
                          <Col sm={col2}>
                            <Form.Select
                                required
                                size={"lg"}
                                value={variable.status}
                                onChange={handleStatusChange}
                            >
                              <option value="">Select...</option>
                              <option value="active">Active</option>
                              <option value="disabled">Disabled</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Please set the variable's status (probably 'Active')
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>

                      </Form> : null
                  }
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => {clearForm()}}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => save()}>Save</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
