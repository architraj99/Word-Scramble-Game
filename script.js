let wordBox = document.querySelector(".word-box");
let guessInput = document.getElementById("guessInput");
let checkBtn = document.getElementById("checkBtn");
let nextBtn = document.getElementById("nextBtn");
let hintBtn = document.getElementById("hintBtn");
let message = document.querySelector(".message");
let score = document.querySelector(".score");
let lives = document.querySelector(".lives");
let hintText = document.querySelector(".hint-text");

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
let totalScore = 0;
let totalLives = 3;

function scrambleWord(word) {

    let letters = word.split("");

    for (let i = letters.length - 1; i > 0; i--) {

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
    hintText.innerText = "Hint: " + currentWord.charAt(0).toUpperCase();

    guessInput.value = "";
    message.innerText = "Guess the word";
}

loadNewWord();

checkBtn.addEventListener("click", function () {

        let userGuess = guessInput.value.toLowerCase().trim();

        if (!userGuess) {

            message.innerText = "Enter a word";
            return;
        }

        if (userGuess === currentWord) {

            totalScore++;
            score.innerText = "Score: " + totalScore;

            message.innerText = "Correct Word!";
            message.style.color = "#16a34a";

            loadNewWord();
        }

        else {

            totalLives--;

            lives.innerText = "Lives: " + totalLives;
            message.innerText = "Wrong Guess";
            message.style.color = "#dc2626";
        }

        guessInput.value = "";
    }
);

nextBtn.addEventListener("click", function () { 

    loadNewWord();
});

hintBtn.addEventListener("click", function () {

   hintText.innerText = "Hint: Starts with '" + currentWord.charAt(0).toUpperCase() + "'";
});