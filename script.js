"use strict";

let scorePlayer1 = 0;
let scorePlayer2 = 0;
let cScorePlayer1 = 0;
let cScorePlayer2 = 0;

// Function to reset current score
const resetCurrentScore = () => {
  currentScorePlayer1.innerText = 0;
  currentScorePlayer2.innerText = 0;
  //   if (getActivePlayer() == 1) {
  //     currentScorePlayer1.innerText = 0;
  //   } else {
  //     currentScorePlayer2.innerText = 0;
  //   }
};

// Function to reset final score
const resetFinalScore = () => {
  if (getActivePlayer() == 1) {
    finalScorePlayer1.innerText = 0;
    scorePlayer1 = 0;
  } else {
    finalScorePlayer2.innerText = 0;
    scorePlayer2 = 0;
  }
};

// Function to start new game
const resetGameScore = () => {
  finalScorePlayer1.innerText = 0;
  finalScorePlayer2.innerText = 0;
  scorePlayer1 = scorePlayer2 = 0;
  dice.setAttribute("src", `img/dice-6.png`);
  resetCurrentScore();
  playerName1.innerHTML =
    "Player 1 <span class='active-light-1 hidden'>💡</span>";
  playerName2.innerHTML = "Player 2 <span class='active-light-1'>💡</span>";
  activeLight2.classList.add("hidden");
  activeLight1.classList.remove("hidden");
};

// Function to get the active player
const getActivePlayer = () => {
  if (
    player.classList.contains("player--active") &&
    player.classList.contains("player--0")
  )
    return 1;
  else return 2;
};

// Function to set the total score of the player
const setPlayerScore = (playerName, currentScore) => {
  if (playerName === 1) {
    scorePlayer1 += currentScore;
    console.log(
      `Player: 1, Current Score: ${currentScore}, Final Score: ${scorePlayer1}`
    );

    finalScorePlayer1.innerText = scorePlayer1;
  } else {
    scorePlayer2 += currentScore;
    finalScorePlayer2.innerText = scorePlayer2;
    console.log(
      `Player: 2, Current Score: ${currentScore}, Final Score: ${scorePlayer2}`
    );
  }
};

// Function to swap the active player
const swapActivePlayer = () => {
  let activePlayer = getActivePlayer();
  if (activePlayer == 1) {
    playerOne.classList.remove("player--active");
    playerTwo.classList.add("player--active");
    activeLight1.classList.add("hidden");
    activeLight2.classList.remove("hidden");
  } else {
    playerTwo.classList.remove("player--active");
    playerOne.classList.add("player--active");
    activeLight1.classList.remove("hidden");
    activeLight2.classList.add("hidden");
  }
};

// Function to get the random Dice
const getRandomDice = () => {
  return Math.trunc(Math.random() * 6 + 1);
};

// Getting reference of player name
const playerName1 = document.getElementById("name--0");
const playerName2 = document.getElementById("name--1");

// Getting reference of new game button
const btnNewGame = document.querySelector(".btn--new");

// Getting reference of final score of player 1
const finalScorePlayer1 = document.getElementById("score--0");

// Getting reference of final score of player 2
const finalScorePlayer2 = document.getElementById("score--1");

// Getting reference of current score of player 1
const currentScorePlayer1 = document.getElementById("current--0");

// Getting reference of current score of player 2
const currentScorePlayer2 = document.getElementById("current--1");

// Getting the reference of the player
const player = document.querySelector(".player");

// Getting the reference of Roll Dice button
const btnRoll = document.querySelector(".btn--roll");

// Getting the reference of the Active Light for player 1
const activeLight1 = document.querySelector(".active-light-1");

// Getting the reference of the Active Light for player 2
const activeLight2 = document.querySelector(".active-light-2");

// Getting the reference of Hold Dice button
const btnHold = document.querySelector(".btn--hold");

// Getting reference of Player 1
const playerOne = document.querySelector(".player--0");

// Getting reference of Player 1
const playerTwo = document.querySelector(".player--1");

// Getting reference of Dice image element
const dice = document.querySelector(".dice");

// Adding event listener on Roll Dice button
btnRoll.addEventListener("click", function () {
  // Getting random number 1-6
  const randomDice = getRandomDice();
  console.log(`Random Dice: ${randomDice}`);

  //   Chaning the dice image based on the random number
  dice.setAttribute("src", `img/dice-${randomDice}.png`);

  //   Setting the current Score for the player
  if (getActivePlayer() == 1) {
    console.log(`Active player is 1 and random dice is ${randomDice}`);
    if (randomDice == 1) {
      resetFinalScore();
      resetCurrentScore();
      swapActivePlayer();
    } else {
      cScorePlayer1 = randomDice;
      currentScorePlayer1.innerText = cScorePlayer1;
    }
  } else {
    console.log(`Active player is 2 and random dice is ${randomDice}`);
    if (randomDice == 1) {
      resetFinalScore();
      resetCurrentScore();
      swapActivePlayer();
    } else {
      cScorePlayer2 = randomDice;
      currentScorePlayer2.innerText = cScorePlayer2;
    }
  }

  // Checking the active player
  console.log(`Active Player: Player-${getActivePlayer()}`);
});

// Adding functionality to Hold button
btnHold.addEventListener("click", function () {
  if (getActivePlayer() == 1) {
    currentScorePlayer2.innerText = 0;
    setPlayerScore(1, cScorePlayer1);
  } else {
    currentScorePlayer1.innerText = 0;
    setPlayerScore(2, cScorePlayer2);
  }
  resetCurrentScore();
  swapActivePlayer();
  console.log(`Hold button clicked`);
  if (scorePlayer1 >= 100) {
    playerName1.innerText = "Winner 🥇";
    playerName2.innerText = "Looser 😭";
  } else if (scorePlayer2 >= 100) {
    playerName2.innerText = "Winner 🥇";
    playerName1.innerText = "Looser 😭";
  }
});

// Adding functionality to New Game button
btnNewGame.addEventListener("click", function () {
  resetGameScore();
});
