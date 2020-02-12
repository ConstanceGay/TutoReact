import React, { Component } from 'react'
import './App.css';
import Key from './Key';

const WORD = "TESTING"
const NUM_GUESSES = 6
const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S",
"T","U","V","W","X","Y","Z"]

class App extends Component {
  state = {
    phrase : WORD,
    guess : this.computeDisplay(WORD,[]),
    guesses : 0,
    usedLetters: [],
    won : false,
  }

  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
        (letter) => (usedLetters.includes(letter) ? letter : '_')  )
  }

  // Arrow fx for binding
  handleClick = index => {
    const { phrase , guess, guesses, usedLetters, won } = this.state
    const newUsedLetters = [...usedLetters, ...LETTERS[index]]
    const newGuess = this.computeDisplay(phrase, newUsedLetters)
    const newGuesses = (phrase.includes(LETTERS[index]) )? guesses : guesses+1
    const newWon = (newGuesses>5 || newGuess===phrase) ? true : false
    this.setState({ guess: newGuess, guesses: newGuesses, usedLetters: newUsedLetters, won : newWon })
  }

  restart(){
    this.setState({phrase : WORD,
      guess : this.computeDisplay(WORD,[]),
      guesses : 0,
      usedLetters: [],
      won : false})
  }

  render() {
    const {phrase,guess, guesses, usedLetters, won} = this.state
    return (
        <div>
          <h1  align="center">{guess}</h1>
          <div className="keyboard">
            {won ?
                <button align="center" onClick={()=> this.restart()}>RESTART</button>
                : LETTERS.map((letter, index) => (
                  <Key
                    letter={letter}
                    isSelected={usedLetters.includes(letter)}
                    index={index}
                    onClick={()=> this.handleClick(index) }/>
            ))
            }
          </div>
          <div align="center">Number of guesses : {guesses}</div>
          <div align="center">Guesses left : {NUM_GUESSES-guesses}</div>
          {won && guesses<5 && <h1  align="center">YOU WON</h1>}
          {won && guesses>5 && <h1  align="center">YOU LOST THE ANSWER WAS : {phrase}</h1>}
        </div>
    );
  }
}

export default App;
