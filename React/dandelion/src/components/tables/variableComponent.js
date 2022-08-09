import React, { useEffect, useState } from "react"
import { readRecord } from "../../utils/CRUD"
import "../../styles/App.scss"

export default function VariableComponent(props) {
  const [variables, setVariables] = useState()

  useEffect(() => {
    readRecord("/variable", setVariables)
  }, [])

  const showVariable = variable => {
    props.parentCallback(variable)
  }

  return (
    <div className="dandelion-component scrollable-container">
      <div className="scrollable-header">
        <h2>
          Variables
        </h2>
        <p>Name</p>
      </div>
      <div className="dandelion-table scrollable-content">
        <table>
          <tbody>
            {variables
              ? variables.data.map(variable => (
                  <tr
                    key={variable.id}
                    onClick={() => {
                      console.log(variables)
                      showVariable(variable)
                    }}
                  >
                    <td>{variable.name}</td>
                      <td>{variable.levels.length ? "Discrete" : "Continuous"}</td>
                  </tr>
                ))
              : null
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
