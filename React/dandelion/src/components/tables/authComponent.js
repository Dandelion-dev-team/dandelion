import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { deleteRecord, readRecord } from "../../utils/CRUD";

export default function AuthComponent(props) {
  const [auths, setAuth] = useState(0)
  //TESTED
  useEffect(() => {
    readRecord('/authority', setAuth);
  }, [])

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
                    deleteRecord("/authority/" + auth.id)
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
