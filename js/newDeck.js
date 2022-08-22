import ancientsData from "../data/ancients.js";

let bossID = 0;

function newDeck(boss, lvl) {
  for (let i = 0; i < ancientsData.length; i++) {
    console.log(ancientsData[i].id, boss);
    if (ancientsData[i].id == boss) {
      bossID = i;
    }
  }
  console.log(bossID);
}
newDeck("Azathoth", "easy");

window.newDeck = newDeck;
