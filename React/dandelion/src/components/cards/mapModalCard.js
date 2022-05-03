import React, { useEffect, useState } from "react"
import "../../styles/App.scss"
import { readRecord } from "../../utils/CRUD"

export default function MapModalCard(props) {
  const [project, setProject] = useState(0)

  useEffect(() => {
    console.log( "/project_partner/byschool/" + props.id)
    readRecord(
      "/project_partner/byschool/" + props.id, setProject
    )
  }, [])
  

  return (
    <div>
      {project
        ? project.length > 0 ? project.map(project => (
            <div className="modal-card">
              <div className="card-img">
                <img src={project.image_full} />
              </div>
              <div className="card-details">
                <div className="owner">
                  <h2>{project.owner}</h2>
                </div>
                <div className="title">
                  <h2>{project.title}</h2>
                </div>
                <div className="description">
                  <h2>{project.description}</h2>
                </div>
              </div>
            </div>
          ))
       : <h3>This school is not currently a part of any projects.</h3> : null}
    </div>
  )
}
