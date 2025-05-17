class LevelSystem {
    constructor() {
        this.levels = document.querySelectorAll('.level-item');
        this.init();
    }

    init() {
        // Load progress from localStorage
        const progress = this.loadProgress();
        
        this.levels.forEach((level, index) => {
            if (index === 0) return; // Skip level 1 (always unlocked)
            
            const levelNum = index + 1;
            level.addEventListener('click', () => this.handleLevelClick(levelNum));
            
            // Unlock levels based on progress
            if (progress[`level${levelNum-1}`] >= 2) {
                this.unlockLevel(level);
            }
        });
    }

    loadProgress() {
        return JSON.parse(localStorage.getItem('pictostoryProgress')) || {};
    }

    unlockLevel(levelElement) {
        levelElement.classList.remove('locked');
        levelElement.querySelector('.lock').style.display = 'none';
        
        // Add correct href based on level number
        const levelNum = levelElement.dataset.level;
        levelElement.onclick = () => window.location.href = `../kls${levelNum}/kls${levelNum}.html`;
    }

    handleLevelClick(levelNum) {
        const progress = this.loadProgress();
        if (progress[`level${levelNum-1}`] >= 2) {
            window.location.href = `../kls${levelNum}/kls${levelNum}.html`;
        } else {
            alert('🔒 Level ini masih terkunci!\n\nSelesaikan level sebelumnya dengan minimal 2 jawaban benar untuk membuka level ini.');
        }
    }
}

// Check if this is a new session
const isNewSession = !sessionStorage.getItem('gameSession');

document.addEventListener('DOMContentLoaded', () => {
    new LevelSystem();

    const kelas2Element = document.getElementById('kelas2');
    const kelas3Element = document.getElementById('kelas3');

    // Reset progress if it's a new session
    if (isNewSession) {
        localStorage.removeItem('kelas2Unlocked');
        localStorage.removeItem('kelas3Unlocked');
        sessionStorage.setItem('gameSession', 'active');
    }

    // Check if levels are unlocked
    const isKelas2Unlocked = localStorage.getItem('kelas2Unlocked') === 'true';
    const isKelas3Unlocked = localStorage.getItem('kelas3Unlocked') === 'true';

    // Handle Kelas 2
    if (isKelas2Unlocked) {
        unlockLevel(kelas2Element, '../kelas2/kelas2.html');
    } else {
        lockLevel(kelas2Element);
    }

    // Handle Kelas 3
    if (isKelas3Unlocked) {
        unlockLevel(kelas3Element, '../kelas3/kelas3.html');
    } else {
        lockLevel(kelas3Element);
    }
});

// Helper functions
function unlockLevel(element, href) {
    element.classList.remove('locked');
    element.querySelector('.lock').style.display = 'none';
    element.onclick = () => window.location.href = href;
    element.classList.add('unlocked-animation');
}

function lockLevel(element) {
    element.classList.add('locked');
    element.querySelector('.lock').style.display = 'block';
    element.onclick = null;
}

// Clear session when window closes
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('gameSession');
});