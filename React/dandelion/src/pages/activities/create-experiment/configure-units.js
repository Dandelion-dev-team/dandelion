import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import "../../../styles/App.scss"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import UnitCard from "../../../components/cards/unitCard"
import UnitHelpModal from "../../../components/Modals/unitHelpModal"

export default function ConfigureUnits(props) {
  const [modal_shown, setModalShown] = useState("")
  const [treatment_variables, setTreatment] = useState("");
  const [response_variables, setResponse] = useState("");
  const [combination_list, setCombinationList] = useState("");
  const [experiment_details, setExperimentDetails] = useState("");

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state);
      setTreatment(props.location.state.treatmentVariables);
      setResponse(props.location.state.responseVariables);
      setExperimentDetails(props.location.state.experimentDetails);
      setCombinationList(props.location.state.combinations);

    } else {
      if (typeof window !== `undefined`) {
        // navigate(
        //   "/activities/create-experiment/enter-details")
      }
    }
  }, []);


  return (
    <div>
      {modal_shown ? <UnitHelpModal /> : null}

      <div className="configure-container">
        <div className="content">
          <div className="condition-list">
            {combination_list ? combination_list.map(function (d, idx) {
              return (
                <UnitCard key={idx} combination={d} />)
            })
              : null}
          </div>
          <div className="grid-container">
            <div className="level-row">
              <div className="top-level">
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
                <div className="grid-wrapper">
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
