import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import CloseIcon from "@mui/icons-material/Close"
import MapModalCard from "../../components/cards/mapModalCard"
import { readRecord } from "../../utils/CRUD"

export default function MapDetailModal(props) {
  return (
    <div>
      {props.school.school ? (
        <div className="map-detail-container">
          <div className="inner-panel">
            <div className="panel-content">
              <div className="school-details">
                <div className="title-row">
                  <h2>{props.school.school.name}</h2>
                  <div className="close-btn">
                    <button
                      className="button"
                      onClick={() => {
                        props.callback()
                      }}
                    >
                      <CloseIcon className="close-icon" />
                    </button>{" "}
                  </div>
                </div>
                <h3>
                  {props.school.school.address_line_1},{" "}
                  {props.school.school.town}, {props.school.school.postcode}
                </h3>
                <h3>{props.school.school.telephone}</h3>
                <div className="school-image">
                  <img src={props.school.school.image_full} />
                </div>
              </div>
              <hr />

              <div className="project-list">
                <div className="title">
                  <h2>Project List:</h2>
                </div>
                <div className="cards">
                  <MapModalCard id={props.school.school.school_id}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
