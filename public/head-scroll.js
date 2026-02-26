// Wait for the entire page to load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select the main header element from the page
    const header = document.querySelector('.main-header-centered');

    // Make sure the header element actually exists before trying to use it
    if (header) {
        // Listen for the user scrolling the page
        window.addEventListener('scroll', function() {
            // If the user has scrolled down more than 10 pixels from the top
            if (window.scrollY > 10) {
                // Add the 'scrolled' class to the header
                header.classList.add('scrolled');
            } else {
                // Otherwise, if they are at the top, remove the 'scrolled' class
                header.classList.remove('scrolled');
            }
        });
    }
});