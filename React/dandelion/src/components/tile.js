import React, { useState } from "react";
import { Link, navigate, Text } from "gatsby"

export default function Tile(props) {
    const [show, setShown] = useState('')

    return (
        <tile>
            <div className="tile_div" style={{ backgroundColor: props.tile_color }}
                onMouseEnter={() => setShown(true)}
                onMouseLeave={() => setShown(false)}
                onClick={() => {
                    navigate(props.link)
                }}>
                <img src={props.tile_image}></img>
                {show ?  <h3 className="centeredText">{props.name}</h3> : null}
            </div>
        </tile>
    )
}
