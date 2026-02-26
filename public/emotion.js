document.addEventListener('DOMContentLoaded', () => {
    
    // --- SECURE AUTHENTICATION ---
    const token = localStorage.getItem('authToken');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.querySelector('.logout-btn-inline'); // Use a more general selector

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

    // --- QUIZ LOGIC & ELEMENTS ---
    const quizForm = document.getElementById('emotion-quiz-form');
    const quizQuestions = document.querySelectorAll('.quiz-question-wrapper');
    const quizContent = document.getElementById('quiz-content');
    const quizResults = document.querySelector('.quiz-results');
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');
    const pastResultsContainer = document.getElementById('past-results-container');
    
    let currentQuestionIndex = 0;

    function showCurrentQuestion() {
        quizQuestions.forEach((q, index) => {
            if (index === currentQuestionIndex) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });
    }

    document.querySelectorAll('.next-question-btn').forEach(button => {
        button.addEventListener('click', () => {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            const selectedAnswer = currentQuestion.querySelector('input[type="radio"]:checked');
            if (selectedAnswer) {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    showCurrentQuestion();
                }
            } else {
                alert('Please select an answer.');
            }
        });
    });

    // --- HANDLE FINAL SUBMISSION ---
    quizForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(quizForm);
        const userAnswers = Object.fromEntries(formData.entries());

        if (Object.keys(userAnswers).length < quizQuestions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        // Calculate score based on answers
        let score = 0;
        Object.values(userAnswers).forEach(answer => {
            // Simple scoring system - can be improved based on your needs
            if (answer.includes('happy') || answer.includes('joy') || answer.includes('fun')) {
                score += 4;
            } else if (answer.includes('sad') || answer.includes('cry')) {
                score += 1;
            } else if (answer.includes('angry') || answer.includes('lash') || answer.includes('yell')) {
                score += 2;
            } else if (answer.includes('avoid') || answer.includes('worry')) {
                score += 3;
            } else {
                score += 2; // Default score
            }
        });

        quizContent.style.display = 'none';
        resultContent.innerHTML = 'Analyzing your emotions...';
        quizResults.style.display = 'block';

        try {
            const response = await fetch('http://localhost:3000/emotion-analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ answers: userAnswers, score: score }),
            });
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            
            const result = await response.json();
            const emotion = result.emotion.trim();
            
            resultTitle.textContent = `Your Result: ${emotion}`;
            resultContent.innerHTML = `<p>Your results suggest a tendency toward <b>${emotion}</b>. This result has been saved to your history.</p>`;

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