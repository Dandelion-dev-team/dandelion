import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function SchoolUserComponent(props) {
  const [users, setUsers] = useState(0)

  useEffect(() => {
    //TESTED
    // Update the document title using the browser API
    fetch("http://localhost:3000/school-users", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  const editUser = user => {
    props.parentCallback(user)
  }

  return (
    <div className="schoolTable">
      <table className="schoolList">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Last Seen</th>
            <th>Status</th>
            <th>Project</th>
          </tr>
        </thead>

        {users
          ? users.map(user => (
              <tbody key={users.id}
              onClick={() => {
                editUser(user)
              }}>
                <td>{user.school_id}</td>
                <td>{user.lastSeen}</td>
                <td>{user.status}</td>
                <td>{user.project}</td>
               
              </tbody>
            ))
          : null}
      </table>
    </div>
  )
}
