import React from 'react'

const MultiplayerGame = ({room, socket, players, startingLetter}) => {
  return (
    <div>
        {room}
        {players}
        {startingLetter}
        {/* <div>{room}</div>
        <div>{socket}</div>
        <div>{players}</div>
        <div>{startingLetter}</div> */}
    </div>
  )
}

export default MultiplayerGame