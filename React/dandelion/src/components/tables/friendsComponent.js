import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"

export default function FriendsComponent(props) {
  const [friends, setFriends] = useState(0)

  useEffect(() => {
    // readRecord('/users', setUsers);
    // fetch(process.env.ROOT_URL + "/school-users", {
    //   method: "GET",
    //   headers: new Headers({
    //     "Cache-Control": "no-cache, no-store, must-revalidate",
    //     Pragma: "no-cache",
    //     Expires: 0,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => setFriends(data))
  }, [])

  return (
    <div className="friends-container">
      <div className="friendsTable">
        <table className="friendList">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Last Seen</th>
              <th>Status</th>
            </tr>
          </thead>

          {friends
            ? friends.map(friend => (
                <tbody key={friends.id}>
                  <td>{friend.school_id}</td>
                  <td>{friend.lastSeen}</td>
                  <td>{friend.status}</td>
                </tbody>
              ))
            : null}
        </table>
      </div>
    </div>
  )
}
