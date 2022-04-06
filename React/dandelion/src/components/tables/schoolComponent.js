import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { deleteRecord, readRecord } from "../../utils/CRUD";

export default function CrudComponent(props) {
  const [schools, setSchools] = useState(0);

  useEffect(() => {
      readRecord("/school", setSchools)
  }, []);

  const editSchool = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="recordTable">
      <table className="tableList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Auth ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {schools ? schools.data.map(school => (

          <tbody key={schools.id}>
            <td>{school.id}</td>
            <td>{school.authority_id}</td>
            <td>{school.name}</td>
            <td>
              <div>
                <input
                  type="submit"
                  className="submitButton"
                  value="Edit"
                  onClick={() => { editSchool(school) }}
                ></input>
              </div>
            </td>
            <td>
              <input
                type="submit"
                className="submitButton"
                value="Delete"
                onClick={() => { deleteRecord("/school/" + school.id) }}
              ></input>
            </td>
          </tbody>
        )) : null}

      </table>
    </div>
  )
}