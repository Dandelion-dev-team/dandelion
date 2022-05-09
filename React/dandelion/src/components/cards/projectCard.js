import React from "react"
import { Card } from "react-bootstrap"

export default function projectCard(props) {
  //Card used on Data page
  return (
    <div className="card">
      <div className="cardImage">
        <img src={props.image}></img>
      </div>
      <div className="text">
        <div>
          <h2>{props.title} </h2>
        </div>
        <h4>{props.description}</h4>
      </div>
      <div className="center">
        <div class="vl"></div>
      </div>
      <div className="experimentList">
        <div className="experimentCheck">
          <input
            type="checkbox"
            id="experiment_id"
            name="topping"
            value="experiment_ID"
          />{" "}
          Experiment Title
        </div>
        <div className="experimentCheck">
          <input
            type="checkbox"
            id="experiment_id"
            name="topping"
            value="experiment_ID"
          />{" "}
          Experiment Title
        </div>
        <div className="experimentCheck">
          <input
            type="checkbox"
            id="experiment_id"
            name="topping"
            value="experiment_ID"
          />{" "}
          Experiment Title
        </div>
        <div className="experimentCheck">
          <input
            type="checkbox"
            id="experiment_id"
            name="topping"
            value="experiment_ID"
          />{" "}
          Experiment Title
        </div>
        <div className="experimentCheck">
          <input
            type="checkbox"
            id="experiment_id"
            name="topping"
            value="experiment_ID"
          />{" "}
          Experiment Title
        </div>
      </div>
      <div className="center">
        <div class="vl"></div>
      </div>

      <div className="tagList">
        <div className="tag">
          <h4>Tag</h4>
        </div>
        <div className="tag">
          <h4>Tag</h4>
        </div>
        <div className="tag">
          <h4>Tag</h4>
        </div>
        <div className="tag">
          <h4>Tag</h4>
        </div>
        <div className="tag">
          <h4>Tag</h4>
        </div>
        <div className="tag">
          <h4>Tag</h4>
        </div>
        <div className="tag">
          <h4>Tag</h4>
        </div>
        <div className="tag">
          <h4>Tag</h4>
        </div>
      </div>
    </div>
  )
}
