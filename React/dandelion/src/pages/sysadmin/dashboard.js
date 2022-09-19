import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/sideNav"
import Header from "../../components/navigation/header"
import { navigate } from "gatsby";
import { verify_sysadmin_storage } from "../../utils/logins";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SuperuserDashboard(props) {
  const [logged, setLogged] = useState("");

  useEffect(() => {
    if (verify_sysadmin_storage() == true) {
      setLogged(true);
    } else {
      navigate("/signin");
    }
  }, [])
  if (typeof window !== `undefined` && logged) {
    return (
      <div className="dandelion">
        <Header />
        <div className="page-container">
        <SideNav />
        <ToastContainer />
        <div className="dashboard-container">
          <div className="content">
            <div className="students-pane">
              <div className="students-wrapper">
                <h3>WIDGET</h3>
              </div>
            </div>
            <div className="middle-pane">
              <div className="projects-widget">
                <h3>WIDGET</h3>
              </div>
              <div className="node-widget">
                <h3>WIDGET</h3>
              </div>
            </div>
          </div>
        </div>
          </div>
      </div>
    )
  } else return null;
}
