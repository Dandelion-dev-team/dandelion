import React, { useState, useEffect } from "react"
import "../../styles/App.scss"
import Select from "react-select"

export default function VariableSelectedComponent(props) {

  const [selected_dates, setDates] = useState("")
  const datalist =
    [{ day: "Monday", id: 0 },
    { day: "Tuesday", id: 1 },
    { day: "Wednesday", id: 2 },
    { day: "Thursday", id: 3 },
    { day: "Friday", id: 4 },
    { day: "Saturday", id: 5 },
    { day: "Sunday", id: 6 },
    { day: "Once", id: 7 },
    { day: "Final", id: 8 },
    ]
  const handleSelection = e => {
    setDates(e)
  }

  return (
    <div className="selected-item">
      <div className="text-content">
        <div className="title-text">
          <h3>{props.data.name}</h3>
        </div>
        <div className="sub-text">
          {props.data.type == "Continuous" ? (
            <h3>
              Unit: {props.data.unit}, {props.data.lower_limit} -{" "}
              {props.data.upper_limit}
            </h3>
          ) : (
            props.data.levels.map(variable => <h3>{variable.name}, &nbsp;</h3>)
          )}
        </div>
      </div>
      <div className="datepicker">
        <Select
          closeMenuOnSelect={false}
          value={selected_dates}
          options={datalist}
          onChange={setDates}
          getOptionLabel={(sensor) => sensor.day}
          getOptionValue={(sensor) => sensor.id} // It should be unique value in the options. E.g. ID}
          isMulti={true}
        />
      </div>
      <div className="button-content">
        <input
          value="Edit"
          type="submit"
          className="submitButton"
          onClick={() => {
            props.editCallback(props.data.id)
          }}
        ></input>
      </div>
    </div>
  )
}
