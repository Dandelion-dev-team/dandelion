import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function SysIssuesComponent(props) {
  const [issues, setIssues] = useState(0)

  useEffect(() => {
    readRecord("/issues", setIssues)
  }, [])

  return (
    <div className="issuesTable">
      <table className="tableList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Notes</th>
            <th>Clear</th>
          </tr>
        </thead>

        {issues
          ? issues.data.map(issue => (
              <tbody key={issues.id}>
                <td>{issue.name}</td>
                <td>{issue.reported_date}</td>
                <td>{issue.type}</td>
                <td>{issue.priority}</td>
                <td>{auth.notes}</td>
                <td>
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Edit"
                      onClick={() => {
                        editAuth(auth)
                      }}
                    />
                  </div>
                </td>
              </tbody>
            ))
          : null}
      </table>
    </div>
  )
}
