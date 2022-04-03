import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { deleteRecord, readRecord } from "../../utils/CRUD";

export default function CrudComponent(props) {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    readRecord("/user/getsuperusers", setUsers)
  }, []);


  const editUser = (user) => {
    props.parentCallback(user);
  }

  return (
    <div className="authTable">
      <table className="tableList">
        <thead>
          <tr>
            <th>School ID</th>
            <th>Username</th>
            <th>Superuser</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {users ? users.users.map(user => (
          <tbody key={users.id}>
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
                onClick={() => { deleteRecord("/users/" + user.id) }}
              ></input>
            </td>
          </tbody>
        )) : null}

      </table>
    </div>
  )
}
