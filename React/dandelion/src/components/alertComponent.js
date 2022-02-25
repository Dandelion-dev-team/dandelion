import React, { useState, useEffect } from "react";
import { Link, navigate, Text } from "gatsby"
import "../styles/App.scss";
import amberAlert from "../images/amber-alert.png";
import redAlert from "../images/red-alert.png";
import ClearIcon from '@mui/icons-material/Clear';

export default function Alert(props) {
    //Tested
    const deleteAlert = index => {
        fetch("http://localhost:3000/alerts/" + index, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then(console.log("delete " + index))
          .then(window.location.reload(false))
      }
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
                            deleteAlert(props.alert.id);
                        }} />
                </div>
            </div>
            <div className="bottom-divider">
                <hr />
            </div>

        </div>
    )

}