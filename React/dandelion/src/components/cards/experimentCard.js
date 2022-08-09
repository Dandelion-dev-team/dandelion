import React, { useEffect } from 'react'
import Card from "react-bootstrap/Card"

export default function ExperimentCard(props) {

    return (
        <Card className="experiment-card" onClick={() => {
           props.callback(props.dataProp);
          }}>
            <Card.Body>
                <Card.Img variant="left" src={props.dataProp.image_thumb}/>
                <Card.Title>{props.dataProp.title}</Card.Title>
                <Card.Text as="h5">{props.dataProp.description.substring(0, 99)}</Card.Text>
            </Card.Body>
        </Card>
    )
}
