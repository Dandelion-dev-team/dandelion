import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import {Button, Modal} from "react-bootstrap";

export default function ViewExperimentModal(props) {

  useEffect(() => {
      console.log("view experiment")
    console.log(props.experiment)
  }, [])

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
        size="lg"
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title>
                <h2>{props.experiment.title}</h2>
                <p>
                  {new Date(props.experiment.start_date).toDateString()} -{" "}
                  {new Date(props.experiment.end_date).toDateString()}{" "}
                </p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scrollable-modal">
            <div className="scrollable-container">
                <div className="scrollable-content">
                    <img src={props.experiment.image_thumb}/>
                  <h3>Description</h3>
                  <p>{props.experiment.description}</p>
                    <table className="plain">
                        <tr>
                            <td><h3>Treatment variables</h3></td>
                            <td><h3>Response variables</h3></td>
                        </tr>
                        <tr>
                            <td>
                                {props.experiment.treatment_variables.map(tv =>
                                    <p> <span className="bold">{tv.name}</span></p>
                                )}
                            </td>
                            <td>
                                {props.experiment.response_variables.map(rv =>
                                    <p><span className="bold">{rv.name}</span> ({rv.type})</p>
                                )}
                            </td>
                        </tr>
                    </table>
                  <h3>Tutorial text</h3>
                  <p>{props.experiment.text}</p>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="dandelion-button-group">
                <Button className="dandelion-button" onClick={() => {props.setShow(false)}}>Close</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
