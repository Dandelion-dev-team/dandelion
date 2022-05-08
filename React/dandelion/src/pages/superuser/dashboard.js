import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import { Link, navigate } from "gatsby"
import { verify_superuser_storage } from "../../utils/logins"
import LinkIcon from "@mui/icons-material/Link"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import Placeholder from "../../images/node-placeholder.png"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { readAdminRecord, readRecord } from "../../utils/CRUD"
import InviteCard from "../../components/cards/inviteCard"
export default function SuperuserDashboard(props) {
  const [logged, setLogged] = useState("")
  const [projectList, setProjectList] = useState([])
  const [inviteList, setInvites] = useState([])
  const [school_users, setSchoolUsers] = useState([])
  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
      let schoolId = localStorage.getItem("school_id")
      readRecord("/project_partner/byschool/" + schoolId, setProjectList)
      readRecord("/project_partner/" + schoolId, setInvites)
      readRecord("/user/byschool/" + schoolId, setSchoolUsers)
    } else {
      navigate("/signin")
    }
  }, [])

  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        <SideNav />
        <div className="dashboard-container">
          <ToastContainer />
          <div className="content">
            <div className="students-pane">
              <div className="students-wrapper">
                <h3>Students</h3>
                <div className="chart"></div>
                <hr className="linebreak" />
                <div className="students-list">
                <table >
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    {school_users.users
                      ? school_users.users.map(friend => (
                          <tbody key={friend.user_id}>
                            <td>{friend.user_id}</td>
                            <td>{friend.username}</td>
                          </tbody>
                        ))
                      : null}
                  </table>
                </div>
                  
              </div>
            </div>
            <div className="middle-pane">
              <div className="projects-widget">
                <div className="title">
                  <h3>Your Activities</h3>
                </div>
                <div className="activity-list">
                  {projectList
                    ? projectList.map(project => (
                        <div className="activity">
                          <div className="img">
                            {/* <img src={project.image_thumb} /> */}
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Chuck_Liddell_2010_%28cropped%29.jpg/1200px-Chuck_Liddell_2010_%28cropped%29.jpg" />
                          </div>
                          <div className="name">
                            <h3>{project.title}</h3>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="node-widget">
                <h3>Invites</h3>
                <div className="invite-list">
                  {inviteList.data ? (
                    inviteList.data.length > 0 ? (
                      inviteList.data.map(invite => (
                        <InviteCard alert={invite} />
                      ))
                    ) : (
                      <h3>No Pending Invites.</h3>
                    )
                  ) : null}
                </div>
              </div>
            </div>
            <div className="help-pane">
              <h3>Help</h3>
              <div className="list">
                <a
                  className="dandelion-link-item"
                  href="https://dandelion.scot/"
                  target={"_blank"}
                >
                  <div className="item-title">
                    <h3>Project Overview</h3>
                    <LinkIcon className="link-icon" />
                  </div>
                </a>
                <a
                  className="dandelion-link-item"
                  href="https://dandelion.scot/"
                  target={"_blank"}
                >
                  <div className="item-title">
                    <h3>Node FAQ</h3>
                    <LinkIcon className="link-icon" />
                  </div>
                </a>
                <a
                  className="dandelion-link-item"
                  href="https://dandelion.scot/"
                  target={"_blank"}
                >
                  <div className="item-title">
                    <h3>Node upkeep</h3>
                    <LinkIcon className="link-icon" />
                  </div>
                </a>
                <a
                  className="dandelion-link-item"
                  href="https://dandelion.scot/"
                  target={"_blank"}
                >
                  <div className="item-title">
                    <h3>Dandelion Project Plan</h3>
                    <LinkIcon className="link-icon" />
                  </div>
                </a>
              </div>
              <div className="calendar">
                {/* <div className="superuser-calendar">
                  <Calendar />

                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
