document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio with error handling
    let backsoundPlayed = false;
    const backsound = new Audio('../assets/sound/backsound.mp3');
    backsound.loop = true;
    backsound.volume = 0.5;

    // Initialize buttons with error checking
    const startButton = document.getElementById('start-btn');
    const htpButton = document.getElementById('htp-btn');
    const rstButton = document.getElementById('rst-btn');

    // Verify all buttons exist
    if (!startButton || !htpButton || !rstButton) {
        console.error('Some buttons could not be found');
        return;
    }

    // Button click handlers with navigation checks
    startButton.addEventListener('click', () => {
        try {
            window.location.href = '../pilihan/pilihan.html';
        } catch (err) {
            console.error('Navigation error:', err);
        }
    });

    htpButton.addEventListener('click', () => {
        try {
            window.location.href = '../penjelasan/penjelasan.html';
        } catch (err) {
            console.error('Navigation error:', err);
        }
    });

    rstButton.addEventListener('click', () => {
        try {
            localStorage.clear();
            alert("Berhasil Di Reset!");
        } catch (err) {
            console.error('Reset error:', err);
            alert("Gagal melakukan reset!");
        }
    });

    // Add sound effects to all buttons with proper resource management
    const buttons = document.querySelectorAll('.button');
    const audioCache = {
        hover: new Audio('../assets/sound/hover.mp3'),
        click: new Audio('../assets/sound/click.mp3')
    };

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            audioCache.hover.currentTime = 0;
            audioCache.hover.play().catch(err => console.error("Hover sound error:", err));
        });

        button.addEventListener('click', () => {
            audioCache.click.currentTime = 0;
            audioCache.click.play().catch(err => console.error("Click sound error:", err));
        });
    });

    // Play background music on first interaction
    const playBackgroundMusic = () => {
        if (!backsoundPlayed) {
            backsound.play()
                .then(() => {
                    backsoundPlayed = true;
                })
                .catch((err) => {
                    console.error("Background music error:", err);
                });
        }
    };

    // Add interaction listeners
    document.body.addEventListener('click', playBackgroundMusic, { once: true });
    document.body.addEventListener('keydown', playBackgroundMusic, { once: true });
});
