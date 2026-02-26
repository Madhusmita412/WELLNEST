document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continue-btn');
    const usernameDisplay = document.getElementById('username-display');
    
    // Get the current user's name from session storage
    const currentUser = sessionStorage.getItem('currentUser');

    // If a user is logged in, display their name
    if (currentUser) {
        usernameDisplay.textContent = currentUser;
    }

    // When the button is clicked, redirect to the dashboard
    continueBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});