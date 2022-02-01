import React from 'react'
import {Card} from 'react-bootstrap'

export default function projectCard(props) {
    return (
        <Card className='singleCardWhite'>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Douglas Academy</small>
            </Card.Footer>
        </Card>
    )
}