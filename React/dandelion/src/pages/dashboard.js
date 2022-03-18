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
export default function Dashboard() {
    const [savedData, setData] = useState(0);
    const [logged, setLogged] = useState();

    useEffect(() => {
        let logged = localStorage.getItem("logged");
        if (logged == "true") {
            setLogged(true);
        } if (logged == "false") {
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
                            {savedData.is_superuser ? <Tile name="Data" tile_image={chart} tile_color="#f7f369" link="/data"></Tile> : null}
                            <Tile name="Map" tile_image={map} tile_color="#e3c3ca" link="/map"></Tile>
                            <Tile name="School" tile_image={school} tile_color="#58a140" link="/data"></Tile>
                            <Tile name="About" tile_image={about} tile_color="#7c6fb6" link="/about"></Tile>
                            {savedData.is_superuser ? <Tile name="Add Data" tile_image={add_data} tile_color="#fe693c" link="/"></Tile> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }else return null;
}
