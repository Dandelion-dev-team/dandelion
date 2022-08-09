import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"
import ExperimentCard from "./experimentCard";

export default function ExperimentComponent(props) {
  const [experiments, setExperiment] = useState()
  const [filtered, setFiltered] = useState()

  useEffect(() => {
    setFiltered([])
    if(props.experiments) {
      if (props.search) {
        const filteredList = props.experiments.filter((item) => {
          let all_str = `${item.title} ${item.description}`.toLowerCase();
          //return all_str.indexOf(search) > -1; // View All When Search Empty
          return all_str.indexOf(props.search) > -1 && props.search;
        });
        setFiltered(filteredList);
      }
      else {
        setFiltered(props.experiments)
      }
    }
  }, [props.experiments, props.search])

  const cardClickCallback = experiment => {
    props.parentCallback(experiment)
  }

  var isActive = true
  var className = isActive ? "active" : ""

  return filtered ? (
    filtered
      .map(experiment => (
          <ExperimentCard
            callback={cardClickCallback}
            dataProp={experiment}
            id="activity-card"
          />
        // <div
        //   className="preset-card"
        //   onClick={() => {
        //     cardClickCallback(experiment)
        //     isActive = true
        //   }}
        // >
        //   <div className="card-img">
        //     <img src={experiment.image_thumb} />
        //   </div>
        //   <div className="item-details">
        //     <div className="owner">
        //       <h2>{experiment.owner_name}</h2>
        //     </div>
        //     <div className="title">
        //       <h2>{experiment.title}</h2>
        //     </div>
        //   </div>
        // </div>
      ))
  ) : (
    <h3>No Experiments Found.</h3>
  )
}
