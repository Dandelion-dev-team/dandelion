import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../styles/App.scss"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { readRecord } from "../utils/CRUD"
import { ToastContainer, toast } from "react-toastify"
import TreeView from "@material-ui/lab/TreeView"

import Select from "react-select"
import DropdownTreeSelect from "react-dropdown-tree-select"
import "react-dropdown-tree-select/dist/styles.css"

export default function OptionsComponent(props) {
  const [chart_types, setChartTypes] = useState([])
  const [sensor_selected, setSelectedSensor] = useState()

  const [min_date, setMinDate] = useState("2022-05-01")
  const [max_date, setMaxDate] = useState("2022-05-21")
  const [from_selected, setFrom] = useState()
  const [to_selected, setTo] = useState()
  const [chart_selected, setChart] = useState()
  const [treatment_selected, setSelectedTreatment] = useState([])
  const [response_selected, setSelectedResponse] = useState([])
  const [final_list, setFinalList] = useState([])

  const onSensorChange = sensor => {
    setSelectedSensor(sensor.sensor_ref)
  }

  const onChartClick = chart => {
    let sensor_id = null
    if (sensor_selected) {
      sensor_id = sensor_selected.sensor_quantity_id
    }
    if (
      from_selected &&
      to_selected &&
      chart_selected &&
      treatment_selected.length > 0
    ) {
      let body = JSON.stringify({
        experiment_id: 23,
        chart_type: chart_selected.label,
        first_date: from_selected,
        last_date: to_selected,
        schools: [],
        treatment_variables: treatment_selected,
        response_variables: final_list,
        milestones: true,
        sensor_quantity: null,
        average_over_replicates: true,
      })
      fetch(process.env.API_URL + "/data", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: new Headers({
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
          "Content-Type": "application/json",
        }),
        body: body,
      })
        .then(response => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json()
          } else {
            throw Error(response.status)
          }
        })
        .then(jsonResponse => {
          props.setTable({ data: jsonResponse.data, chart: chart_selected })
        })
        .catch(error => {
          toast.error("Database error " + error)
        })
    }
  }
  const SensorQuantity = sensor => {
    const [checked_value, setCheckedValue] = useState(false)
    useEffect(() => {
      //let minDate = new Date(props.dataOptions.data_min_date);
      //setMinDate(minDate.getFullYear() + "-" + (minDate.getMonth() + 1) + "-" + (minDate.getDay() + 1))
      if (sensor_selected != null) {
        if (
          sensor_selected.sensor_quantity_id ==
          sensor.sensor_ref.sensor_quantity_id
        ) {
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
          onChange={() => {
            onSensorChange(sensor)
          }}
        />
        <h3>{sensor.sensor_ref.quantity_name}</h3>
      </div>
    )
  }

  useEffect(() => {
    if (chart_types.length == 0) {
      props.dataOptions.chart_types.forEach(function (element, idx) {
        setChartTypes(arr => [...arr, { label: element, value: idx }])
      })
    }
  }, [])

  const onChangeTreatment = (currentNode, selectedNodes) => {
    let copy = []
    let variables = props.dataOptions.treatment_variables
    if (currentNode._depth == 0) {
      variables.forEach(treatment => {
        if (currentNode.label == treatment.label) {
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
          child.value == currentNode.value &&
          child.label == currentNode.label
        ) {
          if (child.checked == true) {
            child.checked = false
          } else {
            child.checked = true
          }
        }
        if (child.checked == true) {
          treatment_generated.levels.push(child.value)
        }
      })
      copy.push(treatment_generated)
    })
    setSelectedTreatment(copy)
  }

  const onResponseChange = (variable) => {
    let copy = [...final_list];
    if (copy.includes(variable.response_ref.value)) {
        copy = (copy.filter(item => item !== variable.response_ref.value))
    } else {
        copy.push(variable.response_ref.value)
    }
    console.log(copy)
    setFinalList(copy);
}

const ResponseVariable = variable => {
    const [checked_value, setCheckedValue] = useState(false);
    useEffect(() => {
        if (final_list.includes(variable.response_ref.value)) {
            setCheckedValue(true);
        }
    }, [])
    return (
        <div className="variable-list-item">
          <div className="label">
            <h3>{variable.response_ref.label}</h3>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked={checked_value} onChange={() => {onResponseChange(variable)}}/>
          </div>
        </div>
    )
}



  const onAction = (node, action) => { }
  const onNodeToggle = currentNode => { }

  return (
    <div className="options-list">
      <div className="title">
        <h3>Options</h3>
      </div>
      <div className="inputs">
        <div className="chart-select">
          <div className="label">
            <h3>Chart Type:</h3>
          </div>
          <div className="dropdown">
            {chart_types ? (
              <Select
                options={chart_types}
                getOptionLabel={chart => chart.label}
                getOptionValue={chart => chart.id} // It should be unique value in the options. E.g. I
                onChange={setChart}
                menuColor="red"
              />
            ) : null}
          </div>
        </div>
        <div className="date-select">
          <div className="title">
            <h3>Date Range</h3>
          </div>
          <div className="date-pickers">
            <div className="from-picker">
              <div className="label">
                <h3>From:</h3>
              </div>
              <div className="dropdown">
                <input
                  type="date"
                  name="codeBox"
                  min={min_date}
                  max={max_date}
                  onChange={e => {
                    setFrom(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="to-picker">
              <div className="label">
                <h3>To:</h3>
              </div>
              <div className="dropdown">
                <input
                  type="date"
                  name="codeBox"
                  min={from_selected}
                  max={max_date}
                  onChange={e => {
                    setTo(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="variables">
          <div className="title">
            {/* <h3>Variables</h3> */}
          </div>
          <div className="variable-pickers">
            <div className="treatment-picker">
              <div className="label">Treatment Variables:</div>
              <div className="dropdown">
                <DropdownTreeSelect
                  data={props.dataOptions.treatment_variables}
                  onChange={onChangeTreatment}
                  onAction={onAction}
                  onNodeToggle={onNodeToggle}
                />
              </div>
            </div>
            <div className="response-picker">
              <div className="label">Response Variables:</div>
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
                    <div className="project-block">
                      {props.dataOptions.response_variables.map(response => (
                        <ResponseVariable response_ref={response}/>
                      ))}
                    </div>
                    <a target="_blank" href={sensor_selected}>{}</a>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
        <div className="sensors">
          <div className="title">
            {/* <h3>Sensors</h3> */}
          </div>
          <div className="sensor-accordion">
            <div className="label">Sensor:</div>
            <div className="accordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                Sensor Quantities
              </AccordionSummary>
              <AccordionDetails>
                <div className="project-block">
                  {props.dataOptions.sensor_quantities.map(quantity => (
                    <SensorQuantity sensor_ref={quantity} />
                  ))}
                </div>
                <a target="_blank" href={sensor_selected}>{}</a>
              </AccordionDetails>
            </Accordion>
          </div>
          </div>
          
        </div>
        <div className="checkboxes">
          <div className="average-checkbox">
            <input
              type="checkbox"
              id="experiment_id"
              name="topping"
              value="experiment_ID"
            />{" "}
            Average over replicates
          </div>
          <div className="milestone-checkbox">
            <input
              type="checkbox"
              id="experiment_id"
              name="topping"
              value="experiment_ID"
            />{" "}
            Include milestones
          </div>
        </div>
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
