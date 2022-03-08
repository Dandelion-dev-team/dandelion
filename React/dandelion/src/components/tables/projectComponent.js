import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
//import { readRecord } from "../utils/CRUD"

export default function ProjectComponent(props) {
  const [projects, setProject] = useState(0)
  //TESTED
  useEffect(() => {
    //readRecord("/projects", setProject)
    //TESTED
    // Update the document title using the browser API
    fetch("http://localhost:3000/projects", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setProject(data))
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
        <button 
        className="submitButton"
        onClick={() => {
          navigate("/activities/create-activity/enter-details")
        }}>Add Activity</button>
      </div>
    </div>
  )
}
