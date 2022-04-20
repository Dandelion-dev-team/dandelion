import React, { useState, useEffect } from "react"
import Header from "../components/navigation/header"
import { AgGridReact } from "ag-grid-react"
import BarChartIcon from "@mui/icons-material/BarChart"
import BackupTableIcon from "@mui/icons-material/BackupTable"
import { readAdminRecord, readRecord } from "../utils/CRUD"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/App.scss"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import FilterComponent from "../components/filterComponent"
import OptionsComponent from "../components/optionsComponent"

export default function Data() {
  const [colour_index, setColourIndex] = useState(["#E3C3CA", "#e6e6e6"])
  const [tab_state, setTabState] = useState(0)
  const [data_options, setDataOptions] = useState();
  const [show_data_options, setShowOptions] = useState(false);
  const [table_data, setTableData] = useState([]);
  const [columnDefs, setColumns] = useState();
  const [chart_data, setChartData] = useState();
  //INITIAL DATA

  const generateChart = e => {
    let labels = [];
    e.index.forEach(date => {
      let converted_date = new Date(date).toDateString();
      labels.push(converted_date)
    });

    let lines = [];
    e.columns.forEach((column, column_index) => {
      let rows = ""
      column.forEach(data => {
        rows = rows + data + " ";
      })
      let line_data = [];
      e.data.forEach((data_item, index) => {
        data_item.forEach(((item, idx) => {
          if(idx == column_index){
            line_data.push(item)
          }
        }))
      })
      lines.push({ label: rows, data: line_data, fill: false});
    });
    setChartData({
      labels: labels,
      datasets: lines,
    })
  }

  const generateColumns = e => {
    console.log(e);
    let columns = [];
    columns.push({ field: "Observation" })
    e.columns.forEach(column => {
      let rows = ""
      column.forEach(data => {
        rows = rows + data + " ";
      })
      columns.push({ field: rows });
    });

    let column_data = [];
    e.data.forEach((data_item, index) => {
      let row_data = {}
      data_item.forEach(((item, idx) => {
        if (idx == 0) {
          let date = new Date(e.index[index]);
          row_data = { ...row_data, Observation: date.toDateString() }
        } else {
          let column_name = columns[idx].field;
          row_data = { ...row_data, [column_name]: item }
        }
      }))
      column_data.push(row_data)
    })
    setTableData(column_data)
    setColumns(columns)
    generateChart(e);
  }

  const dataset = {
    labels: ["13/03/22", "20/03/22", "27/03/22"],
    datasets: [
      {
        label: "Weight (g)",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [1, 2, 3],
      },
      {
        label: "Height (mm)",
        backgroundColor: "rgba(132,60,98)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        hidden: true,
        data: [5, 6, 7],
      },
    ],
  }


  const changeTab = e => {
    if (e == 0) {
      setTabState(0)
      setColourIndex(["#E3C3CA", "#e6e6e6"])
    } else {
      setTabState(1)
      setColourIndex(["#e6e6e6", "#E3C3CA"])
    }
  }

  const fetchOptions = e => {
    readAdminRecord("/data_options/" + e).then((response) => {
      setDataOptions(response.data);
      setShowOptions(true);
    })
  }

  const tableReturn = e => {
    generateColumns(e);
  }

  return (
    <div>
      <Header />
      <div className="data">
        <ToastContainer />
        <div className="data-container">
          <div className="data-content">
            {show_data_options ? <OptionsComponent dataOptions={data_options} setTable={tableReturn} /> : <FilterComponent fetchOptions={fetchOptions} />}
            <div className="spacer" />
            <div className="data-pane">
              <div className="tabs">
                <div
                  className="tab"
                  style={{ backgroundColor: colour_index[0] }}
                  onClick={() => {
                    changeTab(0)
                  }}
                >
                  <BackupTableIcon className="icon" />
                </div>
                <div
                  className="tab"
                  style={{ backgroundColor: colour_index[1] }}
                  onClick={() => {
                    changeTab(1)
                  }}
                >
                  <BarChartIcon className="icon" />
                </div>
              </div>
              <div className="pane-content">
                <div className="chart-table-view">
                  <div
                    className="ag-theme-alpine"
                    style={{
                      backgroundColor: "#f7f8ff",
                      height: "90%",
                      width: "100%",
                    }}
                  >
                    {tab_state == 0 ? (
                      columnDefs ? (
                        <AgGridReact
                          rowData={table_data}
                          columnDefs={columnDefs}
                        ></AgGridReact>
                      ) : null
                    ) : (
                      // <Bar
                      //   data={dataset}
                      //   options={{
                      //     plugins: {
                      //       legend: {
                      //         onClick: (evt, legendItem, legend) => {
                      //           const index = legendItem.datasetIndex
                      //           const ci = legend.chart

                      //           legend.chart.data.datasets.forEach((d, i) => {
                      //             ci.hide(i)
                      //             d.hidden = true
                      //           })

                      //           ci.show(index)
                      //           legendItem.hidden = false
                      //           //wrap this in a delay
                      //           ci.update()
                      //         },
                      //       },
                      //     },
                      //     animation: {
                      //       duration: 0,
                      //       easing: "linear",
                      //     },
                      //   }}
                      // />
                      <Line data={chart_data} />
                    )}
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
