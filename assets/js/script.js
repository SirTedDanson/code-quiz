var questionIdCounter = 0;

var qBody = document.querySelector("#quiz");
var qQuestion = document.querySelector("#quiz-heading")

var gameInstructions = document.createElement("div");
  gameInstructions.id = "introduction";
  gameInstructions.className = "intro-text";
  gameInstructions.innerHTML = "<p> Try to answer the folloowing code-related questions within the time limit. Keep in mind that incorrect answers will penelize your score/time by 10 seconds </p>";
  qBody.appendChild(gameInstructions);

var answerList = document.createElement("ol");
  answerList.id = "form-quiz"
  answerList.className = "quiz"
  qBody.appendChild(answerList)

var startButton = document.createElement("li");
  startButton.className = "form-button";
  startButton.innerHTML = "<button class='start-btn' id='start-quiz' type='submit' value='submit'>Start Quiz</button>"
  answerList.append(startButton);
  document.getElementById("start-quiz").style.justifyContent = "center"

var startQuiz = function (event) {
  event.preventDefault();
  console.log("Quiz Start!");
  
  //get rid of start buttton 
  gameInstructions.remove();
  startButton.remove();

  //summon prompt
  quizPrompt ();
}

var quizPrompt = function () {
  
  document.getElementById("quiz").style.justifyContent = "left";
  document.getElementById("quiz-heading").style.textAlign = "left";
  
  
  //create question
  qQuestion.textContent = "What does HTML stand for?";
  qQuestion.id = "1";

  //create choices
  //choice one
  var answerOne = document.createElement("li");
  answerOne.id = "possible-answer";
  answerOne.className = "form-button";
  answerOne.innerHTML = "<button class='btn' id='1' type='submit' value='submit'>1. Hyper Text Markup Language</button>"
  answerOne.setAttribute("data-task-id", questionIdCounter);
  answerList.appendChild(answerOne);

  //choice Two
  var answerTwo = document.createElement("li");
  answerTwo.id = "possible-answer";
  answerTwo.className = "form-button";
  answerTwo.innerHTML = "<button class='btn' id='2' type='submit' value='submit'>2. Home Tool Markup Language</button>"
  answerTwo.setAttribute("data-task-id", questionIdCounter);
  answerList.appendChild(answerTwo);

  //choice three
  var answerThree = document.createElement("li");
  answerThree.id = "possible-answer";
  answerThree.className = "form-button";
  answerThree.innerHTML = "<button class='btn' id='3' type='submit' value='submit'>3. Hyperlinks and Text Markup Langauge</button>"
  answerThree.setAttribute("data-task-id", questionIdCounter);
  answerList.appendChild(answerThree);
  
  //choice four
  var answerFour = document.createElement("li");
  answerFour.id = "possible-answer";
  answerFour.className = "form-button";
  answerFour.innerHTML = "<button class='btn' id='4' type='submit' value='submit'>4. Hyper Text Market Language</button>"
  answerFour.setAttribute("data-task-id", questionIdCounter);
  answerList.appendChild(answerFour);

  answerOne.addEventListener("click", answerFunction);
  answerTwo.addEventListener("click", answerFunction);
  answerThree.addEventListener("click", answerFunction);
  answerFour.addEventListener("click", answerFunction);
}

var answerFunction = function (event) {
  
  var correctAnswer = qQuestion.id;
  var userAnswer = event.target.id;
  console.log(correctAnswer);
  console.log("Answer was chosen");
  console.log(userAnswer);
  

  if (correctAnswer == userAnswer) {
    var answerAlert = document.createElement("div");
      answerAlert.className = "answer-alert";
      answerAlert.innerHTML = "<h3 class='task-name'>Correct!</h3>";
      qBody.appendChild(answerAlert);
  } else {
    var answerAlert = document.createElement("div");
      answerAlert.className = "answer-alert";
      answerAlert.innerHTML = "<h3 class='task-name'>Wrong!</h3>";
      qBody.appendChild(answerAlert);
  }
  submitScore();

  //while questions exist 
  //ask another question
  //else
  //enter initials
  //high score screen
}

var submitScore = function (){

  qQuestion.textContent = "All done!";
  
  // remove elements
  var answerAlertBox = document.querySelector(".answer-alert");
  answerList.remove();
  answerAlertBox.remove();
  
  gameInstructions.innerHTML = "<p> Your final score is </p>";
  gameInstructions.style.textAlign = "left";
  qBody.appendChild(gameInstructions);

  var userInitialsForm = document.createElement ("form");
    userInitialsForm.id = "user-initials-form";
    userInitialsForm.innerHTML = "<p> Enter initials: </p><input type='text' name='user-name' placeholder='Enter Initials' />"
    qBody.appendChild(userInitialsForm);
  

  var userSubmit = document.createElement ("div")
    userSubmit.className = "button-container"
    userSubmit.innerHTML = "<button class='submit-btn' id='submit-score' type='submit' value='submit'>Submit</button>"
    userInitialsForm.appendChild(userSubmit);

  }

startButton.addEventListener("click", startQuiz);
