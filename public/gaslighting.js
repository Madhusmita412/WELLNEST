document.addEventListener('DOMContentLoaded', () => {
    // --- SECURE AUTHENTICATION ---
    const token = localStorage.getItem('authToken');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.querySelector('.logout-btn-inline');

    if (!token) {
        alert("You are not logged in.");
        window.location.href = 'index.html';
        return;
    }
    let userPayload;
    try {
        userPayload = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
        return;
    }

    if (usernameDisplay) usernameDisplay.textContent = userPayload.username;
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        });
    }

    // --- QUIZ LOGIC ---
    const quizForm = document.getElementById('gaslighting-quiz-form');
    const questions = document.querySelectorAll('.quiz-question');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const quizResults = document.getElementById('quiz-results');
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');
    const pastResultsContainer = document.getElementById('past-results-container');

    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;

    // Initialize the quiz
    function initializeQuiz() {
        totalQuestionsSpan.textContent = totalQuestions;
        updateQuestionDisplay();
        updateNavigationButtons();
    }

    // Show current question and hide others
    function updateQuestionDisplay() {
        questions.forEach((question, index) => {
            question.style.display = index === currentQuestionIndex ? 'block' : 'none';
        });
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
    }

    // Update navigation button states
    function updateNavigationButtons() {
        prevBtn.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentQuestionIndex < totalQuestions - 1 ? 'block' : 'none';
        submitBtn.style.display = currentQuestionIndex === totalQuestions - 1 ? 'block' : 'none';
        
        // Check if current question is answered
        const currentQuestion = questions[currentQuestionIndex];
        const selectedAnswer = currentQuestion.querySelector('input[type="radio"]:checked');
        nextBtn.disabled = !selectedAnswer;
    }

    // Handle next button click
    nextBtn.addEventListener('click', () => {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedAnswer = currentQuestion.querySelector('input[type="radio"]:checked');
        
        if (selectedAnswer) {
            currentQuestionIndex++;
            updateQuestionDisplay();
            updateNavigationButtons();
        }
    });

    // Handle previous button click
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateQuestionDisplay();
            updateNavigationButtons();
        }
    });

    // Enable next button when an answer is selected
    questions.forEach(question => {
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                updateNavigationButtons();
            });
        });
    });

    // Initialize the quiz
    initializeQuiz();

    // --- HANDLE FINAL SUBMISSION ---
    quizForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(quizForm);
        const userAnswers = Object.fromEntries(formData.entries());

        if (Object.keys(userAnswers).length < quizQuestions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        quizContent.style.display = 'none';
        resultContent.innerHTML = 'Analyzing your responses...';
        quizResults.style.display = 'block';

        try {
            const response = await fetch('http://localhost:3000/gaslighting-analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ answers: userAnswers }),
            });
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            
            const result = await response.json();
            const level = result.level;
            let resultText = '';
            let recommendationText = '';

            switch (level) {
                case 'high':
                    resultText = 'High Risk of Gaslighting';
                    recommendationText = 'Your responses indicate a high likelihood of experiencing gaslighting in this relationship. Consider seeking support from a mental health professional or counselor who can help you navigate this situation. Remember that gaslighting is a form of emotional abuse, and you deserve to be treated with respect and honesty.';
                    break;
                case 'moderate':
                    resultText = 'Moderate Risk of Gaslighting';
                    recommendationText = 'Your responses suggest some concerning patterns that might indicate gaslighting behavior. It may be helpful to discuss these experiences with a trusted friend, family member, or counselor to get an outside perspective and support.';
                    break;
                case 'low':
                    resultText = 'Low Risk of Gaslighting';
                    recommendationText = 'While your responses show fewer signs of gaslighting, it\'s important to stay aware of your relationships and maintain healthy boundaries. If you notice concerning patterns developing, don\'t hesitate to seek support.';
                    break;
            }
            
            resultTitle.textContent = resultText;
            resultContent.innerHTML = `<p>${recommendationText}</p>`;

            fetchAndRenderPastResults(); // Refresh history with the new result
        } catch (error) {
            console.error('Error during API call:', error);
            resultContent.innerHTML = '<p>An error occurred. Please try again.</p>';
        }
    });

    // --- FETCH & DISPLAY PAST RESULTS ---
    async function fetchAndRenderPastResults() {
        try {
            const response = await fetch('http://localhost:3000/quiz-results', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch past results');
            
            const results = await response.json();
            
            pastResultsContainer.innerHTML = ''; 
            if (results.length === 0) {
                pastResultsContainer.innerHTML = '<p>You have no saved quiz results yet.</p>';
            } else {
                results.forEach(result => {
                    const resultElement = document.createElement('div');
                    resultElement.className = 'journal-entry'; 
                    const formattedDate = new Date(result.TakenAt).toLocaleString();
                    resultElement.innerHTML = `<h4>${result.QuizName}</h4><p>Score: ${result.Score}</p><small>Taken on: ${formattedDate}</small>`;
                    pastResultsContainer.appendChild(resultElement);
                });
            }
        } catch (error) {
            console.error('Error fetching past results:', error);
            showToast('Could not load your past quiz results.');
        }
    }
    
    // Reusable Toast Notification
    let toastTimeout;
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add('show');
        toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }

    // --- INITIALIZE PAGE ---
    showCurrentQuestion();
    fetchAndRenderPastResults();
});