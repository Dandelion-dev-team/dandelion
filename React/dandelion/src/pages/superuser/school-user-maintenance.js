import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import SchoolUserComponent from "../../components/tables/schoolUserComponent"
import SchoolUserPane from "../../components/panes/schoolUserPane"
import { readRecord } from "../../utils/CRUD"
export default function SchoolUserMaintenance(props) {
  const [userList, setUsers] = useState("")
  const [editing_user, setEditingUser] = useState("")

  useEffect(() => {
      //readRecord("/school-users", setUsers)
  }, [])

  const handleCallback = childData => {
    setEditingUser(childData)
  }

  if (typeof window !== `undefined`) {
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
  } else {return null}
}
