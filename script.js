const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false; //state of the card
let lockBoard = false;
let firstCard, secondCard; // to store the state of first card and second card

//function to flip the card and then check for match
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // Second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

//function to check for match
function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    // Match found
    disableCards();
  } else {
    // No match
    unflipCards();
  }
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  checkForWin(); // Check for win after disabling matched cards

  resetBoard();
}

//function to unflip the cards if they don't match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    checkForWin(); // Check for win after unflipping cards

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartGame() {
  cards.forEach((card) => card.classList.remove("flip", "matched"));
  cards.forEach((card) => card.addEventListener("click", flipCard));
  shuffle();
  resetBoard();
  document.getElementById("congratulations-message").style.display = "none";
}

function checkForWin() {
  const allMatched = [...cards].every((card) =>
    card.classList.contains("matched")
  );

  if (allMatched) {
    // Display congratulations message if all cards are matched
    setTimeout(() => {
      document.getElementById("congratulations-message").style.display =
        "block";
      alert("Congratulations, you won!"); // Optional: you can also show a browser pop-up alert
    }, 1000);
  }
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

// Example of calling restartGame function
document.querySelector("#restart").addEventListener("click", restartGame);
