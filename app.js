// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAyquzNDmdCJvOAiaZkx8C0s4eODCo_hug",
    authDomain: "quizapp-firebase-11db1.firebaseapp.com",
    databaseURL: "https://quizapp-firebase-11db1-default-rtdb.firebaseio.com",
    projectId: "quizapp-firebase-11db1",
    storageBucket: "quizapp-firebase-11db1.appspot.com",
    messagingSenderId: "45559901380",
    appId: "1:45559901380:web:99aa550f5f5c7514bc2d91"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var quizmarksRef = database.ref("quizmarks");

var questions = [
  {
    question: "What is the purpose of an API?",
    option: ["Facilitate communication between software components", "Display web pages", "Create animations", "Store user data"],
    correctAns: "Facilitate communication between software components"
  },
  {
    question: "What programming language is commonly used for mobile app development?",
    option: ["Java", "Python", "C#", "Ruby"],
    correctAns: "Java"
  },
  {
    question: "What is the main function of a router in a computer network?",
    option: ["Connect devices within a network", "Store and manage data", "Translate domain names to IP addresses", "Secure the network from external threats"],
    correctAns: "Connect devices within a network"
  },
  {
    question: "What is the purpose of a VPN (Virtual Private Network)?",
    option: ["Securely connect to a private network over the internet", "Block unwanted advertisements", "Accelerate website loading speed", "Perform complex calculations"],
    correctAns: "Securely connect to a private network over the internet"
  },
  {
    question: "Which programming language is primarily used for web development?",
    option: ["JavaScript", "PHP", "C++", "Swift"],
    correctAns: "JavaScript"
  },
  {
    question: "What is the difference between front-end and back-end development?",
    option: ["Front-end focuses on user interface, while back-end handles server-side operations", "Front-end deals with hardware, while back-end deals with software", "Front-end uses Python, while back-end uses Java", "Front-end is for mobile apps, while back-end is for web apps"],
    correctAns: "Front-end focuses on user interface, while back-end handles server-side operations"
  },
  {
    question: "What is the purpose of a database management system?",
    option: ["Store, organize, and manage data", "Perform mathematical calculations", "Create user interfaces", "Design website layouts"],
    correctAns: "Store, organize, and manage data"
  },
  {
    question: "What is the role of HTML in web development?",
    option: ["Defines the structure and content of a web page", "Styles the elements of a web page", "Handles user interactions", "Stores data in a database"],
    correctAns: "Defines the structure and content of a web page"
  },
  {
    question: "What is the significance of responsive web design?",
    option: ["Ensures websites load quickly", "Improves search engine rankings", "Provides a consistent user experience across devices", "Enhances website security"],
    correctAns: "Provides a consistent user experience across devices"
  },
  {
    question: "What is the purpose of version control in software development?",
    option: ["Track changes to code", "Manage project budgets", "Create user documentation", "Optimize website performance"],
    correctAns: "Track changes to code"
  }
];


var currentQueNo = document.getElementById("currentQueNo");
var totalQues = document.getElementById("totalQues");
var dispQuestion = document.getElementById("dispQuestion");
var answerParent = document.getElementById("answerParent");
var quizcontainer = document.getElementById("quizcontainer");
var endquiz = document.getElementById("endquiz");
var indexVal = 0;
var marks = 0;

totalQues.innerHTML = questions.length;

function renderQue() {
  var obj = questions[indexVal];
  dispQuestion.innerHTML = obj.question;

  // Update current question number
  currentQueNo.innerHTML = indexVal + 1;

  answerParent.innerHTML = "";

  for (var i = 0; i < obj.option.length; i++) {
    answerParent.innerHTML += `
      <div class="col-md-6"> 
        <div class="py-2 button-container">
          <button class="btn- btn-secondary answer-button" onclick="chkAns('${obj.correctAns}', '${obj.option[i]}')">
            ${obj.option[i]}
          </button>
        </div>
      </div>`;
  }
}


function nextQue() {
  indexVal++;
  if (indexVal < questions.length) {
    renderQue();
  } else {
    quizend();
    saveScore();
  }
}

function chkAns(a, b) {
  if (a === b) {
    marks++;
  }
  nextQue();
}

function quizend() {
  quizcontainer.style.display = "none";
  endquiz.innerHTML = "<h2>Quiz Completed</h2><p>Your Score: " + marks + "</p><br><a id='databaselink' href='https://quizapp-firebase-11db1-default-rtdb.firebaseio.com/'>Database</a>";
  endquiz.style.display = "block";
}

function saveScore() {
  quizmarksRef.push().set(marks);
}

renderQue();