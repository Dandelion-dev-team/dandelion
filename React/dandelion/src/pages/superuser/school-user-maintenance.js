import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import SchoolUserComponent from "../../components/tables/schoolUserComponent"
import SchoolUserPane from "../../components/panes/schoolUserPane"
import { readRecord } from "../../utils/CRUD"
import { verify_superuser_storage } from "../../utils/logins"
import { navigate } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function SchoolUserMaintenance(props) {
  const [userList, setUsers] = useState("")
  const [viewedUser, setViewedUser] = useState("")
  const [logged, setLogged] = useState("")
  const [experiment_list, setExperiments] = useState([])

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      let school_id = localStorage.getItem("school_id")
      setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  const handleCallback = childData => {
    setViewedUser(childData)
    readRecord("/experiment_participant/" + childData.user_id, setExperiments)
  }

  

  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        <SideNav />
        <ToastContainer />
        <div className="school-user-container">
          <div className="school-content">
            <div className="table-wrapper">
              <div className="table">
                <SchoolUserComponent parentCallback={handleCallback} />
              </div>
              <div className="school-pane">
                <SchoolUserPane
                  dataProp={viewedUser}
                  experiment_list={experiment_list}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
