import React, { useEffect, useState, useRef } from "react"
import "../../../styles/App.scss"
import TuneIcon from "@mui/icons-material/Tune"
import VariableListComponent from "../../../components/cards/variableListComponent"
import ViewDetailedVariable from "../../../components/modals/viewDetailedVariable"
import TreatmentSelectedComponent from "../../../components/cards/treatmentSelectedComponent"
import PaginationComponent from "../../../components/navigation/pagination"
import { navigate } from "gatsby"
import VariableTypeModal from "../../../components/modals/variableTypeModal"
import DiscreteVariableModal from "../../../components/modals/discreteVariableModal"
import { verify_superuser_storage } from "../../../utils/logins"
import { readAdminRecord, readRecord } from "../../../utils/CRUD"
import { ToastContainer } from "react-toastify"

export default function TreatmentVariables(props) {
  const [search_value, changeSearch] = useState("")
  const [variable_list, setVariables] = useState("")
  const [show_details, setShowDetails] = useState("")
  const [full_detail_variable, setDetailVariable] = useState("")
  const [modal_editing, setModalEditing] = useState()
  const [experiment_details, setExperimentDetails] = useState("")
  const [discrete_modal_shown, setDiscreteModalShown] = useState("")
  const [selected_list, updateSelectedList] = useState([])
  const [logged, setLogged] = useState("")

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const modalCallback = e => {
    setShowDetails(false)
    setDiscreteModalShown(false)

    if (e) {
      updateSelectedList(arr => [...arr, JSON.parse(e)])
    }
  }

  const updateModalList = e => {
    updateSelectedList(arr => [...arr, e])
  }

  const checkboxCallback = e => {
    let val = e.data
    if (e.value == true) {
      readAdminRecord("/variable/" + val.variable_id).then(data =>
        updateSelectedList(arr => [...arr, data])
      )
    } else {
      updateSelectedList(
        selected_list.filter(item => item.variable_id != val.variable_id)
      )
    }
  }

  const handleDetailCallback = index => {
    fetch(process.env.API_URL + "/variable/" + index, {
      method: "GET",
      headers: new Headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setDetailVariable(data))
      .then(setModalEditing(false))
      .then(setShowDetails(true))
  }

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      if (props.location.state) {
        setExperimentDetails(props.location.state)
        readRecord("/allVariables", setVariables)
      } else {
        if (typeof window !== `undefined`) {
          navigate("/activities/create-experiment/enter-details")
        }
      }
    } else {
      //navigate("/signin");
    }
  }, [])

  return (
    <div>
      {discrete_modal_shown ? (
        <DiscreteVariableModal callback={modalCallback} />
      ) : null}

      {show_details ? (
        <ViewDetailedVariable
          callback={modalCallback}
          variable={full_detail_variable}
          startEditing={modal_editing}
        />
      ) : null}
      <div className="treatment-container">
        <ToastContainer />
        <div className="content">
          <div className="content-wrapper">
            <div className="treatment-list">
              <div className="list-header">
                <div className="header-text">
                  <h3>Treatment Variables</h3>
                </div>
                <div className="search-row">
                  <input
                    type="text"
                    className="search-box"
                    placeholder="Search"
                    value={search_value}
                    onChange={handleSearchValueChange}
                  />
                </div>
              </div>
              <div className="list-content">
                <div className="treat-list">
                  {variable_list.length > 1 ? (
                    variable_list[0].treatment
                      .filter(variable =>
                        variable.name
                          .toUpperCase()
                          .includes(search_value.toUpperCase())
                      )
                      .map(filtered_variable => (
                        <VariableListComponent
                          mappedValue={filtered_variable}
                          detailCallback={handleDetailCallback}
                          checkCallback={checkboxCallback}
                        />
                      ))
                  ) : (
                    <h3>No Treatment Variables Found.</h3>
                  )}
                </div>
                <div className="btn-row">
                  <input
                    type="submit"
                    className="back-btn"
                    value="Back"
                    onClick={() => {
                      if (typeof window !== `undefined`) {
                        navigate(
                          "/activities/create-experiment/enter-details/",
                          {
                            state: {
                              project_id: props.location.state.project_id,
                              name: props.location.state.name,
                              code: props.location.state.code,
                              description: props.location.state.description,
                              tutorial: props.location.state.tutorial,
                              image: props.location.state.image,
                              startDate: props.location.state.startDate,
                              endDate: props.location.state.endDate,
                            },
                          }
                        )
                      }
                    }}
                  />
                  <PaginationComponent pageIndex={2} numPages={4} />
                </div>
              </div>
            </div>
            <div className="selected-pane">
              <div className="selected-content">
                <div className="title">
                  <h3>Your Treatment Variables</h3>
                </div>
                <div className="selected-list">
                  {selected_list
                    ? selected_list.map(variable => (
                        <TreatmentSelectedComponent data={variable} />
                      ))
                    : null}
                </div>
                <div className="btn-row">
                  <input
                    type="submit"
                    className="add-new-btn"
                    value="Add New Variable"
                    onClick={() => {
                      setDiscreteModalShown(true)
                    }}
                  />
                  {selected_list.length > 0 ? (
                    <input
                      type="submit"
                      className="continue-btn"
                      value="Continue"
                      onClick={() => {
                        if (typeof window !== `undefined`) {
                          navigate(
                            "/activities/create-experiment/response-variables",
                            {
                              state: {
                                experimentDetails: experiment_details,
                                treatmentVariables: selected_list,
                              },
                            }
                          )
                        }
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
