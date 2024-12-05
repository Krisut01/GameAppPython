let currentLevel = 'easy';  // Start at the easy level
let currentQuestionIndex = 0;  // Track the question index for the current level
let totalScore = 0;  // Track the total score
let levels = ['easy', 'average', 'hard'];  // Array of difficulty levels
let currentLevelIndex = 0;  // Track the current level index

// Store the number of questions per difficulty
const totalQuestionsPerLevel = {
    'easy': 2,
    'average': 2,
    'hard': 2
};

function startGame(difficulty) {
    currentLevel = difficulty;
    currentQuestionIndex = 0;  // Reset question index
    totalScore = 0;  // Reset score
    currentLevelIndex = levels.indexOf(difficulty);  // Set current level index
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('congrats').style.display = 'none'; // Hide final score display
    fetchNextQuestion();
}

function fetchNextQuestion() {
    if (currentQuestionIndex >= totalQuestionsPerLevel[currentLevel]) {
        currentLevelIndex++;  // Move to the next level
        if (currentLevelIndex < levels.length) {
            // Proceed to next level if there are more levels
            currentLevel = levels[currentLevelIndex];
            currentQuestionIndex = 0;  // Reset the question index for the new level
            fetchNextQuestion();  // Fetch the next question for the new level
        } else {
            // If all levels are done, show the final score
            showFinalScore();
        }
        return;
    }

    fetch(`/get_question/${currentLevel}`)
        .then(response => response.json())
        .then(data => {
            currentQuestion = data;  // Save the current question
            document.getElementById('question-text').textContent = data.question;
            document.getElementById('question-image').src = `/static/images/${data.image}`;

            const choices = data.choices;
            const buttons = document.querySelectorAll('.choice-btn');
            buttons.forEach((btn, index) => {
                btn.textContent = choices[index];
                btn.setAttribute('data-answer', data.answer);
                btn.style.backgroundColor = '';  // Reset button color
                btn.disabled = false;  // Enable buttons
            });

            document.getElementById('message').textContent = '';  // Reset message
        });
}

function checkAnswer(button) {
    const selectedAnswer = button.textContent;
    const correctAnswer = button.getAttribute('data-answer');

    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => btn.disabled = true);  // Disable all buttons after an answer is selected

    if (selectedAnswer === correctAnswer) {
        button.style.backgroundColor = 'green';  // Correct color
        document.getElementById('message').textContent = 'Correct! Proceeding to next question...';
        document.getElementById('message').style.color = 'green';

        totalScore++;  // Increment the score for correct answer

        // Proceed to the next question after a short delay
        setTimeout(() => {
            currentQuestionIndex++;
            fetchNextQuestion();
        }, 1500);
    } else {
        button.style.backgroundColor = 'red';  // Incorrect color
        document.getElementById('message').textContent = 'Incorrect! Please try again.';
        document.getElementById('message').style.color = 'red';
    }
}

function showFinalScore() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('congrats').style.display = 'block';
    document.getElementById('score').textContent = `Congratulations! You scored ${totalScore} out of ${totalQuestionsPerLevel['easy'] + totalQuestionsPerLevel['average'] + totalQuestionsPerLevel['hard']}.`;
    
    // Add a "Back to Dashboard" button after the game is complete
    const backButton = document.createElement('button');
    backButton.classList.add('difficulty-btn');
    backButton.textContent = 'Back to Dashboard';
    backButton.onclick = () => location.reload();  // Refresh the page to go back to the start
    document.getElementById('congrats').appendChild(backButton);
}
