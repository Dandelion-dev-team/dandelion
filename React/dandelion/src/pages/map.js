import React, { useEffect, useState } from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import { readRecord } from "../utils/CRUD"
import L from "leaflet"
import { Map, MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MapDetailModal from "../components/modals/mapDetailModal"
import icon from "../images/marker.png"
import { HelpOutline } from "@mui/icons-material"
import { motion } from "framer-motion"
import { CSSTransition } from "react-transition-group"

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

L.Marker.prototype.options.icon = DefaultIcon

export default function MapPage(props) {
  const [schoolList, setSchools] = useState([])
  const [show_map_details, setShowMapDetails] = useState("")
  const [slideModal, setSlideModal] = useState(false)
  const [selected_school, setSelectedSchool] = useState([])
  const [starting_lat, setStartingLat] = useState(57.40040961518596);
  const [starting_lng, setStartingLng] = useState(-4.175709371988957);
  const [starting_zoom, setZoom] = useState(6.5);
  const [own_school, setOwn] = useState(null);
  const [update_render, setUpdate] = useState(true);

  const handleDetailCallback = id => {
    readRecord("/school/" + id, setSelectedSchool)
    setShowMapDetails(true)
  }

  useEffect(() => {
    readRecord("/school", setSchools);
    let school_id = localStorage.getItem("school_id");
    if(school_id != null){
      readRecord("/school/" + school_id, setOwn)
    } else 
    {
      setUpdate(false)
    }
  }, [])

  const modalCallback = e => {
    setShowMapDetails(false)
  }


  if (typeof window !== "undefined") {
    return (
      <div>
        {/* <div>
          {show_map_details ? (
            <CSSTransition in={slideModal} timeout={200} classNames="modal">
              <MapDetailModal callback={modalCallback} school={selected_school}/>
            </CSSTransition>
          ) : null}
        </div>

        <Header />
        <div className="map-page">
          <div className="spacer" />

          <div id="map-container">
            <MapContainer
              center={[57.40040961518596, -4.175709371988957]}
              zoom={6.5}
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
        </div> */}
      </div>
    )
  }
}
