
const questions = [
    {
        q: "What is 1 + 2?",
        options: ["1", "2", "3", "4"],
        answer: "3"
    },
    {
        q: "What is 5 - 3?",
        options: ["1", "2", "3", "4"],
        answer: "2"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let userAnswers = [];

document.getElementById("startBtn").onclick = startQuiz;

function startQuiz() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    resetTimer();
    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(opt => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(opt);
        optionsDiv.appendChild(btn);
    });

    document.getElementById("nextBtn").style.display =
        currentQuestion === questions.length - 1 ? "none" : "block";

    document.getElementById("submitBtn").classList.toggle(
        "hidden",
        currentQuestion !== questions.length - 1
    );
}

function selectAnswer(option) {
    userAnswers[currentQuestion] = option;
}

document.getElementById("nextBtn").onclick = () => {
    currentQuestion++;
    loadQuestion();
};

document.getElementById("submitBtn").onclick = showResult;

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function showResult() {
    clearInterval(timer);
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
    });

    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("score").innerText = `Score: ${score}/${questions.length}`;
    document.getElementById("correct").innerText = `Correct: ${score}`;
    document.getElementById("incorrect").innerText =
        `Incorrect: ${questions.length - score}`;
}
