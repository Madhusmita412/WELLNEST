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

    // --- QUESTION PAGE ELEMENTS ---
    const questionForm = document.getElementById('question-form');
    const questionTextElement = document.getElementById('daily-question-text');
    const questionAnswerInput = document.getElementById('question-answer');
    const pastAnswersContainer = document.getElementById('past-answers-container');

    // --- FUNCTION TO FETCH A NEW QUESTION FROM THE AI ---
    async function fetchNewDailyQuestion() {
        // Get current language from localStorage
        const currentLanguage = localStorage.getItem('clario-language') || 'en';
        
        try {
            const response = await fetch('http://localhost:3000/get-daily-question');
            if (!response.ok) throw new Error('Failed to fetch question');
            const data = await response.json();
            
            // Use translated version if available and language is Hindi
            if (currentLanguage === 'hi' && window.ClarionLanguageSystem) {
                const langSystem = window.ClarionLanguageSystem;
                const translations = langSystem.translations.hi;
                if (translations && translations[data.question]) {
                    questionTextElement.textContent = translations[data.question];
                } else {
                    questionTextElement.textContent = data.question;
                }
            } else {
                questionTextElement.textContent = data.question;
            }
        } catch (error) {
            console.error('Error fetching daily question:', error);
            
            // Use language-appropriate fallback question
            const fallbackQuestion = currentLanguage === 'hi' 
                ? "आज आप किस बात के लिए आभारी हैं?" 
                : "What's one thing you are grateful for today?";
            questionTextElement.textContent = fallbackQuestion;
        }
    }

    // --- FUNCTION TO FETCH & DISPLAY PAST ANSWERS FROM DATABASE ---
    async function fetchAndRenderPastAnswers() {
        try {
            const response = await fetch('http://localhost:3000/daily-question', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch past answers');
            
            const answers = await response.json();
            
            pastAnswersContainer.innerHTML = ''; 
            if (answers.length === 0) {
                const currentLanguage = localStorage.getItem('clario-language') || 'en';
                const noAnswersMessage = currentLanguage === 'hi' 
                    ? '<p>आपका कोई सहेजा गया उत्तर अभी तक नहीं है।</p>'
                    : '<p>You have no saved answers yet.</p>';
                pastAnswersContainer.innerHTML = noAnswersMessage;
            } else {
                answers.forEach(answer => {
                    const answerElement = document.createElement('div');
                    answerElement.className = 'journal-entry'; // Using same style as journal entries

                    const question = document.createElement('h4');
                    question.textContent = answer.QuestionText;

                    const answerText = document.createElement('p');
                    answerText.textContent = answer.AnswerText;

                    const date = document.createElement('small');
                    const formattedDate = new Date(answer.AnsweredAt).toLocaleString();
                    date.textContent = `Answered on: ${formattedDate}`;

                    answerElement.appendChild(question);
                    answerElement.appendChild(answerText);
                    answerElement.appendChild(date);
                    pastAnswersContainer.appendChild(answerElement);
                });
            }
        } catch (error) {
            console.error('Error:', error);
            const currentLanguage = localStorage.getItem('clario-language') || 'en';
            const errorMessage = currentLanguage === 'hi' 
                ? 'आपके पिछले उत्तर लोड नहीं हो सके।' 
                : 'Could not load your past answers.';
            showToast(errorMessage);
        }
    }

    // --- HANDLE FORM SUBMISSION TO SAVE A NEW ANSWER ---
    if (questionForm) {
        questionForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const questionText = questionTextElement.textContent;
            const answerText = questionAnswerInput.value;

            if (!answerText.trim()) {
                const currentLanguage = localStorage.getItem('clario-language') || 'en';
                const message = currentLanguage === 'hi' 
                    ? 'कृपया एक उत्तर प्रदान करें।' 
                    : 'Please provide an answer.';
                showToast(message);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/daily-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ questionText, answerText })
                });

                if (!response.ok) throw new Error('Server failed to save the answer.');
                
                const currentLanguage = localStorage.getItem('clario-language') || 'en';
                const successMessage = currentLanguage === 'hi' 
                    ? 'आपका उत्तर सहेज लिया गया है!' 
                    : 'Your answer has been saved!';
                showToast(successMessage);
                questionAnswerInput.value = '';
                
                // Refresh the list of past answers
                fetchAndRenderPastAnswers();

            } catch (error) {
                console.error('Error submitting answer:', error);
                const currentLanguage = localStorage.getItem('clario-language') || 'en';
                const errorMessage = currentLanguage === 'hi' 
                    ? 'आपका उत्तर सहेजने में असफल।' 
                    : 'Failed to save your answer.';
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
            // Refresh question text and past answers when language changes
            setTimeout(() => {
                fetchNewDailyQuestion();
                fetchAndRenderPastAnswers();
            }, 100); // Small delay to ensure language system is ready
        }
    });

    // --- INITIALIZE THE PAGE ---
    fetchNewDailyQuestion();
    fetchAndRenderPastAnswers();
});