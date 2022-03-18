import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import SchoolUserComponent from "../../components/tables/schoolUserComponent"
import SchoolUserPane from "../../components/panes/schoolUserPane"
import { readRecord } from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import { navigate } from "gatsby"
export default function SchoolUserMaintenance(props) {
  const [userList, setUsers] = useState("")
  const [editing_user, setEditingUser] = useState("")
  const [logged, setLogged] = useState("");


  useEffect(() => {
    if (verify_superuser_storage() == true) {
      //readRecord("/school-users", setUsers)
      setLogged(true);
    } else {
      navigate("/signin");
    }
  }, [])

  const handleCallback = childData => {
    setEditingUser(childData)
  }

  if (typeof window !== `undefined` && logged) {
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
              <SchoolUserPane dataProp={editing_user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  } else {return null}
}
