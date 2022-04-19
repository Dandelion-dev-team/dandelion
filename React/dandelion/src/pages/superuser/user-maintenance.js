import { navigate } from 'gatsby';
import Img from "gatsby-image"
import React, { useEffect, useState, Image } from 'react'
import { verify_superuser_storage } from '../../utils/logins';
import { createRecordNavigate, readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"
import EditIcon from "@mui/icons-material/Edit"
import VariableListComponent from '../../components/cards/variableListComponent';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import VariableCard from '../../components/cards/variableCard';

export default function UserMaintenance(props) {
    //Tested
    const [experiment, setExperiment] = useState();
    const [logged, setLogged] = useState();
    const [userList, setUsers] = useState([]);

    const [addUserList, setAddUsers] = useState([]);
    const [removeUserList, setRemoveUsers] = useState([]);

    useEffect(() => {
        if (verify_superuser_storage() == true) {
            setLogged(true);
            if (props.location.state) {
                readRecord("/experiment/" + props.location.state.experiment.id, setExperiment)
                let school_id = localStorage.getItem('school_id');
                readRecord("/user/byschoolandexperiment/" + school_id + "/" + props.location.state.experiment.id, setUsers)
            } else {
                if (typeof window !== `undefined`) {
                    navigate("/superuser/activity-maintenance")
                }
            }
        } else {
            navigate("/signin");
        }
    }, [])

    const onUpdateClick = () => {
        if(addUserList.length > 0){
            addUserList.forEach(element => {
                let body = JSON.stringify({
                    status: element.status
                })
                createRecordNavigate("/experiment_paticipant/" +  props.location.state.experiment.id + "/" + element.id, body)
            });
        }
        window.location.reload(false)
    }

    const User = user => {
        const [checked_value, setCheckedValue] = useState(false);
        useEffect(() => {
            if (addUserList.includes(user.user) || user.user.is_participant == true) {
                setCheckedValue(true);
            }
        }, [])

        const checkboxChange = e => {
            if (checked_value == false) {
                if (user.user.is_participant == false) {
                    setAddUsers(arr => [...arr, user.user])
                }
            } else {
                if (addUserList.includes(user.user)) {
                    let copy = [...addUserList];
                    copy = (copy.filter(item => item !== user.user))
                    setAddUsers(copy);
                }
            }
        }
        return (
            <div className='student-row'>
                <input classname='checkmark' type="checkbox" checked={checked_value} onChange={() => {checkboxChange(user)}}/>
                <h3>{user.user.username}</h3>
            </div>
        )
    }

    if (typeof window !== `undefined` && logged && experiment) {
        return (
            <div>
                <SideNav />
                <div className='user-maintenance-container'>
                    <ToastContainer/>
                    <div className='content'>
                        <div className='user-pane'>
                            <div className='title'>
                                <h3>Management for {experiment.name}:</h3>
                            </div>
                            <div className='experiment-image'>
                                <img src={experiment.image_full} />
                                <div className='edit-circle'>
                                    <EditIcon className='edit-icon' />
                                </div>
                            </div>
                            <div className='title-description'>
                                <div className='title'>
                                    <h3>Code: </h3>
                                </div>
                                <div className='description'>
                                    <h3>{experiment.code}</h3>
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
                                    <h3>{experiment.tutorial}</h3>
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
                                <h3>Treatment Variables:</h3>
                               {experiment.responseVariables.map(response => {
                                   return (<VariableCard mappedValue={response}/>)
                               })}
                            </div>
                            <div className='variable-list'>
                                <h3>Response Variables:</h3>
                                {experiment.treatmentVariables.map(response => {
                                   return (<VariableCard mappedValue={response}/>)
                               })}
                            </div>
                        </div>
                        <div className='user-pane'>
                            <div className='title'>
                                <h3>Select users for experiment:</h3>
                                <div className='user-list'>
                                    {userList.users ?
                                        userList.users.map(user => (
                                            <User user={user} />
                                        ))
                                        : null}
                                </div>
                            </div>
                            {
                                addUserList.length > 0 || removeUserList.length > 0 ?
                                    <div className="finish-btn">
                                        <input
                                            type="submit"
                                            className="submitButton"
                                            value="Finished"
                                            onClick={() => {onUpdateClick()}}
                                        ></input>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    } else return null;
}