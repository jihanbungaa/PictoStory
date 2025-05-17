class LevelSystem {
    constructor() {
        this.levels = document.querySelectorAll('.level-item');
        this.init();
    }

    init() {
        const progress = this.loadProgress();
        
        this.levels.forEach((level, index) => {
            const levelNum = index + 1;
            
            // Level 1 is always unlocked
            if (levelNum === 1) {
                level.classList.remove('locked');
                const lockIcon = level.querySelector('.lock');
                if (lockIcon) lockIcon.remove();
                level.onclick = () => this.navigateToLevel(levelNum);
                return;
            }
            
            // Check if previous level was completed
            if (progress[`level${levelNum-1}`] > 0) {
                this.unlockLevel(level, levelNum);
            } else {
                this.lockLevel(level);
            }
        });
    }

    loadProgress() {
        return JSON.parse(localStorage.getItem('pictostoryProgress')) || {
            level1: 0,
            level2: 0,
            level3: 0
        };
    }

    unlockLevel(levelElement, levelNum) {
        levelElement.classList.remove('locked');
        const lockIcon = levelElement.querySelector('.lock');
        if (lockIcon) {
            lockIcon.innerHTML = '🔓';
            lockIcon.classList.add('unlocked');
            // Add unlock animation class
            lockIcon.classList.add('unlock-animation');
        }
        levelElement.onclick = () => this.navigateToLevel(levelNum);
    }

    lockLevel(levelElement) {
        levelElement.classList.add('locked');
        const lockIcon = levelElement.querySelector('.lock');
        if (lockIcon) {
            lockIcon.innerHTML = '🔒';
            lockIcon.classList.remove('unlocked', 'unlock-animation');
        }
        // Prevent navigation for locked levels
        levelElement.onclick = () => alert('Selesaikan kelas sebelumnya terlebih dahulu!');
    }

    static completeLevel(levelNum, score) {
        const progress = JSON.parse(localStorage.getItem('pictostoryProgress')) || {};
        progress[`level${levelNum}`] = score;
        localStorage.setItem('pictostoryProgress', JSON.stringify(progress));
        
        const message = score > 0 
            ? `Selamat! Kamu telah menyelesaikan Kelas ${levelNum} dan membuka Kelas ${levelNum + 1}!`
            : `Kelas ${levelNum} selesai, tapi coba lagi untuk membuka kelas selanjutnya!`;
        alert(message);
    }

    navigateToLevel(levelNum) {
        window.location.href = `../kelas${levelNum}/kelas${levelNum}.html`;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new LevelSystem();
});