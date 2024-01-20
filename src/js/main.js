'use strict';

import '../scss/style.scss';

const rollTheDice = document.querySelector('.app__interface-roll-btn');
const newGame = document.querySelector('.app__interface-new-btn');
const keepPoints = document.querySelector('.app__interface-keep-btn');
const dicePicture = document.querySelector('.app__interface-dice-img');

let playerOneCurrent = document.querySelector('.app__player1-points-block-score');
let playerTwoCurrent = document.querySelector('.app__player2-points-block-score');
let playerOneTotal = document.querySelector('.app__player1-total-score');
let playerTwoTotal = document.querySelector('.app__player2-total-score');

let p1 = document.querySelector('.app__player1');
let p2 = document.querySelector('.app__player2');

const changePlayers = () => {
  p1.classList.toggle('waiting');
  p2.classList.toggle('waiting');
};

// "Roll" Button
rollTheDice.addEventListener('click', () => {
  newGame.removeAttribute('disabled', '');
  keepPoints.removeAttribute('disabled', '');

  let currentPlayer;
  let currentPlayerPoints;

  if (p2.classList.contains('waiting')) {
    currentPlayer = playerOneCurrent;
    currentPlayerPoints = +playerOneCurrent.textContent;
  } else {
    currentPlayer = playerTwoCurrent;
    currentPlayerPoints = +playerTwoCurrent.textContent;
  }

  let diceNumber = Math.trunc(Math.random() * 6) + 1;

  dicePicture.classList.remove('hidden');
  dicePicture.src = `./images/dice${diceNumber}.png`;

  if (diceNumber !== 1) {
    currentPlayer.textContent = currentPlayerPoints + diceNumber;
  } else {
    currentPlayer.textContent = 0;
    changePlayers();
  }
});

// "Keep" Button
keepPoints.addEventListener('click', () => {
  if (p2.classList.contains('waiting')) {
    var currentPlayerTotal = playerOneTotal;
    var currentPlayerCurrent = playerOneCurrent;
    var anotherPlayerTotal = playerTwoTotal;
  } else {
    var currentPlayerTotal = playerTwoTotal;
    var currentPlayerCurrent = playerTwoCurrent;
    var anotherPlayerTotal = playerOneTotal;
  }

  currentPlayerTotal.textContent = +currentPlayerCurrent.textContent + +currentPlayerTotal.textContent;
  if (currentPlayerTotal.textContent >= 100) {
    currentPlayerTotal.textContent = '🏆';
    anotherPlayerTotal.textContent = '🐽';
    dicePicture.classList.add('hidden');
    rollTheDice.setAttribute('disabled', '');
    keepPoints.setAttribute('disabled', '');
    changePlayers();
  } else {
    currentPlayerCurrent.textContent = 0;
  }
  changePlayers();
});

// "New Game" Button
newGame.addEventListener('click', () => {
  p1.classList.remove('waiting');
  p2.classList.add('waiting');

  [rollTheDice, keepPoints].forEach(el => el.removeAttribute('disabled'));

  dicePicture.classList.add('hidden');
  newGame.setAttribute('disabled', '');
  keepPoints.setAttribute('disabled', '');

  [playerOneTotal, playerTwoTotal, playerOneCurrent, playerTwoCurrent].forEach(el => {
    el.textContent = 0;
  });
});
