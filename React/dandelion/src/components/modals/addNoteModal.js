import React, { useEffect, useState } from "react"
import { createRecord } from "../../utils/CRUD"

export default function AddNoteModal(props) {

    

  return (
    <div className="add-note-modal">
      <div className="inner-panel">
        <div className="panel-content">
          <div className="title">
            <h2>Add a note</h2>
            <p>If you have also experienced this issue please let us know.</p>
          </div>
          <div className="enter-row">
            <div className="enter-container">
              <div className="title">
                <h3>Number:</h3>
              </div>
              <div className="item-input">
                <input
                  type="text"
                  name="descBox"
                 
                />
              </div>
            </div>
          </div>
          <div className="finish-row">
            <div className="add-btn">
              <input
                type="submit"
                className="add-btn"
                value="Update"
                onClick={() => {
                  
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
