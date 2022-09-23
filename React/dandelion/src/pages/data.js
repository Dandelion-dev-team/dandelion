import React, { useState, useEffect, useRef } from "react"
import Header from "../components/navigation/header"
import { AgGridReact } from "ag-grid-react"
import BarChartIcon from "@mui/icons-material/BarChart"
import BackupTableIcon from "@mui/icons-material/BackupTable"
import { readAdminRecord, readRecord } from "../utils/CRUD"
import { Line, Bar } from "react-chartjs-2"
import { Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend } from "chart.js"
import 'chartjs-adapter-luxon';
import DateTime from "luxon";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import SideNav from "../components/navigation/sideNav"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../styles/App.scss"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import FilterComponent from "../components/filterComponent"

export default function Data() {
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])
  const [tab_state, setTabState] = useState(0)
  const [data_options, setDataOptions] = useState()
  const [show_data_options, setShowOptions] = useState(false)
  const [table_data, setTableData] = useState([])
  const [columnDefs, setColumns] = useState()
  const [chart_data, setChartData] = useState()
  const [helpText, setHelpText] = useState("welcome")

  const [chart_type, setChartType] = useState("")
  const [chartOptions, setChartOptions] = useState({})

  ChartJS.register(
    TimeScale,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const getRandomInt = max => {
    return Math.floor(Math.random() * max)
  }

  const generateChart = dataset => {
    setChartType("")
    setChartData()
    // Set up series names and format
    let series = []
    dataset.data.columns.forEach((column, column_index) => {
      let label = ""
      column.forEach(data => {
        label = label + data + " "
      })

      let r = getRandomInt(255)
      let g = getRandomInt(255)
      let b = getRandomInt(255)

      let colour = "rgba(" + r + "," + g + "," + b + ")"

      let seriesType = null
      let yAxis = "y"

      dataset.response.forEach(rv => {
        if (column.includes(rv.name) && rv.variable_type === 'discrete') {
          seriesType = 'line'     // Discrete variables are always shown as lines
          yAxis = "y" + rv.value  // Attach discrete variables to the correct y-axis
        }
      })


      series.push({
        label: label,
        data: [],
        fill: false,
        type: seriesType,
        yAxisID: yAxis,
        borderColor: colour,
        backgroundColor: colour,
      })
    })

    // Set up line data as x,y pairs
    dataset.data.index.forEach((observation_date, date_idx) => {
      dataset.data.data[date_idx].forEach((observation, idx) => {
        series[idx].data.push({
          x: new Date(observation_date),
          y: observation
        })
      })
    })

    // Reorder series so that discrete variables are rendered last
    series = series.sort((a, b) => (a.yAxisID > b.yAxisID ? -1 : 1))

    let options = {
      scales: {
        y: {
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: "",
            font: {
              size: 22,
              fontFamily: "Archivo Narrow, sans-serif",
            }
          },
          ticks: {
            display: true,
            font: {
              size: 16,
              fontFamily: "Archivo Narrow, sans-serif",
            }
          }
        },
        x: {
          display: true,
          type: 'time',
          time: {
            unit: "day",
            isoWeekday: true,
            tooltipFormat: "EEE, dd MMM yyyy"
          },
          ticks: {
            display: true,
            font: {
              size: 16,
              fontFamily: "Archivo Narrow, sans-serif",
            },
            min: new Date(dataset.data.index[0]),
            max: new Date(dataset.data.index[dataset.data.index.length - 1])
            // suggestedMin: interval.startAt,
            // suggestedMax: interval.endAt
          },
          title: {
            display: true,
            text: 'Observation date',
            font: {
              size: 22,
              fontFamily: "Archivo Narrow, sans-serif",
            },
          },
            plugins: {
              // This section not yet working
              legend: {
                display: true,
                labels: {
                  font: {
                    size: 20,
                  },
                  fontSize: 20,
                }
              }
            }
        }
      }
    }

    dataset.y_axes.forEach(axis => {
      options.scales["y" + axis.id] = {
        type: 'category',
        labels: axis.scale,
        position: 'right',
        grid: {
          display: false
        },
        title: {
          display: true,
          text: axis.name,
          font: {
            size: 22,
            fontFamily: "Archivo Narrow, sans-serif",
          }
        },
        ticks: {
          display: true,
          font: {
            size: 16,
            fontFamily: "Archivo Narrow, sans-serif",
          }
        }
      }
    })

    console.log("Options", options)

    setChartOptions(options)

    setChartData({
      datasets: series,
    })

    console.log("Chart data", {
      datasets: series,
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
    dataset.data.columns.forEach(column => {
      let rows = ""
      column.forEach(data => {
        rows = rows + data + " "
      })
      columns.push({ field: rows })
    })

    let column_data = []
    dataset.data.data.forEach((data_item, index) => {
      let row_data = {}
      data_item.forEach((item, idx) => {
        if (idx === 0) {
          let date = new Date(dataset.data.index[index])
          row_data = { ...row_data, Observation: date.toDateString() }
        }
        let column_name = columns[idx+1].field
        row_data = { ...row_data, [column_name]: item }
      })
      column_data.push(row_data)
    })
    setTableData(column_data)
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
    generateColumns(data_and_options)
    setChartType(data_and_options.chart)
  }

  const helpDisplayed = level => {
    if (level === 'welcome') {
      return (
          <span>
          On this page, you can see the data that has been collected
          <br/><br/>
            &larr; Choose your data and display options, then click the 'Generate' button &#8601; to
          generate the results.
          <br/><br/>
          You can start with either schools or activities
          <br/><br/>
          Click the 'Clear' button &#8601; to clear your choices and start again
        </span>
      )
    }
    if (level === 'experiment') {
      return (
        <span>
          Use the information icon to see the details of this activity
          <br/><br/>
          The next step is to choose the experiment you are interested in
        </span>
      )
    }
    if (level === 'dates') {
      return (
        <span>
          Use the information icon to see more details about this experiment
          <br/><br/>
          With the experiment selected, the list of schools shows only those participating
          <br/><br/>
          The 'From' and 'To' dates default to the start and end of the available data - you can
          make them more specific
          <br/><br/>
          The next step is to choose which variables you want to plot.
        </span>
      )
    }
    if (level === 'treatment') {
      return (
        <span>
          Treatment variables appear as lines or bars
        </span>
      )
    }
    if (level === 'response') {
      return (
      <span>
        Response variables correspond to the values on the y-axis of a line or bar chart.
        <br/><br/>
        Only discrete variables can be shown on a pie chart.
      </span>
      )
    }
    if (level === 'line') {
      return (
        <span>
          Both continuous and discrete variables can be shown on a line chart
          <br/><br/>
          If you don't like the colours, just click 'Generate' again
        </span>
      )
    }
    if (level === 'bar') {
      return (
        <span>
          Continuous variables will be plotted as bars.
          <br/><br/>
          If you choose a discrete variable, it will be shown as a line on top of the bars
          <br/><br/>
          If you don't like the colours, just click 'Generate' again
        </span>
      )
    }
    if (level === 'pie') {
      return (
        <span>
          Pie charts are not quite ready yet...
          <br/><br/>
          They will be added soon!
        </span>
      )
    }
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
                            setHelpText={setHelpText}
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
                            <div className="dandelion-hint">
                              {helpDisplayed(helpText)}
                            </div>
                        }
                      </div>
                    </Tab>
                    <Tab eventKey="chart" title="Chart">
                      {chart_type === "line" ? (
                          <Line data={chart_data} options={chartOptions} />
                        ) : chart_type === "bar" ? (
                          <Bar data={chart_data} options={chartOptions} />
                        )
                          :
                          <div className="dandelion-hint">
                            A data chart will only be shown after you have selected the data you want to
                            see and the display options.
                            <br/><br/>
                            &larr; Make your choices here
                          </div>
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
