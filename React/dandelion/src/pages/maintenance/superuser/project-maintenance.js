import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../../components/sideNav"
import "../../../styles/App.scss"
import ProjectPane from "../../../components/projectPane"
import ProjectComponent from "../../../components/projectComponent"

export default function ProjectMaintenance(props) {
  const [projectList, setProjects] = useState(0)
  const [editing_project, setEditingProject] = useState("")

  useEffect(() => {
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
      .then(data => setProjects(Array.from(data)))
  }, [])

  const handleCallback = childData => {
    setEditingProject(childData)
  }

  return (
    <div>
      <SideNav />
      <div className="project-container">
        <div className="project-content">
          <div className="content-wrapper">
            <div className="table">
            <ProjectComponent parentCallback={handleCallback} />
            </div>
            <div className="project-pane">
              <ProjectPane dataProp={editing_project}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
