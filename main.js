let target;
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const humanGuessInput = document.getElementById("human-guess");
const roundNumberDisplay = document.getElementById("round-number");
const computerGuessDisplay = document.getElementById("computer-guess");
const humanScoreDisplay = document.getElementById("human-score");
const computerScoreDisplay = document.getElementById("computer-score");
const targetNumberDisplay = document.getElementById("target-number");
const computerWinsDisplay = document.getElementById("computer-wins");

const guessButton = document.getElementById("guess");
const nextRoundButton = document.getElementById("next-round");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");

guessButton.setAttribute("disabled", true);

function generateTarget() {
  return Math.floor(Math.random() * 10);
}

function compareGuesses(humanGuess, computerGuess, targetNumber) {
  const humanDifference = Math.abs(targetNumber - humanGuess);
  const computerDifference = Math.abs(targetNumber - computerGuess);

  return humanDifference <= computerDifference;
}

function updateScore(winner) {
  if (winner === "human") {
    humanScore++;
  } else if (winner === "computer") {
    computerScore++;
  }
}

function advanceRound() {
  currentRoundNumber++;
}

const handleValueChange = (value) => {
  if (value >= 0 && value < 10) {
    subtractButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
    guessButton.removeAttribute("disabled");
  } else if (value >= 10) {
    addButton.setAttribute("disabled", true);
    humanGuessInput.value = 9;
  } else if (value < 0) {
    subtractButton.setAttribute("disabled", true);
    addButton.removeAttribute("disabled");
    humanGuessInput.value = 0;
  } else if (isNaN(value)) {
    humanGuessInput.value = 0;
  }

  if (humanGuessInput.value === "") {
    guessButton.setAttribute("disabled", true);
  }
};

guessButton.addEventListener("click", () => {
  target = generateTarget();
  const currentHumanGuess = parseInt(humanGuessInput.value);
  const computerGuess = Math.floor(Math.random() * 10);

  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;

  const humanIsWinner = compareGuesses(
    currentHumanGuess,
    computerGuess,
    target
  );
  const winner = humanIsWinner ? "human" : "computer";

  updateScore(winner);

  if (humanIsWinner) {
    guessButton.innerText = "You Win!!!";
    guessButton.classList.toggle("winning-text");
  } else {
    computerWinsDisplay.innerText = "Computer Wins!!!";
  }

  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;

  guessButton.setAttribute("disabled", true);
  nextRoundButton.removeAttribute("disabled");
});

nextRoundButton.addEventListener("click", () => {
  advanceRound();
  roundNumberDisplay.innerText = currentRoundNumber;

  nextRoundButton.setAttribute("disabled", true);
  guessButton.removeAttribute("disabled");

  targetNumberDisplay.innerText = "?";
  guessButton.innerText = "Make a Guess";
  humanGuessInput.value = "";
  computerGuessDisplay.innerText = "?";
  computerWinsDisplay.innerText = "";
  guessButton.classList.remove("winning-text");
});

addButton.addEventListener("click", () => {
  humanGuessInput.value = +humanGuessInput.value + 1;
  handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener("click", () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(humanGuessInput.value);
});

humanGuessInput.addEventListener("input", function (e) {
  let value = parseInt(e.target.value);
  if (isNaN(value) || value < 0) {
    humanGuessInput.value = 0;
  } else if (value > 9) {
    humanGuessInput.value = 9;
  }
  handleValueChange(value);
});

roundNumberDisplay.innerText = currentRoundNumber;
