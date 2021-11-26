var qBody = document.querySelector("#quiz");
var qQuestion = document.querySelector("#form-heading")
var qSelection = document.querySelector(".btn");

var gameInstructions = document.createElement("div");
  gameInstructions.id = "introduction";
  gameInstructions.className = "quiz-text";
  gameInstructions.innerHTML = "<p> Try to answer the folloowing code-related questions within the time limit. Keep in mind that incorrect answers will penelize your score/time by 10 seconds </p>";
  qBody.appendChild(gameInstructions);

var quizForm = document.createElement("form");
  quizForm.id = "form-quiz"
  quizForm.className = "quiz"
  qBody.appendChild(quizForm)

var startButton = document.createElement("div");
  startButton.className = "form-button";
  startButton.innerHTML = "<button class='btn' id='start-quiz' type='submit' value='submit'>Start Quiz</button>"
  quizForm.append(startButton);

var startQuiz = function (event) {
  event.preventDefault();
  console.log("Quiz Start!");
  
  //get rid of start buttton 
  gameInstructions.remove();
  startButton.remove();

  //create question
  qQuestion.textContent = "What does HTML stand for?"
  qQuestion.id = "answerOne"

  //create choices
  //choice one
  var answerOne = document.createElement("div");
  answerOne.className = "form-button";
  answerOne.innerHTML = "<button class='btn' id='answerOne' type='submit' value='submit'>Hyper Text Markup Language</button>"
  quizForm.append(answerOne);

  //choice Two
  var answerTwo = document.createElement("div");
  answerTwo.className = "form-button";
  answerTwo.innerHTML = "<button class='btn' id='answerTwo' type='submit' value='submit'>Home Tool Markup Language</button>"
  quizForm.append(answerTwo);

  //choice three
  var answerThree = document.createElement("div");
  answerThree.className = "form-button";
  answerThree.innerHTML = "<button class='btn' id='answerThree' type='submit' value='submit'>Hyperlinks and Text Markup Langauge</button>"
  quizForm.append(answerThree);
  
  //choice four
  var answerFour = document.createElement("div");
  answerFour.className = "form-button";
  answerFour.innerHTML = "<button class='btn' id='answerFour' type='submit' value='submit'>Hyper Text Market Language</button>"
  quizForm.append(answerFour);
}















startButton.addEventListener("click", startQuiz);