import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { deleteRecord, readRecord } from "../../utils/CRUD";

export default function SensorComponent(props) {
  const [nodeList, setNodes] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    readRecord("/node", setNodes)
  }, []);

  const editUser = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="authTable dandelion-component scrollable-container">
      <div className="scrollable-header">
        <h2>
          Nodes
        </h2>
        {/*<p>Username</p>*/}
      </div>
      <div className="dandelion-table scrollable-content">
        <table className="tableList">
          {nodeList ?
            <div>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>School ID</th>
                  <th>Last Communication Date</th>
                  <th>Health Status</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              {nodeList.data.map(node => (
                <tbody key={node.id}>
                  <td>{node.id}</td>
                  <td>{node.school_id}</td>
                  <td>
                    {
                      (new Date(node.last_communication_date)).toUTCString()
                    }
                  </td>
                  <td>{node.health_status}</td>
                  <td>{node.status}</td>
                  <td>
                    <div className="btn-container">
                      <input
                        type="submit"
                        className="dandelion-button"
                        value="Edit"
                        onClick={() => { editUser(node) }}
                      ></input>
                    </div>
                  </td>
                  <td>
                    <input
                      type="submit"
                      className="dandelion-button"
                      value="Delete"
                      onClick={() => { deleteRecord("/node/" + node.id) }}
                    ></input>
                  </td>
                </tbody>
              ))}
            </div>
            : null}
        </table>
      </div>
    </div>
  )
}
