import React from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import L from "leaflet"
import { Map, MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import icon from "../images/marker.png"

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [36,36],
  iconAnchor: [18,18]
})

L.Marker.prototype.options.icon = DefaultIcon

export default function MapPage(props) {
  const position = [56.02339153090658, -3.8086957846592067]

  if (typeof window !== "undefined") {
    return (
      <div>
        <Header/>
        <div className="map-page">
          <div className="spacer"/>
          <div className="map-container">
            <MapContainer
              center={[56.02339153090658, -3.8086957846592067]}
              zoom={13}
              style={{ height: "85vh", width: "100vw" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[56.02339153090658, -3.8086957846592067]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    )
  }
}
