import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {updateRecord} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {hasDetails} from "../../utils/validation"
import {hasTreatmentVariables} from "../../utils/validation"
import {hasResponseVariables} from "../../utils/validation"
import {hasActiveConditions} from "../../utils/validation"

export default function StatusModal(props) {
    const [status, setStatus] = useState(undefined)
    const [ready, setReady] = useState(false)
    const [dirty, setDirty] = useState(false)

    const formRef = React.createRef()

  useEffect(() => {
    console.log("STATUS MODAL")
    console.log(props)
    setStatus(props.experiment.status)
    setDirty(false)
      setReady(hasDetails(props.experiment) &&
           hasTreatmentVariables(props.experiment) &&
           hasResponseVariables(props.experiment) &&
           hasActiveConditions(props.experiment))

  }, [props.experiment])

  const handleStatusChange = e => {setDirty(true); setStatus(e.target.value)}

  const afterSaveCallback = () => {
    props.setReload(!props.reload)
    props.setShow(false)
  }

  const save = e => {
    let body = JSON.stringify({status: status})
    console.log("BODY")
    console.log(body)

    if (dirty && status !== props.experiment.status) {
      updateRecord("/experiment/" + props.experiment.id + "/status", body, afterSaveCallback)
    }
    else {
        props.setShow(false)
    }
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title>
              <h2>Experiment status</h2>
            </Modal.Title>
        </Modal.Header>
        {props.experiment ?
            <Modal.Body>

                {ready ?
                    <div className="panel-body">
                        <div className="scrollable-inner">
                            <h3>Status meanings</h3>
                            <ul>
                                <li><b>Active</b>: available to be used by participants including those in other schools in
                                    the case of a shared activity
                                </li>
                                <li><b>Invalid</b>: something went wrong - use this status to hide the experiment completely
                                </li>
                                <li><b>Private</b>: only available to participants in your school (only relevant for shared
                                    activities)
                                </li>
                            </ul>
                            <br/>
                            <Form
                                noValidate
                                ref={formRef}
                            >
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Status</Form.Label>
                                    <Col sm={9}>
                                        <Form.Select
                                            name="status"
                                            required
                                            onChange={handleStatusChange}
                                        >
                                            <option value="">Select...</option>
                                            <option value="active" selected={status === 'active'}>Active</option>
                                            <option value="invalid" selected={status === 'invalid'}>Invalid</option>
                                            <option value="private" selected={status === 'private'}>Private</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    :
                    <div className="dandelion-hint">
                        This experiment is not ready to be activated yet.
                        Please check the status in the right-hand panel &rarr;
                    </div>
                }
            </Modal.Body>
            : null
        }
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => {props.setShow(false)}}>
                    {ready ?
                        "Cancel" : "OK"
                    }
                </Button>
                {ready ?
                    <Button className="dandelion-button" onClick={() => save()}>Save</Button>
                    : null
                }
            </div>
        </Modal.Footer>
    </Modal>
  )
}
