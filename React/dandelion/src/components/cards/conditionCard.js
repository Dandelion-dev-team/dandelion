import React, { useState, useEffect } from "react"
import "../../styles/App.scss"
import { SwatchesPicker } from 'react-color';

export default function ConditionCard(props) {
    const [colour, setColour] = useState();
    const pickerRef = React.createRef()
    const coverRef = React.createRef()

    useEffect(() => {
        if (props.condition.colour) {
            setColour(props.condition.colour)
        }
        else {
            setColour('#666677')
        }
    }, [props.reset])



    const handleChangeComplete = (color, e) => {
        setColour(color.hex);
        props.updateColour(props.index, color.hex)
    };

    function handleClose() {
        pickerRef.current.classList.add('no-display');
        coverRef.current.classList.add('no-display');
      }

    function handleOpen() {
        coverRef.current.classList.remove('no-display');
        pickerRef.current.classList.remove('no-display');
        const pickerRect = pickerRef.current.getBoundingClientRect()
        const modalRect = props.modalRef.current.getBoundingClientRect()
        const pickerBottomBound = pickerRect.y + pickerRect.height
        const bottomBound = modalRect.y + modalRect.height

        if (pickerBottomBound > bottomBound) {
            pickerRef.current.style.top = 'auto'
            pickerRef.current.style.bottom = bottomBound
            pickerRef.current.style.transform = `translateY(${(bottomBound - pickerBottomBound)}px)`
        }
    }

  return (
    <div id={props.is_active ? "active" : ""}
         className="condition-card" onClick={() => {
           props.onDragItem({
             item: props.condition,
             colour: colour,
             code: props.condition.code,
             index:props.index
           })
         }}>
      <div className="card-content">

        <div
            className="color"
            style={{backgroundColor: colour}}
            onClick={(e) => {
                handleOpen()
            }}>
        </div>
        <div id="cover" className="cover no-display" ref={coverRef} onClick={ handleClose }/>
        <div
            id="popover"
            ref={pickerRef}
            className="popover no-display" >
            <SwatchesPicker
                width={'100%'}
                onChangeComplete={handleChangeComplete}
                className="color-selector" />
        </div>
          <h4>{props.condition.code}</h4>
          <p>{props.condition.description.split(";").map((c) => (
              <span>{c}<br/></span>
          ))}</p>
      </div>
    </div>
  )
}
