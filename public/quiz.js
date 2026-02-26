document.addEventListener('DOMContentLoaded', () => {
    
    // --- SECURE AUTHENTICATION ---
    const token = localStorage.getItem('authToken');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');

    if (!token) {
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

    // --- QUIZ PAGE ELEMENTS ---
    const quizForm = document.getElementById('emotion-quiz-form');
    const pastResultsContainer = document.getElementById('past-results-container');

    // --- FUNCTION TO FETCH & DISPLAY PAST QUIZ RESULTS ---
    async function fetchAndRenderPastResults() {
        try {
            const response = await fetch('http://localhost:3000/quiz-results', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch past results');
            
            const results = await response.json();
            
            pastResultsContainer.innerHTML = ''; 
            if (results.length === 0) {
                const currentLanguage = localStorage.getItem('clario-language') || 'en';
                const noResultsMessage = currentLanguage === 'hi' 
                    ? '<p>आपका कोई सहेजा गया प्रश्नोत्तरी परिणाम अभी तक नहीं है।</p>'
                    : '<p>You have no saved quiz results yet.</p>';
                pastResultsContainer.innerHTML = noResultsMessage;
            } else {
                results.forEach(result => {
                    const resultElement = document.createElement('div');
                    resultElement.className = 'journal-entry'; 
                    const formattedDate = new Date(result.TakenAt).toLocaleString();
                    const currentLanguage = localStorage.getItem('clario-language') || 'en';
                    const scoreText = currentLanguage === 'hi' ? 'स्कोर:' : 'Score:';
                    const takenText = currentLanguage === 'hi' ? 'लिया गया:' : 'Taken on:';
                    resultElement.innerHTML = `<h4>${result.QuizName}</h4><p>${scoreText} ${result.Score}</p><small>${takenText} ${formattedDate}</small>`;
                    pastResultsContainer.appendChild(resultElement);
                });
            }
        } catch (error) {
            console.error('Error:', error);
            const currentLanguage = localStorage.getItem('clario-language') || 'en';
            const errorMessage = currentLanguage === 'hi' 
                ? 'आपके पिछले प्रश्नोत्तरी परिणाम लोड नहीं हो सके।' 
                : 'Could not load your past quiz results.';
            showToast(errorMessage);
        }
    }

    // --- HANDLE FORM SUBMISSION TO SAVE QUIZ RESULT ---
    if (quizForm) {
        quizForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(quizForm);
            const answers = {};
            let score = 0;

            for (let [key, value] of formData.entries()) {
                answers[key] = value;
                score += parseInt(value, 10);
            }

            try {
                const response = await fetch('http://localhost:3000/emotion-analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ answers, score })
                });

                if (!response.ok) throw new Error('Server failed to analyze and save the result.');
                
                const result = await response.json();
                const currentLanguage = localStorage.getItem('clario-language') || 'en';
                const successMessage = currentLanguage === 'hi' 
                    ? `एआई विश्लेषण: आपकी भावनात्मक प्रवृत्ति ${result.emotion} की ओर लगती है। परिणाम सहेज लिया गया।`
                    : `AI Analysis: Your emotional tendency seems to be toward ${result.emotion}. Result saved.`;
                showToast(successMessage);
                
                quizForm.reset();
                fetchAndRenderPastResults(); // Refresh the list of past results

            } catch (error) {
                console.error('Error submitting quiz:', error);
                const currentLanguage = localStorage.getItem('clario-language') || 'en';
                const errorMessage = currentLanguage === 'hi' 
                    ? 'आपका प्रश्नोत्तरी परिणाम सहेजने में असफल।' 
                    : 'Failed to save your quiz result.';
                showToast(errorMessage);
            }
        });
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

    // Listen for language changes
    window.addEventListener('storage', function(e) {
        if (e.key === 'clario-language') {
            // Refresh past results when language changes
            setTimeout(() => {
                fetchAndRenderPastResults();
            }, 100); // Small delay to ensure language system is ready
        }
    });

    // --- INITIALIZE THE PAGE ---
    fetchAndRenderPastResults();
});