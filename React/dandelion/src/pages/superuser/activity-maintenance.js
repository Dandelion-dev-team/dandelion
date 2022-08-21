import React, { useEffect, useState, useRef } from "react"
import SideNav from "../../components/navigation/superUserSideNav"
import Header from "../../components/navigation/header"
import "../../styles/App.scss"
import ProjectPane from "../../components/panes/projectPane"
import ProjectComponent from "../../components/tables/superuserProjectTable"
import ActivityModal from "../../components/modals/activityModal"
import ViewActivityModal from "../../components/modals/viewActivityModal"
import InvitationModal from "../../components/modals/invitationModal"
import { navigate } from "gatsby"
import { verify_superuser_storage } from "../../utils/logins"
import { readRecord } from "../../utils/CRUD"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ProjectMaintenance(props) {
    const [editing_project, setEditingProject] = useState("")
    const [editing_experiments, setExperiments] = useState("")
    const [logged, setLogged] = useState("")

    const [showActivity, setShowActivity] = useState(false)
    const [showViewActivity, setShowViewActivity] = useState(false)
    const [showInvitation, setShowInvitation] = useState(false)
    const [data, setData] = useState(null)
    const [reload, setReload] = useState(false)
    const [reloadList, setReloadList] = useState(false)

    useEffect(() => {
        if (verify_superuser_storage() == true) {
            setLogged(true)
        } else {
            navigate("/signin")
        }
        if (props.location.state.project_id) {
            loadProjectData(props.location.state.project_id)
        }
    }, [])

    const loadProjectData = project_id => {
        setReloadList(!reloadList)
        readRecord("/project/" + project_id, setEditingProject)
        readRecord("/project/" + project_id + "/experiment", setExperiments)
    }

    const editActivity = project_id => {
        readRecord("/project/" + project_id, setData);
        setShowActivity(true)
    }

    const newActivity = () => {
        readRecord("/project/blank", setData);
        setShowActivity(true)
    }

    const inviteSchools = project_id => {
        setShowInvitation(true)
    }

  if (typeof window !== `undefined` && logged) {
    return (
      <div className="dandelion">
        <Header />
        <div className="activity-maintenance page-container">
            <SideNav />
            <ToastContainer />
            <div className="main-content">
              <div className="content-area">
                  <div className="left-panel">
                    <div className="panel-body">
                        <ProjectComponent
                            loadProjectData={loadProjectData}
                            reload={reloadList}
                        />
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
                        viewActivity={setShowViewActivity}
                        inviteSchools={inviteSchools}
                        reload={loadProjectData}
                      />
                    ) : (
                          <div className="dandelion-hint">
                              An activity is a way of grouping related experiments together.
                              <br/><br/>
                              &larr; Click an activity in the list to see its details or click the button &#8601; to create a new one
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
        {editing_project && editing_experiments.data ?
          <ViewActivityModal
              show={showViewActivity}
              setShow={setShowViewActivity}
              project={editing_project.project}
              experiments={editing_experiments.data.filter(
                  experiment => experiment.status === 'active'
                  ).filter(
                  experiment => editing_project.project.owner_id === experiment.owner_id)}
          />
          : null}
        {editing_project ?
          <InvitationModal
              show={showInvitation}
              setShow={setShowInvitation}
              project={editing_project.project}
              reload={reload}
              setReload={setReload}
          />
          : null}
      </div>
    )
  } else {
    return null
  }
}
