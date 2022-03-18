import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import { navigate } from "gatsby";
import { verify_superuser_storage } from "../../utils/logins";
export default function SuperuserDashboard(props) {
  const [logged, setLogged] = useState("");

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true);
    } else {
      navigate("/signin");
    }
  }, [])
  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        <SideNav />
        <div className="dashboard-container">
          <div className="content">
            <div className="students-pane">
              <div className="students-wrapper">
                <h3>Students</h3>
              </div>
            </div>
            <div className="middle-pane">
              <div className="projects-widget">
                <h3>Projects</h3>
              </div>
              <div className="node-widget">
                <h3>Node</h3>
              </div>
            </div>
            <div className="help-pane">
              <h3>Help</h3>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null;
}