let boxes = Array.from(document.querySelectorAll(".box"));
let newGameBtn = document.querySelector(".newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let clicksound = new Audio("assets/mixkit-hard-pop-click-2364.wav");
const randomThemeBtn = document.getElementById("randomThemeBtn");
const closeIcon = document.querySelector("#close-icon");
const hamburgerIcon = document.querySelector("#hamburger");

let turnX = true;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
  });
  msg.classList.add("hide-btn");
  turnX = true;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;
    clicksound.currentTime = 0;
    clicksound.play();

    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.style.pointerEvents = "none";
    checkWinner();
  });
});

const shakeBox = (box) => {
  box.classList.add("shake");
  setTimeout(() => {
    box.classList.remove("shake");
  }, 500);
};

const showwinner = (winner) => {
  msg.innerText = `${winner} is the winner`;
  msg.classList.remove("hide-btn");
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
};

const checkWinner = () => {
  for (let pattern of winpatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
      showwinner(pos1val);
      return;
    }
  }

  if (boxes.every((box) => box.innerText !== "")) {
    msg.innerText = "It's a Draw!";
    msg.classList.remove("hide-btn");
  }
};

const themeBtns = document.querySelectorAll(".theme-btn");

themeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedTheme = btn.dataset.theme;
    const themePath =
      selectedTheme === "default" ? "style.css" : `themes/${selectedTheme}.css`;

    document.getElementById("theme-style").href = themePath;
    localStorage.setItem("theme", selectedTheme);
  }); 
});


const themesElements = Array.from(document.getElementsByClassName("theme-btn"));
const themes = themesElements.map(theme => theme.getAttribute("data-theme"));
const themeList = (themes);

randomThemeBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * themeList.length);
  const selectedTheme = themeList[randomIndex];

  const themePath =
    selectedTheme === "default" ? "style.css" : `themes/${selectedTheme}.css`;

  document.getElementById("theme-style").href = themePath;
  localStorage.setItem("theme", selectedTheme);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "default";
  const themePath =
    savedTheme === "default" ? "style.css" : `themes/${savedTheme}.css`;

  document.getElementById("theme-style").href = themePath;
});

hamburgerIcon.addEventListener("click", () => {
  document.querySelector(".theme-menu").style.left = "0";
  hamburgerIcon.style.transform = "rotate(90deg)";
  hamburgerIcon.style.position = "absolute";
  hamburgerIcon.style.display = "none";
});

closeIcon.addEventListener("click", () => {
  document.querySelector(".theme-menu").style.left = "-1500%";
  hamburgerIcon.style.transform = "rotate(0deg)";
  
  hamburgerIcon.style.display = "block";
});

newGameBtn.addEventListener("click", resetGame);
