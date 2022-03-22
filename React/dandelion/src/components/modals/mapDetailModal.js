import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import CloseIcon from "@mui/icons-material/Close"
import MapModalCard from "../../components/cards/mapModalCard"

export default function MapDetailModal(props) {
  const [school_details, setSchoolDetails] = useState([])

  useEffect(() => {
    //  console.log(props.dataProp.name)
  }, [])

  return (
    <div>
      {/* {props.dataProp ? ( */}
      <div className="map-detail-container">
        <div className="inner-panel">
          <div className="panel-content">
            <div className="school-details">
              <div className="title-row">
                <h2>Glasgow</h2>
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
              <h3>11-1 Fake Ave., Glasgow, GLA 23D</h3>
              <h3>04738 384834</h3>
              <div className="school-image">
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
      {/* ) : null} */}
    </div>
  )
}
