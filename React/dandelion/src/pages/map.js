import React, { useEffect, useState } from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import { readRecord } from "../utils/CRUD"
import MapDetailModal from "../components/modals/mapDetailModal"
import { CSSTransition } from "react-transition-group"
import icon from "../images/marker.png"

export default function MapPage(props) {
  const [schoolList, setSchools] = useState([])
  const [starting_lat, setStartingLat] = useState(57.40040961518596)
  const [starting_lng, setStartingLng] = useState(-4.175709371988957)
  const [starting_zoom, setZoom] = useState(6.5)
  const [own_school, setOwn] = useState(null)
  const [update_render, setUpdate] = useState(true)
  const [show_map_details, setShowMapDetails] = useState("")
  const [slideModal, setSlideModal] = useState(false)
  const [selected_school, setSelectedSchool] = useState([])

  useEffect(() => {
    readRecord("/school", setSchools)
    let school_id = localStorage.getItem("school_id")
    if (school_id != null) {
      readRecord("/school/" + school_id, setOwn)
    } else {
      setUpdate(false)
    }
  }, [])

  const handleDetailCallback = id => {
    readRecord("/school/" + id, setSelectedSchool)
    setShowMapDetails(true)
  }

  const modalCallback = e => {
    setShowMapDetails(false)
  }

  if (typeof window !== "undefined") {
    const { MapContainer } = require("../../node_modules/react-leaflet/esm/MapContainer.js") // import it outside the function
    const { TileLayer, } = require("../../node_modules/react-leaflet/cjs/TileLayer.js")
    const { Marker } = require("../../node_modules/react-leaflet/cjs/Marker.js")
    const { Popup } = require("../../node_modules/react-leaflet/cjs/Popup.js")
    const { Icon } = require("../../node_modules/leaflet/src/layer/marker/Icon.js")
    let customIcon = new Icon({
      iconUrl: icon,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    if (own_school != null && update_render == true) {
      setStartingLat(own_school.school.latitude)
      setStartingLng(own_school.school.longitude)
      setZoom(13)
      setUpdate(false)
      console.log(own_school)
    }
    if (update_render == false) {
      return (
        <div>
          <div>
            {show_map_details ? (
              <CSSTransition in={slideModal} timeout={200} classNames="modal">
                <MapDetailModal
                  callback={modalCallback}
                  school={selected_school}
                />
              </CSSTransition>
            ) : null}
          </div>
          <Header />
          <div className="map-page">
            <div className="spacer" />
            <div id="map-container">
              <MapContainer
                center={[starting_lat, starting_lng]}
                zoom={starting_zoom}
                style={{ height: "85vh", width: "100vw" }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {schoolList.data
                  ? schoolList.data.map((school, idx) => {
                      return (
                        <Marker
                          position={[school.latitude, school.longitude]}
                          key={idx}
                          icon={customIcon}
                        >
                          <Popup div className="popup">
                            <u>{school.name}</u>
                            <br /> {school.address_line_1}
                            <br /> {school.town}
                            <br /> {school.postcode}
                            <br />
                            <br />{" "}
                            <input
                              value="See More"
                              type="submit"
                              className="submitButton"
                              onClick={() => {
                                handleDetailCallback(school.id)
                                setSlideModal(true)
                              }}
                            ></input>
                          </Popup>
                        </Marker>
                      )
                    })
                  : null}
              </MapContainer>
            </div>
          </div>
        </div>
      )
    } else return null
  }
}
