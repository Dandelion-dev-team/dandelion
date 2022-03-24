import React, { useEffect } from 'react'

export default function ExperimentCard(props) {
    //Tested

    return (
        <div className="experiment-card" onClick={() => {
           props.callback(props.dataProp);
          }}>
            <div className="card-img">
                <img src={props.dataProp.experiment_image_link}/>
            </div>
            <div className="title-description">
                <h2>{props.dataProp.title}</h2>
                <h4>{props.dataProp.description}</h4>
            </div>
            {/* <div className="center">
                <div class="vl" />
            </div>
            <div className="description">
                <h2>{props.dataProp.description}</h2>
            </div> */}
        </div>
    )
}