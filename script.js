let cardContainer = document.getElementsByClassName("ðģ-ðĶ")[0];
let moveHTML = document.querySelector(".moves > span");
let creepy = new Audio("./assets/audio/creepy.mp3");
let setUpCall = 0;
let openCard = 0;
let openCardIDs = [];
let timer;

let setUp = () => {
      let renderImages = [
            {
                  image: "bat",
                  emoji: "ðĶ",
                  left: 2
            },
            {
                  image: "bones",
                  emoji: "ðĶī",
                  left: 2
            },
            {
                  image: "cauldron",
                  emoji: "ðĨĢ",
                  left: 2
            },
            {
                  image: "dracula",
                  emoji: "ð§ðŧââïļ",
                  left: 2
            },
            {
                  image: "eye",
                  emoji: "ð",
                  left: 2
            },
            {
                  image: "ghost",
                  emoji: "ðŧ",
                  left: 2
            },
            {
                  image: "pumpkin",
                  emoji: "ð",
                  left: 2
            },
            {
                  image: "skull",
                  emoji: "â ",
                  left: 2
            }
      ];

      for (let i = 0; i < renderImages.length * 2; i++) {
            let randomSelector = Math.floor(Math.random() * renderImages.length);
            if (renderImages[randomSelector].left < 1) {
                  while (renderImages[randomSelector].left == 0) {
                        randomSelector = Math.floor(Math.random() * renderImages.length);
                  };
                  renderImages[randomSelector].left -= 1;
            } else if (renderImages[randomSelector].left > 0) {
                  renderImages[randomSelector].left -= 1;
            };
            cardContainer.innerHTML += `
            <div class="ðģ" id="${i}">
                  <div class="ðģ-back ðģ-face">
                        <img src="./assets/images/cobweb.png" alt="ðļ" class="ðļ ðļ-top-left">
                        <img src="./assets/images/cobweb.png" alt="ðļ" class="ðļ ðļ-top-right">
                        <img src="./assets/images/cobweb.png" alt="ðļ" class="ðļ ðļ-bottom-left">
                        <img src="./assets/images/cobweb.png" alt="ðļ" class="ðļ ðļ-bottom-right">
                        <img src="./assets/images/spider.png" alt="ð·" class="ð·">
                  </div>
                  <div class="ðģ-front ðģ-face">
                        <img src="./assets/images/cobweb-grey.png" alt="ðļ" class="ðļ ðļ-top-left">
                        <img src="./assets/images/cobweb-grey.png" alt="ðļ" class="ðļ ðļ-top-right">
                        <img src="./assets/images/cobweb-grey.png" alt="ðļ" class="ðļ ðļ-bottom-left">
                        <img src="./assets/images/cobweb-grey.png" alt="ðļ" class="ðļ ðļ-bottom-right">
                        <img src="./assets/images/game-images/${renderImages[randomSelector].image}.png" alt="${renderImages[randomSelector].emoji}" class="ðģ-value">
                  </div>
            </div>`;
      };
      let card = document.getElementsByClassName("ðģ");
      let cardBack = document.getElementsByClassName("ðģ-back");
      let cardValue = document.getElementsByClassName("ðģ-value");
      let cardMatched = document.getElementsByClassName("matched");

      for (let i = 0; i < cardBack.length; i++) {
            cardBack[i].addEventListener("click", () => {
                  let flip = new Audio("./assets/audio/flip.wav");
                  flip.play();
                  if (openCard < 2 && !(cardBack[i].parentElement.classList.contains("visible"))) {
                        cardBack[i].parentElement.classList.add("visible");
                        openCardIDs.push(cardBack[i].parentElement.id);
                        openCard++;
                        if (openCard == 2) {
                              moveHTML.innerHTML++;
                              openCard = 0;
                              if (cardValue[openCardIDs[0]].getAttribute("src") == cardValue[openCardIDs[1]].getAttribute("src")) {
                                    let match = new Audio("./assets/audio/match.wav");
                                    for (let i = 0; i < openCardIDs.length; i++) {
                                          card[openCardIDs[i]].classList.add("matched");
                                          setTimeout(() => {
                                                match.play();
                                          }, 100);
                                    };
                                    if (cardMatched.length == renderImages.length * 2) {
                                          gameWon();
                                    };
                                    openCardIDs = [];
                              } else if (!(cardValue[openCardIDs[0]].getAttribute("src") == cardValue[openCardIDs[1]].getAttribute("src"))) {
                                    setTimeout(() => {
                                          for (let i = 0; i < openCardIDs.length; i++) {
                                                card[openCardIDs[i]].classList.remove("visible");
                                          };
                                          openCardIDs = [];
                                    }, 700);
                              }
                        };
                  };
            });
      };
      setTimeout(() => {
            startTimer();
      }, 700);
};

let timerHTML = document.querySelector("div.time span");

let startTimer = () => {
      setTimeout(() => {
            timerHTML.innerHTML -= 1;
      }, 300);
      timer = setInterval(() => {
            timerHTML.innerHTML -= 1;
            if (timerHTML.innerHTML == 10) {
                  timerHTML.classList.toggle("less");
            } else if (timerHTML.innerHTML == 0) {
                  clearInterval(timer);
                  gameOver();
            }
      }, 1000);
};

let startPage = document.getElementsByClassName("start-screen")[0];
startPage.addEventListener("click", () => {
      creepy.play();
      setInterval(() => {
            creepy.play();
      }, 216000);
      if (setUpCall < 1) {
            startPage.classList.add("remove");
            setTimeout(() => {
                  startPage.style.display = "none";
            }, 700);
            setUp();
      };
      setUpCall++;
});

let victoryScreen = document.getElementsByClassName("victory-screen")[0];
let timeTaken = document.querySelector(".time-left > span");
let movesTaken = document.querySelector(".moves-taken > span");
let gameWon = () => {
      let victory = new Audio("./assets/audio/victory.wav");
      victory.play();
      victoryScreen.style.display = "flex";
      victoryScreen.classList.remove("remove");
      timeTaken.innerHTML = 100 - timerHTML.innerHTML;
      movesTaken.innerHTML = moveHTML.innerHTML;
      timerHTML.classList.remove("less");
      clearInterval(timer);
      setUpCall = 0;
      setTimeout(() => {
            victoryScreen.style.opacity = 1;
      }, 200);
}

victoryScreen.addEventListener("click", () => {
      if (setUpCall < 1) {
            victoryScreen.classList.add("remove");
            setTimeout(() => {
                  victoryScreen.style.display = "none";
            }, 700);
            timerHTML.innerHTML = 100;
            cardContainer.innerHTML = "";
            moveHTML.innerHTML = 0;
            setUp();
      };
      setUpCall++;
});

let loseScreen = document.getElementsByClassName("lose-screen")[0];
let gameOver = () => {
      let gameOver = new Audio("./assets/audio/game-over.wav");
      gameOver.play();
      loseScreen.style.display = "flex";
      loseScreen.classList.remove("remove");
      timerHTML.classList.remove("less");
      setUpCall = 0;
      setTimeout(() => {
            loseScreen.style.opacity = 1;
      }, 200);
}

loseScreen.addEventListener("click", () => {
      if (setUpCall < 1) {
            loseScreen.classList.add("remove");
            setTimeout(() => {
                  loseScreen.style.display = "none";
            }, 700);
            timerHTML.innerHTML = 100;
            cardContainer.innerHTML = "";
            moveHTML.innerHTML = 0;
            setUp();
      };
      setUpCall++;
});