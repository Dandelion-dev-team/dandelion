import React from "react";
import "../../styles/App.scss";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { deleteRecord } from "../../utils/CRUD";
export default function Alert(props) {
    return (
        <div className="inviteContainer">
            <div className="top-divider">
                <hr />
            </div>
            <div className="row">
                {console.log(props.alert)}
                <div className="text-content">
                    <h3>{props.alert.project_title}</h3>
                    <h4>{props.alert.inviting_school_name}</h4>
                </div>
                <div className="icon-div">
                    <CloseIcon className="close-icon" onClick={() => {deleteRecord("/project_partner/" + props.alert.id)}}/>
                    <CheckIcon className="check-icon" />
                </div>

            </div>
            <div className="bottom-divider">
                <hr />
            </div>

        </div>
    )

}