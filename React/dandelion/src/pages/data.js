import React, { useState, useEffect } from "react"
import Header from "../components/navigation/header"
import { AgGridReact } from "ag-grid-react"
import BarChartIcon from "@mui/icons-material/BarChart"
import BackupTableIcon from "@mui/icons-material/BackupTable"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { readRecord } from "../utils/CRUD"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

import "../styles/App.scss"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"

export default function Data() {
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])
  const [tab_state, setTabState] = useState(0)

  //INITIAL DATA
  const [tagsList, setTags] = useState([])
  const [schoolList, setSchools] = useState([])
  const [projectList, setProjects] = useState([])
  const [experimentList, setExperiments] = useState([])
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

  //SELECTED DATA
  const [schoolsSelected, setSchoolSelected] = useState([]);
  const [activitiesSelected, setActivitiesSelected] = useState([]);
  const [experimentsDisabled, disableExperiments] = useState(true);
  const [sensorSelected, setSelectedSensor] = useState([]);
  const [experimentSelected, setSelectedExperiments] = useState([]);

  const [rowData] = useState([
    { Observation: "13/03/22", "Plant Height": "1mm", "Plant Weight": "1g" },
    { Observation: "20/03/22", "Plant Height": "2mm", "Plant Weight": "2g" },
    { Observation: "27/03/22", "Plant Height": "3mm", "Plant Weight": "3g" },
  ])

  const [columnDefs] = useState([
    { field: "Observation" },
    { field: "Plant Height" },
    { field: "Plant Weight" },
  ])

  const dataset = {
    labels: ["13/03/22", "20/03/22", "27/03/22"],
    datasets: [
      {
        label: "Weight (g)",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [1, 2, 3],
      },
      {
        label: "Height (mm)",
        backgroundColor: "rgba(132,60,98)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        hidden: true,
        data: [5, 6, 7],
      },
    ],
  }

  useEffect(() => {
    readRecord("/tagreference", setTags)
    readRecord("/school", setSchools)

    fetch(process.env.ROOT_URL + "/projects", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setProjects(data))
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
      fetch(process.env.ROOT_URL + "/project/" + project.project_ref.id, {
        method: "GET",
        headers: new Headers({
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        }),
      })
        .then(response => response.json())
        .then(data => setExperiments(experimentList => [...experimentList, { project_id: project.project_ref.id, experiments: data.experiments }]))
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

  const Experiment = experiment => {
    const [checked_value, setCheckedValue] = useState(false);
    // useEffect(() => {
    //   if (sensorSelected.includes(sensor.sensor_ref.id)) {
    //     setCheckedValue(true);
    //   }
    // }, [])
    return (
      experiment.experiment_ref.experiments.map(experiment => (
        <div className="project-item">
          <input
            type="checkbox"
            id="experiment_id"
            name="topping"
            value="experiment_ID"
            checked={checked_value}
            disabled={false}
            onChange={() => { onSensorChange(experiment) }}
          />
          <h3>{experiment.title}</h3>
        </div>
      ))
    )
  }


  const changeTab = e => {
    if (e == 0) {
      setTabState(0)
      setColourIndex(["#E3C3CA", "#e6e6e6"])
    } else {
      setTabState(1)
      setColourIndex(["#e6e6e6", "#E3C3CA"])
    }
  }

  return (
    <div>
      <Header />
      <div className="data">
        <div className="data-container">
          <div className="data-content">
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
                      {projectList ?
                        (
                          schoolsSelected.length > 0 ? //IF SCHOOL SELECTED HAS BEEN SET SHOW FILTER, IF NOT SHOW FULL LIST
                            projectList.filter(project =>
                              (schoolsSelected.includes(String(project.school_id)))).map(filtered =>
                              (
                                <Project project_ref={filtered} />
                              ))
                            :
                            projectList.map(projectItem => (
                              <Project project_ref={projectItem} />
                            ))
                        )
                        :
                        (
                          <h3>No schools found</h3>
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
                      {experimentList.length > 0 ? //IF SCHOOL SELECTED HAS BEEN SET SHOW FILTER, IF NOT SHOW FULL LIST
                        experimentList.map(experimentItem => (
                          <div className="project-block">
                          <Experiment experiment_ref={experimentItem} />
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
            </div>
            <div className="spacer" />
            <div className="data-pane">
              <div className="tabs">
                <div
                  className="tab"
                  style={{ backgroundColor: colour_index[0] }}
                  onClick={() => {
                    changeTab(0)
                  }}
                >
                  <BackupTableIcon className="icon" />
                </div>
                <div
                  className="tab"
                  style={{ backgroundColor: colour_index[1] }}
                  onClick={() => {
                    changeTab(1)
                  }}
                >
                  <BarChartIcon className="icon" />
                </div>
              </div>
              <div className="pane-content">
                <div className="chart-table-view">
                  <div
                    className="ag-theme-alpine"
                    style={{
                      backgroundColor: "#f7f8ff",
                      height: "90%",
                      width: "100%",
                    }}
                  >
                    {tab_state == 0 ? (
                      <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                      ></AgGridReact>
                    ) : (
                      <Bar
                        data={dataset}
                        options={{
                          plugins: {
                            legend: {
                              onClick: (evt, legendItem, legend) => {
                                const index = legendItem.datasetIndex
                                const ci = legend.chart

                                legend.chart.data.datasets.forEach((d, i) => {
                                  ci.hide(i)
                                  d.hidden = true
                                })

                                ci.show(index)
                                legendItem.hidden = false
                                //wrap this in a delay
                                ci.update()
                              },
                            },
                          },
                          animation: {
                            duration: 0,
                            easing: "linear",
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
