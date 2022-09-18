import React, { useEffect, useState, useRef } from "react"
import "../styles/App.scss"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {createRecord, deleteRecord, readRecord} from "../utils/CRUD"
import Form from 'react-bootstrap/Form';
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css"
import Col from 'react-bootstrap/Col';
import ViewActivityModal from "./modals/viewActivityModal"
import InfoIcon from '@mui/icons-material/Info';
import ViewExperimentModal from "./modals/viewExperimentModal";

export default function FilterComponent(props) {
  const [tagsList, setTags] = useState([])
  const [schoolList, setSchools] = useState([])
  const [projectList, setProjects] = useState([])
  const [experimentList, setExperiments] = useState([])

  // INFORMATION MODALS
  const [showActivityDetails, setShowActivityDetails] = useState(false)
  const [showExperimentDetails, setShowExperimentDetails] = useState(false)

  //SELECTED DATA
  const [activitySelected, setActivitySelected] = useState("")
  const [schoolsSelected, setSchoolSelected] = useState([])
  const [sensorSelected, setSelectedSensor] = useState([])
  const [experimentSelected, setExperimentSelected] = useState("")
  const [noExperiments, setNoExperiments] = useState(false)
  const [data_options, setDataOptions] = useState()

  const [chart_types, setChartTypes] = useState([])
  const [chart_selected, setChart] = useState()
  const [min_date, setMinDate] = useState("")
  const [max_date, setMaxDate] = useState("")
  const [from_selected, setFrom] = useState()
  const [to_selected, setTo] = useState()
  const [treatment_selected, setSelectedTreatment] = useState([])
  const [response_selected, setSelectedResponse] = useState([])

  const [sensorList, setSensors] = useState([
    {
      id: 0,
      sensor: "Air Temperature",
    },
    { id: 1, sensor: "Relative Humidity" },
    { id: 2, sensor: "Light Intensity" },
    { id: 3, sensor: "Barometric Pressure" },
    { id: 4, sensor: "Water Level" },
    { id: 5, sensor: "Substrate pH" },
    { id: 6, sensor: "Substrate Conductivity" },
    { id: 7, sensor: "Substrate Moisture" },
    { id: 8, sensor: "Substrate Temperature" },
  ])

  let treatmentRef = useRef(null)

  // Column widths
  const col1 = 5
  let col2 = 12 - col1

  useEffect(() => {
    readRecord("/tagreference", setTags)
    readRecord("/school", afterSchoolFetch)
    readRecord("/project", setProjects)
  }, [])

  const Tag = tag => {
    return (
      <div className="tag-item">
        {tag.tag_ref.label}
      </div>
    )
  }

  const onSchoolChange = school => {
    let copy = [...schoolsSelected]
    if (copy.includes(school.school_ref.id)) {
      copy = copy.filter(item => item !== school.school_ref.id)
    } else {
      copy.push(school.school_ref.id)
    }
    setSchoolSelected(copy)
    if (copy.length > 0) {
      readRecord("/project/byschoollist/" + copy.join(","), setProjects)
    }
    else {
      readRecord("/project", setProjects)
    }
  }

  const toggleAllSchools = () => {
    if (schoolsSelected.length > 0) {
      setSchoolSelected([])
    }
    else {
      checkAllSchools(schoolList)
    }
  }

  const checkAllSchools = (schools) => {
    let newSchoolList = []
    schools.forEach(school =>
        newSchoolList.push(school.id)
    )
    setSchoolSelected(newSchoolList)
  }

  const School = school => {
    const [checked_value, setCheckedValue] = useState(false)
    useEffect(() => {
      if (schoolsSelected.includes(school.school_ref.id)) {
        setCheckedValue(true)
      }
    }, [])
    return (
      <div className="filter-item">
        <input
          type="checkbox"
          id="experiment_id"
          checked={checked_value}
          disabled={false}
          onChange={() => {
            onSchoolChange(school)
          }}
        />
        {school.school_ref.name}
      </div>
    )
  }

  const afterExperimentFetch = experiments => {
    setExperiments(experiments.data)
    setNoExperiments(experiments.data.length === 0)
  }

  const afterSchoolFetch = schools => {
    setSchools(schools.data)
    checkAllSchools(schools.data)
  }

  const clear = (full=false) => {
    if (full) {
      readRecord("/tagreference", setTags)
      readRecord("/project", setProjects)
      readRecord("/school", afterSchoolFetch)
      setActivitySelected({id: ""})
    }
    setSchoolSelected([])
    setSelectedSensor("")
    setExperiments([])
    setExperimentSelected({id: ""})
    setNoExperiments(false)
    setChartTypes([])
    setChart()
    setMaxDate("")
    setMinDate("")
    setDataOptions(undefined)
    setFrom()
    setTo()
    setSelectedTreatment([])
    setSelectedResponse([])
    props.clearData()
  }

  const onActivityChange = e => {
    clear()
    if (e.target.value !== "") {
      projectList.data.forEach(project => {
        if (project.id === parseInt(e.target.value)) {
          setActivitySelected(project)
        }
      })
      readRecord("/project/" + e.target.value + "/experiment", afterExperimentFetch)
      readRecord("/schoolbyproject/" + e.target.value, afterSchoolFetch)
    }
  }

  const onSensorChange = sensor => {
    let copy = [...sensorSelected]
    if (copy.includes(sensor.sensor_ref.id)) {
      copy = copy.filter(item => item !== sensor.sensor_ref.id)
    } else {
      copy.push(sensor.sensor_ref.id)
    }
    setSelectedSensor(copy)
  }

  const Sensor = sensor => {
    const [checked_value, setCheckedValue] = useState(false)
    useEffect(() => {
      if (sensorSelected.includes(sensor.sensor_ref.id)) {
        setCheckedValue(true)
      }
    }, [])
    return (
      <div className="filter-item">
        <input
          type="checkbox"
          id="experiment_id"
          name="topping"
          value="experiment_ID"
          checked={checked_value}
          disabled={false}
          onChange={() => {
            onSensorChange(sensor)
          }}
        />
        {sensor.sensor_ref.sensor}
      </div>
    )
  }

  const afterOptionsFetch = options => {
    setDataOptions(options.data)
    if (chart_types.length === 0) {
      options.data.chart_types.forEach(function (element, idx) {
        setChartTypes(arr => [...arr, { label: element, value: idx }])
      })
    }
    setFrom(options.data.data_min_date.substring(0,10))
    setTo(options.data.data_max_date.substring(0,10))
  }

  const onExperimentChange = e => {
    experimentList.forEach(experiment => {
      if (experiment.id === parseInt(e.target.value)) {
        setExperimentSelected(experiment)
      }
    })
    setChartTypes([])
    readRecord("/data_options/" + e.target.value, afterOptionsFetch)
  }

  const onChangeTreatment = (currentNode, selectedNodes) => {
    let copy = []
    let variables = data_options.treatment_variables
    if (currentNode._depth === 0) {
      variables.forEach(treatment => {
        if (currentNode.label === treatment.label) {
          treatment.children.forEach(child => {
            child.checked = true
          })
        }
      })
    }
    variables.forEach(treatment => {
      let treatment_generated = {
        variable_id: treatment.value,
        name: treatment.label,
        levels: [],
      }
      treatment.children.forEach(child => {
        if (
          child.value === currentNode.value &&
          child.label === currentNode.label
        ) {
          child.checked = child.checked !== true;
        }
        if (child.checked === true) {
          treatment_generated.levels.push(child.value)
        }
      })
      copy.push(treatment_generated)
    })
    setSelectedTreatment(copy)
  }

  const onResponseChange = (variable) => {
      let copy = [...response_selected];
      if (copy.includes(variable.response_ref.value)) {
          copy = (copy.filter(item => item !== variable.response_ref.value))
      } else {
          copy.push(variable.response_ref.value)
      }
      setSelectedResponse(copy);
  }

  const ResponseVariable = variable => {
      const [checked_value, setCheckedValue] = useState(false);
      useEffect(() => {
          if (response_selected.includes(variable.response_ref.value)) {
              setCheckedValue(true);
          }
      }, [])
      return (
          <div className="filter-item">
            <input
                type="checkbox"
                checked={checked_value}
                onChange={() => {
                  onResponseChange(variable)
                }}/>
              {variable.response_ref.label}
          </div>
      )
  }

  const afterDataFetch = data => {
    props.setTable({ data: data.data, chart: chart_selected })
  }

  const generate = () => {
    let sensor_id = null
    // if (sensor_selected) {
    //   sensor_id = sensor_selected.sensor_quantity_id
    // }
    if (
      from_selected &&
      to_selected &&
      chart_selected &&
      treatment_selected.length > 0
    ) {
      let body = JSON.stringify({
        experiment_id: experimentSelected.id,
        chart_type: chart_selected.label,
        first_date: from_selected,
        last_date: to_selected,
        schools: [],
        treatment_variables: treatment_selected,
        response_variables: response_selected,
        milestones: true,
        sensor_quantity: null,
        average_over_replicates: true,
      })

      createRecord("/data", body, afterDataFetch)
    }
  }

  const dateStringFormat = original => {
    let dateValue = new Date(original)
    return dateValue.toLocaleDateString()
  }

  return (
    <div className="panel-body scrollable-container">
      <div className="scrollable-header">
        <h3>Select data</h3>
      </div>
      <div className="scrollable-content">
    <div className="filter-list">
      <div className="filters">
        {projectList.data ?
          <Form.Select
              aria-label = "Activity selection"
              onChange = {onActivityChange}
              value={activitySelected.id}
          >
            <option value="">Select an activity...</option>
            {projectList.data.map((project) =>
                <option value={project.id}>{project.title}</option>
            )}
          </Form.Select>

          : null
        }

        {activitySelected.id ?
            <div className="activity-dates">
              {dateStringFormat(activitySelected.start_date)} - {dateStringFormat(activitySelected.end_date)}
              &nbsp;
                <InfoIcon
                  onClick={() => {
                      setShowActivityDetails(true);
                }} />
            </div>
            : null
        }

        {experimentList.length ?  //IF SCHOOL SELECTED HAS BEEN SET SHOW FILTER, IF NOT SHOW FULL LIST
          <Form.Select
              aria-label = "Experiment selection"
              value={experimentSelected.id}
              onChange = {onExperimentChange}
          >
            <option>Select an experiment...</option>
            {experimentList.map((experiment) =>
                <option
                    value={experiment.id}
                >{experiment.title}</option>
            )}
          </Form.Select>
          : null
        }

        {experimentSelected.id ?
            <div className="experiment-dates">
              {dateStringFormat(experimentSelected.start_date)} - {dateStringFormat(experimentSelected.end_date)}
              &nbsp;
                <InfoIcon
                  onClick={() => {
                      setShowExperimentDetails(true);
                }} />
            </div>
            : null
        }

        {noExperiments ?
            <div className="filter-message">
              No experiments yet!
            </div>
            : null
        }

        {/*<Accordion>*/}
        {/*  <AccordionSummary*/}
        {/*    expandIcon={<ExpandMoreIcon />}*/}
        {/*    aria-controls="panel1a-content"*/}
        {/*    id="panel1a-header"*/}
        {/*  >*/}
        {/*    Tags*/}
        {/*  </AccordionSummary>*/}
        {/*  <AccordionDetails>*/}
        {/*    <div className="tag-block">*/}
        {/*      {tagsList.data ? (*/}
        {/*        tagsList.data.map(tagItem => <Tag tag_ref={tagItem} />)*/}
        {/*      ) : (*/}
        {/*        <h3>No tags found</h3>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  </AccordionDetails>*/}
        {/*</Accordion>*/}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Schools
          </AccordionSummary>
          <AccordionDetails>
            <div className="filter-block">
              <div className="dandelion-button-group">
                <button
                    className="dandelion-button"
                    onClick={toggleAllSchools}
                >
                  Toggle all
                </button>
              </div>
              {schoolList ? (
                schoolList.map(schoolItem => (
                  <School school_ref={schoolItem} />
                ))
              ) : (
                  <span>No schools found</span>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {data_options && data_options.data_count === 0 ?
          <div className="no-data-message">
            Sorry! There is no data yet for this combination of schools and experiment.
          </div>
          : null
      }

      {from_selected && data_options.data_count > 0 ?
          <div className="date-pickers">
              <Form.Group as="row">
                <Col sm={col1} className="label">
                    From:
                </Col>
                <Col sm={col2}>
                    <input
                      type="date"
                      name="codeBox"
                      min={data_options.data_min_date.substring(0,10)}
                      max={data_options.data_max_date.substring(0,10)}
                      value={from_selected}
                      onChange={e => {
                        setFrom(e.target.value)
                      }}
                    />
                </Col>
              </Form.Group>
              <Form.Group as="row">
                <Col sm={col1} className="label">
                    To:
                </Col>
                <Col sm={col2}>
                  <input
                    type="date"
                    name="codeBox"
                    min={from_selected}
                    max={data_options.data_max_date.substring(0,10)}
                    value={to_selected}
                    onChange={e => {
                      setTo(e.target.value)
                    }}
                  />
                </Col>
              </Form.Group>
          </div>
          : null
      }

      {data_options && data_options.data_count > 0 ?
        <div className="variables">
          <div className="label">Treatment Variables:</div>
          <div className="dropdown">
            <DropdownTreeSelect
              ref={treatmentRef}
              data={data_options.treatment_variables}
              onChange={onChangeTreatment}
              // onAction={onAction}
              // onNodeToggle={onNodeToggle}
            />
          </div>
          <div className="dropdown">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                Response Variables
              </AccordionSummary>
              <AccordionDetails>
                <div className="filter-block">
                  {data_options.response_variables.map(response => (
                    <ResponseVariable response_ref={response}/>
                  ))}
                </div>
                {/*<a target="_blank" href={sensor_selected}>{}</a>*/}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
          : null
      }

      {chart_types.length > 0 ?
          <Form.Group as="row">
            <Col  sm={col1} className="label">
              Chart type:
            </Col>
            <Col>
              <Form.Select
                  column sm={col2}
                  aria-label = "Chart type selection"
                  value={chart_selected}
                  onChange = {e => {setChart(e.target.value)}}
              >
                <option>...</option>
                {chart_types.map((chart) =>
                    <option
                        value={chart.id}
                    >{chart.label}</option>
                )}
              </Form.Select>
            </Col>
          </Form.Group>
        : null
      }

      </div>
    </div>
    <div className="scrollable-footer">
      <div className="dandelion-button-group">
        <button
          className="dandelion-button"
          onClick={generate}
        >
          Generate
        </button>
        <button
          className="dandelion-button"
          onClick={() => {clear(true)}}
        >
          Clear
        </button>
      </div>
    </div>
      {showActivityDetails ?
          <ViewActivityModal
              show={showActivityDetails}
              setShow={setShowActivityDetails}
              project={activitySelected}
              experiments={experimentList.filter(
                  experiment => experiment.status === 'active'
                  )}
          />
          : null}

      {showExperimentDetails ?
          <ViewExperimentModal
              experiment={experimentSelected}
              show={showExperimentDetails}
              setShow={setShowExperimentDetails}
          />
          : null
      }
  </div>
  )
}
