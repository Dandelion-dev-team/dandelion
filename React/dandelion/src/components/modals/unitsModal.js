import React, { useEffect, useState} from "react"
import { navigate } from "gatsby"
import "../../styles/App.scss"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import ConditionCard from "../../components/cards/conditionCard"
import UnitItem from "../../components/unitItem"
import { verify_superuser_storage } from "../../utils/logins"
import "react-toastify/dist/ReactToastify.css"
import {Button, Modal} from "react-bootstrap";
import {createRecord, updateRecord} from "../../utils/CRUD"


// ToDo: refactor growcube as a component

export default function UnitsModal(props) {
  const [colour_index, setColourIndex] = useState(["#FFFF", "#FFFF", "#FFFF"])
  const [showHelp, setShowHelp] = useState(false)

  let grid_values = { colour: "#C4C4C4", code: "" }
  const [current_grid, setCurrentGrid] = useState(0)
  const [matrix, setMatrix] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 25 }, () => grid_values)
    )
  )
  const [dragged_item, setCurrentDraggedItem] = useState()
  const [logged, setLogged] = useState("")
  const [reset, setReset] = useState(false)
  const [conditionColours, setConditionColours] = useState(
      new Array(props.experiment.conditions.length)
  )
  const [replicates, setReplicates] = useState({})

  const [active_class, setActiveClass] = useState([])

  const modalRef = React.createRef()

  useEffect(() => {
    setItem("top")
    if (verify_superuser_storage() === true) {
      setLogged(true)
    } else {
      navigate("/signin")
    }
    let copy = [...matrix]
    props.experiment.conditions.forEach((condition) => {
      replicates[condition.code] = 1
    })

    props.experiment.conditions.forEach((condition) => {
      condition.units.forEach((unit) => {
        let level = 0
        if (unit.cube_level === 'middle') {
          level = 1
        }
        if (unit.cube_level === 'bottom') {
          level = 2
        }
        let position = (unit.grid_row - 1) * 5 + (unit.grid_column - 1)
        copy[level][position] = {
          colour: condition.colour,
          code: unit.code,
          id: unit.id,
          condition_id: condition.id
        }
      })
    })
    setMatrix(copy)

  }, [props.experiment])

  const setItem = prop => {
    setColourIndex(["#FFFF", "#FFFF", "#FFFF"])
    if (prop === "top") {
      let copy = [...matrix]
      copy[0][24] = { colour: "#FFFF", code: "SENSOR" }
      setMatrix(copy)
      setCurrentGrid(0)
      setColourIndex(["#F8F448", "#FFFF", "#FFFF"])
    } else if (prop === "mid") {
      let copy = [...matrix]
      copy[1][24] = { colour: "#FFFF", code: "SENSOR" }
      setMatrix(copy)
      setCurrentGrid(1)
      setColourIndex(["#FFFF", "#F8F448", "#FFFF"])
    } else if (prop === "bot") {
      let copy = [...matrix]
      copy[2][24] = { colour: "#FFFF", code: "SENSOR" }

      setMatrix(copy)
      setCurrentGrid(2)
      setColourIndex(["#FFFF", "#FFFF", "#F8F448"])
    }
  }

  const setGridData = e => {
    if (dragged_item) {
      let copy = [...matrix]
      if (copy[e.gridLevel][e.gridPosition].code !== "SENSOR") {
        copy[e.gridLevel][e.gridPosition] = {
          colour: dragged_item.colour,
          code: dragged_item.code,
          id: undefined,
          condition_id: dragged_item.item.id
        }
      }
      setMatrix(copy)
    }
  }

  const setDraggedItem = childData => {
    let copy = new Array(props.experiment.conditions.length)
    copy[childData.index] = true
    setActiveClass(copy)
    setCurrentDraggedItem(childData)
  }

  const cancelConfig = () => {
    setMatrix(
      Array.from({ length: 3 }, () =>
        Array.from({ length: 25 }, () => grid_values)
      )
    )
    setReset(~reset)
    props.setShow(false)
  }

  const updateColour = (idx, colour) => {
    let copy = [...conditionColours]
    copy[idx] = colour
    setConditionColours(copy)
  }

  const save = e => {
    for (let i=0; i<props.experiment.conditions.length; i++) {
      if (conditionColours[i]) {
        updateRecord(
            '/condition/' + props.experiment.conditions[i].id + '/colour',
            JSON.stringify({colour: conditionColours[i]})
        )
      }
    }
    props.experiment.conditions.forEach((condition) => {
      matrix.forEach((grid_level, idx) => {
        let level = ""
        if (idx === 0) {
          level = "top"
        } else if (idx === 1) {
          level = "middle"
        } else if (idx === 2) {
          level = "bottom"
        }
        grid_level.forEach((cell, position) => {
          let row = Math.floor(position / 5) + 1
          let column = position % 5 + 1

          if (cell.condition_id) {
            if (cell.condition_id === condition.id) {
              let unit = {
                condition_id: condition.id,
                code: condition.code + '_' + replicates[condition.code],
                node_id: props.node.data.id,
                cube_level: level,
                replicate_no: replicates[condition.code]++,
                grid_row: row,
                grid_column: column,
                location: 'GrowCube'
              }

              if (cell.id) {
                updateRecord('/unit/' + cell.id, JSON.stringify(unit))
              }
              else {
                createRecord('/unit', JSON.stringify(unit))
              }
            }
          }
        })
      })
    })
    props.setShow(false)
  }

  if (typeof window !== `undefined` && logged) {
    return (
    <Modal
        show={props.show}
        dialogClassName="dandelion-modal"
        centered
        size="xl"
    >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
            <Modal.Title>
                    <h2>GrowCube layout</h2>
            </Modal.Title>
        </Modal.Header>
      {props.experiment ?
          <Modal.Body>

            {props.experiment.conditions.length ?
                <div className="growcube-configuration">
                  <div className="content">
                    <div className="condition-list">
                      <div className="scrollable-container" ref={modalRef}>
                        <div className="scrollable-header">
                          <h3>Conditions</h3>
                        </div>
                        <div className="scrollable-content">
                          {props.experiment.conditions
                              ? props.experiment.conditions.map((condition, idx) => (
                                  <ConditionCard
                                      index={idx}
                                      condition={condition}
                                      onDragItem={setDraggedItem}
                                      is_active={active_class[idx]}
                                      modalRef={modalRef}
                                      reset={reset}
                                      updateColour={updateColour}
                                  />
                              ))
                              : null}
                        </div>
                      </div>
                    </div>
                    <div className="growcube-container">
                      <div className="growcube">
                        <div className="level-container">
                          <div
                              className="level-control"
                              style={{backgroundColor: colour_index[0]}}
                              onClick={() => {
                                setItem("top")
                              }}
                          >
                            Top
                          </div>
                          <div
                              className="level-control"
                              style={{backgroundColor: colour_index[1]}}
                              onClick={() => {
                                setItem("mid")
                              }}
                          >
                            Middle
                          </div>
                          <div
                              className="level-control"
                              style={{backgroundColor: colour_index[2]}}
                              onClick={() => {
                                setItem("bot")
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
                                          <UnitItem
                                              key={idx}
                                              setItemCallback={setGridData}
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
                        </div>
                      </div>
                      <div className="info-button">
                        <HelpOutlineIcon
                            className="help-icon"
                            onClick={() => {
                              setShowHelp(!showHelp)
                            }}
                        />
                      </div>
                      {showHelp ?
                          <p>
                            This is a graphical view of the cube. To change
                            levels, click on either “Top”, “Middle”, or “Bottom”.
                            Once a level has been chosen, you can assign allocate a
                            position in the cube to a condition by highlighting the condition
                            and then clicking the appropriate square. You can also change the
                            colour for each condition.
                          </p> : null
                      }
                    </div>
                  </div>
                </div>
                :
                <div className="dandelion-hint">
                  {props.node ? null :
                      <div className="dandelion-hint">
                        You need to register your node before you can define the layout of the GrowCube.
                      </div>
                  }
                  You can't define the layout of the GrowCube until you have set up your
                  treatment variables.
                </div>
            }
          </Modal.Body>
          : null
      }
        <Modal.Footer>
          <div className="dandelion-button-group">
            <Button className="dandelion-button" onClick={() => {cancelConfig()}}>
              {props.experiment.conditions.length ?
                  "Cancel" : "OK"
              }
            </Button>
            {props.experiment.conditions.length ?
                <Button className="dandelion-button" onClick={() => save()}>Save</Button>
                : null
            }
          </div>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return null
  }
}
