const participants = ["suph"];
let created = false;

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (command === "carryme") {
    if (!participants.includes(user)) {
      participants.push(user);
    }
    if (!created) {
      createOverlay();
      created = true;
      return;
    }
    changeText();
  }
  if (command === "carrydone" && user === "AbootGaming") {
    participants.shift();
    participants.length ? changeText() : document.querySelector(".queue-container").remove(),created = false;

  }
};
ComfyJS.onChat = (user, message, flags, self, extra) => {};
ComfyJS.Init("abootgaming");

const changeText = () => {
  document.querySelector(".total-players").innerText = `Players In Queue: ${
    participants.length - 1
  }`;
  document.querySelector(
    ".current-player"
  ).innerText = `Current Player: ${participants[0]}`;
  if (participants[1]) {
    document.querySelector(
      ".next-player"
    ).innerText = `Next Player: ${participants[1]}`;
  } else {
    document.querySelector(".next-player").innerText = `Next Player: <Open>`;
  }
};

const createOverlay = () => {
  const body = document.querySelector("body");

  const container = document.createElement("DIV");
  body.appendChild(container);
  container.classList.add("queue-background");
  container.classList.add("queue-container");

  let title = document.createElement("H2");
  container.appendChild(title);
  title.innerText = "Dungeon Queue";

  let queueStats = document.createElement("DIV");
  container.appendChild(queueStats);
  queueStats.classList.add("queue-status");

  let playersInQueue = document.createElement("DIV");
  let currentPlayer = document.createElement("DIV");
  let nextPlayer = document.createElement("DIV");
  playersInQueue.classList.add("total-players");
  currentPlayer.classList.add("current-player");
  nextPlayer.classList.add("next-player");

  queueStats.appendChild(playersInQueue);
  queueStats.appendChild(currentPlayer);
  queueStats.appendChild(nextPlayer);

  playersInQueue.innerText = `Players In Queue: ${participants.length - 1}`;
  currentPlayer.innerText = `Current Player: ${participants[0]}`;
  if (participants[1]) {
    nextPlayer.innerText = `Next Player: ${participants[1]}`;
  } else {
    nextPlayer.innerText = `Next Player: <open>`;
  }
};
