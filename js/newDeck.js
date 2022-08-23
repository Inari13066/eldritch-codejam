import ancientsData from "../data/ancients.js";
import {
  brownCards,
  blueCards,
  greenCards,
} from "../data/mythicCards/index.js";

let bossID = 0;
let sum_green = 0;
let sum_brown = 0;
let sum_blue = 0;

const firstStageDots = document.querySelectorAll(".firstStage");
const secondStageDots = document.querySelectorAll(".secondStage");
const thirdStageDots = document.querySelectorAll(".thirdStage");
const cardCurrent = document.querySelector(".card");
const deckBack = document.querySelector(".deck");
let firstStageSum = 0;
let secondStageSum = 0;
let thirdStageSum = 0;

let deckFinal = [];

function newDeck(boss, lvl) {
  cardCurrent.style.visibility = "hidden";
  for (let i = 0; i < ancientsData.length; i++) {
    if (ancientsData[i].id == boss) {
      bossID = i;
    }
  }
  let firstStage = ancientsData[bossID].firstStage;
  let secondStage = ancientsData[bossID].secondStage;
  let thirdStage = ancientsData[bossID].thirdStage;

  sum_green =
    firstStage.greenCards + secondStage.greenCards + thirdStage.greenCards;
  sum_brown =
    firstStage.brownCards + secondStage.brownCards + thirdStage.brownCards;
  sum_blue =
    firstStage.blueCards + secondStage.blueCards + thirdStage.blueCards;

  for (let dot of firstStageDots) {
    if (dot.classList.contains("green")) {
      dot.innerHTML = `${firstStage.greenCards}`;
    }
    if (dot.classList.contains("brown")) {
      dot.innerHTML = `${firstStage.brownCards}`;
    }
    if (dot.classList.contains("blue")) {
      dot.innerHTML = `${firstStage.blueCards}`;
    }
  }
  for (let dot of secondStageDots) {
    if (dot.classList.contains("green")) {
      dot.innerHTML = `${secondStage.greenCards}`;
    }
    if (dot.classList.contains("brown")) {
      dot.innerHTML = `${secondStage.brownCards}`;
    }
    if (dot.classList.contains("blue")) {
      dot.innerHTML = `${secondStage.blueCards}`;
    }
  }
  for (let dot of thirdStageDots) {
    if (dot.classList.contains("green")) {
      dot.innerHTML = `${thirdStage.greenCards}`;
    }
    if (dot.classList.contains("brown")) {
      dot.innerHTML = `${thirdStage.brownCards}`;
    }
    if (dot.classList.contains("blue")) {
      dot.innerHTML = `${thirdStage.blueCards}`;
    }
  }

  let greenCardsdiff = [];
  let brownCardsdiff = [];
  let blueCardsdiff = [];

  let greenCardsFinal = new Set();
  let brownCardsFinal = new Set();
  let blueCardsFinal = new Set();

  for (let i = 0; i < greenCards.length; i++) {
    if (lvl == "easy") {
      if (greenCards[i].difficulty != "hard") {
        greenCardsdiff.push(greenCards[i]);
      }
    }
    if (lvl == "normal") {
      greenCardsdiff.push(greenCards[i]);
    }
    if (lvl == "hard") {
      if (greenCards[i].difficulty != "easy") {
        greenCardsdiff.push(greenCards[i]);
      }
    }
  }

  for (let i = 0; i < brownCards.length; i++) {
    if (lvl == "easy") {
      if (brownCards[i].difficulty != "hard") {
        brownCardsdiff.push(brownCards[i]);
      }
    }
    if (lvl == "normal") {
      brownCardsdiff.push(brownCards[i]);
    }
    if (lvl == "hard") {
      if (brownCards[i].difficulty != "easy") {
        brownCardsdiff.push(brownCards[i]);
      }
    }
  }

  for (let i = 0; i < blueCards.length; i++) {
    if (lvl == "easy") {
      if (blueCards[i].difficulty != "hard") {
        blueCardsdiff.push(blueCards[i]);
      }
    }
    if (lvl == "normal") {
      blueCardsdiff.push(blueCards[i]);
    }
    if (lvl == "hard") {
      if (blueCards[i].difficulty != "easy") {
        blueCardsdiff.push(blueCards[i]);
      }
    }
  }

  greenCardsFinal = getItems(greenCardsdiff, sum_green);
  brownCardsFinal = getItems(brownCardsdiff, sum_brown);
  blueCardsFinal = getItems(blueCardsdiff, sum_blue);
  greenCardsFinal = Array.from(shuffle(greenCardsFinal));
  brownCardsFinal = Array.from(shuffle(brownCardsFinal));
  blueCardsFinal = Array.from(shuffle(blueCardsFinal));

  let firstStageCards = greenCardsFinal
    .slice(0, firstStage.greenCards)
    .concat(
      brownCardsFinal.slice(0, firstStage.brownCards),
      blueCardsFinal.slice(0, firstStage.blueCards)
    );

  let secondStageCards = greenCardsFinal
    .slice(
      firstStage.greenCards,
      firstStage.greenCards + secondStage.greenCards
    )
    .concat(
      brownCardsFinal.slice(
        firstStage.brownCards,
        firstStage.brownCards + secondStage.brownCards
      ),
      blueCardsFinal.slice(
        firstStage.blueCards,
        firstStage.blueCards + secondStage.blueCards
      )
    );

  let thirdStageCards = greenCardsFinal
    .slice(firstStage.greenCards + secondStage.greenCards, sum_green)
    .concat(
      brownCardsFinal.slice(
        firstStage.brownCards + secondStage.brownCards,
        sum_brown
      ),
      blueCardsFinal.slice(
        firstStage.blueCards + secondStage.blueCards,
        sum_blue
      )
    );

  firstStageSum = firstStageCards.length;
  secondStageSum = secondStageCards.length;
  thirdStageSum = thirdStageCards.length;

  deckFinal = shuffle(firstStageCards).concat(
    shuffle(secondStageCards),
    shuffle(thirdStageCards)
  );
}

