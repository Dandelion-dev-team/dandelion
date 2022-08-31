import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import Header from "../../components/navigation/header"
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
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      let school_id = localStorage.getItem("school_id")
      setLogged(true)
    } else {
      navigate("/signin")
    }
  }, [])

  const populateUserPane = user => {
    setViewedUser(user)
    readRecord("/experiment_participant/" + user.user_id, setExperiments)
  }


  if (typeof window !== `undefined` && logged) {
    return (
      <div className="dandelion">
        <Header />
        <div className="page-container">
          <SideNav />
          <ToastContainer />
          <div className="main-content">
            <div className="content-area">
                <div className="left-panel">
                  <div className="panel-body">
                    <SchoolUserComponent
                        populateUserPane={populateUserPane}
                        reload={reload}
                        viewedUser={viewedUser}
                    />
                  </div>
                </div>
                <div className="right-panel">
                  {viewedUser ? (
                  <SchoolUserPane
                    user={viewedUser}
                    experiment_list={experiment_list}
                    setReload={setReload}
                    reload={reload}
                  />
                  ) : (
                      <div className="dandelion-hint">
                        &larr; Click a username to see the details or click the button &#8601; to create one or more new usernames
                        <br/><br/>
                        A new user is prompted to set their own password the first time they log in - you just need
                        to give them the username and the URL (dandelion.sruc.ac.uk)
                      </div>
                  )}
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
