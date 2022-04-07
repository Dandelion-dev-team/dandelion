import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { createRecord } from "../../utils/CRUD"

export default function AddStudentModal(props) {
    const [entered_username, setUsername] = useState("");
    const [entered_password, setPassword] = useState("");
    const [entered_notes, setNotes] = useState("");

    const [missing_info, setMissingInfo] = useState(false);
    const createUser = user => {
        let school = localStorage.getItem("school_id");
        if (school && entered_username && entered_password) {
            let body = JSON.stringify({
                school_id: school,
                username: entered_username,
                password: entered_password,
                is_sysadmin: false,
                is_superuser: false,
                status: "active",
                notes: entered_notes,
            })
            createRecord("/user", body)
        } else {
            setMissingInfo(true);
        }

    }


    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleNotesChange = e => {
        setNotes(e.target.value);
    }

    return (
        <div className="add-student-modal">
            <div className="inner-panel">
                <div className="panel-content">
                    <h2>Create Student</h2>

                    <div className="label-textbox">
                        <h3>Username:</h3>
                        <input
                            type="text"
                            value={entered_username}
                            onChange={handleUsernameChange} />
                    </div>
                    <div className="label-textbox">
                        <h3>Password:</h3>
                        <input
                            type="text"
                            value={entered_password}
                            onChange={handlePasswordChange} />
                    </div>
                    <div className="label-textbox">
                        <h3>Notes:</h3>
                        <input
                            type="text"
                            value={entered_notes}
                            onChange={handleNotesChange} />
                    </div>

                    {missing_info ? 
                    <div className="missing-info">
                        <h3>Missing Information</h3>
                    </div> 
                    :
                    null}

                    <div className="btn-row">
                        <input
                            type="submit"
                            className="submitButton"
                            value="Create User"
                            onClick={() => {
                                createUser()
                            }}
                        ></input>
                        <input
                            type="submit"
                            className="submitButton"
                            value="Close"
                            onClick={() => {
                                props.closeModal()
                            }}
                        ></input>
                    </div>

                </div>
            </div>
        </div>
    )
}
