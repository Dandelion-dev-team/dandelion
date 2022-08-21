import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import EditIcon from "@mui/icons-material/Edit"
import {createRecord, readRecord, updateRecord, uploadImage} from "../../utils/CRUD"
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

  const restricted = !!props.experiment.parent_id
  const formRef = React.createRef()
  const col1 = 3;
  const col2 = 12 - col1;

  useEffect(() => {
    console.log("EXPERIMENT MODAL")
    console.log(props)
    props.experiment ?
        setExperimentDetails(props.experiment) :
        readRecord("/experiment/blank", setExperimentDetails)

    if (formRef.current) {
      formRef.current.reset()
    }
    setValidated(false)
    setImageFile(null)
    setDirty(false)

  }, [props.experiment])

  const setExperimentDetails = experiment => {
    console.log(experiment)
    if (experiment.data) {
      let copy = {...experiment.data, project_id: props.project.id}
      console.log("SETTING BLANK")
      console.log(copy)
      setExperiment(copy)
      setExperimentImage(experiment.data.image_full)
    }
    else {
      setExperiment(experiment)
      setExperimentImage(experiment.image_full)
    }
  }

  const handleTitleChange = e => {setDirty(true); setExperiment({...experiment, title: e.target.value})}
  const handleCodeChange = e => {setDirty(true); setExperiment({...experiment, code: e.target.value})}
  const handleDescChange = e => {setDirty(true); setExperiment({...experiment, description: e.target.value})}
  const handleTextChange = e => {setDirty(true); setExperiment({...experiment, text: e.target.value})}
  const handleStartChange = e => {setDirty(true); setExperiment({...experiment, start_date: e.target.value})}
  const handleEndChange = e => {setDirty(true); setExperiment({...experiment, end_date: e.target.value})}

  const handleImageChange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();

    setImageFile(file)

    reader.onloadend = function (event) {
      setExperimentImage(reader.result)
    }.bind(e.target);
  }

  const afterUploadCallback = data => {
    if (props.setReload) {
      props.setReload(!props.reload)
    }
  }

  const updateId = data => {
    let copy = {...experiment, id: data.id}
    setExperiment(copy)

    if (imageFile) {
      uploadImage("/experiment/" + data.id + "/uploadImage", imageFile, afterUploadCallback)
    }
    props.updateExperiment(copy)
  }

  const save = e => {
    if (formRef.current.checkValidity())
    {
      let body = JSON.stringify(experiment)
      console.log("BODY")
      console.log(body)

      if (experiment.id) {
        if (dirty) {
          updateRecord("/experiment/" + experiment.id, body)
        }
        if (imageFile) {
          uploadImage("/experiment/" + props.experiment.id + "/uploadImage", imageFile, afterUploadCallback)
        }
        props.updateExperiment(experiment)
      } else {
        createRecord("/experiment", body, updateId)
      }
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
            <Modal.Title>
              <h2>Experiment details</h2>
            </Modal.Title>
        </Modal.Header>
      {props.experiment && props.project ?
          <Modal.Body>
            <div className="scrollable-modal">
              <div className="scrollable-container">
                <div className="scrollable-content">
                  <p>
                    Activity: <h4>{props.project.title}</h4>
                    <br/>
                    (
                    {new Date(props.project.start_date).toDateString()} -{" "}
                    {new Date(props.project.end_date).toDateString()}{" "}
                    )
                  </p>
                  <Form
                      noValidate
                      ref={formRef}
                      validated={validated}
                  >
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={col1}>Title</Form.Label>
                      <Col sm={col2}>
                        <Form.Control
                            name="title"
                            type="text"
                            value={experiment.title}
                            required
                            readOnly={restricted}
                            plaintext={restricted}
                            onChange={handleTitleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the experiment title
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={col1}>Code</Form.Label>
                      <Col sm={col2}>
                        <Form.Control
                            name="code"
                            type="text"
                            value={experiment.code}
                            required
                            readOnly={restricted}
                            plaintext={restricted}
                            onChange={handleCodeChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please choose a code for the experiment - this is for easy reference later
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={col1}>Description</Form.Label>
                      <Col sm={col2}>
                        <Form.Control
                            name="description"
                            as="textarea"
                            rows={3}
                            value={experiment.description}
                            required
                            readOnly={restricted}
                            plaintext={restricted}
                            onChange={handleDescChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please describe the experiment
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={col1}>Tutorial text</Form.Label>
                      <Col sm={col2}>
                        <Form.Control
                            name="experiment_text"
                            as="textarea"
                            rows={3}
                            readOnly={restricted}
                            plaintext={restricted}
                            value={experiment.text}
                            onChange={handleTextChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={col1}>Start date</Form.Label>
                      <Col sm={col2}>
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
                      <Form.Label column sm={col1}>End date</Form.Label>
                      <Col sm={col2}>
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
                      <Form.Label column sm={col1}>Image</Form.Label>
                      <Col sm={col2}>
                        <div className="dandelion-image thumb">
                          <img src={experimentImage}/>
                          <label className="edit-circle">
                            <input
                                name="image"
                                type="file"
                                accept=".jpg,.png"
                                onChange={handleImageChange}
                                hidden
                            />
                            <EditIcon className="edit-icon"/>
                          </label>
                        </div>
                      </Col>
                    </Form.Group>
                  </Form>
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
