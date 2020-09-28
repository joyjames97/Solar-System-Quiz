// Made by Joy James
// Declaring Variables

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
let shuffledQuestions, currentQuestionIndex;
const questionImage = document.getElementById('planet-image');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questions = [
  {
    question: "Where is the asteroid belt?",
    image: "./img/asteroid-belt.png",
    altText: "Asteroid Belt",
    answers: [
      {text: "Between Jupiter and Saturn", correct: false},
      {text: "Between Earth and Venus", correct: false},
      {text: "Between Earth and Mars", correct: false},
      {text: "Between Mars and Jupiter", correct: true}
    ]
  },
  {
    question: "Which planet do the moons Oberon and Titania belong to?",
    image: "./img/uranus.png",
    altText: "Uranus",
    answers: [
      {text: "Jupiter", correct: false},
      {text: "Venus", correct: false},
      {text: "Earth", correct: false},
      {text: "Uranus", correct: true}
    ]
  },
  {
    question: "Which of these planets is the smallest?",
    image: "./img/mercury.png",
    altText: "Mercury",
    answers: [
      {text: "Mercury", correct: true},
      {text: "Earth", correct: false},
      {text: "Uranus", correct: false},
      {text: "Jupiter", correct: false}
    ]
  },
  {
    question: "What are comets mostly made of?",
    image: "./img/comet.png",
    altText: "Comet",
    answers: [
      {text: "Dirty ice and dust", correct: true},
      {text: "Poisonous liquid", correct: false},
      {text: "Hot, liquid rock", correct: false},
      {text: "Rusty Metal", correct: false}
    ]
  },
  {
    question: "Which of these best describes the atmosphere surrounding Venus?",
    image: "./img/venus.png",
    altText: "Venus",
    answers: [
      {text: "Hot and poisonous", correct: true},
      {text: "Bright and sunny", correct: false},
      {text: "Cold and wet", correct: false},
      {text: "Cold and snowy", correct: false}
    ]
  },
  {
    question: "The largest volcano in the Solar System is called Olympus Mons. Where is it?",
    image: "./img/mars.png",
    altText: "Mars",
    answers: [
      {text: "Earth", correct: false},
      {text: "Venus", correct: false},
      {text: "Mars", correct: true},
      {text: "Jupiter", correct: false}
    ]
  },
  {
    question: "What is the sun mainly made of?",
    image: "./img/sun.png",
    altText: "Sun",
    answers: [
      {text: "Liquid lava", correct: false},
      {text: "Gas", correct: true},
      {text: "Molten iron", correct: false},
      {text: "Rock", correct: false}
    ]
  },
  {
    question: "What is the Great Red Spot on Jupiter?",
    image: "./img/jupiter.png",
    altText: "Jupiter",
    answers: [
      {text: "A crater", correct: false},
      {text: "A volcano", correct: false},
      {text: "A lake", correct: false},
      {text: "A storm", correct: true}
    ]
  },
  {
    question: "What is closest planet to the Sun?",
    image: "./img/mercury.png",
    altText: "Mercury",
    answers: [
      {text: "Earth", correct: false},
      {text: "Neptune", correct: false},
      {text: "Mercury", correct: true},
      {text: "Venus", correct: false}
    ]
  },
  {
    question: "How many moons does Mars have?",
    image: "./img/mars.png",
    altText: "Mars",
    answers: [
      {text: "13", correct: false},
      {text: "2", correct: true},
      {text: "50", correct: false},
      {text: "1", correct: false}
    ]
  }
];

// Start the game

startButton.addEventListener('click', startGame);

// Make next button show next question

nextButton.addEventListener('click',() => {
  currentQuestionIndex++;
  setNextQuestion();
})

function startGame() {
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

// Set and show the next question

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
questionElement.innerText = question.question;
questionImage.src = question.image;
questionImage.alt = question.altText;
question.answers.forEach(answer => {
  const button = document.createElement('button');
  button.innerText = answer.text;
  button.classList.add('btn');
  if(answer.correct) {
    button.dataset.correct = answer.correct;
  }
  button.addEventListener('click', selectAnswer);
  answerButtonsElement.appendChild(button);
})
}

function resetState() {
  nextButton.classList.add('hide');
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Selecting the answer and displaying correct/wrong colors

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  // Restart quiz
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    startButton.classList.add('orange-btn')
  }
}

function setStatusClass(element,correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
