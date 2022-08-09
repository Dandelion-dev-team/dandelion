import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import EditIcon from "@mui/icons-material/Edit"
import {createRecord, updateRecord, uploadImage} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function SchoolModal(props) {
  const [school, setSchool] = useState({})
  const [selectedAuth, setSelectedAuth] = useState({})
  const [validated, setValidated] = useState(false);
  const [schoolImage, setSchoolImage] = useState()
  const [imageFile, setImageFile] = useState(null)
  const [dirty, setDirty] = useState(false)

  const formRef = React.createRef()

  const makeOption = data => {
    return (
        <option value={data.id}>{data.name}</option>
    )
  }

  useEffect(() => {
    setSchool(props.school)
    setSelectedAuth(null)
    if (props.school.id) {
      setSelectedAuth(props.school.authority_id.toString())
    }
    formRef.current.reset()
    setValidated(false)
    setSchoolImage(props.school.image_full)
    setImageFile(null)
    setDirty(false)

  }, [props.school])

  const handleNameChange = e => {setDirty(true); setSchool({...school, name: e.target.value})}
  const handleAuthChange = e => {setDirty(true); setSchool({...school, authority_id: e.target.value})}
  const handleAddress1Change = e => {setDirty(true); setSchool({...school, address_line_1: e.target.value})}
  const handleAddress2Change = e => {setDirty(true); setSchool({...school, address_line_2: e.target.value})}
  const handleTownChange = e => {setDirty(true); setSchool({...school, town: e.target.value})}
  const handlePostcodeChange = e => {setDirty(true); setSchool({...school, postcode: e.target.value})}
  const handleLatChange = e => {setDirty(true); setSchool({...school, latitude: e.target.value})}
  const handleLongChange = e => {setDirty(true); setSchool({...school, longitude: e.target.value})}
  const handleTelephoneChange = e => {setDirty(true); setSchool({...school, telephone: e.target.value})}
  const handleEmailChange = e => {setDirty(true); setSchool({...school, email: e.target.value})}

  const handleImageChange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    setImageFile(file)

    reader.onloadend = function (event) {
      setSchoolImage(reader.result)
    }.bind(e.target);
  }

  const updateId = data => {
    setSchool({...school, id: data.id})

    if (imageFile) {
      uploadImage("/school/" + data.id + "/uploadImage", imageFile)
    }
  }

  const save = e => {
    if (formRef.current.checkValidity())
    {
      let body = JSON.stringify(school)

      if (school.id) {
        if (dirty) {
          updateRecord("/school/" + school.id, body)
        }
        if (imageFile) {
          uploadImage("/school/" + school.id + "/uploadImage", imageFile)
        }
      } else {
        createRecord("/school", body, updateId)
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
            <Modal.Title><h2>School details</h2></Modal.Title>
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
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Name</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={school.name}
                            required
                            onChange={handleNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the school's name
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Authority</Form.Label>
                      <Col sm={10}>
                        <Form.Select
                          name="authority_picker"
                          required
                          value={selectedAuth}
                          onChange={handleAuthChange}
                        >
                          <option value="">Select...</option>
                          {props.authList.data.map(makeOption)}
                        </Form.Select>
                        <Form.Control.Feedback
                            type="invalid"
                        >
                          Please select the local authority
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Address 1</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={school.address_line_1}
                            onChange={handleAddress1Change}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Address 2</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={school.address_line_2}
                            onChange={handleAddress2Change}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Town</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={school.town}
                            required
                            onChange={handleTownChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the town the school is in
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Postcode</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={school.postcode}
                            required
                            onChange={handlePostcodeChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter the school's postcode
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Telephone</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={school.telephone}
                            onChange={handleTelephoneChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Email</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={school.email}
                            onChange={handleEmailChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Latitude</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="number"
                        step="0.001"
                        value={school.latitude}
                        onChange={handleLatChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Longitude</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                            type="number"
                        step="0.001"
                        value={school.longitude}
                        onChange={handleLongChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label column sm={2}>Image</Form.Label>
                      <Col sm={10}>
                        <div className="dandelion-image thumb">
                          <img src={schoolImage} />
                          <label className="edit-circle">
                            <input
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
