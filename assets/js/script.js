var qBody = document.querySelector(".container");
var qQuestion = document.getElementById("question");
var qTimer = document.getElementById("timer");
var pageHeader = document.getElementById("quiz-header")
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
var timeLeft = 45;
var placeNumber = 1;
var scoreBonus = 0;
var finalScore = 0;

function countdown() {
  //reset timer
  timeLeft = 45;

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

// Clear previous quiz buttons---------------------------
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
  //populate question
  qQuestion.innerText = question.question;
  //style question prompts
  qQuestion.style.fontSize = "45px"
  qBody.style.justifyContent = "left"
  //populate answers
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

// ------------------------------------------ CHECK IF ANSWER WAS CORRECT -----------------
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
  captureScore ()
  }
}

//capture game score and disable timer
function captureScore () {
  const quizTime = timeLeft;
  scoreBonus = (quizTime/2);
  timeLeft = -1;
  qTimer.textContent = "";
  finalScore = Math.max(0, (currentScore + scoreBonus));
  submitScore();
}


// ------------------------------ LOAD SUBMIT INITIALS AND SCORE SCREEN -----------------------------
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
  

  //new prompt text
  var onSubmitScreen = document.getElementById("user-initials-form")
  //if (onSubmitScreen =null) {
    promptText.innerHTML = "Your final score is: " + finalScore;
  //} 
  promptText.classList.remove('hide');
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
  submitButton.addEventListener("click", emptyField);
};

function emptyField () {
  var userNameInput = document.querySelector("input[name='user-name'").value;
  if (userNameInput === "") {
    alert("You need to fill out the task form!");
    return submitScore ();
  }
  else
  saveScore ();
}

// -------------------------------------------------SAVE SCORE TO LOCAL STORAGE-----------------
var saveScore = function() {
  var userInitials = document.querySelector("input[name='user-name'").value;
  var finalScore = Math.max(0, (currentScore + scoreBonus));
  var userRoundScore = {
    name: userInitials,
    score: finalScore
  }
  //add round score to the high score list
  scoreList.push(userRoundScore);

  //sort the high score list 
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
  pageHeader.style.marginBottom = "0px"

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
    question: "In Javascript, what is the font case used when creating objects?",
    answers: [
      { text: '1. Camel Case', correct: true},
      { text: '2. Lower Case', correct: false},
      { text: '3. Java Case', correct: false},
      { text: '4. Upper Case', correct: false}
    ]
  },
  {
    question: "In Javascript, what does 'this' refer too?",
    answers: [
      { text: '1. The This Function', correct: false},
      { text: '2. The Current Window', correct: false},
      { text: '3. The DOM', correct: false},
      { text: '4. Refers To The Object It Belongs To', correct: true}
    ]
  },
  {
    question: "What is a callback function",
    answers: [
      { text: '1. A Function Used With Phone Numbers', correct: false},
      { text: '2. An Interval Function', correct: false},
      { text: '3. A Function Passed Into Another Function As An Arguement', correct: true},
      { text: '4. A Conditional Loop', correct: false}
    ]
  },
  {
    question: "Which is a method for combining arrays?",
    answers: [
      { text: '1. .combine', correct: false},
      { text: '2. .addarray', correct: false},
      { text: '3. .concat', correct: true},
      { text: '4. .merge', correct: false}
    ]
  },
  {
    question: "What is the 'switch' statement used for?",
    answers: [
      { text: '1. Switch Between Style Sheets', correct: false},
      { text: '2. Perform Different Actions Based on Different Conditions', correct: true},
      { text: '3. Alternate Between Jquery and Java', correct: false},
      { text: '4. Switch Between MAC and PC settings', correct: false}
    ]
  },
  {
    question: "What is primitave data",
    answers: [
      { text: '1. The HTML', correct: false},
      { text: '2. Data Which Is Easily Stored', correct: false},
      { text: '3. Single Data Value With No Additional Properities', correct: true},
      { text: '4. Data No Longer In Use', correct: false}
    ]
  }
];