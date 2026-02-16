// Main index.js entry point
console.log('AI Pricing application loaded successfully');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application');
    
    // Set up navigation if not already handled
    const setupNavigation = function() {
        const rmButton = document.querySelector('.rm-btn');
        const approverButton = document.querySelector('.approver-btn');
        
        if (rmButton) {
            rmButton.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.setItem('lastInterface', 'rm');
                window.location.href = 'rm-interface.html';
            });
        }
        
        if (approverButton) {
            approverButton.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.setItem('lastInterface', 'approver');
                window.location.href = 'approver-interface.html';
            });
        }
    };
    
    // Initialize the app
    setupNavigation();
});