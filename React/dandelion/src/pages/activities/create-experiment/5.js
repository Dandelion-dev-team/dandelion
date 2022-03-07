import React, { useEffect, useState, useRef } from "react"
import "../../../styles/App.scss"

export default function FifthCreateExperiment(props) {
    const [treatment_variables, setTreatment] = useState("");
    const [response_variables, setResponse] = useState("");
      
    useEffect(() => {
        var variables = [];
        let treatments = props.location.state.treatmentVariables;
        console.log(treatments)
        if (props) {            
            treatments.forEach(treatment => variables.push(treatment));
        }
        console.log(variables);
        //let combinations = allPossibleCases(variables);
        //console.log(combinations)
    }, []);

    function allPossibleCases(arr) {
        if (arr.length == 1) {
          return arr[0];
        } else {
          var result = [];
          var allCasesOfRest = allPossibleCases(arr.slice(1));
          for (var i = 0; i < allCasesOfRest.length; i++) {
            for (var j = 0; j < arr[0].length; j++) {
              result.push(arr[0][j] + allCasesOfRest[i]);
            }
          }
          return result;
        }
      } 

    return (
        <div className="conditions-container">
            <div className="content">
                <div className="text-content">
                    <h3>Select your Reponse Variables</h3>
                    <p>Select your Reponse Variables</p>
                </div>
                <div className="condition-list">
                    {treatment_variables ? <h3>{treatment_variables[0].levels[0].name}</h3>
                        : null}
                </div>
            </div>
        </div>
    )
}