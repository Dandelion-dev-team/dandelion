import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function CrudComponent(props) {
  const [schools, setSchools] = useState(0);

  useEffect(() => {
    //Tested
    // Update the document title using the browser API
    fetch("http://localhost:3000/schools", {
      method: "GET",
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      })
    }).then(response => response.json())
      .then(
        data => setSchools(data))
  }, []);



  const deleteUser = index => {
    fetch("http://localhost:3000/schools/" + index, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    }).then(console.log("delete " + index)).then(window.location.reload(false))
  }

  const editUser = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="authTable">
      <table className="tableList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Auth ID</th>
            <th>Name</th>
            <th>Address Line 1</th>
            <th>Town</th>
            <th>Postcode</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {schools ? schools.map(school => (

          <tbody key={schools.id}>
            <td>{school.id}</td>
            <td>{school.authority_id}</td>
            <td>{school.name}</td>
            <td>{school.address_line_1}</td>
            <td>{school.town}</td>
            <td>{school.postcode}</td>
            <td>{school.telephone}</td>
            <td>{school.email}</td>
            <td>{school.status}</td>


            <td>
              <div>
                <input
                  type="submit"
                  className="submitButton"
                  value="Edit"
                  onClick={() => { editUser(school) }}
                ></input>
              </div>
            </td>
            <td>
              <input
                type="submit"
                className="submitButton"
                value="Delete"
                onClick={() => { deleteUser(school.id) }}
              ></input>
            </td>
          </tbody>
        )) : null}

      </table>
    </div>
  )
}