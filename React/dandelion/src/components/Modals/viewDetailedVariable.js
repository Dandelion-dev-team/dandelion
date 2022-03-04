import { navigate } from "gatsby"
import * as React from "react"
import EditIcon from '@mui/icons-material/Edit';

export default function viewDetailedVariable(props) {
    return (
        <div className="variable-modal-container">
            <div className="inner-panel">
                <div className="panel-content">
                    <div className="name-edit-row">
                        <h3>{props.variable.name}</h3>
                        <EditIcon className="edit-icon" />
                    </div>
                    <h3>{props.variable.type}</h3>
                    <div className="item-row">
                        <div className="item-title">
                            <h3>Description: </h3>
                        </div>
                        <div className="item-text">
                            <h3>{props.variable.description}</h3>
                        </div>
                    </div>
                    <div className="item-row">
                        <div className="item-title">
                            <h3>Tutorial Text: </h3>
                        </div>
                        <div className="item-text">
                            <h3>{props.variable.procedure}</h3>
                        </div>
                    </div>
                    <div className="item-row">
                        <div className="item-title">
                            <h3>Unit: </h3>
                        </div>
                        <div className="item-text">
                            <h3>{props.variable.unit}</h3>
                        </div>
                    </div>
                    <div className="item-row">
                        <div className="item-title">
                            <h3>Upper Limit: </h3>
                        </div>
                        <div className="item-text">
                            <h3>{props.variable.upper_limit}</h3>
                        </div>
                    </div>
                    <div className="item-row">
                        <div className="item-title">
                            <h3>Lower Limit: </h3>
                        </div>
                        <div className="item-text">
                            <h3>{props.variable.lower_limit}</h3>
                        </div>
                    </div>
                    <div className="close-btn">
                        <input
                            type="submit"
                            className="closeButton"
                            value="Close"
                            onClick={() => {
                                props.callback()
                            }}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    )
}