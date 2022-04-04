import React, { useEffect, useState, useRef } from "react"
import "../../../styles/App.scss"
import TuneIcon from "@mui/icons-material/Tune"
import VariableListComponent from "../../../components/cards/variableListComponent"
import ViewDetailedVariable from "../../../components/modals/viewDetailedVariable"
import VariableSelectedComponent from "../../../components/cards/variableSelectedComponent"
import PaginationComponent from "../../../components/navigation/pagination"
import { navigate } from "gatsby"
import VariableTypeModal from "../../../components/modals/variableTypeModal"
import DiscreteVariableModal from "../../../components/modals/discreteVariableModal"
import ContinuousVariableModal from "../../../components/modals/continuousVariableModal"
import { verify_superuser_storage } from "../../../utils/logins"

export default function ResponseVariables(props) {
  const [search_value, changeSearch] = useState("")
  const [variable_list, setVariables] = useState("")
  const [show_details, setShowDetails] = useState("")
  const [full_detail_variable, setDetailVariable] = useState("")
  const [modal_editing, setModalEditing] = useState()

  const [selected_list, updateSelectedList] = useState([])
  const [treatment_variables_list, setTreatmentVariables] = useState([])
  const [experiment_details, setExperimentDetails] = useState("")

  const [show_cont, setShowContinuous] = useState("")
  const [show_choice, setShowChoice] = useState("")
  const [show_discrete, setShowDiscrete] = useState("")

  const [logged, setLogged] = useState("")

  const handleSearchValueChange = e => {
    changeSearch(e.target.value)
  }

  const closeModal = e => {
    setShowDetails(false)
    setShowChoice(false)
    setShowContinuous(false)
    setShowDiscrete(false)

    if (e) {
      updateSelectedList(arr => [...arr, JSON.parse(e)])
    }
  }

  const discreteCallback = e => {
    setShowDiscrete(true)
    setShowChoice(false)
  }

  const contCallback = e => {
    setShowContinuous(true)
    setShowChoice(false)
  }

  const checkboxCallback = e => {
    let val = e.data
    if (e.value == true) {
      updateSelectedList(arr => [...arr, val])
    } else {
      updateSelectedList(selected_list.filter(item => item !== val))
    }
  }

  const handleDetailCallback = index => {
    // fetch(process.env.ROOT_URL + "/responseVariableFull/" + index, {
    //     method: "GET",
    //     headers: new Headers({
    //         "Cache-Control": "no-cache, no-store, must-revalidate",
    //         Pragma: "no-cache",
    //         Expires: 0,
    //     }),
    // })
    //     .then(response => response.json())
    //     .then(data => setDetailVariable(data)).then(setModalEditing(false)).then(setShowDetails(true));
  }
  const handleEditCallback = index => {
    // fetch(process.env.ROOT_URL + "/responseVariableFull/" + index, {
    //     method: "GET",
    //     headers: new Headers({
    //         "Cache-Control": "no-cache, no-store, must-revalidate",
    //         Pragma: "no-cache",
    //         Expires: 0,
    //     }),
    // })
    //     .then(response => response.json())
    //     .then(data => setDetailVariable(data)).then(setModalEditing(true)).then(setShowDetails(true));
  }

  useEffect(() => {
    if (verify_superuser_storage() == true) {
      setLogged(true)
      if (props.location.state) {
        setExperimentDetails(props.location.state.experimentDetails)
        setTreatmentVariables(props.location.state.treatmentVariables)
      } else {
        if (typeof window !== `undefined`) {
          navigate("/activities/create-experiment/enter-details")
        }
      }
      //Update the document title using the browser API
      // fetch(process.env.ROOT_URL + "/responseVariableShortlist", {
      //     method: "GET",
      //     headers: new Headers({
      //         'Cache-Control': 'no-cache, no-store, must-revalidate',
      //         'Pragma': 'no-cache',
      //         'Expires': 0,
      //     })
      // }).then(response => response.json())
      //     .then(
      //         data => setVariables(data));
    } else {
      navigate("/signin")
    }
  }, [])
  if (logged) {
    return (
      <div>
        {show_choice ? (
          <VariableTypeModal
            discreteCallback={discreteCallback}
            contCallback={contCallback}
            variable={full_detail_variable}
            startEditing={modal_editing}
          />
        ) : null}
        {show_discrete ? (
          <DiscreteVariableModal
            callback={closeModal}
            variable={full_detail_variable}
            startEditing={modal_editing}
          />
        ) : null}
        {show_cont ? (
          <ContinuousVariableModal
            callback={closeModal}
            variable={full_detail_variable}
            startEditing={modal_editing}
          />
        ) : null}

        <div className="treatment-container">
          <div className="content">
            <div className="content-wrapper">
              <div className="treatment-pane">
                <div className="treatment-content">
                  <div className="title">
                    <h3>Add Response Variables</h3>
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
                          //console.log("clicked tune");
                        }}
                        className="tune-icon"
                      />
                    </div>
                  </div>
                  <div className="treatment-list">
                    {variable_list ? (
                      variable_list
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
                      <h3>No response variables found.</h3>
                    )}
                  </div>
                  <PaginationComponent pageIndex={3} numPages={4} />
                </div>
              </div>
              <div className="treatment-selected-pane">
                <div className="treatment-selected-content">
                  <div className="title">
                    <h3>Your Response Variables</h3>
                  </div>
                  <div className="selected-list">
                    {selected_list
                      ? selected_list.map(variable => (
                          <VariableSelectedComponent
                            editCallback={handleEditCallback}
                            data={variable}
                          />
                        ))
                      : null}
                  </div>
                  <div className="btn-row">
                    <input
                      type="submit"
                      className="add-new-btn"
                      value="Add new variable"
                      onClick={() => {
                        setShowChoice(true)
                      }}
                    ></input>
                    {selected_list.length > 0 ? (
                      <input
                        type="submit"
                        className="continue-btn"
                        value="Continue"
                        onClick={() => {
                          if (typeof window !== `undefined`) {
                            navigate(
                              "/activities/create-experiment/select-conditions",
                              {
                                state: {
                                  treatmentVariables: treatment_variables_list,
                                  responseVariables: selected_list,
                                  experimentDetails: experiment_details,
                                },
                              }
                            )
                          }
                        }}
                      ></input>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else return null
}
