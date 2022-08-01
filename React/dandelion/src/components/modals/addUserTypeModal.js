import {Button, Modal} from "react-bootstrap";
import React from "react";

export default function AddUserTypeModal(props) {
    return (
        <Modal
            show={props.show}
            dialogClassName="dandelion-modal"
            centered
            size="lg"
        >
            <Modal.Header closeButton onClick={() => props.setShow(false)}>
                <Modal.Title><h2>Are you adding one or multiple users?</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                  You can choose to add one user or add multiple users at once.
                  Adding multiple users is useful if, for example, you wish to add
                  an entire class at once. Usernames will be automated. Adding one
                  user will give you control over their username. Please note that
                  on a user's first log-in, their password will be the same as their
                  username.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <div className="dandelion-button-group">
                    <Button className="dandelion-button" onClick={() => props.singleCallback()}>Add one</Button>
                    <Button className="dandelion-button" onClick={() => props.multipleCallback()}>Add multiple</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
