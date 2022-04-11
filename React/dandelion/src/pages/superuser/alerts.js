import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import Alert from "../../components/cards/alertCard";
import { readRecord } from "../../utils/CRUD";
import { verify_superuser_storage } from "../../utils/logins";
import { navigate } from "gatsby";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
          <ToastContainer/>
          <div className="this-month">
            <div className="month-wrapper">
              <h3>This month</h3>
            </div>
            <div className="calendar"> 
              <Calendar/>
            </div>
          </div>
          <div className="content">
            <div className="alerts-wrapper">
              <h3>Alerts</h3>
            </div>
            {alertList ? alertList.data.map(node => (
              <Alert alert={node} />
            )) : null}
          </div>
          <div className="content">
            <div className="alerts-wrapper">
              <h3>News</h3>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null;
}