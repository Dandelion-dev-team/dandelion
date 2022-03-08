import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import NodeInfoComponent from "../../components/cards/nodeInfoCard"
import { readRecord } from "../../utils/CRUD"
export default function SuperuserSettings() {
  const [fetchedSchool, setSchool] = useState("")

  useEffect(() => {
    // TODO CHANGE + 1 TO LOGGED IN USER
    readRecord("/schools/" + "GLA11", setSchool);
  }, [])
  if (typeof window !== `undefined`) {
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
  }else {return null}
}