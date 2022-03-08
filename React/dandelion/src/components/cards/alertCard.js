import React, { useState, useEffect } from "react";
import { Link, navigate, Text } from "gatsby"
import "../../styles/App.scss";
import amberAlert from "../../images/amber-alert.png";
import redAlert from "../../images/red-alert.png";
import ClearIcon from '@mui/icons-material/Clear';
import { deleteRecord } from "../../utils/CRUD";

export default function Alert(props) {
    return (
        <div className="alertContainer">
            <div className="top-divider">
                <hr />
            </div>
            <div className="row">
                <div className="text-content">
                    <h3>{props.alert.description}</h3>
                    <div className="date-recorded">
                        <h3>{(new Date(props.alert.updated_date)).toDateString()}</h3>
                    </div>
                </div>
                {props.alert.status == "red" ? <img src={redAlert}></img> : <img src={amberAlert}></img>}
                <div className="clear-alert">
                    <ClearIcon
                        onClick={() => {
                            deleteRecord("/alerts/" + props.alert.id);
                        }} />
                </div>
            </div>
            <div className="bottom-divider">
                <hr />
            </div>

        </div>
    )

}