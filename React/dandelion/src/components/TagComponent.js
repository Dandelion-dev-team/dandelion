import React, { useEffect, useState } from "react"
import "../styles/App.scss"

export default function TagComponent(props) {
  const [tags, setTag] = useState(0)

  useEffect(() => {
    //TESTED
    // Update the document title using the browser API
    fetch("http://localhost:3000/tag", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setTag(data))
  }, [])

  const deleteTag = index => {
    fetch("http://localhost:3000/tag/" + index, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(console.log("delete " + index))
      .then(window.location.reload(false))
  }

  const editTag = auth => {
    props.parentCallback(auth) 
  }

  return (
    <div className="recordTable">
      <table className="tableList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Label</th>
            <th>Status</th>
          </tr>
        </thead>

        {tags
          ? tags.map(tag => (
              <tbody key={tags.id}>
                <td>{tag.id}</td>
                <td>{tag.label}</td>
                <td>{tag.status}</td>
                <td>
                  <div className="submit-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Edit"
                      onClick={() => {
                        editTag(tag)
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
                      deleteTag(tag.id)
                    }}
                  ></input>
                </td>
              </tbody>
            ))
          : null}
      </table>
    </div>
  )
}
