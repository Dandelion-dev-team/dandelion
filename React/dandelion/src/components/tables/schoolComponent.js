import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { deleteRecord, readRecord } from "../../utils/CRUD";
import {navigate} from "gatsby";

export default function SchoolComponent(props) {
  const [schools, setSchools] = useState(0);

  useEffect(() => {
      readRecord("/school", setSchools)
  }, []);

  const editSchool = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="school-maintenance dandelion-component scrollable-container">
      <div className="scrollable-header">
        <h2>
          Schools
        </h2>
        {/*<p>Username</p>*/}
      </div>
      <div className="dandelion-table scrollable-content">
        <table className="tableList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Town</th>
            <th>Authority</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {schools ? schools.data.map(school => (

          <tbody key={schools.id}>
            <td>{school.id}</td>
            <td>{school.name}</td>
            <td>{school.town}</td>
            <td>{school.authority}</td>
            <td>
              <div>
                <input
                  type="submit"
                  className="dandelion-button"
                  value="Edit"
                  onClick={() => { props.editSchool(school.id) }}
                ></input>
              </div>
            </td>
            <td>
              <input
                type="submit"
                className="dandelion-button"
                value="Delete"
                onClick={() => { deleteRecord("/school/" + school.id) }}
              ></input>
            </td>
          </tbody>
        )) : null}

      </table>
      </div>
    </div>
  )
}
