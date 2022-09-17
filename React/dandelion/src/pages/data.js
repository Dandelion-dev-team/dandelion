import React, { useState, useEffect, useRef } from "react"
import Header from "../components/navigation/header"
import { AgGridReact } from "ag-grid-react"
import BarChartIcon from "@mui/icons-material/BarChart"
import BackupTableIcon from "@mui/icons-material/BackupTable"
import { readAdminRecord, readRecord } from "../utils/CRUD"
import { Line, Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import SideNav from "../components/navigation/sideNav"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../styles/App.scss"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import FilterComponent from "../components/filterComponent"
import OptionsComponent from "../components/optionsComponent"

export default function Data() {
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])
  const [tab_state, setTabState] = useState(0)
  const [data_options, setDataOptions] = useState()
  const [show_data_options, setShowOptions] = useState(false)
  const [table_data, setTableData] = useState([])
  const [columnDefs, setColumns] = useState()
  const [chart_data, setChartData] = useState()

  const [chart_type, setChartType] = useState("")

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const getRandomInt = max => {
    return Math.floor(Math.random() * max)
  }

  const generateChart = dataset => {
    let labels = []
    dataset.index.forEach(date => {
      let converted_date = new Date(date).toDateString()
      labels.push(converted_date)
    })

    let lines = []
    dataset.columns.forEach((column, column_index) => {
      let rows = ""
      column.forEach(data => {
        rows = rows + data + " "
      })
      let line_data = []
      dataset.data.forEach((data_item, index) => {
        data_item.forEach((item, idx) => {
          if (idx === column_index) {
            line_data.push(item)
          }
        })
      })
      let r = getRandomInt(255)
      let g = getRandomInt(255)
      let b = getRandomInt(255)

      let colour = "rgba(" + r + "," + g + "," + b + ")"
      lines.push({
        label: rows,
        data: line_data,
        fill: false,
        borderColor: colour,
        backgroundColor: colour,
      })
    })
    console.log("Labels: ", labels)
    console.log("Lines: ", lines)
    setChartData({
      labels: labels,
      datasets: lines,
    })
  }

  const clearData = () => {
    setColumns(undefined)
    setChartType("")
  }

  const generateColumns = dataset => {
    console.log("EEEE: ",dataset)
    let columns = []
    columns.push({ field: "Observation" })
    dataset.columns.forEach(column => {
      let rows = ""
      column.forEach(data => {
        rows = rows + data + " "
      })
      columns.push({ field: rows })
    })

    let column_data = []
    dataset.data.forEach((data_item, index) => {
      let row_data = {}
      data_item.forEach((item, idx) => {
        if (idx === 0) {
          let date = new Date(dataset.index[index])
          row_data = { ...row_data, Observation: date.toDateString() }
        } else {
          let column_name = columns[idx].field
          row_data = { ...row_data, [column_name]: item }
        }
      })
      column_data.push(row_data)
    })
    setTableData(column_data)
    console.log(columns)
    setColumns(columns)
    generateChart(dataset)
  }

  const changeTab = e => {
    if (e === 0) {
      setTabState(0)
      setColourIndex(["#E3C3CA", "#e6e6e6"])
    } else {
      setTabState(1)
      setColourIndex(["#e6e6e6", "#E3C3CA"])
    }
  }

  const fetchOptions = e => {
    readAdminRecord("/data_options/" + e).then(response => {
      setDataOptions(response.data)
      setShowOptions(true)
    })
  }

  const tableReturn = data_and_options => {
    console.log(data_and_options)
    generateColumns(data_and_options.data)
    setChartType(data_and_options.chart)
  }

  return (
    <div>
      <div className="dandelion data">
        <Header />
        <div className="page-container">
          <ToastContainer />
          <SideNav />
            <div className="main-content">
              <div className="content-area">
                  <div className="data-select standalone-panel">
                        <FilterComponent
                            fetchOptions={fetchOptions}
                            setTable={tableReturn}
                            clearData={clearData}
                        />
                  </div>
                <div className="tabbed-panel">
                  <Tabs
                    defaultActiveKey="table"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="table" title="Table">
                      <div className="chart-table-view">
                        {columnDefs ?
                          <div className="ag-theme-alpine">
                              <AgGridReact
                                rowData={table_data}
                                columnDefs={columnDefs}
                              ></AgGridReact>
                          </div>
                          :
                            <div class="dandelion-hint">
                              &larr; Choose your data and display options, then click the button &#8601; to generate
                              the results.
                              <br/><br/>
                              You can start with either schools or activities
                              <br/><br/>
                              Click the 'clear' button &#8601; to clear your choices and start again
                            </div>
                        }
                      </div>
                    </Tab>
                    <Tab eventKey="chart" title="Chart">
                      {chart_type === "line" ? (
                          <Line data={chart_data} options={options} />
                        ) : chart_type === "bar" ? (
                          <Bar data={chart_data} options={options} />
                        ) : null
                      }
                    </Tab>
                  </Tabs>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
