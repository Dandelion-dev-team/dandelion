import React, { useEffect, useState, useRef } from "react"
import Header from "../components/header"
import "../styles/App.scss"
import Select from "react-select"
import UserComponent from "../components/userComponent"

export default function SuperuserMaintenance(props) {
    const selectInputRef = useRef();
    const [schoolList, setSchools] = useState(0);
    const [school_selected, setDropdown] = useState(0);
    const [entered_username, setName] = useState("")
    const [password, setPassword] = useState("")
    const [editing, setEditing] = useState("");
    const [notes, setNotes] = useState("");
    const [status, setStatus] = useState("");
    const [sys_admin_checkbox, setAdminCheckbox] = useState("");
    const [superuser_checkbox, setSuperuserCheckbox] = useState("");


    const activeSelection = [
        {
            "value": "active"
        },
        {
            "value": "inactive"
        },
    ]


    useEffect(() => {
        // Update the document title using the browser API
        fetch("http://localhost:3000/schools", {
            method: "GET",
            headers: new Headers({
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0,
            })
        }).then(response => response.json())
            .then(
                data => setSchools(Array.from(data)))
    }, []);

    const handleNameChange = e => {
        setName(e.target.value)
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }
    const handleNotesChange = e => {
        setNotes(e.target.value)
    }

    const handleDropdown = e => {
        setDropdown(e.target.value);
    }

    const handleCallback = (childData) => {
        console.log(childData.id);
        setDropdown(childData.school_id);
        setAdminCheckbox(childData.is_sysadmin);
        setSuperuserCheckbox(childData.is_superuser);
        setStatus(childData.status);
        setName(childData.username);
        setNotes(childData.notes);
        setPassword("")
        setEditing(true);
    }

    const onCreateUser = e => {
        if (school_selected && entered_username && password) {
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: 1234, school_id: school_selected.id, username: entered_username, password_hash: password, is_sysadmin: false, is_superuser: true, status: "active", notes: " " })
            }).then(console.log("PUT new user")).then(window.location.reload(false))
        } else {
            console.log("did not have all information")
        }
    }

    const onUpdateUser = e => {
        console.log('update');
        setName("");
        setPassword("");
        setEditing(false);
    }

    return (
        <div>
            <Header />
            <div className="maintenance">
                <div className="hero-section">
                    <div className="superuserList">
                        <UserComponent parentCallback={handleCallback} />
                    </div>

                    <div className="heading">
                    </div>
                    <div className="content">
                        <div className="authorityPicker">

                            <h3>School Name: </h3>
                            <Select
                                name="authority_id_picker"
                                ref={selectInputRef}
                                options={schoolList}
                                value={school_selected}
                                defaultValue={school_selected}
                                onChange={setDropdown}
                                getOptionLabel={(schoolList) => schoolList.name}
                                getOptionValue={(schoolList) => schoolList.id} // It should be unique value in the options. E.g. ID
                            />
                            {/* {schoolList ? <select value={school_selected} onChange={handleDropdown}>
                                {schoolList.map((x, y) =>
                                    <option key={x.id}>{x.name}</option>)}
                            </select> : null} */}
                        </div>
                        <div className="nameBox">
                            <h3>Username:</h3>
                            <input
                                type="text"
                                placeholder="Username"
                                name="usernameBox"
                                value={entered_username}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="nameBox">
                            <h3>New password:</h3>
                            <input
                                type="text"
                                placeholder="If required"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {editing ?
                            //IF EDITING
                            <div className="nameBox">
                                <div className="checkboxDiv">
                                    <h3>Is Sysadmin:</h3>
                                    <div className="checkboxPadding">
                                        <input type="checkbox" id="experiment_id" name="topping" checked={sys_admin_checkbox} />
                                    </div>
                                </div>

                                <div className="checkboxDiv">
                                    <h3>Is SuperUser:</h3>
                                    <div className="checkboxPadding">
                                        <input type="checkbox" id="experiment_id" name="topping" checked={superuser_checkbox} />
                                    </div>
                                </div>
                                <h3>Status:</h3>
                                <div className="authorityPicker">
                                    {/* <Select
                                        name="status"
                                        options={activeSelection}
                                        value={status}
                                        onChange={setStatus}
                                        getOptionLabel={(activeSelection) => activeSelection.value}
                                        getOptionValue={(activeSelection) => activeSelection.value} // It should be unique value in the options. E.g. ID
                                    /> */}
                                </div>
                                <h3>Notes:</h3>
                                <input
                                    type="text"
                                    placeholder="Notes"
                                    name="usernameBox"
                                    value={notes}
                                    onChange={handleNotesChange}
                                    style={{
                                        width: '300px', height: '50px', lineHeight: "10px"
                                    }}
                                />
                                <div className="submit-btn">
                                    <input
                                        type="submit"
                                        className="submitButton"
                                        value="Update"
                                        onClick={onUpdateUser}
                                    ></input>
                                </div>
                            </div>
                            :
                            //IF NOT EDITING
                            <div className="submit-btn">
                                <input
                                    type="submit"
                                    className="submitButton"
                                    value="Create"
                                    onClick={onCreateUser}
                                ></input>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
