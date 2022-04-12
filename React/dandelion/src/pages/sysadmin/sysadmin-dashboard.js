import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SysSideNav from "../../components/navigation/sysadminSideNav"
import { verify_sysadmin_storage } from "../../utils/logins";
import { navigate } from "gatsby";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SysadminDashboard(props) {
  const [render, setRender] = useState("");
  useEffect(() => {
    if (verify_sysadmin_storage() == true) {
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
