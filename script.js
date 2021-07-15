let card = document.getElementsByClassName("💳");

for (let i = 0; i < card.length; i++) {
      card[i].addEventListener("click", () => {
            card[i].classList.toggle("visible");
      });
}
