import React, { useState, useEffect } from "react"
import "../../styles/App.scss"
import { GithubPicker } from 'react-color';
import PaletteIcon from '@mui/icons-material/Palette';
import Draggable from "react-draggable";

export default function UnitCard(props) {
  const [show_picker, setShowPicker] = useState();
  const [colour, setColour] = useState();
  const [checked, setChecked] = useState(false);


  const handleChangeComplete = (color) => {
    setColour(color.hex);
    setShowPicker(false);
  };

  return (
    // <Draggable onMouseDown={() => { props.onDragItem({item: props.combination, colour: colour, code: "CODE1"}) }}>
    <div className="unit-card" onClick={() => {props.onDragItem({item: props.combination, colour: colour, code: "CODE1"}); setChecked(!checked) }}>
      <div className="card-content">
        <input
          type="checkbox"
          id="experiment_id"
          className="checkbox"
          disabled="disabled"
          checked={checked}
        />
        <div className="text-content">
          {Array.isArray(props.combination) ? props.combination.map(variable => <h3>{variable[0].name} ({variable[0].treatment_name})</h3>)
            :
            <h3>Control (Touches)</h3>
            //<h3>{props.combination.name} ({props.combination.treatment_name})</h3>
          }
        </div>
        <div  onClick={() => {setShowPicker(!show_picker)}} className="colour-picker">
          <PaletteIcon className="icon" style={{color: colour}}/>          
        </div>
      </div>
      {show_picker ? <GithubPicker onChangeComplete={handleChangeComplete} className="color-selector"/> : null}
    </div>
    // </Draggable>
  )
}
