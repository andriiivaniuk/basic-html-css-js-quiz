const Questions = {
    question1: {text: "What is the capital of Ireland?",
        answers: {rightAnswer: "Dublin", wrongAnswer0: "Madrid", wrongAnswer1: "Oslo"}},
    question2: {text: "What is aproximate distance from Earth to the Moon?",
        answers: {rightAnswer: "384.000 km", wrongAnswer0: "38.000 km", wrongAnswer1: "3.840.000 km"}},
    question3: {text: "hello?",
        answers: {rightAnswer: "no", wrongAnswer0: "yes", wrongAnswer1: "maybe"}},
    question4: {text: "1",
        answers: {rightAnswer: "1", wrongAnswer0: "2", wrongAnswer1: "3"}},
    question5: {text: "1",
        answers: {rightAnswer: "4", wrongAnswer0: "2", wrongAnswer1: "3"}}, 
}

let quizStarted = false;
let curQnum = 1;
let curAnswerInput = "";
const questionAmount = Object.values(Questions).length;
let rightAnswers = 0;
let totalAnswers = 0;
let buttons = document.getElementsByClassName("answer-button");

const startQuiz = () => {
    
    quizStarted = true;

    document.getElementById("start-quiz-button").style.display = "none";
    document.getElementById("check-answer-button").style.display = "block";

    
    for(but of buttons){
        but.style.visibility = "visible";
    }

    updateQuestion();
}

const updateQuestion = () => {

    let AnswersArr = Object.values(Questions["question" + (curQnum)].answers);
    let randArr = [];

    while(randArr.length < 3){
        let rand = Math.floor(Math.random()*3);
        if(!randArr.includes(AnswersArr[rand])){
            randArr.push(AnswersArr[rand]);
        }
    }

    resetButStyle();

    document.getElementById("question-header").textContent = "Question: " + curQnum + " out of " + questionAmount;
    document.getElementById("question-text").textContent = Questions["question" + (curQnum)].text;
    document.getElementById("answer-button1").textContent = randArr[0];
    document.getElementById("answer-button2").textContent = randArr[1];
    document.getElementById("answer-button3").textContent = randArr[2];
    
}

const checkAnswer = () => {

    if (!curAnswerInput) { return; }

    if (curAnswerInput === Questions["question" + (curQnum)].answers.rightAnswer){
        console.log("correct");
        rightAnswers++;
        totalAnswers++;
    } 

    else{
        totalAnswers++;
        console.log("wrong");
    }

    showAnswers();

    document.getElementById("right-anwers").textContent = "Right answers: " + rightAnswers + " out of " + totalAnswers;
    document.getElementById("check-answer-button").style.display = "none";
    document.getElementById("next-question-button").style.display = "block";

}

const inputAnswer = (buttonNum) => {

    for(but of buttons) { but.style.background = "white"; }
    document.getElementById("answer-button" + String(buttonNum)).style.background = "blue";
    curAnswerInput = document.getElementById("answer-button" + buttonNum).textContent;
    
}

const nextQuestion = () => {
    
    if(!quizStarted) {
        console.log("all question looped");
        return;
    }

    curQnum++;
    curAnswerInput = "";

    updateQuestion();
    resetButStyle();

    document.getElementById("next-question-button").style.display = "none";
}

const showAnswers = () => {
    
    for (but of buttons){
        but.disabled = true;
        if (but.textContent === Questions["question" + (curQnum)].answers.rightAnswer){
            but.style.background = "green";
        }
        else{
            but.style.background = "red";
        }
        if(but.textContent === curAnswerInput){
            but.style.border = "3px solid blue";
        }
    }

    if (curQnum === questionAmount){   
        quizStarted = false;
        console.log("quiz ended");
        document.getElementById("next-question-button").textContent = "Quiz ended";
        return;
    }
}

const resetButStyle = () => {
    
    for (but of buttons){
        but.disabled = false;
        but.style.background = "white";
        but.style.border = "none";
    }

    document.getElementById("check-answer-button").style.display = "block";
}