import * as React from "react"
import "../../styles/App.scss"

export default function ObservationsHelpModal(props) {
    return (
        <div className="observations-help-container">
            <div className="modal-wrapper">
                <div className="modal-content">
                <h3>Assigning Experiment Levels?</h3>
            <p>
              The right hand panel is a graphical view of the cube. To change
              levels, click on either “Top Level”, “Middle Level”, or “Bottom
              Level”. Once a level has been chosen, you can assign replicates of
              experiments to individual plots by dragging and dropping the tile.
            </p>
                </div>
            </div>
        </div>
    )
}