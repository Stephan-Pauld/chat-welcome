const chatters = {};
const queuedShoutOuts = [];
const queuedCards = [];
const ignoreUsers = ["nightbot"];
let looping = false;
let showingCards =  false

class Player {
  constructor(
      username, xp, img,
      follage, timeWatched, emotesUsed,
      messagesSent, lifeTimeTickets, lifeTimeCurrency){
          this.username = username
          this.xp = xp
          this.img = img
          this.follage = follage
          this.timeWatched = timeWatched
          this.emotesUsed = emotesUsed
          this.messagesSent = messagesSent
          this.lifeTimeCurrency = lifeTimeCurrency
          this.lifeTimeTickets = lifeTimeTickets
          this.lifeTimeCurrency = lifeTimeCurrency
  }
}

let suphasis166 = new Player("suphasis166", 234534, "https://static-cdn.jtvnw.net/jtv_user_pictures/9a1203f20c417a69-profile_image-70x70.jpeg", 32456, 34562, 345345, 3456354, 346, 345345345345)
let swftdev = new Player("swftdev", 234534, "https://static-cdn.jtvnw.net/jtv_user_pictures/9a1203f20c417a69-profile_image-70x70.jpeg", 32456, 34562, 345345, 3456354, 346, 345345345345)

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(user);
  if (flags.broadcaster && command === "settext") {
    // console.log( "!test was typed in chat" );
    changeText(message);
  }
  if (flags.broadcaster && command === "clear") {
    // console.log( "!test was typed in chat" );
    clear(message);
  }
  if(command === 'stats' && Object.keys(playerCards).includes(user)) {
    console.log("PLAYER CARD FOUND");
    showCards(user)
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {
  if (!chatters[user] && !ignoreUsers.includes(user.toLowerCase())) {
    chatters[user] = { hasChatted: true, hasShouted: false };
    console.log("adding ", user);
    if (!chatters[user].hasShouted) {
      console.log("We Are Shouting Out ", user);
      queuedShoutOuts.push(user);
    }
  }

  if (queuedShoutOuts.length && !looping) {
    console.log("we have length");
    shoutOut();
  }

};
ComfyJS.Init("abootgaming");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


const showCards = user => {
  showingCards = true
  document.querySelector('#title-name').innerText = user
  document.querySelector('#player-name').innerText = user
}


const shoutOut = async () => {
  looping = true;
  const welcome = document.createElement("h1");
  const container = document.querySelector(".container");

  while (queuedShoutOuts.length) {
    welcome.classList.add("title");
    welcome.innerText = `${queuedShoutOuts[0]} welcome to the stream`;
    container.appendChild(welcome);
    await sleep(5000);
    queuedShoutOuts.shift();
    container.removeChild(welcome);
    console.log(queuedShoutOuts);
  }
  looping = false;
};

const clear = () => {
  document.querySelector(".cats").innerHTML = " ";
};
const changeText = (text) => {
  document.querySelector(".cats").innerHTML = text;
};
