import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import CloseIcon from "@mui/icons-material/Close"
import MapModalCard from "../../components/cards/mapModalCard"

export default function MapDetailModal(props) {

  useEffect(() => {
    //  console.log(props.dataProp.name)
  }, [])

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
                <h3>{props.school.school.address_line_1}, {props.school.school.town}, {props.school.school.postcode}</h3>
                <h3>{props.school.school.telephone}</h3>
                <div className="school-image">
                  {/* TODO - UPDATE IMAGE LINK*/}
                  <img src="https://www.amle.org/wp-content/uploads/2021/02/784784p888EDNmain820Davis-article-pic1.jpg" />
                </div>
              </div>
              <hr />

              <div className="project-list">
                <div className="title">
                  <h2>Project List:</h2>
                </div>
                <div className="cards">
                  <MapModalCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
