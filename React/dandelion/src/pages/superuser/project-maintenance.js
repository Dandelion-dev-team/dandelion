import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../components/navigation/superUserSideNav"
import "../../styles/App.scss"
import ProjectPane from "../../components/panes/projectPane"
import ProjectComponent from "../../components/tables/projectComponent"
import ActivityCreatedModal from "../../components/modals/activityCreatedModal"
import { navigate } from "gatsby"
import { verify_superuser_storage } from "../../utils/logins"

export default function ProjectMaintenance(props) {
  const [editing_project, setEditingProject] = useState("")
  const [modal_shown, setModalShown] = useState("")
  const [logged, setLogged] = useState("");

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true);
      try {
        if (props.location.state.show_modal != null) {
          setModalShown(true);
        }
      } catch (e) {
        console.log('Error state not found')
      }
    } else {
      navigate("/signin");
    }
  }, [])

  const handleCallback = childData => {
    setEditingProject(childData)
  }

  const modalCallback = prop => {
    setModalShown(false);
  }

  if (typeof window !== `undefined` && logged) {
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
  } else { return null }
}
