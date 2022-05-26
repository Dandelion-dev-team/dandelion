import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { deleteRecord, readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import AddStudentModal from "../modals/addStudentModal"
import EditUserModal from "../modals/editUserModal"
import EditIcon from "@mui/icons-material/Edit"
import AddMultipleUsersModal from "../modals/addMultipleUsersModal"
import AddUserTypeModal from "../modals/addUserTypeModal"

export default function SchoolUserComponent(props) {
  const [users, setUsers] = useState()
  const [show_single_modal, setShowSingleModal] = useState(false)
  const [show_edit_modal, setShowEditModal] = useState(false)
  const [show_multiple_modal, setShowMultipleModal] = useState(false)
  const [show_type_modal, setShowTypeModal] = useState(false)
  const [editingUser, setEditingUser] = useState()

  useEffect(() => {
    let school_id = localStorage.getItem("school_id")
    readRecord("/user/byschool/" + school_id, setUsers)
  }, [])

  const editUser = user => {
    props.parentCallback(user)
  }

  const onEditClick = e => {
    setShowEditModal(true)
    setEditingUser(e)
  }

  const singleCallback = e => {
    setShowSingleModal(true)
    setShowTypeModal(false)
  }

  const multipleCallback = e => {
    setShowMultipleModal(true)
    setShowTypeModal(false)
  }

  return (
    <div className="school-comp-container">
      {show_type_modal ? (
        <AddUserTypeModal
          singleCallback={singleCallback}
          multipleCallback={multipleCallback}
        />
      ) : null}
      {show_edit_modal ? (
        <EditUserModal closeModal={setShowEditModal} user={editingUser} />
      ) : null}
      {show_single_modal ? (
        <AddStudentModal closeModal={setShowSingleModal} />
      ) : null}
      {show_multiple_modal ? (
        <AddMultipleUsersModal closeModal={setShowMultipleModal} />
      ) : null}

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
                    <div className="username">{user.username}</div>
                  </td>
                  <td>
                    <div className="btn-container">
                      <div className="edit-btn">
                        <button
                          onClick={() => {
                            onEditClick(user)
                          }}
                          className="editButton"
                        >
                          Edit
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
        <div className="add-btn" id="single">
          <button
            onClick={() => {
              setShowTypeModal(true)
            }}
            className="submitButton"
          >
            Add Users
          </button>
        </div>
      </div>
    </div>
  )
}
