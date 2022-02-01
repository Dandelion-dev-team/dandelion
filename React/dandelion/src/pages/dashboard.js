import React, { useState, useEffect } from "react"
import '../styles/App.scss'
import Header from "../components/header"
import Tile from "../components/tile"
import school from '../images/school_tile.png';
import map from '../images/map.png';
import about from '../images/about_icon.png';
import chart from '../images/chart.png';
import add_data from '../images/add data.png';
import { navigate } from "gatsby";
const parse = require('../auth');

export default function Dashboard() {
    const [savedData, setData] = useState(0);
    const [logged] = parse.useAuth();

    useEffect(() => {
        // Update the document title using the browser API
        fetch("http://localhost:3000/users", {
            method: "GET",
            headers: new Headers({
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0,
            })
        }).then(response => response.json())
            .then(
                data => setData(data[0]))
    }, []);

    return (
        <div>
            <Header />
            <div className="dashboard">
                <div className="container">
                    <div className="inner-dashboard">
                        <div className="content">
                            <h3>The Dandelion School Growing Initiative</h3>
                            <p>
                                500 schools. 200 growing cubes. The largest community-led growing
                                experiment ever undertaken in Scotland.
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
}
