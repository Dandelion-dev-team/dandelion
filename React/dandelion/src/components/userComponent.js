import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function CrudComponent(props) {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      })
    }).then(response => response.json())
      .then(
        data => setUsers(data))
  }, []);



  const deleteUser = index => {
    fetch("http://localhost:3000/users/" + index, {
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
            <th>School ID</th>
            <th>Username</th>
            <th>Superuser</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {users ? users.map(user => (

          <tbody key={users.id}>
            <td>{user.id}</td>
            <td>{user.school_id}</td>
            <td>{user.username}</td>
            <td>{user.is_superuser.toString()}</td>
            <td>{user.status}</td>
            <td>
              <div className="submit-btn">
                <input
                  type="submit"
                  className="submitButton"
                  value="Edit"
                  onClick={() => { editUser(user) }}
                ></input>
              </div>
            </td>
            <td>
              <input
                type="submit"
                className="submitButton"
                value="Delete"
                onClick={() => { deleteUser(user.id) }}
              ></input>
            </td>
          </tbody>
        )) : null}

      </table>
    </div>
  )
}