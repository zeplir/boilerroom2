let answerArr = [0, 1, 4, 0, 0, 2, 2, 1, 2, 1];
let minusCounter = 0;
let currentQuestion = 0;
let totalPoints = 0;
let oldPoints = 0;
let currentPoints = 10;
let countdown = 60;
let countdownInterval;
let numberOfQuestions;
let operator;

let question = document.getElementById('question');
let ansButton1 = document.getElementById('answer-1');
let ansButton2 = document.getElementById('answer-2');
let ansButton3 = document.getElementById('answer-3');
let ansButton4 = document.getElementById('answer-4');
let ansButton5 = document.getElementById('answer-5');
let startButton = document.getElementById('start-button');
let htmlPoints = document.getElementById('points');
let container = document.getElementById('container');
const timer = document.getElementById('timer');

function updatePoints() {
  if (currentQuestion > 0) {
    if (totalPoints > oldPoints) {
      htmlPoints.style.color = 'green';
      operator = '+';
    } else if (totalPoints < oldPoints) {
      htmlPoints.style.color = 'red';
      operator = '';
    } else {
      htmlPoints.style.color = '';
      operator = '';
    }
  } else {
    htmlPoints.style.color = '';
    operator = '';
  }
  htmlPoints.innerText =
    'You have ' +
    totalPoints +
    ' points' +
    ' (' +
    operator +
    (totalPoints - oldPoints) +
    ')';
  oldPoints = totalPoints;
}

startButton.addEventListener('click', () => {
  container.classList.remove('hidden');
  updateQuestion();
  startButton.style.display = 'none';
  startCountdown();
});

function startCountdown() {
  countdown = 60; // Reset the countdown to 60
  timer.style.color = ''; // Reset the timer color
  timer.classList.remove('flash');
  timer.innerText = String(countdown);

  countdownInterval = setInterval(() => {
    countdown--;
    timer.innerText = String(countdown);

    if (countdown <= 50) {
      if (countdown % 10 === 0) {
        currentPoints -= 2;
      }
    }

    if (countdown < 20) {
      timer.style.color = 'red';
      timer.style.fontWeight = 'bold';
      timer.classList.add('flash'); // Add the flash effect when under 20 seconds
    } else {
      timer.classList.remove('flash'); // Remove flash effect if time goes above 20
    }

    if (countdown === 0) {
      clearInterval(countdownInterval);
      console.log("Time's up!");
      nextQuestion(); // Automatically go to the next question if time runs out
    }
  }, 1000);
}

function updateQuestion() {
  fetch('./quiz.json')
    .then((res) => res.json())
    .then((data) => {
      numberOfQuestions = data.length;
      console.log('Number of questions: ' + numberOfQuestions);
      question.textContent = data[currentQuestion].question;
      ansButton1.textContent = data[currentQuestion].answers[0];
      ansButton2.textContent = data[currentQuestion].answers[1];
      ansButton3.textContent = data[currentQuestion].answers[2];
      ansButton4.textContent = data[currentQuestion].answers[3];
      ansButton5.textContent = data[currentQuestion].answers[4];
    });
}

function handleAnswer(button) {
  if (button.value === String(answerArr[currentQuestion])) {
    console.log('Correct guess!');
    nextQuestion(); // Move to the next question if the answer is correct
  } else {
    console.log('Incorrect answer');
    button.style.display = 'none';
    minusCounter++;
  }
}

ansButton1.addEventListener('click', () => handleAnswer(ansButton1));
ansButton2.addEventListener('click', () => handleAnswer(ansButton2));
ansButton3.addEventListener('click', () => handleAnswer(ansButton3));
ansButton4.addEventListener('click', () => handleAnswer(ansButton4));
ansButton5.addEventListener('click', () => handleAnswer(ansButton5));

function nextQuestion() {
  if (currentQuestion <= numberOfQuestions) {
    clearInterval(countdownInterval);

    currentQuestion++;
    ansButton1.style.display = '';
    ansButton2.style.display = '';
    ansButton3.style.display = '';
    ansButton4.style.display = '';
    ansButton5.style.display = '';

    totalPoints += currentPoints + minusCounter * -2;
    console.log('Total points: ' + totalPoints);
    minusCounter = 0;
    updatePoints();
    startCountdown();
    if (currentQuestion >= numberOfQuestions) {
      ansButton1.style.display = 'none';
      ansButton2.style.display = 'none';
      ansButton3.style.display = 'none';
      ansButton4.style.display = 'none';
      ansButton5.style.display = 'none';
      container.innerHTML =
        '<h1>Game over!</h1>' +
        '<p>You got ' +
        totalPoints +
        ' points!</p>' +
        '<button onclick="location.reload()">Play again</button>';
      clearInterval(countdownInterval);
    } else {
      updateQuestion();
    }
  }
}
