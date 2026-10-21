const questions = [
{
question: "Which language creates the structure of a website?",
answers: ["Python", "HTML", "CSS", "Java"],
correct: 1
},
{
question: "Which language styles a website?",
answers: ["CSS", "HTML", "SQL", "Python"],
correct: 0
},
{
question: "Which language makes a website interactive?",
answers: ["HTML", "CSS", "JavaScript", "XML"],
correct: 2
},
{
question: "What does CPU stand for?",
answers: [
"Central Processing Unit",
"Computer Power Utility",
"Central Program User",
"Control Processing User"
],
correct: 0
},
{
question: "Which symbol starts a single-line comment in JavaScript?",
answers: ["##", "//", "<!--", "**"],
correct: 1
},
{
question: "Which of these is a programming language?",
answers: ["HTML", "CSS", "Python", "HTTP"],
correct: 2
},
{
question: "Which device moves the pointer on a computer?",
answers: ["Printer", "Mouse", "Speaker", "Microphone"],
correct: 1
},
{
question: "What does RAM store while a computer is working?",
answers: [
"Temporary working data",
"Printed documents",
"Keyboard buttons",
"Computer sounds only"
],
correct: 0
},
{
question: "Which HTML tag creates a hyperlink?",
answers: ["<p>", "<h1>", "<a>", "<img>"],
correct: 2
},
{
question: "Which company develops Windows?",
answers: ["Google", "Microsoft", "Apple", "Samsung"],
correct: 1
}
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const progressElement = document.getElementById("progress");
const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

function showQuestion() {
answered = false;

const q = questions[currentQuestion];

questionElement.textContent = q.question;

questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

scoreElement.textContent = `Score: ${score}`;
feedbackElement.textContent = "";
answersElement.innerHTML = "";

nextButton.disabled = true;
nextButton.textContent =
    currentQuestion === questions.length - 1
        ? "See My Results 🏆"
        : "Next Question ➜";

progressElement.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

q.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;
    button.className = "answer-button";

    button.addEventListener("click", () => {
        selectAnswer(index);
    });

    answersElement.appendChild(button);
});

}

function selectAnswer(selectedIndex) {
if (answered) return;

answered = true;

const q = questions[currentQuestion];
const buttons = answersElement.querySelectorAll("button");

buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.correct) {
        button.classList.add("correct");
    }
});

if (selectedIndex === q.correct) {
    score++;
    feedbackElement.textContent = "✅ Correct! Great job!";
} else {
    buttons[selectedIndex].classList.add("wrong");

    feedbackElement.textContent =
        `❌ Not quite! The correct answer is ${q.answers[q.correct]}.`;
}

scoreElement.textContent = `Score: ${score}`;
nextButton.disabled = false;

progressElement.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

}

function nextQuestion() {
if (!answered) return;

currentQuestion++;

if (currentQuestion < questions.length) {
    showQuestion();
} else {
    showResults();
}

}

function showResults() {
questionElement.classList.add("hidden");
answersElement.classList.add("hidden");
feedbackElement.classList.add("hidden");
nextButton.classList.add("hidden");

document.querySelector(".game-info").classList.add("hidden");
document.querySelector(".progress-bar").classList.add("hidden");

resultElement.classList.remove("hidden");

const percentage = Math.round(
    (score / questions.length) * 100
);

finalScoreElement.textContent =
    `You scored ${score} out of ${questions.length} (${percentage}%)!`;

}

function restartGame() {
currentQuestion = 0;
score = 0;
answered = false;

questionElement.classList.remove("hidden");
answersElement.classList.remove("hidden");
feedbackElement.classList.remove("hidden");
nextButton.classList.remove("hidden");

document.querySelector(".game-info").classList.remove("hidden");
document.querySelector(".progress-bar").classList.remove("hidden");

resultElement.classList.add("hidden");

showQuestion();

}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartGame);

showQuestion();