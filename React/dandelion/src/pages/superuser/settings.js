import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import NodeInfoComponent from "../../components/cards/nodeInfoCard"
import { readRecord } from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import { navigate } from "gatsby"
export default function SuperuserSettings() {
  const [fetchedSchool, setSchool] = useState("")
  const [logged, setLogged] = useState("");

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      let school_id = localStorage.getItem("school_id");
      readRecord("/school/" + school_id, setSchool);
      setLogged(true);
    } else {
      navigate("/signin");
    }
  }, [])

  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        <SideNav />
        <div className="settings-container">
          <div className="settings-content">
            {fetchedSchool ? (
              <h3>{fetchedSchool.school.name}</h3>) : null}
            <div className="settings-pane">
              <div className="school-image">

              </div>
              <div className="node-settings">
                {fetchedSchool ? (
                  <NodeInfoComponent node={fetchedSchool.school.nodes} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else { return null }
}