import React, { useEffect, useState } from "react"
import "../../../styles/App.scss"
import SideNav from "../../../components/sideNav"
import Alert from "../../../components/alertComponent";

export default function SuperuserAlerts(props) {
  const [alertList, setAlerts] = useState("");
  useEffect(() => {
      // Update the document title using the browser API
      fetch("http://localhost:3000/alerts", {
        method: "GET",
        headers: new Headers({
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0,
        })
      }).then(response => response.json())
        .then(
          data => setAlerts(data))
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
