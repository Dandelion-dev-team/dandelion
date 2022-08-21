import React from "react"
import "../../styles/App.scss"
import {navigate} from "gatsby";

export default function Invitation(props) {

    const goToActivity = () => {
        navigate("/superuser/activity-maintenance", {
          state: {
            project_id: props.alert.project_id
          },
        })
    }

  return (
    <div className="alert invitation" onClick={goToActivity}>
          <b>{props.alert.inviting_school_name}</b> invites you to join their
            activity, <b>{props.alert.project_title}</b>. Click for details.
    </div>
  )
}
