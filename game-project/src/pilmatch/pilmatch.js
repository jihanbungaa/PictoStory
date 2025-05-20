document.addEventListener('DOMContentLoaded', () => {
    let backsoundPlayed = false;
    const backsound = new Audio('../assets/sound/1.mp3');
    backsound.loop = true;
    backsound.volume = 0.5;

    // 🎮 Kartu game
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const href = card.dataset.href;
            if (href) {
                window.location.href = href;
            }
        });

        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // 🔙 Tombol kembali
    
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            const href = backButton.dataset.href;
            if (href) {
                window.location.href = "../pilihan/pilihan.html";
            }
        });
    }

    // ✅ Play backsound pas user pertama kali klik di mana aja
    document.body.addEventListener('click', () => {
        if (!backsoundPlayed) {
            backsound.play().catch((err) => {
                console.log("Gagal play backsound:", err);
            });
            backsoundPlayed = true;
        }
    }, { once: true });
});
