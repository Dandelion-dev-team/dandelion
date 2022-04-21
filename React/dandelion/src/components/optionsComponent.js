import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../styles/App.scss";

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { readRecord } from "../utils/CRUD"
import { ToastContainer, toast } from 'react-toastify';
import TreeView from "@material-ui/lab/TreeView";

import Select from "react-select"
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'


export default function OptionsComponent(props) {
    const [chart_types, setChartTypes] = useState([])
    const [sensor_selected, setSelectedSensor] = useState();

    const [min_date, setMinDate] = useState("2022-05-01");
    const [max_date, setMaxDate] = useState("2022-05-21");
    const [from_selected, setFrom] = useState();
    const [to_selected, setTo] = useState();
    const [chart_selected, setChart] = useState();
    const [treatment_selected, setSelectedTreatment] = useState([]);
    const [response_selected, setSelectedResponse] = useState();
    
    
    const onSensorChange = (sensor) => {
        setSelectedSensor(sensor.sensor_ref);
    }

    const onChartClick = (chart) => {
        let sensor_id = null;
        if(sensor_selected){
            sensor_id = sensor_selected.sensor_quantity_id
        }
        console.log(chart_selected)
        if (from_selected && to_selected && chart_selected) {
            let body = JSON.stringify({
                    experiment_id: 23,
                    chart_type: chart_selected.label,
                    first_date: from_selected,
                    last_date: to_selected,
                    schools: [
                    ],
                    treatment_variables: [
                        {
                            variable_id: 1,
                            name: "species",
                            levels: [
                                1, 2
                            ]
                        },
                        {
                            variable_id: 6,
                            name: "tickling",
                            levels: [
                                18
                            ]
                        }
                    ],
                    response_variables: [
                        3
                    ],
                    milestones: true,
                    sensor_quantity: null,
                    average_over_replicates: true
                })
            fetch(process.env.API_URL + "/data", {
                method: "POST",
                credentials: "include",
                mode: 'cors',
                headers: new Headers({
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': 0,
                    'Content-Type': 'application/json'
                }),
                body: body
            })
                .then((response) => {
                    if (response.status >= 200 && response.status <= 299) {
                        return response.json();
                    } else {
                        throw Error(response.status);
                    }
                })
                .then((jsonResponse) => {
                    props.setTable(jsonResponse.data)
                }).catch((error) => {
                    toast.error("Database error " + error)
                    console.log(error);
                });
        }
    }
    const SensorQuantity = sensor => {
        const [checked_value, setCheckedValue] = useState(false);
        useEffect(() => {
            //let minDate = new Date(props.dataOptions.data_min_date);
            //setMinDate(minDate.getFullYear() + "-" + (minDate.getMonth() + 1) + "-" + (minDate.getDay() + 1))
            if (sensor_selected != null) {
                if (sensor_selected.sensor_quantity_id == sensor.sensor_ref.sensor_quantity_id) {
                    setCheckedValue(true)
                    { console.log(sensor) }
                }
            }
        }, [])
        return (
            <div className="project-item">

                <input
                    type="checkbox"
                    id="experiment_id"
                    name="topping"
                    value="experiment_ID"
                    checked={checked_value}
                    disabled={false}
                    onChange={() => { onSensorChange(sensor) }}
                />
                <h3>{sensor.sensor_ref.quantity_name}</h3>
            </div>
        )
    }

    useEffect(() => {
        if (chart_types.length == 0) {
            props.dataOptions.chart_types.forEach(function (element, idx) {
                setChartTypes(arr => [...arr, { label: element, value: idx }])
            });
        }
    }, [])
    const onChangeTreatment = (currentNode, selectedNodes) => {
        setSelectedTreatment(selectedNodes)
        let copy = [...treatment_selected];
        if (copy.includes(currentNode)) {
            //copy = (copy.filter(item => item !== school.school_ref.id))
        } else {
            copy.push(currentNode)
            props.dataOptions.treatment_variables[0].children[0].checked = true;        
        }
        if(treatment_selected.includes(currentNode)){
            console.log("Test")
        }
    }

    const onChangeResponse = (currentNode, selectedNodes) => {
        setSelectedResponse(selectedNodes)
    }

    const onAction = (node, action) => {
    }
    const onNodeToggle = currentNode => {
    }
    return (
        <div className="options-list">
            <div className="title">
                <h3>Options:</h3>
            </div>
            <div className="inputs">
                <div className="row-item">
                    <div className="label">
                        <h3>Chart Type:</h3>
                    </div>
                    <div className="item">
                        {chart_types ?
                            <Select
                                options={chart_types}
                                getOptionLabel={(chart) => chart.label}
                                getOptionValue={(chart) => chart.id} // It should be unique value in the options. E.g. I
                                onChange={setChart}
                            />
                            :
                            null}
                    </div>
                </div>
                <h3>Date Range:</h3>
                <div className="row-item">
                    <div className="label">
                        <h3>From:</h3>
                    </div>
                    <div className="item">
                        <input
                            type="date"
                            name="codeBox"
                            min={min_date}
                            max={max_date}
                            onChange={(e) => { setFrom(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="row-item">
                    <div className="label">
                        <h3>To:</h3>
                    </div>
                    <div className="item">
                        <input
                            type="date"
                            name="codeBox"
                            min={from_selected}
                            max={max_date}
                            onChange={(e) => { setTo(e.target.value) }}
                        />
                    </div>
                </div>
                <DropdownTreeSelect data={props.dataOptions.treatment_variables} onChange={onChangeTreatment} onAction={onAction} onNodeToggle={onNodeToggle} />
                <DropdownTreeSelect data={props.dataOptions.response_variables} onChange={onChangeResponse} onAction={onAction} onNodeToggle={onNodeToggle} />

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        Sensor Quantities
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="project-block">
                            {props.dataOptions.sensor_quantities.map(quantity => (
                                <SensorQuantity sensor_ref={quantity} />
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <div className="generate-btn">
                    <input
                        type="submit"
                        className="submitButton"
                        value="Generate"
                        onClick={() => {
                            onChartClick()
                        }}
                    ></input>
                </div>
            </div>
        </div>
    )
}