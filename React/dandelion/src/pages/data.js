import React, { useState, useEffect } from "react"
import Header from "../components/navigation/header"
import { AgGridReact } from 'ag-grid-react';
import BarChartIcon from '@mui/icons-material/BarChart';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { readRecord } from "../utils/CRUD"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

import "../styles/App.scss"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Data() {
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])
  const [tab_state, setTabState] = useState(0);

  const [tagsList, setTags] = useState([]);
  const [schoolList, setSchools] = useState([]);
  const [projectList, setProjects] = useState([]);
  const [experimentList, setExperiments] = useState([]);

  const [rowData] = useState([
    { Observation: "Plant Height", "13/03/22": "1mm", "20/03/22": "2mm", "27/03/22": "3mm" },
    { Observation: "Plant Weight", "13/03/22": "1g", "20/03/22": "2g", "27/03/22": "3g" },

  ]);

  const [columnDefs] = useState([
    { field: 'Observation' },
    { field: '13/03/22' },
    { field: '20/03/22' },
    { field: '27/03/22' }

  ])

  const dataset = {
    labels: ['13/03/22', '20/03/22', '27/03/22'],
    datasets: [
      {
        label: 'Weight',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [1, 2, 3]
      }
    ]
  }

  useEffect(() => {
    readRecord("/tagreference", setTags)
    readRecord("/school", setSchools)

    fetch(process.env.ROOT_URL + "/projects", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setProjects(data))
  }, []);


  const Tag = tag => {
    return (
      <div className="tag-item">
        <h3>{tag.tag_ref.label}</h3>
      </div>)
  }

  const School = school => {
    return (
      <div className="school-item">
        <input type="checkbox" id="experiment_id" name="topping" value="experiment_ID" disabled={false} />
        <h3>{school.school_ref.name}</h3>
      </div>
    )
  }

  const Project = project => {
    return (
      <div className="project-item">
        <input type="checkbox" id="experiment_id" name="topping" value="experiment_ID" disabled={false} />
        <h3>{project.project_ref.title}</h3>
      </div>
    )
  }



  const changeTab = e => {
    if (e == 0) {
      setTabState(0);
      setColourIndex(["#E3C3CA", "#e6e6e6"])
    } else {
      setTabState(1);
      setColourIndex(["#e6e6e6", "#E3C3CA"])
    }
  }


  return (
    <div>
      <Header />
      <div className="data">
        <div className="data-container">
          <div className="data-content">
            <div className="filter-list">
              <div className="title">
                <h3>Filters</h3>
              </div>
              <div className="filters">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    Tags
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="tag-block">
                      {tagsList.data ? tagsList.data.map(tagItem => <Tag tag_ref={tagItem} />) : <h3>No tags found</h3>}
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    Schools
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="school-block">
                      {schoolList.data ? schoolList.data.map(schoolItem => <School school_ref={schoolItem} />) : <h3>No schools found</h3>}
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    Activities
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="project-block">
                      {projectList ? projectList.map(projectItem => <Project project_ref={projectItem} />) : <h3>No schools found</h3>}
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion disabled={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    Experiments
                  </AccordionSummary>
                  <AccordionDetails>
                    No other data selected.
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <div className="spacer" />
            <div className="data-pane">
              <div className="tabs">
                <div className="tab" style={{ backgroundColor: colour_index[0] }} onClick={() => {
                  changeTab(0)
                }}>
                  <BackupTableIcon className="icon" />
                </div>
                <div className="tab" style={{ backgroundColor: colour_index[1] }} onClick={() => {
                  changeTab(1)
                }}>
                  <BarChartIcon className="icon" />
                </div>
              </div>
              <div className="pane-content">
                <div className="chart-table-view">
                  <div className="ag-theme-alpine" style={{ backgroundColor: '#f7f8ff', height: '90%', width: '100%' }}>
                    {tab_state == 0 ?
                      <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}>
                      </AgGridReact> :
                      <Bar
                        data={dataset}
                        options={{
                          title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                          },
                          legend: {
                            display: true,
                            position: 'right'
                          }
                        }}
                      />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