function getItems(arr, sum) {
  let set = new Set();
  do {
    set.add(arr[Math.floor(Math.random() * arr.length)]);
  } while (set.size < sum);
  return set;
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

let stage = 1;

function newCard(curr) {
  if (curr == 0) {
    cardCurrent.style.visibility = "visible";
    stage = 1;
  }
  if (curr >= deckFinal.length) {
    cardCurrent.style.visibility = "hidden";
    deckBack.style.visibility = "hidden";
  } else {
    cardCurrent.src = `${deckFinal[curr].cardFace}`;
    let currColor = deckFinal[curr].color;
    if (stage == 1) {
      for (let dot of firstStageDots) {
        if (dot.classList.contains(currColor)) {
          let tmp = dot.innerHTML;
          dot.innerHTML = `${tmp - 1}`;
        }
      }
      firstStageSum = firstStageSum - 1;
      if (firstStageSum < 1) {
        stage = 2;
      }
    } else if (stage == 2) {
      for (let dot of secondStageDots) {
        if (dot.classList.contains(currColor)) {
          let tmp = dot.innerHTML;
          dot.innerHTML = `${tmp - 1}`;
        }
      }
      secondStageSum = secondStageSum - 1;
      if (secondStageSum == 0) {
        stage = 3;
      }
    } else if (stage == 3) {
      for (let dot of thirdStageDots) {
        if (dot.classList.contains(currColor)) {
          let tmp = dot.innerHTML;
          dot.innerHTML = `${tmp - 1}`;
        }
      }
    }
    // console.log(currColor, stage, firstStageSum, secondStageSum, thirdStageSum);
    curr++;
  }
  return curr;
}

window.newDeck = newDeck;
window.newCard = newCard;
