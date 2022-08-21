import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import {Button, Modal} from "react-bootstrap";
import DataCard from "../cards/dataCard"

export default function EnterObservationModal(props) {
  const [observations, setObservations] = useState([])

  useEffect(() => {
    setObservations(JSON.parse(JSON.stringify(props.unit.observations)))    //The JSON operations are to force a deep copy
  }, [props.unit])

  const handleValueChange = event => {
    const index = parseInt(event.target.dataset.index, 10)
    let copy = [...observations]
    copy[index].value = event.target.value
    setObservations(copy)
  }

  const handleCommentChange = event => {
    const index = parseInt(event.target.dataset.index, 10)
    let copy = [...observations]
    copy[index].comment = event.target.value
    setObservations(copy)
  }

  const save = e => {
    console.log("Save")
    props.saveObservation(props.unit, observations)
  }

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal enter-observations"
        centered
        size="lg"
    >
      <Modal.Header closeButton onClick={() => props.setShow(false)}>
          <Modal.Title><h2>Enter observations</h2></Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="scrollable-modal">
            <div className="scrollable-container">
                <div className="scrollable-content">
                  {props.unit.observations.map((obs, idx) => (
                    <DataCard
                        index={idx}
                        observation={obs}
                        handleValueChange={handleValueChange}
                        handleCommentChange={handleCommentChange}
                    />
                  ))}
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
