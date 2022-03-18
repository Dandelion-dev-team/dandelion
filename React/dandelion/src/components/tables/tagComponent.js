import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { deleteRecord, readRecord } from "../../utils/CRUD"

export default function TagComponent(props) {
  const [tags, setTag] = useState(0)

  useEffect(() => {
      readRecord("/tagreference", setTag)
  }, [])

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
          ? tags.data.map(tag => (
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
                      deleteRecord("/tagreference/" + tag.id)
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
