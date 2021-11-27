
var qBody = document.querySelector(".container");
var qQuestion = document.getElementById("question");
var qHeading = document.getElementById("quiz-heading")
var startQuizButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container")
var answerContainer = document.getElementById("possible-answers")
var quizHeading = document.getElementById("quiz-heading")
var promptText = document.getElementById("prompt-text")
var answerAlert = document.getElementById("answer-alert")

let randomQuestions, currentQuestion

  //quiz start button
var startQuiz = function (event) {
  event.preventDefault();
  console.log("Quiz Start!");
  
  //make changes to dom for quiz display
  startQuizButton.remove();
  questionContainer.classList.remove('hide')
  promptText.classList.add('hide')
  quizHeading.classList.add('hide')

  // shuffle questions
  randomQuestions = questions.sort(() => Math.random() - .5);
  currentQuestion = 0;

  //ask question
  
  askQuestion ();
}

function clearQuiz () {
  
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild)
  }
  return;
}

function askQuestion () {
  clearQuiz ()
  showQuestion(randomQuestions[currentQuestion])
}

function showQuestion (question) {
  qQuestion.innerText = question.question;
  question.answers.forEach(answer => {
    var answerButton = document.createElement("button")
    answerButton.innerText = answer.text
    answerButton.classList.add("btn")
    if(answer.correct) {
      answerButton.dataset.correct = answer.correct
    }

    answerContainer.appendChild(answerButton)
    answerButton.addEventListener("click", answerFunction)
  })

}

var answerFunction = function (event) {

  //get answer
  var correctAnswer = "true";
  var userAnswer = event.target.dataset.correct;

  if (correctAnswer == userAnswer) {
      answerAlert.innerHTML = "<h3 class='task-name'>Correct!</h3>";
      qBody.appendChild(answerAlert);
  } else {
      answerAlert.innerHTML = "<h3 class='task-name'>Wrong!</h3>";
      qBody.appendChild(answerAlert);
  }
  currentQuestion++;
  //if questions remain ask question
  if (currentQuestion < questions.length) {
  askQuestion();
  //else go to highscore screen
  } else {
  submitScore()
  }
}

var submitScore = function (){

   // remove elements
  clearQuiz();
  answerAlert.remove();
  qQuestion.remove();


  quizHeading.classList.remove('hide')
  quizHeading.innerText = "All done!"
  promptText.classList.remove('hide')
  promptText.innerHTML = "Your final score is:";
  promptText.style.textAlign = "left";
  qBody.style.justifyContent = "left";
  
  qBody.appendChild(promptText);

  var userInitialsForm = document.createElement ("form");
    userInitialsForm.id = "user-initials-form";
    userInitialsForm.innerHTML = "<p> Enter initials: </p><input type='text' name='user-name' placeholder='Enter Initials' />"
    qBody.appendChild(userInitialsForm);
  

  var userSubmit = document.createElement ("div")
    userSubmit.className = "button-container"
    userSubmit.innerHTML = "<button class='submit-btn' id='submit-score'>Submit</button>"
    userInitialsForm.appendChild(userSubmit);
    submitButton = document.getElementById("submit-score")

  submitButton.addEventListener("click", highScoreScreen)
}

var highScoreScreen = function (event) {
  event.preventDefault();
  //remove submission form elements
  promptText.classList.add('hide')
  var submitForm = document.getElementById("user-initials-form")
  submitForm.remove();
  
  //add highscore screen elements
  quizHeading.innerText = "High scores"

  var goBackButton = document.createElement ("button")
  goBackButton.innerText = "Go back"
  goBackButton.classList.add("hs-btn")
  qBody.appendChild(goBackButton);

  var clearHighScores = document.createElement ("button")
  clearHighScores.innerText = "Clear high scores"
  clearHighScores.classList.add("hs-btn")
  qBody.appendChild(clearHighScores);


}


/* ---------------------QUESTION & ANSWER ARRAYS ------------------------------------*/
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: '1. Hyper Text Markup Language', correct: true},
      { text: '2. Home Tool Markup Language', correct: false},
      { text: '3. Hyperlinks and Text Markup Langauge', correct: false},
      { text: '4. Hyper Text Market Language', correct: false}
    ]
  },
  {
    question: "Who is making the Web standards?",
    answers: [
      { text: '1. Google', correct: false},
      { text: '2. Microsoft', correct: false},
      { text: '3. Mozilla', correct: false},
      { text: '4. The World Wide Web Consortium', correct: true}
    ]
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    answers: [
      { text: '1. <h6>', correct: false},
      { text: '2. <head>', correct: false},
      { text: '3. <h1>', correct: true},
      { text: '4. <heading>', correct: false}
    ]
  },
  {
    question: "Choose the correct HTML element to define important text",
    answers: [
      { text: '1. <b>', correct: false},
      { text: '2. <important>', correct: false},
      { text: '3. <strong>', correct: true},
      { text: '4. <i>', correct: false}
    ]
  }
]

startQuizButton.addEventListener("click", startQuiz);
