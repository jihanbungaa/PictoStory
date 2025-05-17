document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const href = card.dataset.href;
            if (href) {
                window.location.href = href;
            }
        });

        // Add hover effect class
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Handle back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            const href = backButton.dataset.href;
            if (href) {
                window.location.href = "../tampilanMenu/tampilanMenu.html";
            }
        });
    }
});