import React, { useEffect, useState } from "react"
import "../styles/App.scss"
import { readRecord } from "../utils/CRUD"

export default function ProjectComponent(props) {
  const [projects, setProject] = useState(0)
  //TESTED
  useEffect(() => {
      readRecord("/projects", setProject)
  }, [])

  const editAuth = project => {
    props.parentCallback(project)
  }

  var isActive = true
  var className = isActive ? "active" : '';

  return (
    <div className="project-table">
      <table className="projectList">
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
            <th>Type</th>
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
                <td>{project.owner.substring(0, 7)}</td>
                <td>{project.type}</td>
              </tbody>
            ))
          : null}
      </table>
      <div className="add-btn">
        <button className="submitButton">Add Project</button>
      </div>
    </div>
  )
}
