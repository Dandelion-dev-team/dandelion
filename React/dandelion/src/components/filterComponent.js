import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../styles/App.scss";

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { readRecord } from "../utils/CRUD"
import { ToastContainer, toast } from 'react-toastify';


export default function FilterComponent(props) {
    const [tagsList, setTags] = useState([])
    const [schoolList, setSchools] = useState([])
    const [projectList, setProjects] = useState([])
    const [experimentList, setExperiments] = useState([])

    //SELECTED DATA
    const [schoolsSelected, setSchoolSelected] = useState([]);
    const [activitiesSelected, setActivitiesSelected] = useState([]);
    const [experimentsDisabled, disableExperiments] = useState(true);
    const [sensorSelected, setSelectedSensor] = useState([]);
    const [experimentSelected, setSelectedExperiments] = useState();


    const [sensorList, setSensors] = useState([{
        id: 0, sensor: "Air Temperature"
    },
    { id: 1, sensor: "Relative Humidity" },
    { id: 2, sensor: "Light Intensity" },
    { id: 3, sensor: "Barometric Pressure" },
    { id: 4, sensor: "Water Level" },
    { id: 5, sensor: "Substrate pH" },
    { id: 6, sensor: "Substrate Conductivity" },
    { id: 7, sensor: "Substrate Moisture" },
    { id: 8, sensor: "Substrate Temperature" }])
    useEffect(() => {
        readRecord("/tagreference", setTags)
        readRecord("/school", setSchools)
        readRecord("/project", setProjects)
    }, [])
    const Tag = tag => {
        return (
            <div className="tag-item">
                <h3>{tag.tag_ref.label}</h3>
            </div>
        )
    }

    const onSchoolChange = (school) => {
        let copy = [...schoolsSelected];
        if (copy.includes(school.school_ref.id)) {
            copy = (copy.filter(item => item !== school.school_ref.id))
        } else {
            copy.push(school.school_ref.id)
        }
        setSchoolSelected(copy);
    }

    const School = school => {
        const [checked_value, setCheckedValue] = useState(false);
        useEffect(() => {
            if (schoolsSelected.includes(school.school_ref.id)) {
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

    const onProjectChange = (project) => {
        let copy = [...activitiesSelected];
        if (copy.includes(project.project_ref.id)) {
            copy = (copy.filter(item => item !== project.project_ref.id))
            let experiments_copy = [...experimentList];
            experiments_copy = (experiments_copy.filter(item => item.project_id !== project.project_ref.id))
            setExperiments(experiments_copy);
            if (copy.length == 0) {
                disableExperiments(true);
            }
        } else {
            copy.push(project.project_ref.id)
            fetch(process.env.API_URL + "/project/" + project.project_ref.id + "/experiment", {
                method: "GET",
                headers: new Headers({
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: 0,
                }),
            })
                .then(response => response.json())
                .then(data => setExperiments(experimentList => [...experimentList, data.data]))
            disableExperiments(false);
        }
        setActivitiesSelected(copy);
    }

    const Project = project => {
        const [checked_value, setCheckedValue] = useState(false);
        useEffect(() => {
            if (activitiesSelected.includes(project.project_ref.id)) {
                setCheckedValue(true);
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
                    onChange={() => { onProjectChange(project) }}
                />
                <h3>{project.project_ref.title}</h3>
            </div>
        )
    }

    const onSensorChange = (sensor) => {
        let copy = [...sensorSelected];
        if (copy.includes(sensor.sensor_ref.id)) {
            copy = (copy.filter(item => item !== sensor.sensor_ref.id))
        } else {
            copy.push(sensor.sensor_ref.id)
        }
        setSelectedSensor(copy);
    }

    const Sensor = sensor => {
        const [checked_value, setCheckedValue] = useState(false);
        useEffect(() => {
            if (sensorSelected.includes(sensor.sensor_ref.id)) {
                setCheckedValue(true);
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
                <h3>{sensor.sensor_ref.sensor}</h3>
            </div>
        )
    }

    const onExperimentChange = (experiment) => {
        setSelectedExperiments(experiment.experiment_ref);
    }

    const Experiment = experiment => {
        const [checked_value, setCheckedValue] = useState(false);
        useEffect(() => {
            if (experimentSelected != null) {
                if(experimentSelected.id == experiment.experiment_ref.id){
                    setCheckedValue(true)
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
                    onChange={() => { onExperimentChange(experiment) }}
                />
                <h3>{experiment.experiment_ref.title}</h3>
            </div>
        )
    }
    return (
        <div className="filter-list">
            <div className="title">
                <h3>Filters</h3>
            </div>
            <div className="filters">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Tags
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="tag-block">
                            {tagsList.data ? (
                                tagsList.data.map(tagItem => <Tag tag_ref={tagItem} />)
                            ) : (
                                <h3>No tags found</h3>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Schools
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="school-block">
                            {schoolList.data ? (
                                schoolList.data.map(schoolItem => (
                                    <School school_ref={schoolItem} />
                                ))
                            ) : (
                                <h3>No schools found</h3>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Activities
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="project-block">
                            {projectList.data ?
                                (
                                    schoolsSelected > 0 ? //IF SCHOOL SELECTED HAS BEEN SET SHOW FILTER, IF NOT SHOW FULL LIST
                                        projectList.data.filter(project =>
                                            (schoolsSelected.includes(String(project.school_id)))).map(filtered =>
                                            (
                                                <Project project_ref={filtered} />
                                            ))
                                        :
                                        projectList.data.map(projectItem => (
                                            <Project project_ref={projectItem} />
                                        ))
                                )
                                :
                                (
                                    <h3>No Activities found</h3>
                                )}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled={experimentsDisabled}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Experiments
                    </AccordionSummary>
                    <AccordionDetails>
                        {experimentList ? //IF SCHOOL SELECTED HAS BEEN SET SHOW FILTER, IF NOT SHOW FULL LIST
                            experimentList.map(experimentItem => (
                                <div className="project-block">
                                {experimentItem.map(experiment => {
                                        return(<Experiment experiment_ref={experiment} />)
                                })}
                                </div>
                            ))
                            :
                            <h3>No other data selected.</h3>}
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Sensor data
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="project-block">
                            {
                                sensorList.map(sensorItem => (
                                    <Sensor sensor_ref={sensorItem} />
                                ))
                            }
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="generate-btn">
                <input
                    type="submit"
                    className="submitButton"
                    value="Generate"
                    onClick={() => {
                        if (experimentSelected != null) {
                            props.fetchOptions(experimentSelected.id);
                        } else {
                            toast.error("No experiment selected.")
                        }
                    }}
                ></input>
            </div>
        </div>
    )
}