// Question Bank
const questions = {
    easy: [
        {q:"2 + 2 = ?", options:["3","4","5"], answer:1},
        {q:"5 - 3 = ?", options:["1","2","3"], answer:1},
        {q:"3 + 1 = ?", options:["2","4","5"], answer:1}
    ],

    medium: [
        {q:"6 x 2 = ?", options:["10","12","14"], answer:1},
        {q:"9 ÷ 3 = ?", options:["2","3","4"], answer:1},
        {q:"15 - 5 = ?", options:["8","10","12"], answer:1}
    ],

    hard: [
        {q:"12 ÷ 4 = ?", options:["2","3","4"], answer:1},
        {q:"25 x 2 = ?", options:["40","45","50"], answer:2},
        {q:"18 - 9 = ?", options:["7","8","9"], answer:2}
    ]
};

let selected = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 10;
let timeData = [];
let answered = false;

// Start Quiz
function startQuiz(){
    const diff = document.getElementById("difficulty").value;
    selected = questions[diff];

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    loadQuestion();
}

// Load Question
function loadQuestion(){
    answered = false;
    clearInterval(timer);

    timeLeft = 10;
    document.getElementById("timer").innerText = timeLeft;

    const q = selected[current];
    document.getElementById("question").innerText = q.q;

    const optDiv = document.getElementById("options");
    optDiv.innerHTML = "";

    q.options.forEach((opt,i)=>{
        const btn = document.createElement("button");
        btn.innerText = opt;

        btn.onclick = ()=>{
            if(!answered){
                answered = true;

                if(i === q.answer){
                    score++;
                }
            }
        };

        optDiv.appendChild(btn);
    });

    startTimer();
}

// Timer
function startTimer(){
    let spent = 0;

    timer = setInterval(()=>{
        timeLeft--;
        spent++;

        document.getElementById("timer").innerText = timeLeft;

        if(timeLeft === 0){
            timeData.push(spent);
            nextQuestion();
        }
    },1000);
}

// Next Question
function nextQuestion(){
    clearInterval(timer);
    current++;

    if(current < selected.length){
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults(){
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    let total = selected.length;
    let wrong = total - score;
    let percent = (score/total)*100;

    document.getElementById("score").innerText =
        `Score: ${score} / ${total}`;

    document.getElementById("performance").innerText =
        `Performance: ${percent.toFixed(1)}%`;

    // Chart
    new Chart(document.getElementById("chart"),{
        type:'doughnut',
        data:{
            labels:["Correct","Wrong"],
            datasets:[{
                data:[score, wrong]
            }]
        }
    });
}

