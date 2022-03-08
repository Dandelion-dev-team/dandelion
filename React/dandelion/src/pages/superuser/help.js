import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
export default function superuserHelp(props) {
  if (typeof window !== `undefined`) {
  return (
    <div>
      <SideNav />
      <div className="help-container">
        <div className="help-content">
          
        </div>
      </div>
    </div>
  )
  } else {return null}
}