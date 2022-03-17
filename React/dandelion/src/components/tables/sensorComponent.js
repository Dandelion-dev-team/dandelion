import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { deleteRecord, readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"

export default function SensorComponent(props) {
  const [sensorList, setSensors] = useState(0);

  useEffect(() => {
      readRecord("/sensor/", setSensors)
  }, []);

  const editSensor = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="recordTable">
      <table className="tableList">
        {sensorList ?
          <div>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Description</th>
                <th>URL</th>
                <th>Datasheet</th>
                <th>Quantity List</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            {sensorList.map(sensor => (
              <tbody key={sensor.id}>
                <td>{sensor.id}</td>
                <td>{sensor.code}</td>
                <td id="desc-id">{sensor.description}</td>
                <td><a href={sensor.url} target="_blank">Url</a></td>
                <td><a href={sensor.datasheet_link} target="_blank">Datasheet</a></td>
                <td>
                {
                sensor.quantities.map(quantity =>(
                    <h5>{quantity.name}</h5>
                ))}
                </td>

                <td>
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Edit"
                      onClick={() => { editSensor(sensor) }}
                    ></input>
                  </div>
                </td>
                <td>
                  <input
                    type="submit"
                    className="submitButton"
                    value="Delete"
                    onClick={() => { deleteRecord("/sensor/" + sensor.id) }}
                  ></input>
                </td>
              </tbody>
            ))}
          </div>
          : null}
      </table>
    </div>
  )
}