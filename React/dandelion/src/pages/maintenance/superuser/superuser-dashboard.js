import React, { useEffect, useState, useRef } from "react"
import "../../../styles/App.scss"
import SideNav from "../../../components/sideNav"

export default function superuserDashboard(props) {
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
}
