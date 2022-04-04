import React, { useEffect, useState } from "react"
import "../../styles/App.scss"

export default function MapModalCard(props) {
  const [project, setProject] = useState(0)

  useEffect(() => {
    // fetch(process.env.ROOT_URL + "/projects", {
    //   method: "GET",
    //   headers: new Headers({
    //     "Cache-Control": "no-cache, no-store, must-revalidate",
    //     Pragma: "no-cache",
    //     Expires: 0,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => setProject(data))
  }, [])
  

  return (
    <div>
      {project
        ? project.map(project => (
            <div className="modal-card">
              <div className="card-img">
                <img src={project.project_image_link} />
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
        : null}
    </div>
  )
}
