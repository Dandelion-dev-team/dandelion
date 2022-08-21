import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {updateRecord} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function HypothesesModal(props) {
  const [hypotheses, setHypotheses] = useState({})

  const [hypothesisCount, setHypothesisCount] = useState(0)
  const [alternativeCount, setAlternativeCount] = useState(0)
  const [validated, setValidated] = useState(false);
  const [dirty, setDirty] = useState(false)

  const formRef = React.createRef()
  const restricted = !!props.experiment.parent_id

  // Column widths
  const col1 = 4
  var col2 = 12 - col1

  useEffect(() => {
    setHypotheses(props.experiment.hypotheses)
    setHypothesisCount(props.experiment.hypotheses.length)
    if (props.experiment.hypotheses.length === 0) {
      setAlternativeCount(0)
    }
    else {
      setAlternativeCount(props.experiment.hypotheses.length - 1)
    }
    setValidated(false)
    setDirty(false)
    if (formRef.current) {
      formRef.current.reset()
    }
  }, [props.experiment])

  const handleHypothesisChange = e => {
    setDirty(true)
    let newHypotheses = [...hypotheses]

    newHypotheses[e.target.dataset.index] = {
      experiment_id: props.experiment.id,
      hypothesis_no: e.target.dataset.index,
      description: e.target.value
    }
    setHypotheses(newHypotheses)
  }

  const handleHypothesisCountChange = e => {
    setAlternativeCount(e.target.value)

    let newHypothesisCount = 0
    if (parseInt(e.target.value) > 0) {
      newHypothesisCount = parseInt(e.target.value) + 1
    }
    setHypothesisCount(newHypothesisCount)

    if (newHypothesisCount > hypotheses.length) {
      for (let hypothesis = hypotheses.length; hypothesis < newHypothesisCount; hypothesis++) {
        hypotheses[hypothesis] = ""
      }
    }
    if (newHypothesisCount < hypotheses.length) {
      let newHypotheses = []
      for (let hypothesis = 0; hypothesis < newHypothesisCount; hypothesis++) {
        newHypotheses[hypothesis] = hypotheses[hypothesis]
      }
      setHypotheses(newHypotheses)
    }
  }

  const cancel = e => {
    props.setShow(false)
    setDirty(false)
  }

  const afterSaveCallback = () => {
    props.setReload(!props.reload)
    props.setShow(false)
  }

  const save = e => {
    if (formRef.current.checkValidity()) {
      setValidated(false)

      if (dirty) {
        let body = JSON.stringify(hypotheses)
        updateRecord("/experiment/" + props.experiment.id + "/hypotheses", body, afterSaveCallback)
      }
    }
    else {
      setValidated(true)
    }
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
        size="lg"
    >
        <Modal.Header closeButton onClick={cancel}>
            <Modal.Title><h2>Hypotheses</h2></Modal.Title>
        </Modal.Header>
      {props.experiment ?
          <Modal.Body>
            <div className="scrollable-modal">
              <div className="scrollable-container">
                <div className="scrollable-header">
                  {props.experiment.parent_id ?
                      <p>
                        This is a shared experiment so you can't change these values
                      </p>
                      :
                      <span>
                            <p>First, select the number of alternative hypotheses.</p>
                            <p>Then, enter their details plus the null hypothesis</p>
                        </span>
                  }
                </div>
                <div className="scrollable-content">
                  <Form
                      noValidate
                      ref={formRef}
                      validated={validated}
                  >
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={col1}>Number of alternative hypotheses</Form.Label>
                      <Col sm={col2}>
                        <Form.Control
                            type={"number"}
                            size={"lg"}
                            min={0}
                            max={5}
                            readOnly={restricted}
                            plaintext={restricted}
                            value={alternativeCount}
                            onChange={handleHypothesisCountChange}
                        />
                      </Col>
                    </Form.Group>

                    {(hypothesisCount >= 1) ?
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Null hypothesis</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                required
                                as="textarea"
                                className="two-rows"
                                size={"lg"}
                                data-index={0}
                                readOnly={restricted}
                                plaintext={restricted}
                                value={hypotheses[0] ? hypotheses[0].description : null}
                                onChange={handleHypothesisChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the hypothesis text
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        : null
                    }
                    {(hypothesisCount >= 2) ?
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Hypothesis 1</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                required
                                as="textarea"
                                className="two-rows"
                                size={"lg"}
                                data-index={1}
                                readOnly={restricted}
                                plaintext={restricted}
                                value={hypotheses[1] ? hypotheses[1].description : null}
                                onChange={handleHypothesisChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the hypothesis text
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        : null
                    }
                    {(hypothesisCount >= 3) ?
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Hypothesis 2</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                required
                                as="textarea"
                                className="two-rows"
                                size={"lg"}
                                data-index={2}
                                readOnly={restricted}
                                plaintext={restricted}
                                value={hypotheses[2] ? hypotheses[2].description : null}
                                onChange={handleHypothesisChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the hypothesis text
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        : null
                    }
                    {(hypothesisCount >= 4) ?
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Hypothesis 3</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                required
                                as="textarea"
                                className="two-rows"
                                size={"lg"}
                                data-index={3}
                                readOnly={restricted}
                                plaintext={restricted}
                                value={hypotheses[3] ? hypotheses[3].description : null}
                                onChange={handleHypothesisChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the hypothesis text
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        : null
                    }
                    {(hypothesisCount >= 5) ?
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Hypothesis 4</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                required
                                as="textarea"
                                className="two-rows"
                                size={"lg"}
                                data-index={4}
                                readOnly={restricted}
                                plaintext={restricted}
                                value={hypotheses[4] ? hypotheses[4].description : null}
                                onChange={handleHypothesisChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the hypothesis text
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        : null
                    }
                    {(hypothesisCount >= 6) ?
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={col1}>Hypothesis 5</Form.Label>
                          <Col sm={col2}>
                            <Form.Control
                                required
                                as="textarea"
                                className="two-rows"
                                size={"lg"}
                                data-index={5}
                                readOnly={restricted}
                                plaintext={restricted}
                                value={hypotheses[5] ? hypotheses[5].description : null}
                                onChange={handleHypothesisChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter the hypothesis text
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        : null
                    }
                  </Form>
                </div>
              </div>
            </div>
          </Modal.Body>
          : null
      }
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={cancel}>Cancel</Button>
                <Button className="dandelion-button" onClick={() => save()}>Save</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
