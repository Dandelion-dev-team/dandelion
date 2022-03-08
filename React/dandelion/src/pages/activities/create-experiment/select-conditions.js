import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import CombinationListComponent from "../../../components/cards/combinationListCard";
import "../../../styles/App.scss"

export default function SelectCombinations(props) {
  const [treatment_variables, setTreatment] = useState("");
  const [response_variables, setResponse] = useState("");

  const [combination_list, setCombinationList] = useState("");
  const [combination_selected, setCombinationSelected] = useState([]);

  useEffect(() => {
    var variables = [];
    let treatments = props.location.state.treatmentVariables;
    console.log(treatments)
    if (props) {
      treatments.forEach(treatment => variables.push(treatment.levels));
    }
    let combinations = allPossibleCases(variables);
    setCombinationList(combinations)
  }, []);

  function allPossibleCases(arr) {
    if (arr.length == 1) {
      return arr[0];
    } else {
      var result = [];
      var allCasesOfRest = allPossibleCases(arr.slice(1));
      for (var i = 0; i < allCasesOfRest.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
          result.push(JSON.stringify(arr[0][j]) + "-" + JSON.stringify(allCasesOfRest[i]));
        }
      }
      return result;
    }
  }

  const checkboxCallback = e => {
    let val = e.data
    if (e.value == true) {
      setCombinationSelected(arr => [...arr, val])
    } else {
      setCombinationSelected(combination_selected.filter(item => item !== val))
    }
  }

  return (
    <div className="conditions-container">
      <div className="content">
        <div className="text-content">
          <h3>Select your Conditions</h3>
          <p>Here you select the conditions for your experiment - for example, you may not require each combination of treatment variable to be represented in the experiment.</p>
        </div>
        <div className="condition-content">
          <h3>{combination_list.length} conditions generated</h3>
          <div className="condition-list">
            {combination_list ? combination_list.map(variable => (<CombinationListComponent condition={variable} checkCallback={checkboxCallback} />)) : null}
          </div>
          {combination_selected.length > 0 ?
            <input
              type="submit"
              className="continue-btn"
              value="Continue"
              onClick={() => {
                if (typeof window !== `undefined`) {
                  navigate("/activities/create-experiment/summary")
                  }
              }}
            ></input>
            : null}
        </div>
      </div>
    </div>
  )
}