document.addEventListener('DOMContentLoaded', function() {
    // Select the main header element
    const header = document.querySelector('.main-header-centered');

    // Make sure the header element exists on the page
    if (header) {
        // Listen for when the user scrolls
        window.addEventListener('scroll', function() {
            // If the user has scrolled down more than 10 pixels
            if (window.scrollY > 10) {
                // Add the 'scrolled' class to the header
                header.classList.add('scrolled');
            } else {
                // Otherwise, remove the 'scrolled' class
                header.classList.remove('scrolled');
            }
        });
    }
});