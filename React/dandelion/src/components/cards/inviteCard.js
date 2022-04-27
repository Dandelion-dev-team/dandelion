import React from "react";
import "../../styles/App.scss";
import amberAlert from "../../images/amber-alert.png";
import redAlert from "../../images/red-alert.png";
import ClearIcon from '@mui/icons-material/Clear';
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
            </div>
            <div className="bottom-divider">
                <hr />
            </div>

        </div>
    )

}