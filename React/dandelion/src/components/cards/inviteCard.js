import React from "react"
import "../../styles/App.scss"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import Cookies from "universal-cookie"
import { toast } from "react-toastify"
import {
  deleteRecord,
  createRecord,
  createRecordNavigate,
} from "../../utils/CRUD"
export default function Alert(props) {
  const accept_invite = status => {
    let body = JSON.stringify({
      status: status,
    })
    const cookies = new Cookies()
    fetch(
      process.env.API_URL +
        "/project_partner/update_invitation/" +
        props.alert.id,
      {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
          "X-CSRF-TOKEN": cookies.get("csrf_access_token"),
        }),
        body: body,
      }
    ).then(window.location.reload(false))
  }
  return (
    <div className="inviteContainer">
      <div className="top-divider">
        <hr />
      </div>
      <div className="row">
        <div className="text-content">
          <h3>{props.alert.project_title}</h3>
          <h4>{props.alert.inviting_school_name}</h4>
        </div>
        <div className="icon-div">
          <CloseIcon
            className="close-icon"
            onClick={() => {
              accept_invite("declined")
            }}
          />
          <CheckIcon
            className="check-icon"
            onClick={() => {
              accept_invite("accepted")
            }}
          />
        </div>
      </div>
      <div className="bottom-divider">
        <hr />
      </div>
    </div>
  )
}
