import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import EditIcon from "@mui/icons-material/Edit"
import {createRecord, updateRecord, uploadImage} from "../../utils/CRUD"
import {Button, Modal} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ExperimentCard from '../cards/experimentCard'

export default function ViewActivityModal(props) {
  const [project, setProject] = useState({})
  const [experiments, setExperiments] = useState([])

  useEffect(() => {
    setProject(props.project)
  }, [props.project])

  useEffect(() => {
      console.log(props)
    setExperiments(props.experiments)
  }, [props.experiments])

  return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
        size="lg"
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title>
                <h2>{project.title}</h2>
                <p>
                  {new Date(props.project.start_date).toDateString()} -{" "}
                  {new Date(props.project.end_date).toDateString()}{" "}
                </p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scrollable-modal">
            <div className="scrollable-container">
                <div className="scrollable-content">
                  <h3>Description</h3>
                  <p>project.description</p>
                  <h3>Tutorial text</h3>
                  <p>{project.project_text}</p>
                  {/*<img src={projectImage} />*/}
                    <h3>Experiments</h3>
                    {props.experiments.map((experiment) => (
                        <ExperimentCard
                            experiment={experiment}
                        />
                    ))}
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
