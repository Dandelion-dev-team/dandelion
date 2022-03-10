import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../components/navigation/superUserSideNav"
import "../../styles/App.scss"
import ProjectPane from "../../components/panes/projectPane"
import ProjectComponent from "../../components/tables/projectComponent"
import ActivityCreatedModal from "../../components/Modals/activityCreatedModal"

export default function ProjectMaintenance(props) {
  const [editing_project, setEditingProject] = useState("")
  const [modal_shown, setModalShown] = useState("")

  useEffect(() => {
    setModalShown(true);
  }, [])

  const handleCallback = childData => {
    setEditingProject(childData)
  }

  const modalCallback = prop => {
    console.log("called + " + prop)
    setModalShown(false);
  } 

  if (typeof window !== `undefined`) {
  return (
    <>
      {modal_shown ? <ActivityCreatedModal callback={modalCallback} />
        : null}
      <SideNav />
      <div className="project-container">
        <div className="project-content">
          <div className="content-wrapper">
            <div className="table">
              <ProjectComponent parentCallback={handleCallback} />
            </div>
            <div className="project-pane">
              <ProjectPane dataProp={editing_project} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
  } else {return null}
}