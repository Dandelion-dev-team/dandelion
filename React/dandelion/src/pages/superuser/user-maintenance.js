import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react'
import { verify_superuser_storage } from '../../utils/logins';
import "../../styles/App.scss"
import SideNav from "../../components/navigation/superUserSideNav"

export default function UserMaintenance(props) {
    //Tested
    const [experiment, setExperiment] = useState();
    const [logged, setLogged] = useState();

    useEffect(() => {
        if (verify_superuser_storage() == true) {
            setLogged(true);
            if (props.location.state) {
                setExperiment(props.location.state.experiment)
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
                        </div>
                        <div className='user-pane'>
                            <div className='title'>
                                <h3>Select users for experiment:</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    } else return null;
}