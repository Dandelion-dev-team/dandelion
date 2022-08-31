import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import ExperimentCard from "../cards/experimentCard";
import EditUserModal from "../modals/editUserModal";
import ConfirmationModal from "../modals/confirmationModal"
import {updateRecord} from "../../utils/CRUD";

export default function SchoolUserPane(props) {

  const [showEditModal, setShowEditModal] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [confirmReset, setConfirmReset] = useState("")

  useEffect(() => {
    if (confirmReset === "YES") {
      let body = JSON.stringify({
        data: "reset"
      })
      console.log("YES")
      updateRecord("/user/reset/" + props.user.user_id, body)
    }
    console.log("CLOSING")
    setConfirmReset("")
    setShowConfirmReset(false)
  }, [confirmReset])

  const editUser = e => {
    setShowEditModal(true)
  }

  const resetPassword = () => {
    setShowConfirmReset(true)
  }

  return (
    <div className="panel-body">
      {props.user ? (
        <div className="scrollable-container">
          <div className="scrollable-header">
            <h2>{props.user.username}</h2>
          </div>
          <div className="scrollable-content">
            <div className="scrollable-inner">
              {props.user.notes ?
                    <p>{props.user.notes}</p>
                  :
                  <p>No notes for this user</p>
              }
              <div className="experiments-container">
                <h3>Taking part in</h3>
                {props.experiment_list.data ? props.experiment_list.data.map(e => (
                  <ExperimentCard experiment={e}/>
                )) :
                <p>This user is not assigned to any experiments</p>
                }
              </div>
            </div>
          </div>
          <div className={"scrollable-footer"}>
            <div className={"btn-container"}>
              <button className={"dandelion-button large-button"}
                      onClick={() => {
                        editUser(props.user)
                      }}
                      >
                Edit
              </button>
              <button className={"dandelion-button large-button"}
                      onClick={() => {
                        resetPassword()
                      }}
                      >
                Reset password
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <EditUserModal
          show={showEditModal}
          setShow={setShowEditModal}
          user={props.user}
          setReload={props.setReload}
          reload={props.reload}
      />
      <ConfirmationModal
          show={showConfirmReset}
          setShow={setShowConfirmReset}
          message="This will reset the user's password. They will be prompted to set a new password when they next try to log in."
          question="Do you want to proceed?"
          no="No"
          yes="Yes"
          setConfirmed={setConfirmReset}
      />
    </div>
  )
}
