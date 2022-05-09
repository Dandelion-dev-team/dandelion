import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"

export default function AllIssuesComponent(props) {
  const [issues, setIssues] = useState([])
  useEffect(() => {
    readRecord("/issue", setIssues)
  }, [])

  const clickedCallback = issue => {
    props.issueCallback(issue)
  }
  return (
    <div className="school-issues-table">
      <table className="issuesList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reported Date</th>
          </tr>
        </thead>

        {issues.issues
          ? issues.issues.map(issue => (
              <tbody
                key={issue.id}
                onClick={() => {
                  clickedCallback(issue.id)
                }}
              >
                <td>{issue.name}</td>
                <td>{issue.reported_date}</td>
              </tbody>
            ))
          : null}
      </table>
    </div>
  )
}
