import React from 'react'
import { Card } from 'react-bootstrap'

export default function projectCard(props) {
    return (
        <div className='card'>
            <div className='cardImage'>
                <img src={props.image}></img>
                <h2>Text</h2>
            </div>
        </div>
    )
}