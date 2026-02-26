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

    // --- JOURNAL PAGE SPECIFIC CODE ---
    const journalForm = document.getElementById('journal-form');
    const journalTitleInput = document.getElementById('journal-title');
    const journalContentInput = document.getElementById('journal-content');
    const pastEntriesContainer = document.getElementById('past-entries-container');

    // --- FUNCTION TO FETCH & DISPLAY JOURNAL ENTRIES ---
    async function fetchAndRenderJournal() {
        try {
            const response = await fetch('http://localhost:3000/journal', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch journal entries');
            
            const entries = await response.json();
            
            // Clear the container before adding new content
            pastEntriesContainer.innerHTML = ''; 

            if (entries.length === 0) {
                pastEntriesContainer.innerHTML = '<p>You have no journal entries yet. Write one to get started!</p>';
            } else {
                entries.forEach(entry => {
                    const entryElement = document.createElement('div');
                    entryElement.className = 'journal-entry'; // Add a class for styling

                    const title = document.createElement('h4');
                    title.textContent = entry.Title;

                    const content = document.createElement('p');
                    content.textContent = entry.Content;

                    const date = document.createElement('small');
                    const formattedDate = new Date(entry.CreatedAt).toLocaleString();
                    date.textContent = `Saved on: ${formattedDate}`;

                    entryElement.appendChild(title);
                    entryElement.appendChild(content);
                    entryElement.appendChild(date);
                    pastEntriesContainer.appendChild(entryElement);
                });
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Could not load journal entries.');
        }
    }

    // --- HANDLE FORM SUBMISSION TO SAVE A NEW ENTRY ---
    if (journalForm) {
        journalForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = journalTitleInput.value;
            const content = journalContentInput.value;

            if (!title || !content) {
                showToast('Please provide a title and content.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/journal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, content })
                });

                if (!response.ok) throw new Error('Server failed to save the entry.');
                
                showToast('Journal entry saved successfully!');
                
                // Clear the form
                journalTitleInput.value = '';
                journalContentInput.value = '';
                
                // Refresh the list of entries
                fetchAndRenderJournal();

            } catch (error) {
                console.error('Error submitting entry:', error);
                showToast('Failed to save journal entry.');
            }
        });
    }

    // --- Reusable Toast Notification ---
    let toastTimeout;
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add('show');
        toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }

    // --- INITIALIZE THE PAGE ---
    fetchAndRenderJournal();
});