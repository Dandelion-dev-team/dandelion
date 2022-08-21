import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function DataCard(props) {
    const [value, setValue] = useState(null)
    const [comment, setComment] = useState("")

    useEffect(() => {
        setValue(props.observation.value)
        setComment(props.observation.comment)
        console.log(props)
    }, [props.observation])

    return (
        <Card className="data-card">
            <Card.Body>
                <Card.Title>{props.observation.name} {props.observation.units ? <span>({props.observation.units})</span> : null}</Card.Title>
                <Card.Body>
                    <Form>
                        <Row>
                        {props.observation.levels.length ?
                            <Form.Group >
                                <Form.Select
                                    data-index={props.index}
                                    name={props.observation.name}
                                    defaultValue={value}
                                    onChange={props.handleValueChange}
                                >
                                    <option value="">Select...</option>
                                    {props.observation.levels.map((option) => (
                                        <option
                                            value={option.id}
                                            selected={option.id == value}
                                        >{option.name}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            :
                            <Form.Group>
                                <Form.Control
                                    data-index={props.index}
                                    name={props.observation.name}
                                    placeholder="Enter value"
                                    type="number"
                                    step="0.01"
                                    defaultValue={value}
                                    onChange={props.handleValueChange}
                                />
                            </Form.Group>
                        }
                        <Form.Group >
                            <Form.Control
                                data-index={props.index}
                                name={props.observation.name}
                                placeholder="Enter your comments"
                                as="textarea"
                                rows={2}
                                defaultValue={comment}
                                onChange={props.handleCommentChange}
                            />
                        </Form.Group>
                        </Row>
                    </Form>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}
