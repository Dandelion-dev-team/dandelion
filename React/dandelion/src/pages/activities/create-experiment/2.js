import React, { useEffect, useState, useRef } from "react"
import ExperimentComponent from "../../../components/activities/experimentComponent"
import ExperimentPane from "../../../components/activities/experimentPane"
import "../../../styles/App.scss"

export default function SecondExpPage(props) {

    return (
        <div>
            <div className="your-exp-container">
                <div className="title">
                    <h3>Your Experiment</h3>
                </div>
                <div className="content">
                    <div className="content-wrapper">
                        <div className="exp-pane">
                            
                        </div>
                        <div className="user-pane">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}