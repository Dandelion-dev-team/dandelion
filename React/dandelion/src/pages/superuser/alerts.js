import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import Alert from "../../components/cards/alertCard";
import { readRecord } from "../../utils/CRUD";
import { verify_superuser_storage } from "../../utils/logins";
import { navigate } from "gatsby";

export default function SuperuserAlerts(props) {
  const [alertList, setAlerts] = useState("");
  const [logged, setLogged] = useState("");
  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true);
      readRecord("/node_alert", setAlerts)
    } else {
      navigate("/signin");
    }
  }, [])
  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        <SideNav />
        <div className="alerts-container">
          <div className="content">
            <div className="alerts-wrapper">
              <h3>Alerts</h3>
            </div>
            {alertList ? alertList.data.map(node => (
              <Alert alert={node} />
            )) : null}
          </div>
        </div>
      </div>
    )
  } else return null;
}