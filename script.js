let wordBox = document.querySelector(".word-box");
let guessInput = document.getElementById("guessInput");
let checkBtn = document.getElementById("checkBtn");
let nextBtn = document.getElementById("nextBtn");
let message = document.querySelector(".message");
let score = document.querySelector(".score");
let lives = document.querySelector(".lives");

let words = [
    "javascript",
    "computer",
    "internet",
    "keyboard",
    "developer",
    "monitor",
    "browser",
    "gaming"
];

let currentWord = "";

function scrambleWord(word) {
    let letters = word.split("");

    for(let i = letters.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1) );

        let temp = letters[i];
        letters[i] = letters[randomIndex];
        letters[randomIndex] = temp;
    }
    return letters.join("");
}

function loadNewWord() {

    let randomWord = words[Math.floor(Math.random() * words.length) ];
    currentWord = randomWord;

    let scrambled = scrambleWord(randomWord);
    wordBox.innerText = scrambled.toUpperCase();

    guessInput.value = "";
    message.innerText = "Guess the word";
}

loadNewWord();

checkBtn.addEventListener("click", function() {

    let userGuess = guessInput.value.toLowerCase().trim();

    if(!userGuess) {

        message.innerText = "Enter a word";
        return;
    }

    if(userGuess === currentWord) {

        message.innerText = "Correct Guess!"
        message.style.color = "#16a34a";
    }

    else {

        message.innerText = "Wrong Guess";
        message.style.color = "#dc2626";
    }
}
);

nextBtn.addEventListener("click", function() {
    loadNewWord();
});