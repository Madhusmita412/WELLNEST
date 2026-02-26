document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Store the token and redirect to dashboard
                localStorage.setItem('authToken', result.token);
                window.location.href = 'dashboard.html';
            } else {
                alert(result.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('An error occurred during login. Please try again.');
        }
    });

    // Handle signup link click
    window.showSignUp = (event) => {
        event.preventDefault();
        window.location.href = 'signup.html';
    };


});