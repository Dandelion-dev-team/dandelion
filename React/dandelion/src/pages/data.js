import React, { useState, useEffect } from "react"
import Header from "../components/navigation/header"
import "../styles/App.scss"
import Card from "../components/cards/projectCard"
import TuneIcon from "@mui/icons-material/Tune"
import { readRecord } from "../utils/CRUD"
export default function Data() {
  const [projectList, setData] = useState(0)

  useEffect(() => {
    // Update the document title using the browser API
    readRecord("/project", setData);
  }, []);

  return (
    <div>
      <Header />
      <div className="data">
      <div className="data-container">
        <div className="data-content">
          <div className="filter-list">
            <div className="title">
              <h3>Filter List</h3>
            </div>
            <div className="filters">
              <h2>filters</h2>
            </div>
          </div>
          <div className="spacer" />
          <div className="data-pane">
            <div className="tabs"></div>

            <div className="pane-content">
              <div className="chart-table-view"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="data">
        <div className="container">
          <div className="heading">
            <h1>Data Page</h1>
          </div>
          <div className="projects">
            {projectList.length > 0 ?
              projectList.map(function (d, idx) {
                return (
                  <Card key={idx} title={d.title} description={d.description} image={d.project_image_link}></Card>)
              })
              : <h3>No activities found</h3>}
          </div>
        </div>
      </div> */}
    </div>
  )
}
