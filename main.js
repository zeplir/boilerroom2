let answerArr = [0, 1, 4, 0, 0, 2, 2, 1, 2, 1];
let minusCounter = 0;
let currentQuestion = 0;
let totalPoints = 0;
let currentPoints = 10;

let question = document.getElementById("question");
let ansButton1 = document.getElementById("answer-1");
let ansButton2 = document.getElementById("answer-2");
let ansButton3 = document.getElementById("answer-3");
let ansButton4 = document.getElementById("answer-4");
let ansButton5 = document.getElementById("answer-5");
let startButton = document.getElementById("start-button");
let htmlPoints = document.getElementById("points");
let container = document.getElementById("container");

function updatePoints() {
    htmlPoints.innerHTML = "You have " + totalPoints + " points";
}

startButton.addEventListener("click", () => {
    container.classList.remove("hidden");
    updateQuestion();
    startButton.style.display = "none";
});

function updateQuestion() {
    fetch('./quiz.json')
    .then(res => res.json())
    .then(data => {
        question.innerHTML = data[currentQuestion].question;
        ansButton1.innerHTML = data[currentQuestion].answers[0];
        ansButton2.innerHTML = data[currentQuestion].answers[1];
        ansButton3.innerHTML = data[currentQuestion].answers[2];
        ansButton4.innerHTML = data[currentQuestion].answers[3];
        ansButton5.innerHTML = data[currentQuestion].answers[4];
});

}

ansButton1.addEventListener("click", () => {
    if(ansButton1.value == answerArr[currentQuestion]) {
        console.log("correct guess!");
        nextQuestion()
    } else {
        console.log("incorrect answer");
        ansButton1.style.display = "none";
        minusCounter++;
    }
})

ansButton2.addEventListener("click", () => {
    if(ansButton2.value == answerArr[currentQuestion]) {
        console.log("correct guess!");
        nextQuestion()
    } else {
        console.log("incorrect answer");
        ansButton2.style.display = "none";
        minusCounter++;
    }
})

ansButton3.addEventListener("click", () => {
    if(ansButton3.value == answerArr[currentQuestion]) {
        console.log("correct guess!");
        nextQuestion()
    } else {
        console.log("incorrect answer");
        ansButton3.style.display = "none";
        minusCounter++;
    }
})

ansButton4.addEventListener("click", () => {
    if(ansButton4.value == answerArr[currentQuestion]) {
        console.log("correct guess!");
        nextQuestion()
    } else {
        console.log("incorrect answer");
        ansButton4.style.display = "none";
        minusCounter++;
    }
})

ansButton5.addEventListener("click", () => {
    if(ansButton5.value == answerArr[currentQuestion]) {
        console.log("correct guess!");
        nextQuestion()
    } else {
        console.log("incorrect answer");
        ansButton5.style.display = "none";
        minusCounter++;
    }
})

function nextQuestion() {
    updateQuestion();
    currentQuestion++;
    ansButton1.style.display = "";
    ansButton2.style.display = "";
    ansButton3.style.display = "";
    ansButton4.style.display = "";
    ansButton5.style.display = "";

    totalPoints += currentPoints + (minusCounter * -2);
    console.log("Total points: " + totalPoints);
    minusCounter = 0;
    updatePoints();

    if(currentQuestion > 9) {
        ansButton1.style.display = "none";
        ansButton2.style.display = "none";
        ansButton3.style.display = "none";
        ansButton4.style.display = "none";
        ansButton5.style.display = "none";
        console.log("You scored " + totalPoints + " points!");
    }
}