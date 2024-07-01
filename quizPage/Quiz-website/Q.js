const loginEmail = sessionStorage.getItem("loginEmail");
const loginPassword = sessionStorage.getItem("loginPassword");
if(loginEmail !=null && loginEmail !="" && loginPassword !=null && loginPassword!= ""){
 
} else window.location.href = "/mainPage/test.html"; 





document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let questions = [];
  let selectedAnswer = '';
  let score = 0; // أضف متغير السكور
  const totalTime = 0.5 * 60; // 10 minutes in seconds
  let remainingTime = totalTime;
  let timerInterval;
var quizSubject=sessionStorage.getItem('quizValu');
console.log(quizSubject);
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      questions = data[quizSubject].Question;
      displayQuestion();
      startTimer();
    })
    .catch(error => {
      console.error('Error fetching the data:', error);
    });

  function displayQuestion() {
    const questionElement = document.querySelector('.question');
    const answersElements = document.querySelectorAll('.answer .text');
    const answerWrappers = document.querySelectorAll('.answer');
    const currentElement = document.querySelector('.current');
    const totalElement = document.querySelector('.total');
    const submitButton = document.querySelector('.submit');
    const scoreElement = document.querySelector('.score-value'); // أضف السطر

    const question = questions[currentQuestionIndex];

    questionElement.textContent = question[`Question ${currentQuestionIndex + 1}`];
    answersElements[0].textContent = question['asnwer_1'];
    answersElements[1].textContent = question['asnwer_2'];
    answersElements[2].textContent = question['asnwer_3'];
    answersElements[3].textContent = question['asnwer_4'];

    currentElement.textContent = currentQuestionIndex + 1;
    totalElement.textContent = `/ ${questions.length}`;
    scoreElement.textContent = score; // أضف السطر

    // Reset selected state
    answerWrappers.forEach(wrapper => wrapper.classList.remove('selected', 'correct', 'wrong'));
    submitButton.disabled = true;
    submitButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
  }

  function handleAnswerClick(event) {
    const answerWrappers = document.querySelectorAll('.answer');
    answerWrappers.forEach(wrapper => wrapper.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    selectedAnswer = event.currentTarget.querySelector('.text').textContent;

    // Enable submit button
    document.querySelector('.submit').disabled = false;
  }

  document.querySelectorAll('.answer').forEach(answer => {
    answer.addEventListener('click', handleAnswerClick);
  });

  document.querySelector('.submit').addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    const correctAnswer = question['correct_answer'];
    const answerWrappers = document.querySelectorAll('.answer');

    answerWrappers.forEach(wrapper => {
      const answerText = wrapper.querySelector('.text').textContent;
      if (answerText === correctAnswer) {
        wrapper.classList.add('correct');
        if (wrapper.classList.contains('selected')) {
          score++; // تحديث السكور عند الإجابة الصحيحة
        }
      } else if (wrapper.classList.contains('selected')) {
        wrapper.classList.add('wrong');
      } else {
        wrapper.classList.add('wrong');
      }
    });

    // Store selected answer in questions array
    question.selectedAnswer = selectedAnswer;

    // Disable submit button after submission
    document.querySelector('.submit').disabled = true;

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
      } else {
        console.log('Quiz completed');

        // Store questions array and score in local storage
        localStorage.setItem('questions', JSON.stringify(questions));
        localStorage.setItem('correctAnswers', score); // احفظ السكور

        // Redirect to results page
        window.location.href = 'Q2.html';
      }
    }, 2000); // 2-second delay
  });

  function startTimer() {
    const timerText = document.querySelector('.progress-text');
    const progressBar = document.querySelector('.progress-bar');

    timerInterval = setInterval(() => {
      remainingTime--;

      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      timerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      // Update the progress bar
      const progress = ((totalTime - remainingTime) / totalTime) * 100;
      progressBar.style.width = `${progress}%`;

      // Check if the time is up
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    // Mark all unanswered questions as wrong
    questions.forEach(question => {
      if (!question.selectedAnswer) {
        // If no answer was selected, mark it as wrong
        question.selectedAnswer = 'No Answer';
      }
    });

    // Store questions array and score in local storage
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('correctAnswers', score); // احفظ السكور

    // Redirect to results page
    window.location.href = 'Q2.html';
  }

  // Back button functionality
  document.querySelector('.back').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion();
    }
  });


});
