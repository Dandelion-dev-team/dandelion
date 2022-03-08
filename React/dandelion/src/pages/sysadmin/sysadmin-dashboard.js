import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SysSideNav from "../../components/navigation/sysadminSideNav"

export default function superuserDashboard(props) {
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
}
