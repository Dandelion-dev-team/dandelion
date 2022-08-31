import {Button, Modal} from "react-bootstrap";
import React from "react";

export default function ConfirmationModal(props) {
    return (
        <Modal
            show={props.show}
            dialogClassName="dandelion-modal"
            centered
        >
            <Modal.Header closeButton onClick={() => props.setShow(false)}>
                <Modal.Title><h2>Confirmation</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.message}</p>
                <p>{props.question}</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="dandelion-button-group">
                    <Button className="dandelion-button" onClick={() => props.setConfirmed("NO")}>{props.no}</Button>
                    <Button className="dandelion-button" onClick={() => props.setConfirmed("YES")}>{props.yes}</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
