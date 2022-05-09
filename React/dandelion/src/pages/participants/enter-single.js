import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import ObservationItem from "../../components/cards/observationCard"
import { verify_superuser_storage } from "../../utils/logins"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRecord, createRecordNavigate, uploadExperimentImage } from "../../utils/CRUD"
import EnterObservationModal from "../../components/modals/enterObservationModal"

export default function EnterObservations(props) {
  const [modal_shown, setModalShown] = useState(false)
  const [treatment_variables, setTreatment] = useState("")
  const [response_variables, setResponse] = useState("")
  const [combination_list, setCombinationList] = useState("")
  const [experiment_details, setExperimentDetails] = useState("")
  const [colour_index, setColourIndex] = useState(["#FFFF", "#FFFF", "#FFFF"])
  const [row_index] = ["A", "B", "C", "D", "E"]
  let grid_values = { colour: "#C4C4C4", code: "" }
  const [current_grid, setCurrentGrid] = useState(0)

  const [matrix, setMatrix] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 25 }, () => grid_values)
    )
  )
  const [dragged_item, setCurrentDraggedItem] = useState()
  const [logged, setLogged] = useState("")
  const [observation_modal_shown, setObservationModalShown] = useState("")

  let a = new Array(32)
  const grid_letters = ["A", "B", "C", "D", "E"]

  const [active_class, setActiveClass] = useState([a])

  useEffect(() => {
    setItem("top")
    if (verify_superuser_storage() == true) {
      let conditions = props.location.state.conditions
      let copy = [...matrix]
      conditions.forEach(condition => {
        condition.units.forEach(unit => {
          let row = grid_letters.indexOf(unit.row)
          let column = unit.column

          let position = (column - 1) * 5 + row
          let level = 0
          if ((unit.cube_level = "top")) {
            level = 0
          } else if ((unit.cube_level = "middle")) {
            level = 1
          } else if ((unit.cube_level = "bottom")) {
            level = 2
          }

          if (copy[level][position].code != "SENSOR") {
            copy[level][position] = {
              colour: condition.colour,
              code: unit.code,
              item: condition,
            }
          }
        })
      })
      setLogged(true)
      setModalShown(false);
    } else {
      navigate("/signin")
    }
  }, [])

  const closeModal = prop => {
    setModalShown(false)
  }

  const setItem = prop => {
    setColourIndex(["#FFFF", "#FFFF", "#FFFF"])

    if (prop == "top") {
      let copy = [...matrix]
      copy[0][1] = { colour: "#FFFF", code: "SENSOR" }
      setMatrix(copy)
      setCurrentGrid(0)
      setColourIndex(["#F8F448", "#FFFF", "#FFFF"])
    } else if (prop == "mid") {
      let copy = [...matrix]
      copy[1][2] = { colour: "#FFFF", code: "SENSOR" }
      setMatrix(copy)

      setCurrentGrid(1)
      setColourIndex(["#FFFF", "#F8F448", "#FFFF"])
    } else if (prop == "bot") {
      let copy = [...matrix]
      copy[2][3] = { colour: "#FFFF", code: "SENSOR" }

      setMatrix(copy)
      setCurrentGrid(2)
      setColourIndex(["#FFFF", "#FFFF", "#F8F448"])
    }
  }

  const setGridData = e => {
    console.log(e.gridData);
    if(e.gridData.code !== "" && e.gridData.colour !== "#C4C4C4"){
      setModalShown(true)
    }
  }

  const saveObservation = e => {
    closeModal()
  }
  const submitExperiment = prop => {
    console.log("oog")
    navigate("/participants/experiment-dashboard");
  }

  if (typeof window !== `undefined` && logged) {
    return (
      <div>
         {modal_shown ? <EnterObservationModal props={props.location.state.responseVariables} saveObservation={saveObservation} closeModal={closeModal} />
          : null}
        <div className="configure-container">
          <ToastContainer position="top-center"/>
          <div className="content">            
            <div className="grid-container">
              <div className="level-row">
                <div
                  className="top-level"
                  style={{ backgroundColor: colour_index[0] }}
                  onClick={() => {
                    setItem("top")
                  }}
                >
                  <h3>Top Level</h3>
                </div>
                <div
                  className="middle-level"
                  style={{ backgroundColor: colour_index[1] }}
                  onClick={() => {
                    setItem("mid")
                  }}
                >
                  <h3>Middle Level</h3>
                </div>
                <div
                  className="bottom-level"
                  style={{ backgroundColor: colour_index[2] }}
                  onClick={() => {
                    setItem("bot")
                  }}
                >
                  <h3>Bottom Level</h3>
                </div>
              </div>
              <div className="grid-row">
                <div className="grid">
                  <div className="label-wrapper">
                    <div className="column-wrapper">
                      <div className="spacer" />
                      <div className="numerical-column">
                        <div className="number">
                          <h3>1</h3>
                        </div>
                        <div className="number">
                          <h3>2</h3>
                        </div>
                        <div className="number">
                          <h3>3</h3>
                        </div>
                        <div className="number">
                          <h3>4</h3>
                        </div>
                        <div className="number">
                          <h3>5</h3>
                        </div>
                      </div>
                      <div className="spacer" />
                    </div>

                    <div className="right-pane">
                      <div className="alphabetical-row">
                        <div className="letter">
                          <h3>A</h3>
                        </div>
                        <div className="letter">
                          <h3>B</h3>
                        </div>
                        <div className="letter">
                          <h3>C</h3>
                        </div>
                        <div className="letter">
                          <h3>D</h3>
                        </div>
                        <div className="letter">
                          <h3>E</h3>
                        </div>
                      </div>
                      <div className="grid-wrapper">
                        <div className="square-grid">
                          {matrix[0].map(function (d, idx) {
                            return (
                              <ObservationItem
                                key={idx}
                                clickItem={setGridData}
                                gridLevel={current_grid}
                                gridPosition={idx}
                                gridData={matrix[current_grid][idx]}
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-container">
                  <div className="continue-btn">
                    <input
                      type="submit"
                      className="submitButton"
                      value="Finished"
                      onClick={() => {
                        submitExperiment()
                      }}
                    ></input>
                  </div>
                  <div className="spacer"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
