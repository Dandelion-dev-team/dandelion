import React, { useState, useEffect } from "react"
import "../../styles/App.scss"
import { GithubPicker } from 'react-color';
import PaletteIcon from '@mui/icons-material/Palette';
import Draggable from "react-draggable";

export default function UnitCard(props) {
  const [show_picker, setShowPicker] = useState();
  const [colour, setColour] = useState();
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);

  const handleChangeComplete = (color) => {
    setColour(color.hex);
    setShowPicker(false);
    props.onDragItem({ item: props.combination, colour: color.hex, code: "CODE1", index:props.index});
    setChecked(true);
  };

  const handleClick = (color) => {
    setChecked(!checked);
  }

  useEffect(() => {
    if(props.index == 0){
      props.onDragItem({ item: props.combination, colour: colour, code: "CODE1", index:props.index });
    }
  }, [])

  return (
    <div id={props.is_active ? "active" : ""} className="unit-card" onClick={() => { props.onDragItem({ item: props.combination, colour: colour, code: "CODE1", index:props.index }); handleClick()}}>
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
            <h3>{props.combination.name} ({props.combination.treatment_name})</h3>
          }
        </div>
        <div onClick={() => { setShowPicker(!show_picker) }} className="colour-picker">
          <PaletteIcon className="icon" style={{ color: colour }} />
        </div>
      </div>
      {show_picker ? <GithubPicker onChangeComplete={handleChangeComplete} className="color-selector" /> : null}
    </div>
  )
}
