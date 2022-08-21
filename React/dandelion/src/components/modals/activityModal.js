import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import EditIcon from "@mui/icons-material/Edit"
import {createRecord, updateRecord, uploadImage} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function ActivityModal(props) {
  const [project, setProject] = useState({})
  const [validated, setValidated] = useState(false);
  const [projectImage, setProjectImage] = useState()
  const [imageFile, setImageFile] = useState(null)
  const [dirty, setDirty] = useState(false)

  const formRef = React.createRef()

  useEffect(() => {
    setProject(props.project)
    formRef.current.reset()
    setValidated(false)
    setProjectImage(props.project.image_full)
    setImageFile(null)
    setDirty(false)

  }, [props.project])

  const handleTitleChange = e => {setDirty(true); setProject({...project, title: e.target.value})}
  const handleDescChange = e => {setDirty(true); setProject({...project, description: e.target.value})}
  const handleTextChange = e => {setDirty(true); setProject({...project, project_text: e.target.value})}
  const handleStartChange = e => {setDirty(true); setProject({...project, start_date: e.target.value})}
  const handleEndChange = e => {setDirty(true); setProject({...project, end_date: e.target.value})}
  const handleStatusChange = e => {setDirty(true); setProject({...project, status: e.target.value})}

  const handleImageChange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    setImageFile(file)

    reader.onloadend = function (event) {
      setProjectImage(reader.result)
    }.bind(e.target);
  }

  const updateId = data => {
    setProject({...project, id: data.id})

    if (imageFile) {
      uploadImage("/project/" + data.id + "/uploadImage", imageFile)
    }
  }

  const save = e => {
    if (formRef.current.checkValidity())
    {
      let body = JSON.stringify(project)

      if (project.id) {
        if (dirty) {
          updateRecord("/project/" + project.id, body)
        }
        if (imageFile) {
          uploadImage("/project/" + props.project.id + "/uploadImage", imageFile)
        }
      } else {
        createRecord("/project", body, updateId)
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
            <Modal.Title><h2>Activity details</h2></Modal.Title>
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
                            value={project.title}
                            required
                            onChange={handleTitleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the activity title
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
                            value={project.description}
                            required
                            onChange={handleDescChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please describe the activity
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Tutorial text</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="project_text"
                            as="textarea"
                            rows={3}
                            value={project.project_text}
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
                            value={project.start_date}
                            required
                            onChange={handleStartChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the date the activity starts
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>End date</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            name="end_date"
                            type="date"
                            value={project.end_date}
                            required
                            onChange={handleEndChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the date the activity ends
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Status</Form.Label>
                      <Col sm={10}>
                        <Form.Select
                          name="status"
                          required
                          value={project.status}
                          onChange={handleStatusChange}
                        >
                          <option value="">Select...</option>
                          <option value="active">Active</option>
                          <option value="invalid">Invalid</option>
                          <option value="private">Private</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Please set the activity status (probably 'active')
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Image</Form.Label>
                      <Col sm={10}>
                        <div className="dandelion-image thumb">
                          <img src={projectImage} />
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
