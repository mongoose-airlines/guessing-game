/*-------------------------------- Constants --------------------------------*/

const kazoo = new Audio("audio/kazoo.wav");

/*-------------------------------- Variables --------------------------------*/

let secretNum, currentGuess, guessList, isWinner;

/*------------------------ Cached Element References ------------------------*/

const titleEl = document.getElementById("title");
const messageEl = document.getElementById("message");
const guessesEl = document.getElementById("prevGuesses");
const guessBtn = document.getElementById("guessButton");
const resetBtn = document.getElementById("resetButton");
const guessInput = document.getElementById("guessInput");

/*----------------------------- Event Listeners -----------------------------*/

resetBtn.addEventListener("click", function () {
  init();
});

guessBtn.addEventListener("click", function () {
  if (guessList.length === 0) {
    guessesEl.innerText = "Previous Guesses:";
  }
  if (isWinner === false) {
    checkGuess(parseInt(guessInput.value));
  }
});

/*-------------------------------- Functions --------------------------------*/

init();

function init() {
  titleEl.className = "";
  messageEl.className = "";
  guessInput.value = "";
  guessesEl.innerText = "";
  messageEl.innerText = "Please enter a number between 1 and 100";
  guessList = [];
  isWinner = false;
  secretNum = Math.floor(Math.random() * 100) + 1;
  render();
}

function checkGuess(guess) {
  guessInput.value = "";
  if (guess < 1 || guess > 100 || isNaN(guess)) {
    messageEl.innerText = "Whoops! Please try a number between 1 and 100.";
  } else if (guess === secretNum) {
    titleEl.className = "animate__animated animate__bounce";
    messageEl.className = "winner";
    isWinner = true;
    confetti.start(1500);
    setTimeout(function () {
      kazoo.play();
    }, 1000);
    guessList.push(guess)
    if (guessList.length === 0) {
      messageEl.innerText = `WOW, LOOK AT THAT! You found the number in ${guessList.length} guess!`;
    } else {
      messageEl.innerText = `Congratulations! You found the number in ${guessList.length} guesses!`;
    }
  } else if (guess <= secretNum) {
    messageEl.className = "low";
    messageEl.innerText = `${guess} is too low, please try again!`;
    guessList.push(guess);
  } else {
    messageEl.className = "high";
    messageEl.innerText = `${guess} is too high, please try again!`;
    guessList.push(guess);
  }
  render(guess);
}

function render(guess) {
  if (guess > secretNum) {
    let div = document.createElement("div");
    div.innerText = guess;
    div.className = "high";
    guessesEl.appendChild(div);
  } else if (guess < secretNum) {
    let div = document.createElement("div");
    div.innerText = guess;
    div.className = "low";
    guessesEl.appendChild(div);
  } else if (guess === secretNum) {
    let div = document.createElement("div");
    div.innerText = guess;
    div.className = "winner";
    guessesEl.appendChild(div);
  }
}
