var qBody = document.querySelector(".container");
var qQuestion = document.getElementById("question");
var qTimer = document.getElementById("timer")
var startQuizButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");
var answerContainer = document.getElementById("possible-answers");
var quizHeading = document.getElementById("quiz-heading");
var promptText = document.getElementById("prompt-text");
var answerAlert = document.getElementById("answer-alert");
var currentScore = 0;
var currentQuestion = 0;
var randomQuestions = 0;
var scoreList = [];
var timeLeft = 25;
var placeNumber = 1;
var scoreBonus = 0;

function countdown() {
  //reset timer
  timeLeft = 25;

  var timeInterval = setInterval(function() { 
   if (timeLeft >= 0) {
    qTimer.textContent = "Time: " + timeLeft;
    timeLeft--;
  } else {
    qTimer.textContent = "";
    clearInterval(timeInterval);
    timesUp()
  }
}, 1000);
};

// function to run when countdown hits 0
function timesUp () {
  
  var onScoreScreen = document.getElementById("clear-score-button")
  var onSubmitScreen = document.getElementById("user-initials-form")
  if (onScoreScreen != null || onSubmitScreen !=null) {
    return;
    
  } else {
    submitScore();
  }
}

  //quiz start button
var startQuiz = function (event) {
  event.preventDefault();
  console.log("Quiz Start!");
  countdown ();
  
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

// Clear previous quiz buttons
function clearQuiz () {
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
  var submitForm = document.getElementById("user-initials-form");
  if (submitForm !=null) {
  submitForm.remove();
  }
  var startButton = document.getElementById("start-quiz");
  if (startButton !=null) {
  startButton.remove();
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

// ---- CHECK IF ANSWER WAS CORRECT -----------------
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
      timeLeft -= 5;
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

// -------- LOAD SUBMIT INITIALS AND SCORE SCREEN -----------------------------
var submitScore = function (){

   // remove elements
  clearQuiz();
  answerAlert.remove();
  qQuestion.remove();

  //capture time and stop countdown
  const quizTime = timeLeft;
  scoreBonus = (quizTime/2);
  timeLeft = -1;
  qTimer.textContent = "";

  //format and style the DOM------------------------
  //new quiz heading
  quizHeading.classList.remove('hide');
  quizHeading.innerText = "All done!";
  quizHeading.style.textAlign = "left";

  var finalScore = Math.max(0, currentScore) + scoreBonus;

  //new prompt text
  promptText.classList.remove('hide');
  promptText.innerHTML = "Your final score is: " + finalScore;
  promptText.style.textAlign = "left";
  qBody.style.justifyContent = "left";
  qBody.appendChild(promptText);
  
  //create user iniital input form
  var userInitialsForm = document.createElement ("form");
    userInitialsForm.id = "user-initials-form";
    userInitialsForm.innerHTML = "<p> Enter initials: </p><input type='text' name='user-name' placeholder='Enter Initials' />";
    qBody.appendChild(userInitialsForm);

  //create user intial & score submit button
  var userSubmit = document.createElement ("div");
    userSubmit.className = "button-container";
    userSubmit.innerHTML = "<button class='submit-btn' id='submit-score'>Submit</button>";
    userInitialsForm.appendChild(userSubmit);
    submitButton = document.getElementById("submit-score");

  // Save score when hitting submit
  submitButton.addEventListener("click", saveScore);
};

// ----------SAVE SCORE TO LOCAL STORAGE-----------------
var saveScore = function() {
  debugger;
  var userInitials = document.querySelector("input[name='user-name'").value;
  var finalScore = Math.max(0, currentScore) + scoreBonus;
  var userRoundScore = {
    name: userInitials,
    score: finalScore
  }
  scoreList.push(userRoundScore);
  scoreList.sort(function(a, b){return b.score - a.score});

  localStorage.setItem("scoreList", JSON.stringify(scoreList))
  console.log(scoreList)
  //load high score sreen
  highScoreScreen ();
};

var loadHighScores = function() {
  var savedScore = localStorage.getItem("scoreList");
  // if there are no scores, set scoring to an empty array
  if (!savedScore) {
    return false;
  }
  console.log("Saved scores found!");

  // parse into array of objects
  savedScore = JSON.parse(savedScore);
  
  // set the high scores list with the list from storage
  scoreList = savedScore; 
};

var highScoreScreen = function () {

  timeLeft = -1;
  qTimer.textContent = "";

  // disable View High Score Link if already on highscore page
  document.getElementById("high-scores-link").remove();

  //remove elements
  clearQuiz();
  promptText.classList.add('hide');
  qQuestion.classList.add('hide');
  answerAlert.classList.add('hide');

  // style elements left
  qBody.style.justifyContent = "left";
  quizHeading.style.textAlign = "left";

  //add highscore heading
  quizHeading.classList.remove('hide');
  quizHeading.innerText = "High scores";

  // loop through the saved high score list array 
  
  for (var i = 0; i < scoreList.length; i++) {
    generateHighScores(scoreList[i]);
    placeNumber++
  }

  // create high score list elements 
  function generateHighScores (recordedScore) {
    
    //highscores list
    var highScoresList = document.createElement("span");
      highScoresList.className = "highscores";
      highScoresList.innerText = placeNumber + ". " + recordedScore.name + " - " + recordedScore.score;
      qBody.appendChild(highScoresList);

      
  };

  //go back button
  var goBackButton = document.createElement ("button");
  goBackButton.innerText = "Go back";
  goBackButton.id = "go-back";
  goBackButton.classList.add("hs-btn");
  qBody.appendChild(goBackButton);

  //clear HighScores button
  var clearScoresButton = document.createElement ("button");
  clearScoresButton.innerText = "Clear high scores";
  clearScoresButton.id = "clear-score-button"
  clearScoresButton.classList.add("hs-btn");
  qBody.appendChild(clearScoresButton);

  //go to home page when "Go back" is pressed
  goBackButton.addEventListener("click", refreshPage);
  clearScoresButton.addEventListener("click", clearHighScores);
};

// clear high scores function
function clearHighScores (){
  // clear page elements
  var highScores = document.querySelector(".highscores");
  if (highScores !=null) {
  highScores.remove();
  clearHighScores();
  }

  //clear storage
  localStorage.clear();
  console.log("Scores Cleared!");
};

// go back to main page by reloading page
function refreshPage() {
  window.location.reload();
};

//listen for start quiz click and view highscores click
startQuizButton.addEventListener("click", startQuiz);
document.getElementById("high-scores-link").onclick = highScoreScreen;

//load the highscores
loadHighScores ();

/*--------------------------------------------------------------------------------------*/
/* ------------------------------QUESTION & ANSWER ARRAYS ------------------------------*/
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