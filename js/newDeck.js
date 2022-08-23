import ancientsData from "../data/ancients.js";

let bossID = 0;
let sum_green = 0;
let sum_brown = 0;
let sum_blue = 0;

const firstStageDots = document.querySelectorAll(".firstStage");
const secondStageDots = document.querySelectorAll(".secondStage");
const thirdStageDots = document.querySelectorAll(".thirdStage");

function newDeck(boss, lvl) {
  for (let i = 0; i < ancientsData.length; i++) {
    console.log(ancientsData[i].id, boss);
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
}

window.newDeck = newDeck;
