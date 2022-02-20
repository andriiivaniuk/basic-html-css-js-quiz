const Questions = {
    question1: {text: "What is the capital of Ireland?",
        answers: {rightAnswer: "Dublin", wrongAnswer0: "Madrid", wrongAnswer1: "Oslo"}},
    question2: {text: "What is aproximate distance from Earth to the Moon?",
        answers: {rightAnswer: "384.000 km", wrongAnswer0: "38.000 km", wrongAnswer1: "3.840.000 km"}},
    question3: {text: "What was the name of secret society whose member killed Franz Ferdinand?",
        answers: {rightAnswer: "Black Hand", wrongAnswer0: "Yellow Stone", wrongAnswer1: "White Bird"}},
    question4: {text: "How many years old was Jesus when he was crusified?",
        answers: {rightAnswer: "33", wrongAnswer0: "22", wrongAnswer1: "44"}},
    question5: {text: "Which animal's head does Hindu God of knowledge - Ganesha, has instead of human's head?",
        answers: {rightAnswer: "elephant", wrongAnswer0: "owl", wrongAnswer1: "eagle"}}, 
}

const formQuestionsSet = (amount) => {

    if(amount > questionAmount){
        throw(RangeError("this amount of questions is bigger than possible questions"))
    }
    
    let questionsFiltered = {};

    while(Object.values(questionsFiltered).length < amount){
        let rand = Math.floor(Math.random() * questionAmount+1);
        if(!questionsFiltered.hasOwnProperty(Questions["question" + rand])){
            questionsFiltered["question" + rand] = Questions["question" + rand];
        }
    }

    return questionsFiltered;
}

let quizStarted = false;
let curQnum = 1;
let curAnswerInput = "";
let currentCorrectAnswer = "";
const questionAmount = Object.values(Questions).length;
const finalQuestionAmount = Number(prompt("how many questions?"));
const finalQuestionsSet = formQuestionsSet(finalQuestionAmount);
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

    let currentQuestion = Object.values(finalQuestionsSet);
    currentQuestion = currentQuestion[curQnum-1];
    currentCorrectAnswer = currentQuestion.answers.rightAnswer;

    let AnswersArr = Object.values(currentQuestion.answers);
    
    let randArr = [];

    while(randArr.length < 3){
        let rand = Math.floor(Math.random()*3);
        if(!randArr.includes(AnswersArr[rand])){
            randArr.push(AnswersArr[rand]);
        }
    }

    resetButStyle();

    document.getElementById("question-header").textContent = "Question: " + curQnum + " out of " + finalQuestionAmount;
    document.getElementById("question-text").textContent = currentQuestion.text;
    document.getElementById("answer-button1").textContent = randArr[0];
    document.getElementById("answer-button2").textContent = randArr[1];
    document.getElementById("answer-button3").textContent = randArr[2];
    
}

const checkAnswer = () => {

    if (!curAnswerInput) { return; }

    if (curAnswerInput === currentCorrectAnswer){
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
    currentCorrectAnswer = "";

    updateQuestion();
    resetButStyle();

    document.getElementById("next-question-button").style.display = "none";
}

const showAnswers = () => {
    
    for (but of buttons){
        but.disabled = true;
        if (but.textContent === currentCorrectAnswer){
            but.style.background = "green";
        }
        else{
            but.style.background = "red";
        }
        if(but.textContent === curAnswerInput){
            but.style.border = "3px solid blue";
        }
    }

    if (curQnum === finalQuestionAmount){   
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

