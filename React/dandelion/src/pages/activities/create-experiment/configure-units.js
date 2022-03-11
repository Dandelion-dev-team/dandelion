import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import UnitCard from "../../../components/cards/unitCard"
import UnitHelpModal from "../../../components/Modals/unitHelpModal"
import UnitItem from "../../../components/unitItem"

export default function ConfigureUnits(props) {
  const [modal_shown, setModalShown] = useState("")
  const [treatment_variables, setTreatment] = useState("")
  const [response_variables, setResponse] = useState("")
  const [combination_list, setCombinationList] = useState("")
  const [experiment_details, setExperimentDetails] = useState("")
  const [colour_index, setColourIndex] = useState(["#FFFF", "#FFFF", "#FFFF"])

  let grid_values = { colour: "#C4C4C4", code: "" };
  const [current_grid, setCurrentGrid] = useState(0);
  const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array.from({ length: 25 }, () => grid_values)));
  const [dragged_item, setCurrentDraggedItem] = useState();


  useEffect(() => {
    setItem("top");
    if (props.location.state) {
      console.log(props.location.state)
      setTreatment(props.location.state.treatmentVariables)
      setResponse(props.location.state.responseVariables)
      setExperimentDetails(props.location.state.experimentDetails)
      setCombinationList(props.location.state.combinations)
    } else {
      if (typeof window !== `undefined`) {
        // navigate(
        //   "/activities/create-experiment/enter-details")
      }
    }
  }, [])

  const closeModal = prop => {
    setModalShown(false)
  }

  const setItem = prop => {

    setColourIndex(["#FFFF", "#FFFF", "#FFFF"])
    console.log(prop);

    if (prop == "top") {
      let copy = [...matrix];
      copy[0][1] = { colour: "#FFFF", code: "" };
      setMatrix(copy);
      setCurrentGrid(0);
      setColourIndex(["#F8F448", "#FFFF", "#FFFF"])
    }
    else if (prop == "mid") {
      let copy = [...matrix];
      copy[1][2] = { colour: "#FFFF", code: "" };
      setMatrix(copy);

      setCurrentGrid(1);
      setColourIndex(["#FFFF", "#F8F448", "#FFFF"])
    }
    else if (prop == "bot") {
      let copy = [...matrix];
      copy[2][3] = { colour: "#FFFF", code: "" };

      setMatrix(copy);
      setCurrentGrid(2);
      setColourIndex(["#FFFF", "#FFFF", "#F8F448"])
    }
  }

  const setGridData = e => {
    if (dragged_item){
      console.log(e);
      let copy = [...matrix];
      copy[e.gridLevel][e.gridPosition] = { colour: dragged_item.colour, code: dragged_item.code };
      setMatrix(copy);
    }
  }

  const setDraggedItem = childData => {
    setCurrentDraggedItem(childData);
  }

  return (
    <div>
      {modal_shown ? <UnitHelpModal callback={closeModal} /> : null}

      <div className="configure-container">
        <div className="content">
          <div className="condition-list">
            {combination_list
              ? combination_list.map(function (d, idx) {
                return <UnitCard key={idx} combination={d} onDragItem={setDraggedItem}/>
              })
              : null}
          </div>
          <div className="grid-container">
            <div className="level-row">
              <div className="top-level" style={{ backgroundColor: colour_index[0] }} onClick={() => { setItem("top") }} >
                <h3>Top Level</h3>
              </div>
              <div className="middle-level" style={{ backgroundColor: colour_index[1] }} onClick={() => { setItem("mid") }}>
                <h3>Middle Level</h3>
              </div>
              <div className="bottom-level" style={{ backgroundColor: colour_index[2] }} onClick={() => { setItem("bot") }}>
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
                          return <UnitItem key={idx} setItemCallback={setGridData} gridLevel={current_grid} gridPosition={idx} gridData={matrix[current_grid][idx]} />
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
                  ></input>
                </div>
                <div className="spacer"></div>
              </div>
            </div>
          </div>
          <div className="info-button">
            <HelpOutlineIcon
              className="help-icon"
              onClick={() => {
                setModalShown(true)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
