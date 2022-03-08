import React, { useEffect, useState, useRef } from "react"
import Header from "../../../components/header"
import "../../../styles/App.scss"
import TuneIcon from "@mui/icons-material/Tune"
import VariableListComponent from "../../../components/variableListComponent"
import ViewDetailedVariable from "../../../components/Modals/viewDetailedVariable"
import VariableSelectedComponent from "../../../components/variableSelectedComponent"

export default function ThirdExpPage(props) {
  const [search_value, changeSearch] = useState("")
  const [variable_list, setVariables] = useState("")
  const [show_details, setShowDetails] = useState("")
  const [full_detail_variable, setDetailVariable] = useState("")
  const [help_response, setHelpResponse] = useState("")


  const [selected_list, updateSelectedList] = useState([])

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const modalCallback = e => {
    setShowDetails(false)
  }

  const checkboxCallback = e => {
    let val = e.data
    if (e.value == true) {
      updateSelectedList(arr => [...arr, val])
    } else {
      updateSelectedList(selected_list.filter(item => item !== val))
    }
  }

  const handleCallback = index => {
    fetch("http://localhost:3000/treatmentVariableFull/" + index, {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setDetailVariable(data))
      .then(setShowDetails(true))
  }

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/treatmentVariablesShortlist", {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setVariables(data))
  }, [])

  return (
    <div>
      {show_details ? (
        <ViewDetailedVariable
          callback={modalCallback}
          variable={full_detail_variable}
        />
      ) : null}
     
      <div className="treatment-container">
        <div className="content">
          <div className="content-wrapper">
            <div className="treatment-pane">
              <div className="treatment-content">
                <div className="title">
                  <h3>Add Treatment Variables</h3>
                </div>
                <div className="search-tune-row">
                  <input
                    type="text"
                    className="search-box"
                    placeholder="Search"
                    value={search_value}
                    onChange={handleSearchValueChange}
                  />
                  <div className="tune-margin">
                    <TuneIcon
                      onClick={() => {
                        console.log("clicked tune")
                      }}
                      className="tune-icon"
                    />
                  </div>
                </div>
                <div className="treatment-list">
                  {variable_list ? (
                    variable_list.map(variable => (
                      <VariableListComponent
                        mappedValue={variable}
                        detailCallback={handleCallback}
                        checkCallback={checkboxCallback}
                      />
                    ))
                  ) : (
                    <h3>No Experiments found</h3>
                  )}
                </div>
              </div>
            </div>
            <div className="treatment-selected-pane">
              <div className="treatment-selected-content">
                <div className="title">
                  <h3>Your Treatment Variables</h3>
                </div>
                <div className="selected-list">
                  {selected_list
                    ? selected_list.map(variable => (
                        <VariableSelectedComponent data={variable} />
                      ))
                    : null}
                </div>
                <div className="add-new-btn">
                  <div className="spacer" />
                  <div className="add-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Add New"
                    />
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
