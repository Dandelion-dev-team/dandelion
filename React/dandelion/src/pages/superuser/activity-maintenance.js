import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../components/navigation/superUserSideNav"
import Header from "../../components/navigation/header"
import "../../styles/App.scss"
import ProjectPane from "../../components/panes/projectPane"
import ProjectComponent from "../../components/tables/superuserProjectTable"
import ActivityCreatedModal from "../../components/modals/activityCreatedModal"
import ActivityModal from "../../components/modals/activityModal"
import { navigate } from "gatsby"
import { verify_superuser_storage } from "../../utils/logins"
import { readRecord } from "../../utils/CRUD"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ProjectMaintenance(props) {
  const [editing_project, setEditingProject] = useState("")
  const [editing_experiments, setExperiments] = useState()
  const [modal_shown, setModalShown] = useState("")
  const [logged, setLogged] = useState("")

  const [showActivity, setShowActivity] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
      try {
        if (props.location.state.show_modal != null) {
          setModalShown(true)
        }
      } catch (e) {
        console.log("Error state not found")
      }
    } else {
      navigate("/signin")
    }
  }, [])

  const handleCallback = childData => {
    readRecord("/project/" + childData.project_id, setEditingProject)
    readRecord(
      "/project/" + childData.project_id + "/experiment",
      setExperiments
    )
  }

  const editActivity = project_id => {
    readRecord("/project/" + project_id, setData);
    setShowActivity(true)
  }

  const newActivity = () => {
    readRecord("/project/blank", setData);
    setShowActivity(true)
  }


  const modalCallback = prop => {
    setModalShown(false)
  }

  if (typeof window !== `undefined` && logged) {
    return (
      <div className="dandelion">
        {modal_shown ? <ActivityCreatedModal callback={modalCallback} /> : null}
        <Header />
        <div className="activity-maintenance page-container">
            <SideNav />
            <ToastContainer />
            <div className="main-content">
              <div className="content-area">
                  <div className="left-panel">
                    <div className="panel-body">
                        <ProjectComponent parentCallback={handleCallback} />
                    </div>
                  <div className="panel-footer">
                    <div className="dandelion-button-group">
                      <button
                        className="dandelion-button large-button"
                        onClick={() => {newActivity()}}
                      >
                        New Activity
                      </button>
                    </div>
                  </div>
                  </div>
                  <div className="right-panel">
                  <div className="panel-body">
                    {editing_project ? (
                      <ProjectPane
                        project={editing_project.project}
                        experiments={editing_experiments}
                        editActivity={editActivity}
                      />
                    ) : (
                          <div className="dandelion-hint">
                              &larr; Click an activity to see its details or click the button &#8601; to create a new one
                          </div>
                      )
                    }
                  </div>
              </div>
              </div>
            </div>
        </div>
        {data ?
          <ActivityModal
              show={showActivity}
              setShow={setShowActivity}
              project={data.project}
          />
          : null}
      </div>
    )
  } else {
    return null
  }
}
