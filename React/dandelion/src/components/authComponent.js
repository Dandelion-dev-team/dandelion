import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function AuthComponent(props) {
  const [auths, setAuth] = useState(0)
  //TESTED
  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/authority", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setAuth(data))
  }, [])

  const deleteAuth = index => {
    fetch("http://localhost:3000/authority/" + index, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(console.log("delete " + index))
      .then(window.location.reload(false))
  }

  const editAuth = auth => {
    props.parentCallback(auth)
  }

  return (
    <div className="authTable">
      <table className="tableList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {auths
          ? auths.map(auth => (
              <tbody key={auths.id}>
                <td>{auth.id}</td>
                <td>{auth.name}</td>
                <td>{auth.email}</td>
                <td>{auth.telephone}</td>
                <td>
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Edit"
                      onClick={() => {
                        editAuth(auth)
                      }}
                    ></input>
                  </div>
                </td>
                <td>
                  <input
                    type="submit"
                    className="submitButton"
                    value="Delete"
                    onClick={() => {
                      deleteAuth(auth.id)
                    }}
                  ></input>
                </td>
              </tbody>
            ))
          : null}
      </table>
    </div>
  )
}
