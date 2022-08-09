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
    <div className="project-table dandelion-component scrollable-container">
      <div className="scrollable-header">
        <h2>
          Your activities
        </h2>
        <h4>Title</h4>
      </div>
      <div className="dandelion-table scrollable-content">
        <table className="projectList">
            <tbody>
              {projects
                ? projects.map(project => (
                    <tr
                      key={projects.id}
                      className={className}
                      onClick={() => {
                        editAuth(project)
                        isActive = true
                      }}
                    >
                      <td>{project.title}</td>
                    </tr>
                  ))
                : null}
            </tbody>
        </table>
      </div>
    </div>
  )
}
