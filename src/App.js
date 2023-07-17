import './index.css'
import React from 'react';
import { useState } from 'react';
import WordGrid from './Word-grid';
import Keyboard from './keyboard';
import { createContext } from 'react';

export const AppContext = createContext()

function App() {
  const [wordle, setWordle] = useState("hello")

  const [correctLetters, setCorrect] = useState([])
  const [elsewhereLetters, setElsewhere] = useState([])
  const [wrongLetters, setWrong] = useState([])

  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]])

  // Array of arrays depicting wrong/elsewhere/correct status of letter guesses
  const [status, setStatus] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]])

  const [attempt, setAttempt] = useState(0);
  const [position, setPosition] = useState(0);

  const onKeyPress = (key) => {
    if (position < 5 && (key.match(/[a-zA-Z]/) && key.length === 1)) {
      const currentBoard = board;
      currentBoard[attempt][position] = key.toUpperCase();
      let newPosition = position + 1;
      setBoard(currentBoard)
      setPosition(newPosition)
    }
  };

  const onEnter = () => {
    if (position === 5) {
      const wordleUpperCase = wordle.toUpperCase();
      const wordleArray = wordleUpperCase.split("");
      const currentStatus = status;
      let correctGuesses = [...correctLetters];
      let elsewhereGuesses = [...elsewhereLetters];
      let wrongGuesses = [...wrongLetters];

      board[attempt].forEach(function (letter, index) {
        //If letter is correct
        if (letter === wordleArray[index]) {
          currentStatus[attempt][index] = "correct";
          correctGuesses = [...correctGuesses, letter]
        } else if (wordleArray.includes(letter)) {
          //When the letter is elsewhere there are a few things to check

          //1. Positions where the letter occurs in the actual wordle
          const indices = [];
          let correctIndices = wordleArray.indexOf(letter);
          while (correctIndices !== -1) {
            indices.push(correctIndices);
            correctIndices = wordleArray.indexOf(letter, correctIndices + 1);
          }

          //2. If the letter has already occured previously in the guessed word
          let elsewhereGuessed = 0;
          for (let i = 0; i < index; i ++){
            if (board[attempt][i] === letter){
              elsewhereGuessed += 1;
            }
          }

          //3. There can be up to 3 times the same letter in a 5 letter word, so we have a defined if/else statement for each possibility (letter occurs once, twice or three times in the actual wordle)
          if (indices.length === 1) {
            if (board[attempt][indices[0]] === letter) {
              // The letter is already in the correct position(s) in the guess, thus this letter's status is "wrong"
              currentStatus[attempt][index] = "wrong";
              wrongGuesses = [...wrongGuesses, letter]
            } else if (elsewhereGuessed >= indices.length){
              // The letter has already been guessed a sufficient amount of times previously in the guessed word, this this letter's status is "wrong"
              currentStatus[attempt][index] = "wrong";
              wrongGuesses = [...wrongGuesses, letter]
            } else {
              // The letter's status is indeed "elsewhere" if the above conditions are not fulfilled
              currentStatus[attempt][index] = "elsewhere";
              elsewhereGuesses = [...elsewhereGuesses, letter]
            }
          } else if (indices.length === 2) {
            if (board[attempt][indices[0]] === letter && board[attempt][indices[1]] === letter) {
              currentStatus[attempt][index] = "wrong";
              wrongGuesses = [...wrongGuesses, letter]
            } else if (elsewhereGuessed >= indices.length){
              currentStatus[attempt][index] = "wrong";
              wrongGuesses = [...wrongGuesses, letter]
            } else {
              currentStatus[attempt][index] = "elsewhere";
              elsewhereGuesses = [...elsewhereGuesses, letter]
            }
          } else if (indices.length === 3) {
            if (board[attempt][indices[0]] === letter && (board[attempt][indices[1]] === letter && board[attempt][indices[2]] === letter)) {
              currentStatus[attempt][index] = "wrong";
              wrongGuesses = [...wrongGuesses, letter]
            } else if (elsewhereGuessed >= indices.length){
              currentStatus[attempt][index] = "wrong";
              wrongGuesses = [...wrongGuesses, letter]
            } else {
              currentStatus[attempt][index] = "elsewhere";
              elsewhereGuesses = [...elsewhereGuesses, letter]
            }
          }
        } else {
          //Else the letter is not in the wordle
          currentStatus[attempt][index] = "wrong";
          wrongGuesses = [...wrongGuesses, letter]
        }
      });
      setCorrect(correctGuesses)
      setElsewhere(elsewhereGuesses)
      setWrong(wrongGuesses)
      setStatus(currentStatus);
      let newAttempt = attempt + 1;
      setAttempt(newAttempt);
      setPosition(0);
    }
  };

  const onDelete = () => {
    if (position >= 1) {
      const currentBoard = board;
      let newPosition = position - 1;
      currentBoard[attempt][newPosition] = "";
      setBoard(currentBoard)
      setPosition(newPosition)
    }
  };

  return (
    <div className="App">
      <h1 className='title'>Wordle!</h1>
      <AppContext.Provider value={{ board, setBoard, attempt, setAttempt, position, setPosition, onDelete, onEnter, onKeyPress, status, wrongLetters, elsewhereLetters, correctLetters }}>
        <WordGrid board={board} />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );

}

export default App;
