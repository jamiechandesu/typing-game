const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEL = document.getElementById("time");
const endgameEL = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// list of words for game
const words = [
  // "red",
  // "church",
  // "rest",
  // "mighty",
  // "symptomatic",
  // "adhesive",
  // "man",
  // "valuable",
  // "cactus",
  // "good",
  // "willing",
  // "jobless",
  // "swing",
  // "anxious",
  // "flower",
  // "aggressive",
  // "wry",
  // "upbeat",
  // "trick",
  // "illegal",
  // "distinct",
  // "earthy",
  // "direction",
  // "children",
  // "rambunctious",
  // "axiomatic",
  // "parsimonious",
  // "highfalutin",
  // "tremendous",
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty to value in local storage or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// generate random word from array
// function getRandomWord() {
//   return words[Math.floor(Math.random() * words.length)];
// }

//////////////////////////////

// GetRandom Words from API and push to Array
async function getRandomWord() {
  const res = await fetch("https://random-words-api.vercel.app/word");

  const data = await res.json();
  return data[Object.keys(data)[0]].word.toLowerCase();
}

getRandomWord();

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// add word to DOM
// function addWordToDom() {
//   randomWord = getRandomWord();
//   word.innerHTML = randomWord;
// }

// Add Word to DOM
async function addWordToDOM() {
  randomWord = await getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

/////////////////////////////////////////////////////

// update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeEL.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gaverOver();
  }
}

// game over, show end screen
function gaverOver() {
  endgameEL.innerHTML = `
  <h1>time ran out</h1>
  <p>your final score is ${score}</p>
  <button onclick="location.reload()">reload</button>
  `;

  endgameEL.style.display = "flex";
}

getRandomWord();

// event listeners

// typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    getRandomWord();
    updateScore();

    // clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
