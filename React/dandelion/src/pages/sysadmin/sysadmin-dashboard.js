import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import { verify_superuser_storage } from "../../utils/logins";
import { navigate } from "gatsby";

export default function SysadminDashboard(props) {
  const [render, setRender] = useState("");
  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setRender(true);
    } else {
      navigate("/signin");
    }
  }, [])

  if (typeof window !== `undefined` && render) {
    return (
      <div>
        <SysSideNav />
        <div className="sys-dashboard-container">
          <div className="content">
            <h3>Sysadmin Dashboard</h3>
          </div>
        </div>
      </div>
    )
  } else return null;
}
