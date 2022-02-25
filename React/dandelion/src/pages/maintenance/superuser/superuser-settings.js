import React, { useEffect, useState, useRef } from "react"
import "../../../styles/App.scss"
import SideNav from "../../../components/sideNav"
import NodeInfoComponent from "../../../components/nodeInfoComponent"

export default function SuperuserSettings(props) {
  const [fetchedSchool, setSchool] = useState("")

  useEffect(() => {
    // TODO CHANGE + 1 TO LOGGED IN USER
    fetch("http://localhost:3000/schools/" + "GLA11", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setSchool(data))
  }, [])

  return (
    <div>
      <SideNav />
      <div className="settings-container">
        <div className="settings-content">
          <div className="settings-pane">
            <div className="school-image">
            
            </div>
            <div className="node-settings">
              {fetchedSchool ? (
                <NodeInfoComponent node={fetchedSchool.nodes} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
