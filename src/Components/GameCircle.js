import React from 'react'
import '../Game.css';



const GameCircle = ({ id,onCircleClicked,className}) => {
  
    return (
        <div className={`gamecircle ${className}`} onClick={() => { onCircleClicked(id) }}>

        </div>
    )
}

export default GameCircle;