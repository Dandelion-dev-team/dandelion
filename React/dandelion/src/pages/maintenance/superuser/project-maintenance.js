import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../../components/sideNav"
import "../../../styles/App.scss"
import ProjectPane from "../../../components/projectPane"
import ProjectComponent from "../../../components/projectComponent"
import { readRecord } from "../../../utils/CRUD"

export default function ProjectMaintenance(props) {
  const [projectList, setProjects] = useState(0)
  const [editing_project, setEditingProject] = useState("")

  useEffect(() => {
      readRecord("/projects", setProjects)
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
