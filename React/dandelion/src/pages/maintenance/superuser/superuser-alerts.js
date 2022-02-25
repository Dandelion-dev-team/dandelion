import React, { useEffect, useState } from "react"
import "../../../styles/App.scss"
import SideNav from "../../../components/sideNav"
import Alert from "../../../components/alertComponent";
import { readRecord } from "../../../utils/CRUD";

export default function SuperuserAlerts(props) {
  const [alertList, setAlerts] = useState("");
  useEffect(() => {
       readRecord("/alerts", setAlerts)
    }, []);
  return (
    <div>
      <SideNav />
      <div className="alerts-container">
        <div className="content">
          <div className="alerts-wrapper">
            <h3>Alerts</h3>
          </div>
          {alertList ? alertList.map(node => (
              <Alert alert={node}/>
          )) : null}
        </div>
      </div>
    </div>
  )
}
