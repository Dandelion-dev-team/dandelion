import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"
import Select from "react-select"
import { readRecord } from "../../utils/CRUD";

export default function NodeInfoComponent(props) {
    //TESTED
    const [nodeData, setNodeData] = useState("");
    const [maintenance, setMaintenance] = useState("");
    const [sensorList, setSensorList] = useState("");
    const [sensorSelected, selectSensor] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        //readRecord("/node/" + 1, setNodeData)
    }, [])

    const handleCommentChange = e => {
        setComment(e.target.value);
    }
    return (
        <div className="nodePanelContainer">
            {nodeData ?
                <div>
                    {maintenance ?
                        <div className="sensorSelector">
                            <Select
                                name="authority_id_picker"
                                options={Array.from(nodeData.sensors)}
                                value={sensorSelected}
                                onChange={selectSensor}
                                getOptionLabel={(sensor) => sensor.code}
                                getOptionValue={(sensor) => sensor.id} // It should be unique value in the options. E.g. ID
                            />
                            <input
                                type="text"
                                placeholder="Comment"
                                className="commentBox"
                                name="usernameBox"
                                value={comment}
                                onChange={handleCommentChange}
                            />
                            <div className="buttonRow">
                                <input
                                    type="submit"
                                    className="recordButton"
                                    value="Submit"
                                    onClick={() => {
                                        setMaintenance(false);
                                    }}
                                ></input>
                                <input
                                    type="submit"
                                    className="recordButton"
                                    value="Cancel"
                                    onClick={() => {
                                        setMaintenance(false);
                                    }}
                                ></input>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="nodeMaintenance">
                                <h3>Node:</h3>
                            </div>
                            <h3>Node ID: {nodeData.id} </h3>
                            <h3>MAC Address: {nodeData.mac_address}</h3>
                            <h3>Health Status: {nodeData.health_status}</h3>
                            <div className="circleContainer">
                                <div className="circleItem">
                                    <h3>30°C</h3>
                                </div>
                                <div className="circleItem">
                                    <h3>4.4pH</h3>
                                </div>
                                <div className="circleItem">
                                    <h3>38%</h3>
                                </div>
                                <div className="circleItem">
                                    <h3>450im</h3>
                                </div>
                            </div>
                            <input
                                type="submit"
                                className="recordButton"
                                value="Record Node Maintenance"
                                onClick={() => {
                                    setMaintenance(true);
                                }}
                            ></input>
                        </div>
                    }
                </div>
                :
                null}
        </div>
    )
}