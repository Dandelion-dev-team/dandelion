import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function SensorComponent(props) {
  const [sensorList, setSensors] = useState(0);

  useEffect(() => {
    //TESTED
    // Update the document title using the browser API
    fetch("http://localhost:3000/sensor", {
      method: "GET",
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      })
    }).then(response => response.json())
      .then(
        data => setSensors(data))
  }, []);



  const deleteSensor = index => {
    fetch("http://localhost:3000/sensor/" + index, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    }).then(console.log("delete " + index)).then(window.location.reload(false))
  }

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
                    onClick={() => { deleteSensor(sensor.id) }}
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