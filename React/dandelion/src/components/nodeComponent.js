import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function SensorComponent(props) {
  const [nodeList, setNodes] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/node", {
      method: "GET",
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      })
    }).then(response => response.json())
      .then(
        data => setNodes(data))
  }, []);

  const deleteNodes = index => {
    fetch("http://localhost:3000/node/" + index, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    }).then(console.log("delete " + index)).then(window.location.reload(false))
  }

  const editUser = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="recordTable">
      <table className="tableList">
        {nodeList ?
          <div>
            <thead> 
              <tr>
                <th>ID</th>
                <th>School ID</th>
                <th>Code</th>
                <th>MAC Address</th>
                <th>Last Communication Date</th>
                <th>Health Status</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            {nodeList.map(node => (
              <tbody key={node.id}>
                <td>{node.id}</td>
                <td>{node.school_id}</td>
                <td>{node.growcube_code}</td>
                <td>{node.mac_address}</td>
                <td>
                  {
                    (new Date(node.last_communication_date)).toUTCString()
                  }
                </td>
                <td>{node.health_status}</td>
                <td>{node.status}</td>
                <td>
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Edit"
                      onClick={() => { editUser(node) }}
                    ></input>
                  </div>
                </td>
                <td>
                  <input
                    type="submit"
                    className="submitButton"
                    value="Delete"
                    onClick={() => { deleteNodes(node.id) }}
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