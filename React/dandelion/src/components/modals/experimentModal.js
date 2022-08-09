import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import EditIcon from "@mui/icons-material/Edit"
import {createRecord, updateRecord, uploadImage} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function ExperimentModal(props) {
  const [experiment, setExperiment] = useState({})
  const [validated, setValidated] = useState(false);
  const [experimentImage, setExperimentImage] = useState()
  const [imageFile, setImageFile] = useState(null)
  const [dirty, setDirty] = useState(false)

  const formRef = React.createRef()

  useEffect(() => {
    setExperiment(props.experiment)
    if (formRef.current) {
      formRef.current.reset()
    }
    setValidated(false)
    setExperimentImage(props.experiment.image_full)
    setImageFile(null)
    setDirty(false)

  }, [props.experiment])

  const handleTitleChange = e => {setDirty(true); setExperiment({...experiment, title: e.target.value})}
  const handleCodeChange = e => {setDirty(true); setExperiment({...experiment, code: e.target.value})}
  const handleDescChange = e => {setDirty(true); setExperiment({...experiment, description: e.target.value})}
  const handleTextChange = e => {setDirty(true); setExperiment({...experiment, text: e.target.value})}
  const handleStartChange = e => {setDirty(true); setExperiment({...experiment, start_date: e.target.value})}
  const handleEndChange = e => {setDirty(true); setExperiment({...experiment, end_date: e.target.value})}
  const handleStatusChange = e => {setDirty(true); setExperiment({...experiment, status: e.target.value})}

  const handleImageChange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    setImageFile(file)

    reader.onloadend = function (event) {
      setExperimentImage(reader.result)
    }.bind(e.target);
  }

  const updateId = data => {
    setExperiment({...experiment, id: data.id})

    if (imageFile) {
      uploadImage("/experiment/" + data.id + "/uploadImage", imageFile)
      props.setReload(true)
    }
  }

  const save = e => {
    if (formRef.current.checkValidity())
    {
      let body = JSON.stringify(experiment)

      if (experiment.id) {
        if (dirty) {
          updateRecord("/experiment/" + experiment.id, body)
        }
        if (imageFile) {
          uploadImage("/experiment/" + props.experiment.id + "/uploadImage", imageFile)
        }
      } else {
        createRecord("/experiment", body, updateId)
      }
      props.updateExperiment(experiment)
      props.setShow(false)
    }
    setValidated(true);
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
        size="lg"
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title><h2>Experiment details</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scrollable-modal">
            <div className="scrollable-container">
                <div className="scrollable-content">
                  <Form
                      noValidate
                      ref={formRef}
                      validated={validated}
                  >
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Title</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="title"
                            type="text"
                            value={experiment.title}
                            required
                            onChange={handleTitleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the experiment title
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Code</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="code"
                            type="text"
                            value={experiment.code}
                            required
                            onChange={handleCodeChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please choose a code for the experiment - this is for easy reference later
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Description</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="description"
                            as="textarea"
                            rows={3}
                            value={experiment.description}
                            required
                            onChange={handleDescChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please describe the experiment
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Tutorial text</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="experiment_text"
                            as="textarea"
                            rows={3}
                            value={experiment.text}
                            onChange={handleTextChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Start date</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="start_date"
                            type="date"
                            value={experiment.start_date}
                            required
                            onChange={handleStartChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the date the experiment starts
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>End date</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="end_date"
                            type="date"
                            value={experiment.end_date}
                            required
                            onChange={handleEndChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the date the experiment ends
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Status</Form.Label>
                      <Col sm={10}>
                        <Form.Select
                          name="status"
                          required
                          value={experiment.status}
                          onChange={handleStatusChange}
                        >
                          <option value="">Select...</option>
                          <option value="active">Active</option>
                          <option value="active">Invalid</option>
                          <option value="private">Private</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Please set the experiment status (probably 'active')
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Image</Form.Label>
                      <Col sm={10}>
                        <div className="dandelion-image thumb">
                          <img src={experimentImage} />
                          <label className="edit-circle">
                            <input
                              name="image"
                              type="file"
                              accept=".jpg,.png"
                              onChange={handleImageChange}
                              hidden
                            />
                            <EditIcon className="edit-icon" />
                          </label>
                        </div>
                      </Col>
                    </Form.Group>
                  </Form>
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
