document.addEventListener('DOMContentLoaded', () => {
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
            // Add hover sound if needed
            // const hoverSound = new Audio('../assets/sound/hover.mp3');
            // hoverSound.play();
        });

        button.addEventListener('click', () => {
            // Add click sound if needed
            // const clickSound = new Audio('../assets/sound/click.mp3');
            // clickSound.play();
        });
    });

    // Check if kelas 2 is unlocked
    const isKelas2Unlocked = localStorage.getItem('kelas2Unlocked') === 'true';
    
    // Get kelas 2 button and lock icon
    const kelas2Button = document.querySelector('[data-kelas="2"]');
    const lockIcon = kelas2Button.querySelector('.lock-icon'); // Make sure you have this element
    
    if (isKelas2Unlocked) {
        // Remove lock if unlocked
        if (lockIcon) {
            lockIcon.style.display = 'none';
        }
        kelas2Button.classList.add('unlocked');
        kelas2Button.disabled = false;
    } else {
        // Show lock if still locked
        if (lockIcon) {
            lockIcon.style.display = 'block';
        }
        kelas2Button.classList.add('locked');
        kelas2Button.disabled = true;
    }
});