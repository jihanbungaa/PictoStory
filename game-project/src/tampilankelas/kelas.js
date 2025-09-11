class LevelSystem {
    constructor() {
        this.levels = document.querySelectorAll('.level-item');
        this.init();
    }

     static completeLevel(levelNum, score) {
        const nextLevel = levelNum + 1;

        localStorage.setItem('currentLevel', nextLevel.toString());
        localStorage.setItem(`level${levelNum}Complete`, 'true');
        localStorage.setItem(`level${levelNum}Score`, score.toString());
    }

    init() {
        const currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
        
        this.levels.forEach((level, index) => {
            const levelNum = index + 1;
            
            if (levelNum === 1) {
                // Level 1 selalu terbuka
                this.unlockLevel(level, levelNum);
            } else if (levelNum <= currentLevel) {
                // Buka level yang sudah dicapai
                this.unlockLevel(level, levelNum);
            } else {
                this.lockLevel(level);
            }
        });
    }

    unlockLevel(levelElement, levelNum) {
        levelElement.onclick = () => this.navigateToLevel(levelNum);
        levelElement.classList.remove('locked');
        const lockIcon = levelElement.querySelector('.lock');
        if (lockIcon) {
            lockIcon.innerHTML = '🔓';
            lockIcon.classList.add('unlocked', 'unlock-animation');
            setTimeout(() => {
                lockIcon.style.display = 'none';
            }, 1000);
        }
        
        // Update gambar level
        const levelImage = levelElement.querySelector('img');
        if (levelImage) {
            levelImage.src = '../assets/img/naikKelas.png';
        }
        
        levelElement.onclick = () => this.navigateToLevel(levelNum);
    }

    lockLevel(levelElement) {
        levelElement.classList.add('locked');
        const lockIcon = levelElement.querySelector('.lock');
        if (lockIcon) {
            lockIcon.innerHTML = '🔒';
            lockIcon.classList.remove('unlocked', 'unlock-animation');
            lockIcon.style.display = 'block';
        }
        
        levelElement.onclick = () => alert('Selesaikan kelas sebelumnya terlebih dahulu!');
    }

    navigateToLevel(levelNum) {
        window.location.href = `../kelas${levelNum}/kelas${levelNum}.html`;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new LevelSystem();
});