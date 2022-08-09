import React, { useEffect, useState } from "react"
import { readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import AddStudentModal from "../modals/addStudentModal"
import EditUserModal from "../modals/editUserModal"
import AddMultipleUsersModal from "../modals/addMultipleUsersModal"
import AddUserTypeModal from "../modals/addUserTypeModal"

import {Button} from "react-bootstrap"

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
    setEditingUser(e)
    setShowEditModal(true)
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

    <div className="school-comp-container dandelion-component scrollable-container">
      <div className="scrollable-header">
        <h2>
          User accounts for your school
        </h2>
        <p>Username</p>
      </div>
      <div className="dandelion-table scrollable-content">
        <table className="schoolList">
          <tbody>
            {users
              ? users.users.map(user => (
                  <tr
                    key={user.id}
                    onClick={() => {
                      editUser(user)
                    }}
                  >
                    <td>
                      {user.username}
                    </td>
                    <td>
                      <div className="btn-container">
                        <button
                          onClick={() => {
                            onEditClick(user)
                          }}
                          className="dandelion-button"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null
            }
          </tbody>
        </table>
      </div>
      <div className="scrollable-footer">
        <div className="btn-container" id="single">
          <Button className="dandelion-button large-button" onClick={() => setShowTypeModal(true)} centered>
            Add users
          </Button>
        </div>
      </div>

    <AddUserTypeModal
      show={show_type_modal}
      setShow={setShowTypeModal}
      singleCallback={singleCallback}
      multipleCallback={multipleCallback}
    />

    <AddStudentModal
      show={show_single_modal}
      setShow={setShowSingleModal}
    />

    <AddMultipleUsersModal
      show={show_multiple_modal}
      setShow={setShowMultipleModal}
    />

    <EditUserModal
        show={show_edit_modal}
        setShow={setShowEditModal}
        user={editingUser}
    />
    </div>
  )
}
