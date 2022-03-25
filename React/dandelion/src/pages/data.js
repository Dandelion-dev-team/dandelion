import React, { useState, useEffect } from "react"
import Header from "../components/navigation/header"
import { AgGridReact } from 'ag-grid-react';
import BarChartIcon from '@mui/icons-material/BarChart';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

import "../styles/App.scss"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Data() {
  const [projectList, setData] = useState()
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])

  const [tab_state, setTabState] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    //readRecord("/project", setData);
  }, []);

  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ]);

  const [columnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ])

  const changeTab = e => {
    if (e == 0) {
      setTabState(0);
      setColourIndex(["#E3C3CA", "#e6e6e6"])
    } else {
      setTabState(1);
      setColourIndex(["#e6e6e6", "#E3C3CA"])
    }
  }
  const dataset = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

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
