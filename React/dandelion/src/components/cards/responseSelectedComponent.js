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

  useEffect(() => {
    props.data.monday = false;
    props.data.tuesday = false;
    props.data.wednesday = false;
    props.data.thursday = false;
    props.data.friday = false;
    props.data.saturday = false;
    props.data.sunday = false;
    props.data.once = false;
    props.data.final = false;
  }, []);

  const onSelectionChange = e => {
    setDates(e);
    if (e.includes(datalist[0])) { props.data.monday = true } else { props.data.monday = false; }
    if (e.includes(datalist[1])) { props.data.tuesday = true } else { props.data.tuesday = false; }
    if (e.includes(datalist[2])) { props.data.wednesday = true; } else { props.data.wednesday = false; }
    if (e.includes(datalist[3])) { props.data.thursday = true } else { props.data.thursday = false; }
    if (e.includes(datalist[4])) { props.data.friday = true } else { props.data.friday = false; }
    if (e.includes(datalist[5])) { props.data.saturday = true } else { props.data.saturday = false; }
    if (e.includes(datalist[6])) { props.data.sunday = true } else { props.data.sunday = false; }
    if (e.includes(datalist[7])) { props.data.once = true } else { props.data.once = false; }
    if (e.includes(datalist[8])) { props.data.final = true } else { props.data.final = false; }

    props.rerenderCallback();
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
          onChange={onSelectionChange}
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
