const animals = [
  "🐕",
  "🐈‍",
  "🐄",
  "🐐",
  "🐎",
  "🐖",
  "🐇",
  "🦆",
  "🐔",
  "🐁",
  "🐑"
];

const fruits = [
  "🍇",
  "🍊",
  "🍑",
  "🥝",
  "🍈",
  "🍉",
  "🥭",
  "🍎",
  "🍓",
  "🍆",
  "🥕",
  "🥒",
  "🫑",
  "🧅",
  "🍄"
];

function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

shuffle(animals);
let t1side = document.getElementsByClassName("tside").item(0);
for (let x = 0; x < 3; x++) {
  let tr = document.createElement("tr");
  for (let y = 0; y < 1; y++) {
    let td = document.createElement("td");
    {
      td.setAttribute("id", "r" + (x + 1) + "d" + (y + 1));
      td.appendChild(document.createTextNode(animals[x * 1 + y]));
    }
    tr.appendChild(td);
  }
  t1side.appendChild(tr);
}

shuffle(fruits);
let t2top = document.getElementsByClassName("ttop").item(0);
for (let x = 0; x < 1; x++) {
  let tr = document.createElement("tr");
  for (let y = 0; y < 4; y++) {
    let td = document.createElement("td");
    {
      td.setAttribute("id", "r" + (x + 1) + "d" + (y + 1));
      td.appendChild(document.createTextNode(fruits[x * 1 + y]));
    }
    tr.appendChild(td);
  }
  t2top.appendChild(tr);
}

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
