import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import UnitCard from "../../../components/cards/unitCard"
import UnitHelpModal from "../../../components/modals/unitHelpModal"
import UnitItem from "../../../components/unitItem"
import { verify_superuser_storage } from "../../../utils/logins"
import { createRecord } from "../../../utils/CRUD"

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
  const [logged, setLogged] = useState("");

  let a = new Array(32);
  const grid_letters = ["A", "B", "C", "D", "E"]


  const [active_class, setActiveClass] = useState([a])


  useEffect(() => {
    setItem("top");
    if (verify_superuser_storage() == true) {
      setLogged(true);
      if (props.location.state) {
        setTreatment(props.location.state.treatmentVariables)
        setResponse(props.location.state.responseVariables)
        setExperimentDetails(props.location.state.experimentDetails)
        setCombinationList(props.location.state.combinations)
      } else {
        if (typeof window !== `undefined`) {
          navigate("/activities/create-experiment/enter-details")
        }
      }
    } else {
      navigate("/signin");
    }
  }, [])

  const closeModal = prop => {
    setModalShown(false)
  }

  const setItem = prop => {

    setColourIndex(["#FFFF", "#FFFF", "#FFFF"])

    if (prop == "top") {
      let copy = [...matrix];
      copy[0][1] = { colour: "#FFFF", code: "SENSOR" };
      setMatrix(copy);
      setCurrentGrid(0);
      setColourIndex(["#F8F448", "#FFFF", "#FFFF"])
    }
    else if (prop == "mid") {
      let copy = [...matrix];
      copy[1][2] = { colour: "#FFFF", code: "SENSOR" };
      setMatrix(copy);

      setCurrentGrid(1);
      setColourIndex(["#FFFF", "#F8F448", "#FFFF"])
    }
    else if (prop == "bot") {
      let copy = [...matrix];
      copy[2][3] = { colour: "#FFFF", code: "SENSOR" };

      setMatrix(copy);
      setCurrentGrid(2);
      setColourIndex(["#FFFF", "#FFFF", "#F8F448"])
    }
  }

  const setGridData = e => {
    if (dragged_item) {
      let copy = [...matrix];
      if (copy[e.gridLevel][e.gridPosition].code != "SENSOR") {
        copy[e.gridLevel][e.gridPosition] = { colour: dragged_item.colour, code: dragged_item.code, item: dragged_item.item };
      } else {
        console.log("Illegal");
      }
      setMatrix(copy);
    }
  }

  const setDraggedItem = childData => {
    let copy = new Array(props.location.state.combinations.length);
    copy[childData.index] = true;
    setActiveClass(copy);
    setCurrentDraggedItem(childData);
  }

  const submitExperiment = prop => {
    //CONVERT DATES
    var start_date = new Date(experiment_details.startDate);
    start_date = start_date.toISOString();
    var end_date = new Date(experiment_details.endDate);
    end_date = end_date.toISOString();

    //HARDCODED FOR NOW
    let hypotheses = [
      {
        description: "Touching the leaves has no effect on growth",
        hypothesis_no: 0,
        id: 2,
        status: "Active",
        text: null
      },
      {
        description: "Growth rate is correlated with the degree of touching",
        hypothesis_no: 1,
        id: 3,
        status: "Active",
        text: null
      }
    ]

    let constructed_conditions = [];
    combination_list.forEach(combination => {
      console.log(combination_list);
      let unit_list = [];
      let code = "";
      let colour = "";
      matrix.forEach((grid_level, idx) => {
        let level = "";
        if (idx == 0){
          level = "top";
        }else if (idx == 1){
          level = "middle";
        }else if(idx == 2){
          level = "bottom";
        }
        let replicate = 0;
        grid_level.forEach((cell, position) => {
          let column = Math.floor(position / 5);
          let row = position % 5;
          if (cell.colour == "#C4C4C4" || cell.code == "SENSOR") 
          {
            return;
          } else {
            //console.log({ cell: cell, index: idx })
            if (combination == cell.item) {
              replicate = replicate + 1;
              let item = {code: cell.code + "_" + replicate, cube_level: level, row: grid_letters[row], column: column + 1, description: "", replicate: replicate};
              unit_list.push(item)
              code = cell.code;
              colour = cell.colour;
            }
          }
        }
        )
      });
      constructed_conditions.push({code: code, color: colour, description: "desc", status: "active", text: "text", units: unit_list })
    });

    let body ={
      code: experiment_details.code,
      description: experiment_details.description,
      start_date: start_date,
      end_date: end_date,
      name: experiment_details.name,
      hypotheses,
      treatment_variables,
      response_variables,
      conditions: constructed_conditions,
    }

    createRecord("/experiment", body)
    //NAVIGATE BACK TO PROJECT MAINTENANCE
    //navigate("/superuser/project-maintenance")
  }

  if (typeof window !== `undefined` && logged) {
    return (
      <div>
        {modal_shown ? <UnitHelpModal callback={closeModal} /> : null}

        <div className="configure-container">
          <div className="content">
            <div className="condition-list">
              {combination_list
                ? combination_list.map(function (d, idx) {
                  return <UnitCard index={idx} key={idx} base_code={experiment_details.code} combination={d} onDragItem={setDraggedItem} is_active={active_class[idx]} />
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
                      onClick={() => {
                        submitExperiment();
                      }}
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
  } else { return null }
}
