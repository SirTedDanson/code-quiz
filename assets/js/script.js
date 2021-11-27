
var qBody = document.querySelector(".container");
var qQuestion = document.getElementById("question");
var startQuizButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");
var answerContainer = document.getElementById("possible-answers");
var quizHeading = document.getElementById("quiz-heading");
var promptText = document.getElementById("prompt-text");
var answerAlert = document.getElementById("answer-alert");
var currentScore = 0;
var userScore = [];

let randomQuestions, currentQuestion

  //quiz start button
var startQuiz = function (event) {
  event.preventDefault();
  console.log("Quiz Start!");
  
  //make changes to dom for quiz display
  startQuizButton.remove();
  questionContainer.classList.remove('hide');
  promptText.classList.add('hide');
  quizHeading.classList.add('hide');

  // shuffle questions
  randomQuestions = questions.sort(() => Math.random() - .5);
  currentQuestion = 0;

  //ask question
  
  askQuestion ();
};

function clearQuiz () {
  // removes previous answer buttons
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
  return;
}

function askQuestion () {
  clearQuiz ();
  nextQuestion (randomQuestions[currentQuestion]);
};

function nextQuestion (question) {
  qQuestion.innerText = question.question;
  question.answers.forEach(answer => {
    var answerButton = document.createElement("button");
    answerButton.innerText = answer.text;
    answerButton.classList.add("btn");
    if(answer.correct) {
      answerButton.dataset.correct = answer.correct;
    }
    answerContainer.appendChild(answerButton);
    answerButton.addEventListener("click", answerFunction);
  })
};

var answerFunction = function (event) {

  //get answer
  var correctAnswer = "true";
  var userAnswer = event.target.dataset.correct;

  if (userAnswer == correctAnswer) {
      currentScore += 10;
      answerAlert.innerHTML = "<h3 class='task-name'>Correct!</h3>";
      qBody.appendChild(answerAlert);
  } else {
      currentScore -= 5;
      answerAlert.innerHTML = "<h3 class='task-name'>Wrong!</h3>";
      qBody.appendChild(answerAlert);
  }
  
  currentQuestion++;
  //if questions remain ask question
  if (currentQuestion < questions.length) {
  askQuestion();
  //else go to submit score screen
  } else {
  submitScore();
  }
};

var submitScore = function (){

   // remove elements
  clearQuiz();
  answerAlert.remove();
  qQuestion.remove();

  //format and style the DOM------------------------
  //new quiz heading
  quizHeading.classList.remove('hide');
  quizHeading.innerText = "All done!";
  quizHeading.style.textAlign = "left";

  var finalScore = Math.max(0, currentScore);

  //new prompt text
  promptText.classList.remove('hide');
  promptText.innerHTML = "Your final score is: " + finalScore;
  promptText.style.textAlign = "left";
  qBody.style.justifyContent = "left";
  
  qBody.appendChild(promptText);

  var userInitialsForm = document.createElement ("form");
    userInitialsForm.id = "user-initials-form";
    userInitialsForm.innerHTML = "<p> Enter initials: </p><input type='text' name='user-name' placeholder='Enter Initials' />";
    qBody.appendChild(userInitialsForm);

  var userSubmit = document.createElement ("div");
    userSubmit.className = "button-container";
    userSubmit.innerHTML = "<button class='submit-btn' id='submit-score'>Submit</button>";
    userInitialsForm.appendChild(userSubmit);
    submitButton = document.getElementById("submit-score");

  submitButton.addEventListener("click", highScoreScreen);

  loadHighScores ();
};

var highScoreScreen = function () {
    
  var userInitials = document.querySelector("input[name='user-name'").value;
  var finalScore = Math.max(0, currentScore);

  var userInfo = {
    name: userInitials,
    score: finalScore
  };

  //remove submission form elements
  promptText.classList.add('hide');
  var submitForm = document.getElementById("user-initials-form");
  submitForm.remove();
  
  //add highscore screen elements
  quizHeading.innerText = "High scores";

  //highscores list
  var highScoresList = document.createElement("span");
    highScoresList.className = "highscores";
    highScoresList.innerText = userInfo.name + " - " + userInfo.score;
    qBody.appendChild(highScoresList);

  //go back button
  var goBackButton = document.createElement ("button");
  goBackButton.innerText = "Go back";
  goBackButton.id = "go-back";
  goBackButton.classList.add("hs-btn");
  qBody.appendChild(goBackButton);

  //clear HighScores button
  var clearScoresButton = document.createElement ("button");
  clearScoresButton.innerText = "Clear high scores";
  clearScoresButton.classList.add("hs-btn");
  qBody.appendChild(clearScoresButton);

  //go to home page when "Go back" is pressed
  goBackButton.addEventListener("click", refreshPage);
  clearScoresButton.addEventListener("click", clearHighScores);

};

var loadHighScores = function() {
  var savedScore = localStorage.getItem("userScore");
  // if there are no scores, set scoring to an empty array and return out of the function
  if (!savedScore) {
    return false;
  }
  console.log("Saved scores found!");
  // else, load up saved scores

  // parse into array of objects
  savedScore = JSON.parse(savedScore);

  // loop through savedScore array
  for (var i = 0; i < savedScore.length; i++) {
    // pass each task object into the `generateHighScores()` function
    generateHighScores(savedScore[i]);
  }
};

function generateHighScores (userInfo) {

  //highscores list
  var highScoresList = document.createElement("span");
    highScoresList.className = "highscores";
    highScoresList.innerText = userInfo.name + " - " + userInfo.score;
    qBody.appendChild(highScoresList);

  userScore.push(userInfo);

  saveScore();
};

var saveScore = function() {
  localStorage.setItem("userScore", JSON.stringify(userScore));
};

function clearHighScores (){
  var highScores = document.querySelector("highscores");
  highScores.remove();
  localStorage.clear();
  console.log("Scores Cleared!");
};

function refreshPage() {
  window.location.reload();
};

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
