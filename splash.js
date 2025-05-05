// splash.js
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    if (!splash) {
        console.warn('Splash screen element not found.');
        return;
    }

    // Prevent scrolling while splash is visible
    document.body.style.overflow = 'hidden';

    // Ensure splash is visible
    splash.style.opacity = '1';

    // Remove splash screen when page is fully loaded or after timeout
    const removeSplash = () => {
        splash.classList.add('hidden');
        setTimeout(() => {
            splash.remove();
            document.body.style.overflow = '';
            console.log('Splash screen removed');
        }, 500); // Match CSS transition duration
    };

    // Check if page is fully loaded
    const checkPageLoad = () => {
        if (document.readyState === 'complete') {
            removeSplash();
        }
    };

    // Remove splash after 3 seconds or when page is loaded
    setTimeout(removeSplash, 3000);
    window.addEventListener('load', checkPageLoad);

    // Fallback: Remove splash if images/scripts take too long
    document.addEventListener('load', () => {
        setTimeout(checkPageLoad, 1000);
    }, true);
});
