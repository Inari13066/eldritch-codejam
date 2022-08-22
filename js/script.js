const ancientImgs = document.querySelectorAll(".ancient-img");
const diffLvls = document.querySelectorAll(".lvl");
const shuffle = document.querySelector(".shuffle");
const deckBack = document.querySelector(".deck");

let boss = "";

let lvl = "";

for (let ancientImg of ancientImgs) {
  ancientImg.onclick = (e) => {
    if (boss != "") {
      document.getElementById(boss).classList.remove("active");
    }
    boss = e.target.id;
    ancientImg.classList.add("active");
    if (lvl != "") {
      shuffle.style.visibility = "visible";
    }
  };
}

for (let diffLvl of diffLvls) {
  diffLvl.onclick = (e) => {
    if (lvl != "") {
      document.getElementById(lvl).classList.remove("active");
    }

    lvl = e.target.id;
    diffLvl.classList.add("active");
    if (boss != "") {
      shuffle.style.visibility = "visible";
    }
  };
}

shuffle.onclick = () => {
  document.querySelector(".deck-container").style.visibility = "visible";
  window.newDeck(boss, lvl);
};
