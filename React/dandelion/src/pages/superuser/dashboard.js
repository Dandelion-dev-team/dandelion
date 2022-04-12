import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import { Link, navigate } from "gatsby";
import { verify_superuser_storage } from "../../utils/logins";
import LinkIcon from '@mui/icons-material/Link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Placeholder from "../../images/node-placeholder.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <ToastContainer/>
          <div className="content">
            <div className="students-pane">
              <div className="students-wrapper">
                <h3>Students</h3>
              </div>
            </div>
            <div className="middle-pane">
              <div className="projects-widget">
                <h3>Activities</h3>
              </div>
              <div className="node-widget">
                <h3>Node</h3>
                <img src={Placeholder}></img>
              </div>
            </div>
            <div className="help-pane">
              <h3>Help</h3>
              <div className="list">
                <a className="dandelion-link-item" href="https://dandelion.scot/" target={"_blank"}>
                  <h3>Project Overview</h3>
                  <LinkIcon className="link-icon" />
                </a>
                <a className="dandelion-link-item" href="https://dandelion.scot/" target={"_blank"}>
                  <h3>Node FAQ</h3>
                  <LinkIcon className="link-icon" />
                </a>
                <a className="dandelion-link-item" href="https://dandelion.scot/" target={"_blank"}>
                  <h3>Node upkeep</h3>
                  <LinkIcon className="link-icon" />
                </a>
                <a className="dandelion-link-item" href="https://dandelion.scot/" target={"_blank"}>
                  <h3>Dandelion Project Plan</h3>
                  <LinkIcon className="link-icon" />
                </a>
                
              </div>
              <div className="calendar">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null;
}