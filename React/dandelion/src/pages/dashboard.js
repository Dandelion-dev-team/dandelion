import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import '../styles/App.scss'
import Header from "../components/navigation/header"
import Tile from "../components/tile"
import school from '../images/school_tile.png';
import map from '../images/map.png';
import about from '../images/about_icon.png';
import chart from '../images/chart.png';
import add_data from '../images/add data.png';
import {verify_superuser_storage, verify_sysadmin_storage} from "../utils/logins"
export default function Dashboard() {
    const [logged, setLogged] = useState();
    const [is_superuser, setSuperuser] = useState();
    const [is_sysadmin, setSysadmin] = useState();

    useEffect(() => {
        let superuser = verify_superuser_storage();
        setSuperuser(superuser);

        let sysadmin = verify_sysadmin_storage();
        setSysadmin(sysadmin);
        
        let logged = localStorage.getItem("logged");
        if (logged == "true") {
            setLogged(true);
        } if (logged == "false" || logged == null) {
            navigate("/signin")
        }
    }, []);

    if(logged == true){
    return (
        <div>
            <Header />
            <div className="dashboard">
                <div className="container">
                    <div className="inner-dashboard">
                        <div className="content">
                            <h3>Dashboard</h3>
                            <p>
                                Share the results of your projects and see how others' projects went!
                            </p>
                        </div>
                        <div className="tiles">
                            <Tile name="Map" tile_image={map} tile_color="#e3c3ca" link="/map"></Tile>
                            <Tile name="School" tile_image={school} tile_color="#58a140" link="/data"></Tile>
                            <Tile name="About" tile_image={about} tile_color="#7c6fb6" link="https://dandelion.scot/blog/programmes/dandelion-school-growing-initiative"></Tile>
                            <Tile name="Experiments" tile_image={about} tile_color="#FFFF" link="/participants/experiment-dashboard"></Tile>
                            {is_sysadmin ? <Tile name="SysAdmin" tile_image={add_data} tile_color="#fe693c" link="/sysadmin/auth-maintenance"></Tile> : null}
                            {is_superuser || is_sysadmin ? <Tile name="SuperUser" tile_image={chart} tile_color="#f7f369" link="/superuser/dashboard"></Tile> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }else return null;
}
