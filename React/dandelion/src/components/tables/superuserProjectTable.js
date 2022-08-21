import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"
import Form from "react-bootstrap/Form"
import {sentenceCase} from "../../utils/functions"

export default function ProjectComponent(props) {
    const [projects, setProjects] = useState(0)
    const [showAll, setShowAll] = useState(false)

  //TESTED
  useEffect(() => {
    let school_id = localStorage.getItem("school_id")
    readRecord("/project/byschool/" + school_id, setProjects)
  }, [props.reload])

  var isActive = true
  var className = isActive ? "active" : ""

    const test = () => {
      console.log(projects)
    }

    const showProject = (project, all) => {
        if (all) {
            return true
        }
        else {
            if (parseInt(project.owner_id) === parseInt(localStorage.getItem("school_id")) ||
                    ['active', 'invited'].includes(project.project_partner_status)
                ) {
                return true
            }
        }
        return false
    }

  return (
    <div className="project-table dandelion-component scrollable-container">
      <div className="scrollable-header">
        <h2 onClick={test}>
          Your activities
        </h2>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Show all"
            checked={showAll}
            onChange={() => {
                setShowAll(!showAll)
            }}
          />
        </Form>
        <h4>Title</h4>
      </div>
      <div className="dandelion-table scrollable-content">
          <div className="scrollable-inner">
            <table className="projectList">
            <tbody>
              {projects
                ? projects.filter(
                    project => showProject(project, showAll)).map(project => (
                    <tr
                      key={projects.id}
                      className={className}
                      onClick={() => {
                        props.loadProjectData(project.id)
                        isActive = true
                      }}
                    >
                      <td>
                          {project.title}
                          {project.project_partner_status !== 'active' ?
                              <span> ({sentenceCase(project.project_partner_status)})</span>
                              : null
                          }
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
        </table>
          </div>
      </div>
    </div>
  )
}
