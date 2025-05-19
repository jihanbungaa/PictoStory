document.addEventListener('DOMContentLoaded', () => { 
    // Tambahin backsound di sini
    const backsound = new Audio('../assets/sound/backsound.mp3');
    backsound.loop = true;
    backsound.volume = 0.5; // volume bisa diatur 0.0 - 1.0
    backsound.play();

    const startButton = document.getElementById('start-btn');
    const htpButton = document.getElementById('htp-btn');

    startButton.addEventListener('click', () => {
        window.location.href = '../pilihan/pilihan.html';
    });

    htpButton.addEventListener('click', () => {
        window.location.href = '../penjelasan/penjelasan.html';
    });

    // Optional: Add button sound effects
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // const hoverSound = new Audio('../assets/sound/hover.mp3');
            // hoverSound.play();
        });

        button.addEventListener('click', () => {
            // const clickSound = new Audio('../assets/sound/click.mp3');
            // clickSound.play();
        });
    });

    const isKelas2Unlocked = localStorage.getItem('kelas2Unlocked') === 'true';
    
    const kelas2Button = document.querySelector('[data-kelas="2"]');
    const lockIcon = kelas2Button.querySelector('.lock-icon');
    
    if (isKelas2Unlocked) {
        if (lockIcon) lockIcon.style.display = 'none';
        kelas2Button.classList.add('unlocked');
        kelas2Button.disabled = false;
    } else {
        if (lockIcon) lockIcon.style.display = 'block';
        kelas2Button.classList.add('locked');
        kelas2Button.disabled = true;
    }

    // Dengerin klik pertama di mana aja di halaman
document.body.addEventListener('click', () => {
    if (!backsoundPlayed) {
        backsound.play().catch((err) => {
            console.log("Gagal play backsound:", err);
        });
        backsoundPlayed = true;
    }
}, { once: true }); // supaya cuma jalan sekali aja

});
