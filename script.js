let cardContainer = document.getElementsByClassName("💳-📦")[0];
let setUpCall = 0;
let openCard = 0;
let openCardIDs = [];

let setUp = () => {
      let renderImages = [
            {
                  image: "bat",
                  emoji: "🦇",
                  left: 2
            },
            {
                  image: "bones",
                  emoji: "🦴",
                  left: 2
            },
            {
                  image: "cauldron",
                  emoji: "🥣",
                  left: 2
            },
            {
                  image: "dracula",
                  emoji: "🧛🏻‍♂️",
                  left: 2
            },
            {
                  image: "eye",
                  emoji: "👁",
                  left: 2
            },
            {
                  image: "ghost",
                  emoji: "👻",
                  left: 2
            },
            {
                  image: "pumpkin",
                  emoji: "🎃",
                  left: 2
            },
            {
                  image: "skull",
                  emoji: "☠",
                  left: 2
            },
      ];

      for (let i = 0; i < 16; i++) {
            let randomSelector = Math.floor(Math.random() * renderImages.length);
            if (renderImages[randomSelector].left < 1) {
                  while (renderImages[randomSelector].left == 0) {
                        randomSelector = Math.floor(Math.random() * renderImages.length);
                  }
                  renderImages[randomSelector].left -= 1;
            } else if (renderImages[randomSelector].left > 0) {
                  renderImages[randomSelector].left -= 1;
            }
            cardContainer.innerHTML += `
            <div class="💳" id="${i}">
                  <div class="💳-back 💳-face">
                        <img src="./assets/images/cobweb.png" alt="🕸" class="🕸 🕸-top-left">
                        <img src="./assets/images/cobweb.png" alt="🕸" class="🕸 🕸-top-right">
                        <img src="./assets/images/cobweb.png" alt="🕸" class="🕸 🕸-bottom-left">
                        <img src="./assets/images/cobweb.png" alt="🕸" class="🕸 🕸-bottom-right">
                        <img src="./assets/images/spider.png" alt="🕷" class="🕷">
                  </div>
                  <div class="💳-front 💳-face">
                        <img src="./assets/images/cobweb-grey.png" alt="🕸" class="🕸 🕸-top-left">
                        <img src="./assets/images/cobweb-grey.png" alt="🕸" class="🕸 🕸-top-right">
                        <img src="./assets/images/cobweb-grey.png" alt="🕸" class="🕸 🕸-bottom-left">
                        <img src="./assets/images/cobweb-grey.png" alt="🕸" class="🕸 🕸-bottom-right">
                        <img src="./assets/images/game-images/${renderImages[randomSelector].image}.png" alt="${renderImages[randomSelector].emoji}" class="💳-value">
                  </div>
            </div>`;
      }
      let cardBack = document.getElementsByClassName("💳-back");
      let card = document.getElementsByClassName("💳");

      for (let i = 0; i < cardBack.length; i++) {
            cardBack[i].addEventListener("click", () => {
                  if (openCard < 2 && !(cardBack[i].parentElement.classList.contains("visible"))) {
                        cardBack[i].parentElement.classList.add("visible");
                        openCardIDs.push(cardBack[i].parentElement.id);
                        console.log(openCardIDs);
                        openCard++;
                  } else if (openCard == 2) {
                        openCard = 0;
                        for (let i = 0; i < openCardIDs.length; i++) {
                              card[openCardIDs[i]].classList.remove("visible");
                        }
                  };
            });
      }
      setTimeout(() => {
            startTimer();
      }, 700);
};

let timerHTML = document.querySelector("div.time span");

let startTimer = () => {
      setTimeout(() => {
            timerHTML.innerHTML -= 1;
      }, 300);
      let timer = setInterval(() => {
            timerHTML.innerHTML -= 1;
            if (timerHTML.innerHTML == 0) {
                  clearInterval(timer)
                  gameOver();
            } else if (timer.innerHTML <= 10) {

            }
      }, 1000);
};

let startPage = document.getElementsByClassName("start-screen")[0];
startPage.addEventListener("click", () => {
      if (setUpCall < 1) {
            startPage.classList.add("remove");
            setTimeout(() => {
                  startPage.style.display = "none";
            }, 700);
            setUp();
      };
      setUpCall += 1;
});