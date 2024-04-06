'use strict';

// SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const cuurent0El = document.getElementById('current--0');
const cuurent1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scoresList, isPlaying;
// INITIAL CONDITIONS

// INITIALIZATION
const gameInitialization = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  cuurent0El.textContent = 0;
  cuurent1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scoresList = [0, 0];
  isPlaying = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
gameInitialization();

// SWITCH PLAYER FUNCTION
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  currentScore = 0;
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // GENERATE A RANDOM DICE NUMBER
    const diceNum = Math.floor(Math.random() * 6) + 1;

    // LOAD IMAGE ACC TO NUMBER
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;

    // CHECKING THE DICE NUMBER IS NOT EQUAL TO 1 AND ADDING TO CURRENT SCORE
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWITCH PLAYER
      switchPlayer();
    }
  }
});

// HOLDING THE SCORE
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // ADD CURRENT SCORE TO THE ACTIVEPLAYER'S TOTAL SCORE
    scoresList[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scoresList[activePlayer];
    // CHECK IF THE SCORE IS >= 100 IF SO FINISH THE GAME
    if (scoresList[activePlayer] >= 100) {
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // ELSE SWITCH TO THE OTHER PLAYER AND CONTINUE THE GAME
      switchPlayer();
    }
  }
});

// RESETTING THE GAME
btnNew.addEventListener('click', gameInitialization);
