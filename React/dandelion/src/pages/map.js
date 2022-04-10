import React, { useEffect, useState } from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import { readRecord } from "../utils/CRUD"

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   iconSize: [36, 36],
//   iconAnchor: [18, 18],
// })

// L.Marker.prototype.options.icon = DefaultIcon

export default function MapPage(props){
  const [starting_lat, setStartingLat] = useState(57.40040961518596);
  const [starting_lng, setStartingLng] = useState(-4.175709371988957);
  const [starting_zoom, setZoom] = useState(6.5);
  if (typeof window !== "undefined") {
    const {MapContainer} = require("../../node_modules/react-leaflet/esm/MapContainer.js"); // import it outside the function
    const {TileLayer} = require("../../node_modules/react-leaflet/cjs/TileLayer.js");
    return (
      <div>
        <Header />
        <div className="map-page">
          <div className="spacer"/>
            <div id="map-container">
              <MapContainer
                 center={[starting_lat, starting_lng]}
                 zoom={starting_zoom}
                 style={{ height: "85vh", width: "100vw" }}>
                 <TileLayer
                   attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
              </MapContainer>
            </div>
        </div>
      </div>
             )
  } else return null
}