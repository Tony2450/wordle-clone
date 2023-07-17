import './index.css'
import React from 'react';
import { useState } from 'react';
import WordGrid from './Word-grid';
import classNames from 'classnames';
import Keyboard from './keyboard';
import { renderHook } from '@testing-library/react';
import { render } from 'react-dom';
import { createContext, useContext } from 'react';

export const AppContext = createContext()

function App() {
  const [wordle, setWordle] = useState("hello")

  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]])

  const [attempt, setAttempt] = useState(0);
  const [position, setPosition] = useState(0);

  const onKeyPress = (key) => {
    if (position < 5 && (key.match(/[a-zA-Z]/) && key.length === 1)){
      const currentBoard = board;
      currentBoard [attempt][position] = key;
      let newPosition = position + 1;
      setBoard(currentBoard)
      setPosition(newPosition)
  }
  };

  const onEnter = () => {
    if (position === 5){
      let newAttempt = attempt + 1;
      setAttempt(newAttempt)
      setPosition(0)
  } 
  };

  const onDelete = () => {
    if (position >= 1){
      const currentBoard = board;
      let newPosition = position - 1;
      currentBoard [attempt][newPosition] = "";
      setBoard(currentBoard)
      setPosition(newPosition)
  }
  };

  return (
    <div className="App">
      <h1 className='title'>Wordle!</h1>
      <AppContext.Provider value={{ board, setBoard, attempt, setAttempt, position, setPosition , onDelete, onEnter, onKeyPress}}>
        <WordGrid board={board} />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );

}

export default App;
