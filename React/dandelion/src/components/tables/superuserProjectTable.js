import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"

export default function ProjectComponent(props) {
  const [projects, setProject] = useState(0)

  //TESTED
  useEffect(() => {
    let school_id = localStorage.getItem("school_id")
    readRecord("/project_partner/byschool/" + school_id, setProject)
  }, [])

  const editAuth = project => {
    props.parentCallback(project)
  }

  var isActive = true
  var className = isActive ? "active" : ""

  return (
    <div className="project-table">
        <table className="projectList">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>

          {projects
            ? projects.map(project => (
                <tbody
                  key={projects.id}
                  className={className}
                  onClick={() => {
                    editAuth(project)
                    isActive = true
                  }}
                >
                  <td>{project.title}</td>
                </tbody>
              ))
            : null}
        </table>
      <div className="add-btn">
        <button
          className="submitButton"
          onClick={() => {
            if (typeof window !== `undefined`) {
              navigate("/activities/create-activity/enter-details")
            }
          }}
        >
          Add Activity
        </button>
      </div>
    </div>
  )
}
