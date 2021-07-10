const phrase = "Ness Loves Man Farts";
let allowGuess = true;

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (command === "guess" && allowGuess) {
    allowGuess = false;
    guessLetters(message.toLowerCase());
    guessCoolDown()
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {};
ComfyJS.Init("abootgaming");

const guessLetters = (guess) => {
  const allLetters = document.querySelectorAll(".letter");

  allLetters.forEach((letter) => {
    if (guess === letter.innerText.toLowerCase()) {
      console.log(letter);
      letter.style.opacity = 100;
    }
  });
};

const guessCoolDown = () => {
  setTimeout(() => {
    allowGuess = true;
  }, 10000);
}
const createDashes = () => {
  const container = document.querySelector(".phrase-container");

  let wordContainer = document.createElement("DIV");
  wordContainer.classList.add("word");
  container.appendChild(wordContainer);

  [...phrase].forEach((letter) => {
    if (letter === " ") {
      let spacer = document.createElement("DIV");
      spacer.classList.add("space");
      container.appendChild(spacer);

      wordContainer = document.createElement("DIV");
      wordContainer.classList.add("word");
      container.appendChild(wordContainer);
    } else {
      let underLine = document.createElement("DIV");
      underLine.classList.add("underline");

      let newDiv = document.createElement("DIV");
      newDiv.classList.add("letter");

      wordContainer.appendChild(underLine);
      underLine.appendChild(newDiv).innerText = letter;
    }
  });
};
createDashes();
