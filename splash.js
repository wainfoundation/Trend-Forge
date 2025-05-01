// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the splash container
    const splash = document.getElementById('splash');

    // Set a timeout to fade out and redirect
    setTimeout(() => {
        // Add fade-out effect
        splash.style.transition = 'opacity 0.5s ease';
        splash.style.opacity = '0';

        // Redirect to index.html after fade-out
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500); // Wait for fade-out to complete
    }, 3000); // Show splash for 3 seconds
});
