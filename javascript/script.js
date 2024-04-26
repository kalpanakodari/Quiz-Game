const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgain = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');


startBtn.onclick = () => {
    popupInfo.classList.add('active'); //when you click on start button it will add active class
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active'); //When you click on exit button it will remove active class
    main.classList.remove('active');
}

continueBtn.onclick = () => {
   quizSection.classList.add('active');
   popupInfo.classList.remove('active');  //continueBtn is clicked, the code activates the quiz section,
   main.classList.remove('active');       // deactivates a popup and the main section, activates a quiz box
   quizBox.classList.add('active');

    
   showQuestions(0);
   questionCounter(1); //then proceeds to show the first question,  
   headerScore();       //set up a question counter, and update the header score.
}

tryAgain.onclick = () => {
    quizBox.classList.add('active'); //tryAgain is clicked, the code resets various elements and variables related to the quiz, activates the quiz box
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
 questionCount = 0; // deactivates the next button and result box, and then proceeds to show the first question,
 questionNumb = 1;
 userScore = 0;
 showQuestions(questionCount);//to reset and display the first question.
 questionCounter(questionNumb);// to reset or initialize a counter related to the quiz questions with the starting question number.
 headerScore();  //set up a question counter, and update the header score. 
}
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active'); //goHomeBtn is clicked, the code deactivates or hides various elements related to the quiz (quiz section, next button, result box), 
    resultBox.classList.remove('active');
 questionCount = 0;//resets various variables, and then proceeds to show the first question, set up a question counter, and update the header score.
 questionNumb = 1;
 userScore = 0;
 showQuestions(questionCount);
 questionCounter(questionNumb);
 headerScore();
}
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
const nextBtn = document.querySelector('.next-btn');
nextBtn.onclick = () =>{
    if(questionCount < questions.length - 1) { // it checks if there are more questions available in the questions array to display.

        questionCount++; //Increments the variable questionCount by 1, moving to the next question in the array.
        showQuestions(questionCount);// Calls the function showQuestions with the updated questionCount

        questionNumb++;//Increments the variable questionNumb by 1, presumably updating the question number.
        questionCounter(questionNumb);// Calls the function questionCounter with the updated questionNumb

        nextBtn.classList.remove('active');//Removes the CSS class 'active' from the HTML element with the class nextBtn.
    }    // This likely deactivates or hides the next button, indicating that the user has answered the current question and should proceed to the next one.
    else{
        
        showResultBox();
    }
   
}

const optionList = document.querySelector('.option-list');

//getting questions and options from array
function showQuestions(index) {
    console.log("Showing question:", questions[index]);
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

optionList.innerHTML=optionTag;  

const option = document.querySelectorAll('.option');
for (let i=0; i<option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
}
console.log(optionList.children.length);
}
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;//which tags are available in parent class
    
    if(userAnswer == correctAnswer) {
       answer.classList.add('correct');  
       userScore += 1;
       headerScore(); 
}
else{
    answer.classList.add('incorrect'); 

    //if answer incorrect, auto selected correct answer
    for(let i=0; i < allOptions; i++) {
        if(optionList.children[i].textContent == correctAnswer) {
            optionList.children[i].setAttribute('class', 'option correct');
        }
    }
   
}
// if user has selected, disabled all options

for(let i=0; i<allOptions; i++) {
    optionList.children[i].classList.add('disabled');
}
nextBtn.classList.add('active');
}
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${questions.length}`;
}
function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText =document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100; 
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++; //
        // console.log(progressStartValue);
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1)0deg)`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}