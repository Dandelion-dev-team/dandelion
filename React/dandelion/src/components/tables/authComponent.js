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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
            <tbody key={auths.id}>

        {auths
          ? auths.data.map(auth => (
              <tr>
              <td>{auth.id}</td>
              <td>{auth.name}</td>
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
                </tr>
          ))
          : null}
            </tbody>
      </table>
    </div>
  )
}
