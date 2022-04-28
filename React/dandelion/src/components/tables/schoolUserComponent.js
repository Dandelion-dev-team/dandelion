import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { deleteRecord, readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import AddStudentModal from "../modals/addStudentModal"
import EditUserModal from "../modals/editUserModal"
import EditIcon from '@mui/icons-material/Edit'

export default function SchoolUserComponent(props) {
  const [users, setUsers] = useState()
  const [show_modal, setShowModal] = useState(false)
  const [show_edit_modal, setShowEditModal] = useState(false)

  useEffect(() => {
    let school_id = localStorage.getItem("school_id")
    readRecord("/user/byschool/" + school_id, setUsers)
  }, [])

  const editUser = user => {
    props.parentCallback(user)
  }

  return (
    <div className="school-comp-container">
      {show_modal ? <AddStudentModal closeModal={setShowModal} /> : null}
      {show_edit_modal ? <EditUserModal closeModal={setShowEditModal} /> : null}

      <div className="schoolTable">
        <table className="schoolList">
          <thead>
            <tr>
              <th>Username</th>
              <th>Edit</th>
            </tr>
          </thead>
          {users
            ? users.users.map(user => (
                <tbody
                  key={user.id}
                  onClick={() => {
                    editUser(user)
                  }}
                >
                  <td>
                    <div className="username">
                      {user.username}
                    </div>
                  </td>
                  <td>
                    <div className="btn-container">
                      <div className="edit-btn">
                        <button
                          onClick={() => {
                            setShowEditModal(true)
                          }}
                          className="editButton"
                        >Edit
                        </button>
                      </div>
                    </div>
                  </td>
                </tbody>
              ))
            : null}
        </table>
      </div>
      <div className="btn-row">
        <div className="add-btn">
          <button
            onClick={() => {
              setShowModal(true)
            }}
            className="submitButton"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  )
}
