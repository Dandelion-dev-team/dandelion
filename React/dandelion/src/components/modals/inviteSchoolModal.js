import { navigate } from "gatsby"
import React, { useEffect, useState, Image } from 'react'
import { readRecord } from "../../utils/CRUD"
import { verify_superuser_storage } from '../../utils/logins';

export default function ActivityCreatedModal(props) {
    const [schoolList, setSchools] = useState([])
    const [schoolSelected, setSelectedSchool] = useState([])
    const [search_value, changeSearch] = useState("")

    useEffect(() => {
        if (verify_superuser_storage() == true) {
            readRecord("/school", setSchools)
        } else {
            navigate("/signin");
        }
    }, [])

    const onSchoolChange = (school) => {
        setSelectedSchool(school.school_ref.id);
    }

    const School = school => {
        const [checked_value, setCheckedValue] = useState(false);
        useEffect(() => {
            if (schoolSelected == school.school_ref.id) {
                setCheckedValue(true);
            }
        }, [])
        return (
            <div className="school-item">
                <input
                    type="checkbox"
                    id="experiment_id"
                    name="topping"
                    checked={checked_value}
                    disabled={false}
                    onChange={() => { onSchoolChange(school) }}
                />
                <h3>{school.school_ref.name}</h3>
            </div>
        )
    }
    return (
        <div className="school-modal-container">
            <div className="inner-panel">
                <div className="panel-content">
                    <h2>Select A School</h2>

                    <div className="search-box">
                        <input
                            type="text"
                            className="search-box"
                            placeholder="Search"
                            value={search_value}
                            onChange={(e) => changeSearch(e.target.value)}
                        />
                    </div>

                    <div className="school-list">
                        {schoolList.data ?
                            schoolList.data.filter(school => school.name.toUpperCase().includes(search_value.toUpperCase())).map(e => (
                            <School school_ref={e} />
                            ))
                            : null}
                    </div>

                    <div className="submit-btn">
                        <input
                            type="submit"
                            className="submitButton"
                            value="Finish"
                            onClick={() => {
                                props.callback(schoolSelected)
                            }}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    )
}
