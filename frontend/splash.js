// splash.js
document.addEventListener('DOMContentLoaded', () => {
    // Create splash screen element
    const splash = document.createElement('div');
    splash.id = 'splash';
    splash.className = 'fixed inset-0 bg-white flex items-center justify-center z-50 text-center space-y-6';
    splash.innerHTML = `
        <div>
            <h1 class="text-5xl font-bold text-[#e3120b]">Trend Forge</h1>
            <p class="text-lg text-gray-600 mt-4">In-depth analysis and global insights</p>
            <div class="spinner mx-auto mt-6"></div>
        </div>
    `;

    // Add splash screen to the body
    document.body.prepend(splash);

    // Add spinner styles (inline to avoid external CSS dependency)
    const style = document.createElement('style');
    style.textContent = `
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #e3120b;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        #splash {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        #splash.hidden {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Fade out splash screen after 3 seconds
    setTimeout(() => {
        splash.classList.add('hidden');
        // Remove splash screen from DOM after fade-out
        setTimeout(() => {
            splash.remove();
        }, 500); // Match transition duration
    }, 3000);
});
