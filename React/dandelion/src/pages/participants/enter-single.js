import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import Header from "../../components/navigation/header"
import ObservationItem from "../../components/cards/observationCard"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {createRecord, readRecord} from "../../utils/CRUD"
import EnterObservationModal from "../../components/modals/enterObservationModal"
import {labelsToCoords} from "../../utils/functions"
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ToDo: Refactor growcube as a component

export default function EnterObservations(props) {
  const [showEntry, setShowEntry] = useState(false)
  const [colour_index, setColourIndex] = useState(["#FFFF", "#FFFF", "#FFFF"])
  const [currentGrid, setCurrentGrid] = useState(0)
  const [logged, setLogged] = useState("")
  const [currentUnit, setCurrentUnit] = useState();
  const [observationDate, setObservationDate] = useState({})
  const [validated, setValidated] = useState(false);
  const [expectedObservations, setExpectedObservations] = useState([])
  const [storedObservations, setStoredObservations] = useState([])
  const grid_values = {
    colour: "#C4C4C4",
    code: "",
    cube_level: undefined,
    grid_row: undefined,
    grid_column: undefined,
    id: undefined,
    condition_id: undefined,
    replicate_no: undefined,
    observations: []
  }
  const [matrix, setMatrix] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 25 }, () => ({...grid_values}))
    )
  )

  const dateRef = React.createRef()
  const formRef = React.createRef()

  useEffect(() => {
    if(props.location.state.experiment){
      readRecord('/observation/byexperiment/' + props.location.state.experiment.id, setStoredObservations)

      setCubeLevel("top")
      const filtered_variables = props.location.state.experiment.response_variables.filter(
        response_variable =>
          response_variable.monday === true ||
          response_variable.tuesday === true ||
          response_variable.wednesday === true ||
          response_variable.thursday === true ||
          response_variable.friday === true ||
          response_variable.saturday === true ||
          response_variable.sunday === true
      )

      let observations = []
      filtered_variables.forEach(response_variable => {
        observations.push({
          name: response_variable.name,
          levels: response_variable.levels,
          response_variable_id: response_variable.id,
          units: response_variable.unit,
          value:undefined,
          comment: "",
          id: undefined,
          status: "",
          created_by: undefined
        })
      })

      setExpectedObservations(observations)

      // if (verify_superuser_storage() == true) {
        let conditions = props.location.state.experiment.conditions
        let copy = [...matrix]
        conditions.forEach(condition => {
          condition.units.forEach((unit) => {
            let coords = labelsToCoords(unit.cube_level, unit.grid_row, unit.grid_column)
            copy[coords.level][coords.position] = {
              colour: condition.colour,
              code: unit.code,
              cube_level: unit.cube_level,
              grid_row: unit.grid_row,
              grid_column: unit.grid_column,
              id: unit.id,
              condition_id: condition.id,
              replicate_no: unit.replicate_no,
              observations: [...observations]
            }
          })
        })

        for (let i=0; i<3; i++) {
          copy[i][24].colour = "#FFFF"
          copy[i][24].code = "SENSOR"
        }

        setMatrix(copy)

        setLogged(true)
        setShowEntry(false)
      // } else {
      //   navigate("/signin")
      // }
    } else {navigate("/")}
  }, [])

  const handleDateChange = e => {
    setObservationDate(e.target.value)
    const observationsByDate = storedObservations.data.filter(
      obs =>
        obs.timestamp.substring(0, 10) === e.target.value
    )

    // for each unit
    //   new observations object
    //   for each expected observation
    //     if exists stored observation
    //       push combined to new observations
    //     else
    //       push expected to new observations
    //   replace unit observations with new

    matrix.forEach((cubeLevel) => {
      cubeLevel.forEach((position) => {
        if (position.code !== 'SENSOR') {
          let newObservations = JSON.parse(JSON.stringify(expectedObservations))
          newObservations.forEach((newObs) => {
            observationsByDate.forEach((storedObs) => {
              // console.log("NEW: ", newObs.response_variable_id, position.id, "STORED: ", storedObs.response_variable_id, storedObs.unit_id)
              if (newObs.response_variable_id === parseInt(storedObs.response_variable_id, 10) &&
                  position.id === parseInt(storedObs.unit_id, 10)) {
                newObs.id = parseInt(storedObs.id, 10)
                newObs.value = parseFloat(storedObs.value)
                newObs.comment = storedObs.comment
                newObs.status = storedObs.status
                newObs.created_by = parseInt(storedObs.created_by, 10)
              }
            })
          })
          position.observations = JSON.parse(JSON.stringify(newObservations))
        }
      })
    })
  }

  const setCubeLevel = prop => {
    setColourIndex(["#FFFF", "#FFFF", "#FFFF"])

    if (prop === "top") {
      setCurrentGrid(0)
      setColourIndex(["#F8F448", "#FFFF", "#FFFF"])
    } else if (prop === "mid") {
      setCurrentGrid(1)
      setColourIndex(["#FFFF", "#F8F448", "#FFFF"])
    } else if (prop === "bot") {
      setCurrentGrid(2)
      setColourIndex(["#FFFF", "#FFFF", "#F8F448"])
    }
  }

  const setGridData = e => {
    if (formRef.current.checkValidity()) {
      // let currentUnit = e.gridData
      setCurrentUnit(e.gridData);
      if (e.gridData.condition_id) {
        setShowEntry(true)
      }
    }
    setValidated(true)
  }

  const updateId = data => {
    let coords = labelsToCoords(data.cube_level, data.grid_row, data.grid_column)
    let copy = [...matrix]
    let unit = copy[coords.level][coords.position]
    unit = {...unit, id: data.id}
    setMatrix(copy)
  }

  const saveObservation = (unit, observations) => {
    let coords = labelsToCoords(unit.cube_level, unit.grid_row, unit.grid_column)
    let copy = [...matrix]
    copy[coords.level][coords.position].observations = [...observations]
    setMatrix(copy)
    setShowEntry(false)

    copy[coords.level][coords.position].observations.forEach((obs) => {

      let body = {
        timestamp: observationDate,
        value: obs.value,
        created_by: localStorage.getItem("user_id"),
        status: 'valid',
        comment: obs.comment,
        unit_id: unit.id,
        response_variable_id: obs.response_variable_id,
        cube_level: unit.cube_level,
        grid_row: unit.grid_row,
        grid_column: unit.grid_column
      }
      createRecord("/observation", JSON.stringify(body), updateId)
    })
  }

  if (typeof window !== `undefined` && logged) {
    return (
      <div className="dandelion">
        <Header />
        {props.location.state.experiment ?
            <div className="enter-observation page-container">
              <ToastContainer/>
              <div className="main-content">
                <div className="content-area">
                  <div className="left-panel">
                    <div className="panel-header">
                      <h2>Record your observations</h2>
                    </div>
                    <div className="panel-body">
                      <div className="scrollable-inner">
                        <Form
                            no-validate
                            ref={formRef}
                            validated={validated}
                        >
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={8}>On what date were these observations made?</Form.Label>
                            <Col sm={4}>
                              <Form.Control
                                  name="observation_date"
                                  type="date"
                                  ref={dateRef}
                                  value={observationDate}
                                  required
                                  onChange={handleDateChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please enter the date the observations were taken
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        </Form>
                        <p>
                          This is a graphical view of the cube. To change
                          levels, click on either “Top”, “Middle”, or “Bottom”.
                        </p><p>
                          Once a level has been chosen, click on a square to record your
                          observations for that position.
                        </p><p>
                          <CheckCircleIcon className="check-icon" />
                          means that there are observations stored for that square on the date selected.
                          You can click the square to see them.
                        </p>
                      </div>
                    </div>
                    <div className="panel-footer">
                      <div className="btn-container">
                        <button
                            className="dandelion-button large-button"
                            onClick={() => {
                              navigate("/participants/experiment-dashboard", {
                                state: {
                                  experiment: props.location.state.experiment
                                }
                              })
                            }}
                        >
                          Back to experiment
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="right-panel">
                    <div className="panel-header">
                      <h2>GrowCube</h2>
                    </div>
                    <div className="panel-body">
                      <div className="scrollable-inner">
                        <div className="growcube-outer">
                        <div className="growcube-container">
                          <div className="growcube">
                            <div className="level-container">
                              <div
                                  className="level-control"
                                  style={{backgroundColor: colour_index[0]}}
                                  onClick={() => {
                                    setCubeLevel("top")
                                  }}
                              >
                                Top
                              </div>
                              <div
                                  className="level-control"
                                  style={{backgroundColor: colour_index[1]}}
                                  onClick={() => {
                                    setCubeLevel("mid")
                                  }}
                              >
                                Middle
                              </div>
                              <div
                                  className="level-control"
                                  style={{backgroundColor: colour_index[2]}}
                                  onClick={() => {
                                    setCubeLevel("bot")
                                  }}
                              >
                                Bottom
                              </div>
                            </div>
                            <div className="grid-row">
                              <div className="grid">
                                <div className="label-wrapper">
                                  <div className="column-wrapper">
                                    <div className="spacer-top"/>
                                    <div className="numerical-column">
                                      <div className="coordinate-label">1</div>
                                      <div className="coordinate-label">2</div>
                                      <div className="coordinate-label">3</div>
                                      <div className="coordinate-label">4</div>
                                      <div className="coordinate-label">5</div>
                                    </div>
                                    <div className="spacer-bottom"/>
                                  </div>

                                  <div className="right-pane">
                                    <div className="alphabetical-row">
                                      <div className="coordinate-label">A</div>
                                      <div className="coordinate-label">B</div>
                                      <div className="coordinate-label">C</div>
                                      <div className="coordinate-label">D</div>
                                      <div className="coordinate-label">E</div>
                                    </div>
                                    <div className="grid-wrapper">
                                      <div className="square-grid">
                                        {matrix[0].map(function (d, idx) {
                                          return (
                                              <ObservationItem
                                                  clickItem={setGridData}
                                                  gridLevel={currentGrid}
                                                  gridPosition={idx}
                                                  gridData={matrix[currentGrid][idx]}
                                              />
                                          )
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="panel-footer">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : null
        }
        {currentUnit ?
            <EnterObservationModal
                show={showEntry}
                setShow={setShowEntry}
                unit={currentUnit}
                observationDate={observationDate}
                saveObservation={saveObservation}
            /> : null
        }
      </div>
    )
  } else {
    return null
  }
}
