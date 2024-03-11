import React, { useState, useEffect } from 'react'
import GameCircle from './GameCircle'
import '../Game.css';
import Header from './Header';
import Footer from './Footer';
import { isWinner } from '../helper.js'
import {
  GAME_STATE_PLAYING,
  NO_PLAYER,
  PLAYER_1,
  PLAYER_2,
  NO_CIRCLES,
  GAME_STATE_WIN,
  GAME_STATE_DRAW
} from './Constants.js';
import { isDraw, getComputerMove } from '../helper.js';

const GameBoard = () => {

  const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

  const circleClicked = (id) => {
    // alert("Circle clicked with id " + id);
    //const board = [...gameBoard];
    //board[id] = currentPlayer;
    //setGameBoard(board);
    //Alternative to the above three lines is the code below (alternative to spread operator) .
    //Updating array via a state
    if (gameBoard[id] !== NO_PLAYER) {
      return;
    }
    if (gameState !== GAME_STATE_PLAYING)
      return;
    setGameBoard((prev) => {
      return prev.map((circle, pos) => {
        if (pos === id) return currentPlayer;
        return circle;
      })
    })
    if (isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setWinPlayer(currentPlayer);
    }
    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setWinPlayer(NO_PLAYER);
    }
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  }
  //Gets called whenever the whole component gets loaded
  useEffect(() => {
    initGame();
  }, [])

  const initGame = () => {
    setGameBoard(Array(16).fill(NO_PLAYER));
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING);
  }

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  }

  const suggestMove = () => {
    console.log("Suggest Move");
    circleClicked(getComputerMove(gameBoard));
  }

  const renderCircle = (id) => {
    return (
      <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}></GameCircle>
    )
  }

  return (
    <>
      <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
      <div className='gameboard'>
        {initBoard()}
      </div>
      <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} />
    </>
  )
}
export default GameBoard;