import React, { useEffect, useState, useRef } from "react"
import "../../styles/App.scss"

export default function PaginationComponent(props) {
    let numCircles = props.numPages;
    let index = props.pageIndex;
    var circles = [];

    for (var i = 1; i <= numCircles; i++) {
        //FOR LOOP TO DETERMINE NUMBER OF CIRCLES

        //IF LOOP INDEX IS LESS THAN PAGE INDEX DISPLAY CHECK MARK COLOURED CIRCLE
        if (i < index) {
            circles.push(
                <div className="pagination-item">
                    <div className="coloured-circle">
                        <h3>✓</h3>
                    </div>
                    <div className="hr" />
                </div>);

            //IF LOOP INDEX IS EQUAL TO PAGE INDEX DISPLAY NUMBER COLOURED CIRCLE
        } else if (i == index) {
            if (i != numCircles) {
                circles.push(
                    <div className="pagination-item">
                        <div className="coloured-circle">
                            <h3>{index}</h3>
                        </div>
                        <div className="hr" />
                    </div>);
            } else {
                circles.push(
                    <div className="pagination-item">
                        <div className="coloured-circle">
                            <h3>{index}</h3>
                        </div>
                    </div>);
            }
            //ELSE DISPLAY NON-COLOURED CIRCLE (WITH STROKE)
        } else {
            //IF IT'S THE LAST ITEM DO NOT DISPLAY HORIZONTAL CONNECTOR
            if (i != numCircles) {
                circles.push(
                    <div className="pagination-item">
                        <div className="uncomplete-circle">
                            <h3>{i}</h3>
                        </div>
                        <div className="hr" />
                    </div>);
            } else {
                circles.push(
                    <div className="pagination-item">
                        <div className="uncomplete-circle">
                            <h3>{i}</h3>
                        </div>
                    </div>);
            }
        }
    }
    return (
        <div className="pagination-container">
            {circles}
        </div>
    )

}