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
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export default function SuperuserDashboard(props) {
  const [logged, setLogged] = useState("")
  const [projectList, setProjectList] = useState([])
  const [inviteList, setInvites] = useState([])
  const [school_users, setSchoolUsers] = useState([])

  const [allocated, setAllocated] = useState(0);
  const [active, setActive] = useState(0);
  const [other, setOther] = useState(0);

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
      let schoolId = localStorage.getItem("school_id")
      readRecord("/project_partner/byschool/" + schoolId, setProjectList)
      readRecord("/project_partner/" + schoolId, setInvites)
      readAdminRecord("/user/byschool/" + schoolId).then(response => {
        setSchoolUsers(response)
        let allocated_num = 0
        let active_num = 0
        let other = 0
        response.users.forEach(user => {
          if (user.status == "active") {
            active_num = active_num + 1
          } else if (user.status == "unallocated") {
            allocated_num = allocated_num + 1
          } else {
            other = other + 1
          }
        })
        setAllocated(allocated_num)
        setActive(active_num);
        setOther(other)
      })
    } else {
      navigate("/signin")
    }
  }, [])

  const data = {
    labels: ["On a Project", "Unallocated", "Allocated"],
    datasets: [
      {
        label: "My First Dataset",
        data: [other, allocated, active],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        align: "center",
      },
    },
  }

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
                <div className="chart">
                  <Doughnut data={data} options={options} />
                </div>
                {/* <hr className="linebreak" /> */}
                <div className="students-list">
                  <table>
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
                            <img src={project.image_thumb} />
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
                  // href="https://dandelion.scot/"
                  target={"_blank"}
                >
                  <div className="item-title">
                    <h3>Coming Soon</h3>
                    <LinkIcon className="link-icon" />
                  </div>
                </a>
                {/* <a
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
                </a> */}
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
