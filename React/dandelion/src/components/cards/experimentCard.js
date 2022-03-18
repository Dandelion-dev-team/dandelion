import React from 'react'

export default function ExperimentCard(props) {
    //Tested
    return (
        <div className="experiment-card">
            <div className="card-img">
                <img src={props.dataProp.project_image_link}/>
            </div>
            <div className="title">
                <h2>{props.dataProp.title}</h2>
            </div>
            <div className="center">
                <div class="vl" />
            </div>
            <div className="description">
                <h2>{props.dataProp.description}</h2>
            </div>
        </div>
    )
}