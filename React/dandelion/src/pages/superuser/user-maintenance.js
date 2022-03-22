import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react'
import { verify_superuser_storage } from '../../utils/logins';
import { readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import EditIcon from "@mui/icons-material/Edit"
import VariableSelectedComponent from '../../components/cards/variableSelectedComponent';

export default function UserMaintenance(props) {
    //Tested
    const [experiment, setExperiment] = useState();
    const [logged, setLogged] = useState();
    const [userList, setUsers] = useState([]);

    useEffect(() => {
        if (verify_superuser_storage() == true) {
            setLogged(true);
            if (props.location.state) {
                setExperiment(props.location.state.experiment)
                let school_id = localStorage.getItem('school_id');
                readRecord('/user/GetSchoolUsers/' + school_id, setUsers);
            } else {
                if (typeof window !== `undefined`) {
                    navigate("/superuser/project-maintenance")
                }
            }
        } else {
            navigate("/signin");
        }
    }, [])

    if (typeof window !== `undefined` && logged) {
        return (
            <div>
                <SideNav />
                <div className='user-maintenance-container'>
                    <div className='content'>
                        <div className='user-pane'>
                            <div className='title'>
                                <h3>Management for {experiment.title}:</h3>
                            </div>
                            <div className='experiment-image'>
                                <img src={experiment.experiment_image_link} />
                                <div className='edit-circle'>
                                    <EditIcon className='edit-icon' />
                                </div>
                            </div>
                            <div className='title-description'>
                                <div className='title'>
                                    <h3>Code: </h3>
                                </div>
                                <div className='description'>
                                    <h3>GLA123</h3>
                                </div>
                            </div>
                            <div className='title-description'>
                                <div className='title'>
                                    <h3>Description: </h3>
                                </div>
                                <div className='description'>
                                    <h3>{experiment.description}</h3>
                                </div>
                            </div>
                            <div className='title-description'>
                                <div className='title'>
                                    <h3>Procedure:</h3>
                                </div>
                                <div className='description'>
                                    <h3>{experiment.text}</h3>
                                </div>
                            </div>
                            <div className='title-description'>
                                <div className='title'>
                                    <h3>Start Date:</h3>
                                </div>
                                <div className='description'>
                                    <h3>{(new Date(experiment.start_date)).toDateString()}</h3>
                                </div>
                            </div>
                            <div className='title-description'>
                                <div className='title'>
                                    <h3>End Date:</h3>
                                </div>
                                <div className='description'>
                                    <h3>{(new Date(experiment.end_date)).toDateString()}</h3>
                                </div>
                            </div>
                            <div className='variable-list'>
                                {/* TODO CHANGE FROM HARD-CODED (no back-end functionality as of 22.03.22) */}
                                <h3>Treatment Variables:</h3>
                                <VariableSelectedComponent data={{ name: "Touches", type: "Discrete", levels: [{ name: "Control" }, { name: "Soft" }, { name: "Rough" }] }} />
                                <VariableSelectedComponent data={{ name: "Music", type: "Discrete", levels: [{ name: "Control" }, { name: "Hip-Hop" }, { name: "Classical" }] }} />
                            </div>
                            <div className='variable-list'>
                                <h3>Response Variables:</h3>
                                <VariableSelectedComponent data={{ name: "Length", type: "Continuous", unit: "mm", upper_limit: 100, lower_limit: 0 }} />
                                <VariableSelectedComponent data={{ name: "Strength", type: "Discrete", levels: [{ name: "Control" }, { name: "Hip-Hop" }, { name: "Classical" }] }} />
                            </div>
                        </div>
                        <div className='user-pane'>
                            <div className='title'>
                                <h3>Select users for experiment:</h3>
                                {userList ? userList.users.map(user => (

                                    <div className='student-row'>
                                        <input classname='checkmark' type="checkbox" id="experiment_id" name="topping" value="experiment_ID" />
                                        <h3>{user.username}</h3>
                                    </div>
                                ))
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    } else return null;
}