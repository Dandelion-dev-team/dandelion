import React, { useEffect, useState } from "react"
import { readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"
import AddStudentModal from "../modals/addStudentModal"
import AddMultipleUsersModal from "../modals/addMultipleUsersModal"
import AddUserTypeModal from "../modals/addUserTypeModal"

import {Button} from "react-bootstrap"

export default function SchoolUserComponent(props) {
  const [users, setUsers] = useState()
  const [show_single_modal, setShowSingleModal] = useState(false)
  const [show_multiple_modal, setShowMultipleModal] = useState(false)
  const [show_type_modal, setShowTypeModal] = useState(false)

  useEffect(() => {
      console.log("Reloading list")
    let school_id = localStorage.getItem("school_id")
    readRecord("/user/byschool/" + school_id, updateDisplayedList)
  }, [props.reload])

    const updateDisplayedList = (users) => {
        setUsers(users)
        if (props.viewedUser) {
            users.users.forEach(user => {
                if (user.user_id === props.viewedUser.user_id) {
                    props.populateUserPane(user)
                }
            })
        }
    }

  const viewUser = user => {
    props.populateUserPane(user)
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
        <div className="scrollable-inner">
          <table className="schoolList">
          <tbody>
            {users
              ? users.users.map(user => (
                  <tr
                    key={user.id}
                    onClick={() => {
                      viewUser(user)
                    }}
                  >
                    <td>
                      {user.username}
                    </td>
                  </tr>
                ))
              : null
            }
          </tbody>
        </table>
        </div>
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
    </div>
  )
}
