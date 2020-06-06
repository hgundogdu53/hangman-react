import React, { Component } from "react";
import { randomWord } from "./words.js";
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
  }

  reset = () => {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  };

  guessedWord = () => {
    return this.state.answer
      .split("")
      .map((word) => (this.state.guessed.has(word) ? word : "_"));
  };

  handleGuess = (event) => {
    let word = event.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(word),
      nWrong: st.nWrong + (st.answer.includes(word) ? 0 : 1),
    }));
  };

  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((word) => (
      <button
        key={word}
        value={word}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(word)}
      >
        {word}
      </button>
    ));
  };

  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You Win!";
    if (gameOver) gameState = "You Lose!";
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText} />
        <p>Guessed Wrong: {this.state.nWrong}</p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns">{gameState}</p>
        <button id="reset" onClick={this.reset}>
          Restart?
        </button>
      </div>
    );
  }
}

export default Hangman;
