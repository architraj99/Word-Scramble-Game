let wordBox = document.querySelector(".word-box");
let guessInput = document.getElementById("guessInput");
let checkBtn = document.getElementById("checkBtn");
let nextBtn = document.getElementById("nextBtn");
let hintBtn = document.getElementById("hintBtn");
let restartBtn = document.getElementById("restartBtn");
let timer = document.getElementById("timer");
let difficulty = document.getElementById("difficulty");
let category = document.getElementById("category");
let message = document.querySelector(".message");
let score = document.querySelector(".score");
let lives = document.querySelector(".lives");
let bestScore = document.querySelector(".best-score");
let hintText = document.querySelector(".hint-text");

let wordCategories = {

    tech: [
        "javascript",
        "computer",
        "browser",
        "developer"
    ],

    gaming: [
        "minecraft",
        "roblox",
        "console",
        "controller"
    ],

    space: [
        "galaxy",
        "planet",
        "rocket",
        "satellite"
    ]
};

let currentWord = "";
let totalScore = 0;
let totalLives = 3;
let best = 0;
let timeLeft = 15;
let countdown;

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

function startTimer() {

    clearInterval(countdown);

    timeLeft = Number(difficulty.value);
    timer.innerText = timeLeft;

    countdown = setInterval(function () {

            if (totalLives <= 0) {

                clearInterval(countdown);
                return;
            }

            timeLeft--;
            timer.innerText = timeLeft;

            if (timeLeft <= 0) {

                clearInterval(countdown);

                if (totalLives > 0) {

                    totalLives--;
                }

                lives.innerText = "Lives: " + totalLives;

                message.innerText = "Time Up!";
                message.style.color = "#ef4444";

                checkGameOver();

                if (totalLives > 0) {

                    loadNewWord();
                }
            }
        }, 1000);
}

function loadNewWord() {

    let selectedCategory = category.value;
    let words = wordCategories[selectedCategory];
    let randomWord = words[Math.floor(Math.random() * words.length) ];

    currentWord = randomWord;
    wordBox.innerText = scrambleWord(randomWord).toUpperCase();
    hintText.innerText = "Hint: " + currentWord.charAt(0).toUpperCase();
    guessInput.value = "";

    startTimer();
}

function updateBestScore() {

    if (best === 0 || totalScore > best) {

        best = totalScore;
        bestScore.innerText = "Best: " + best;
    }
}

function checkGameOver() {

    if (totalLives <= 0) {

        totalLives = 0;

        clearInterval(countdown);
        lives.innerText = "Lives: 0";

        message.innerText = "Game Over!";
        message.style.color = "#ef4444";

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
            message.innerText = "Correct Word!";
            message.style.color = "#22c55e";

            updateBestScore();
            loadNewWord();
        }

        else {

            if (totalLives > 0) {

                totalLives--;
            }

            lives.innerText = "Lives: " + totalLives;
            message.innerText = "Wrong Guess";
            message.style.color = "#ef4444";

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

guessInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            checkBtn.click();
        }
});

restartBtn.addEventListener("click", function() {

    location.reload();   
});

difficulty.addEventListener("change", function() {
    loadNewWord();    
});

category.addEventListener("change", function() {
    loadNewWord();
});