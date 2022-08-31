import React, {useEffect} from 'react'
import Card from "react-bootstrap/Card"

export default function ExperimentCard(props) {

    const onClickHandler = () => {
        if (props.loadExperiment) {
            props.loadExperiment(props.experiment)
        }
    }

    return (
        <Card className="experiment-card" onClick={onClickHandler}>
            {props.experiment ?
                <Card.Body>
                    <Card.Img variant="left" src={props.experiment.image_thumb}/>
                    <Card.Title as="h5">{props.experiment.title}</Card.Title>
                    <Card.Text as="p">
                        {props.experiment.description.substring(0, 99)}
                        {props.experiment.description.length > 100 ? "..." : ""}
                    </Card.Text>
                </Card.Body>
                : null
            }
        </Card>
    )
}
