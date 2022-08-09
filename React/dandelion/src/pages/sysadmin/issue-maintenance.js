import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../components/navigation/sysadminSideNav"
import Header from "../../components/navigation/header"
import "../../styles/App.scss"
import TagComponent from "../../components/tables/tagComponent"
import { createRecord, deleteRecord, readRecord, updateRecord } from "../../utils/CRUD"
import { verify_sysadmin_storage } from "../../utils/logins"
import { navigate } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Cookies from "universal-cookie"
// import SideNav from "../../components/navigation/superUserSideNav";

export default function IssueMaintenance(props) {
  const [logged, setLogged] = useState("")
  const [issueList, setIssue] = useState(0)

  useEffect(() => {
    if (verify_sysadmin_storage() == true) {
      setLogged(true)
      readRecord("/issue", setIssue)
    } else {
      navigate("/signin")
    }
  }, [])

  const CloseIssue = issue => {
    console.log(issue.id)
    let body = JSON.stringify({
      status: "closed",
    })
    const cookies = new Cookies()
    return fetch(process.env.API_URL + "/issue/close/" + issue.id, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
        "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
      }),
      body: body
    }).then(response => {
      if (response.status !== 200) {
        toast.error("Failed to update.")
      } else {
        window.location.reload(false)
      }
    })
  }

  const IssueTable = issue => {
    return (
      <div className="recordTable">
        <table className="tableList">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Reported On</th>
              <th>Steps to Reproduce</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
  
          {issueList
            ? issueList.issues.map(issue => (
                <tbody key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.name}</td>
                  <td>{issue.reported_date}</td>
                  <td>{issue.steps_to_reproduce}</td>
                  <td>{issue.priority}</td>
                  <td>{issue.status}</td>

                  <td>
                    <div className="submit-btn">
                      <input
                        type="submit"
                        className="submitButton"
                        value="Close"
                        onClick={() => {
                          CloseIssue(issue)
                        }}
                      ></input>
                    </div>
                  </td>
                </tbody>
              ))
            : null}
        </table>
      </div>
    )
  }
  if (logged) {
    return (
      <div className="dandelion">
        <Header />
        <div className="page-container">
          <SideNav />
          <ToastContainer />
          <div className="main-content">
            <div className="content-area">
              <div className="left-panel">
                <div className="table">
                  <IssueTable/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
