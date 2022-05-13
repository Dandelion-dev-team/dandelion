import React, { useState, useEffect } from "react"
import "../../styles/App.scss"
import { CirclePicker } from 'react-color';
import PaletteIcon from '@mui/icons-material/Palette';
import Draggable from "react-draggable";

export default function UnitCard(props) {
  const [show_picker, setShowPicker] = useState();
  const [colour, setColour] = useState();
  const [checked, setChecked] = useState(false);
  const [gen_code, setCode] = useState("NO_CODE");

  const handleChangeComplete = (color) => {
    setColour(color.hex);
    setShowPicker(false);
    props.onDragItem({ item: props.combination, colour: color.hex,  code: gen_code, index:props.index});
    setChecked(true);
  };

  const handleClick = (color) => {
    setChecked(!checked);
  }

  const getCode = (code) => {
    let construction = props.base_code;
    construction = construction + "_";
    if(Array.isArray(props.combination)){
      props.combination.map(variable => construction = construction + variable[0].name.substring(0,1) + variable[0].treatment_name.substring(0,1) + "_");
      construction = construction.substring(0, construction.length - 1);
    } else {
      console.log(props.combination)
      construction = construction + props.combination.name.substring(0,1) + props.combination.treatment_name.substring(0,1);
    }  
    return construction;
  }

  useEffect(() => {
    setCode(getCode());
    if(props.index == 0){
      props.onDragItem({ item: props.combination, colour: colour, code: gen_code, index:props.index });
    }
  }, [])

  return (
    <div id={props.is_active ? "active" : ""} className="unit-card" onClick={() => { props.onDragItem({ item: props.combination, colour: colour, code: gen_code, index:props.index }); handleClick()}}>
      <div className="card-content">
        {/* <input
          type="checkbox"
          id="experiment_id"
          className="checkbox"
          disabled="disabled"
          checked={checked}
        /> */}
        <div className="text-content">
          {Array.isArray(props.combination) ? props.combination.map(variable => <h3>{variable[0].name} ({variable[0].treatment_name})</h3>)
            :
            <h3>{props.combination.name} ({props.combination.treatment_name})</h3>
          }
        </div>
        <div className="color-picker">
        <CirclePicker colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39"]} width={'100%'} circleSize={22} onChangeComplete={handleChangeComplete}  className="color-selector" />
        </div>
      </div>
      {/* {show_picker ? <GithubPicker onChangeComplete={handleChangeComplete}  className="color-selector" /> : null} */}
    </div>
  )
}