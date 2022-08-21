import React, { useEffect } from 'react'
import Card from "react-bootstrap/Card"

export default function LatestCard(props) {

    return (
        <Card className="latest-card">
            <Card.Body>
                <Card.Title>{props.name}: {props.value}</Card.Title>
                <Card.Text>{props.message}</Card.Text>
            </Card.Body>
        </Card>
    )
}
