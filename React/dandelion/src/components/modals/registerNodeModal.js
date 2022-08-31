import { navigate } from "gatsby"
import React, { useEffect, useState, useRef } from "react"
import {createRecord, readRecord, updateRecord, uploadImage} from "../../utils/CRUD";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RegisterNodeModal(props) {
  const [macAddress, setMacAddress] = useState()
  const [validated, setValidated] = useState(false);
  const [invalidMac, setInvalidMac] = useState()

  const formRef = React.createRef()
  const col1 = 3;
  const col2 = 12 - col1;

  const macCheck = new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$");

  const save = e => {
    if (formRef.current.checkValidity())
    {
      if(macCheck.test(macAddress)) {
        let date = new Date()
        let useDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        (date.getDay() + 1)

        let school_id = localStorage.getItem("school_id");
        let body = JSON.stringify({
          school_id: school_id,
          growcube_code: null,
          mac_address: macAddress,
          last_communication_date: useDate,
          next_communication_date: useDate,
          health_status: "online",
          status: "active",
        })
        createRecord("/node", body)
        props.setShow(false)
      }
      else {
        setInvalidMac(true)
      }
    }
    setValidated(true);
  }

  const handleMacChange = e => {
    setMacAddress(e.target.value)
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title><h2>Register a node</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You can find the MAC address for your node by putting it into configuration mode.
            See <a href="https://dandelion.sruc.ac.uk/reference/register/" target="_blank">the node reference guide</a> for
            more information.
          </p>
          <Form
              noValidate
              ref={formRef}
              isInvalid={invalidMac}
          >
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={col1}>Mac Address</Form.Label>
              <Col sm={col2}>
                <Form.Control
                    name="mac"
                    type="text"
                    value={macAddress}
                    required
                    onChange={handleMacChange}
                    isInvalid={invalidMac}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the MAC address in the correct format
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Form>
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
