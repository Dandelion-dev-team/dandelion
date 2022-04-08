import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"

export default function FriendsComponent(props) {

  return (
    <div className="friends-container">
      <div className="friendsTable">
        <table className="friendList">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Username</th>
              <th>Status</th>
            </tr>
          </thead>

          {props.users
            ? props.users.map(friend => (
                <tbody key={friend.id}>
                  <td>{friend.id}</td>
                  <td>{friend.username}</td>
                  <td>{friend.status}</td>
                </tbody>
              ))
            : null}
        </table>
      </div>
    </div>
  )
}
