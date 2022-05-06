import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function AllIssuesComponent(props) {
    return (
        <div className="school-issues-table">
            <table className="issuesList">
                <thead>
                    <tr>
                        <th>All Issues</th>
                    </tr>
                </thead>


                <tbody>
                    <td>Issue 1</td>
                </tbody>
                <tbody>
                    <td>Issue 2</td>
                </tbody>
            </table>
        </div>
    )
}