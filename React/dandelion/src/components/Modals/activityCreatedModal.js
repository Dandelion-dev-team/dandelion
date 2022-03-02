import { navigate } from "gatsby"
import * as React from "react"

export default function activityCreatedModal(props) {
    return (
        <div className="modal-container">
            <div className="inner-panel">
                <h2>Activity Created Successfully</h2>
                <h3>Would you like to add an experiment?</h3>
                <p>
                    As part of running an activity, you will be conducting experiments. In order to have these represented on the system, you have to either choose from the list of available experiments or create your own.
                </p>
                <p>Would you like to do this now? You can always do this at a later date.</p>
                <div className="submit-btn">
                    <input
                        type="submit"
                        className="submitButton"
                        value="Yes"
                        onClick={() => {
                            navigate("/")
                        }}
                    ></input>
                </div>
                <div className="submit-btn">
                    <input
                        type="submit"
                        className="submitButton"
                        value="No"
                        onClick={() => {
                           props.callback("prop")
                        }}
                    ></input>
                </div>
            </div>
        </div>
    )
}