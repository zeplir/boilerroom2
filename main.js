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

const getQuiz = async () => {
    const response = await fetch("quiz.json");
    const data = await response.json();
    return data;

}

let jsonData = getQuiz();

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
    currentQuestion++;
    ansButton1.style.display = "";
    ansButton2.style.display = "";
    ansButton3.style.display = "";
    ansButton4.style.display = "";
    ansButton5.style.display = "";

    totalPoints += currentPoints + (minusCounter * -2);
    console.log("Total points: " + totalPoints);
    minusCounter = 0;

    if(currentQuestion > 9) {
        ansButton1.style.display = "hidden";
        ansButton2.style.display = "hidden";
        ansButton3.style.display = "hidden";
        ansButton4.style.display = "hidden";
        ansButton5.style.display = "hidden";
        console.log("You scored " + totalPoints + " points!");
    }
}