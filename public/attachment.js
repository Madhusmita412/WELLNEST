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

    // --- QUIZ LOGIC & ELEMENTS ---
    const quizForm = document.getElementById('attachment-quiz-form');
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

        quizContent.style.display = 'none';
        resultContent.innerHTML = 'Analyzing your attachment style...';
        quizResults.style.display = 'block';

        try {
            const response = await fetch('http://localhost:3000/attachment-analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ answers: userAnswers }),
            });
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            
            const result = await response.json();
            const attachmentStyle = result.style.trim();
            
            // Define descriptions for each attachment style
            const styleDescriptions = {
                'secure': "You have a secure attachment style. You're comfortable with intimacy and independence, maintaining a healthy balance in relationships.",
                'anxious': "You have an anxious attachment style. You may seek high levels of intimacy and approval from relationships, often worrying about your partner's ability to love you back.",
                'avoidant': 'You have an avoidant attachment style. You tend to value independence and self-sufficiency, often maintaining emotional distance from partners.',
                'disorganized': 'You have a disorganized attachment style. You may struggle with consistent patterns in relationships, sometimes wanting closeness while other times pushing people away.'
            };

            resultTitle.textContent = `Your Attachment Style: ${attachmentStyle.charAt(0).toUpperCase() + attachmentStyle.slice(1)}`;
            resultContent.innerHTML = `
                <p>${styleDescriptions[attachmentStyle]}</p>
                <h3>What This Means:</h3>
                <p>Understanding your attachment style can help you build healthier relationships and improve your emotional well-being. Consider discussing these results with a mental health professional for more insights.</p>
            `;

            fetchAndRenderPastResults();
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
                    resultElement.innerHTML = `<h4>${result.QuizName}</h4><p>Result: ${result.Score}</p><small>Taken on: ${formattedDate}</small>`;
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