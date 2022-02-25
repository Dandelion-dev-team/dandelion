import React, { useEffect, useState, useRef } from "react"
import "../../../styles/App.scss"
import SideNav from "../../../components/sideNav"
import SchoolUserComponent from "../../../components/schoolUserComponent"
import SchoolUserPane from "../../../components/schoolUserPane"

export default function SchoolUserMaintenance(props) {
  const [userList, setUsers] = useState("")
  const [editing_user, setEditingUser] = useState("")

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/school-users", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setUsers(Array.from(data)))
  }, [])

  const handleCallback = childData => {
    setEditingUser(childData)
  }

  return (
    <div>
      <SideNav />
      <div className="school-user-container">
        <div className="school-content">
          <div className="table-wrapper">
            <div className="table">
              <SchoolUserComponent parentCallback={handleCallback} />
            </div>
            <div className="school-pane">
              {console.log(editing_user)}

              <SchoolUserPane dataProp={editing_user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
