import React, { useState, useEffect } from "react"
import Header from "../components/navigation/header"
import Card from "../components/cards/projectCard"
import TuneIcon from "@mui/icons-material/Tune"
import { readRecord } from "../utils/CRUD"
import { AgGridReact } from 'ag-grid-react';

import "../styles/App.scss"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Data() {
  const [projectList, setData] = useState(0)

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
                <div className="chart-table-view">
                  <div className="ag-theme-alpine" style={{ height: '90%', width: '90%' }}>
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={columnDefs}>
                    </AgGridReact>
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
