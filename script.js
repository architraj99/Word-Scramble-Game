let wordBox = document.querySelector(".word-box");
let guessInput = document.getElementById("guessInput");
let checkBtn = document.getElementById("checkBtn");
let nextBtn = document.getElementById("nextBtn");
let hintBtn = document.getElementById("hintBtn");
let restartBtn = document.getElementById("restartBtn");
let timer = document.getElementById("timer");
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
let timeLeft = 20;
let countdown;

function scrambleWord(word) {

    let letters = word.split("");

    for ( let i = letters.length - 1; i > 0; i--) {

        let randomIndex = Math.floor(Math.random() * (i + 1) );

        let temp = letters[i];
        letters[i] = letters[randomIndex];
        letters[randomIndex] = temp;
    }

    return letters.join("");
}

function startTimer() {

    clearInterval(countdown);

    timeLeft = 20;
    timer.innerText = timeLeft;

    countdown = setInterval(function () {

            timeLeft--;
            timer.innerText = timeLeft;

            if (timeLeft <= 0) {

                clearInterval(countdown);

                totalLives--;
                lives.innerText = "Lives: " + totalLives;
                message.innerText = "Time Up!";
                message.style.color = "#dc2626";

                checkGameOver();
                loadNewWord();
            }
        }, 1000);
}

function loadNewWord() {

    let randomWord = words[Math.floor(Math.random() * words.length) ];

    currentWord = randomWord;
    let scrambled = scrambleWord(randomWord);

    wordBox.innerText = scrambled.toUpperCase();
    hintText.innerText = "Hint: " + currentWord.charAt(0).toUpperCase();

    guessInput.value = "";
    startTimer();
}

function checkGameOver() {

    if (totalLives <= 0) {

        message.innerText = "Game Over";
        message.style.color = "#dc2626";

        checkBtn.disabled = true;
        nextBtn.disabled = true;
        hintBtn.disabled = true;
        guessInput.disabled = true;
        restartBtn.style.display = "block";
    }

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

            message.innerText = "Correct Guess!";
            message.style.color = "#16a34a";

            loadNewWord();
        }

        else {

            totalLives--;

            lives.innerText = "Lives: " + totalLives;
            message.innerText = "Wrong Guess";
            message.style.color = "#dc2626";

            checkGameOver();
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

restartBtn.addEventListener("click", function () {
    
    location.reload();
}); 