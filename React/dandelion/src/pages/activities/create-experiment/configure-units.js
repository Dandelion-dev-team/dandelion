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

  useEffect(() => {
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

  const generateGrid = e => {
    let content = [];

    for (let index = 0; index < 25; index++) {
      content.push(<UnitItem/>);
    }
    return content;
  };

  return (
    <div>
      {modal_shown ? <UnitHelpModal callback={closeModal} /> : null}

      <div className="configure-container">
        <div className="content">
          <div className="condition-list">
            {combination_list
              ? combination_list.map(function (d, idx) {
                  return <UnitCard key={idx} combination={d} />
                })
              : null}
            <UnitCard />
            <UnitCard />
            <UnitCard />
          </div>
          <div className="grid-container">
            <div className="level-row">
              <div className="top-level" id="active">
                <h3>Top Level</h3>
              </div>
              <div className="middle-level">
                <h3>Middle Level</h3>
              </div>
              <div className="bottom-level">
                <h3>Bottom Level</h3>
              </div>
            </div>
            <div className="grid-row">
              <div className="grid">
                <div className="label-wrapper">
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
                        {generateGrid()}
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
