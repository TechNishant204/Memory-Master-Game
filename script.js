const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

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

  // Hide the congratulations message immediately on restart
  const message = document.getElementById("congratulations-message");
  message.style.display = "none";
}

function checkForWin() {
  const allMatched = [...cards].every((card) =>
    card.classList.contains("matched")
  );

  if (allMatched) {
    setTimeout(() => {
      const message = document.getElementById("congratulations-message");
      message.style.display = "block";

      // Automatically hide the message after 3 seconds
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
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

// Restart button functionality
document.querySelector("#restart").addEventListener("click", restartGame);
