class LevelManager {
    constructor() {
        this.levels = {
            1: { path: '../kls1/kls1.html', unlocked: true },
            2: { path: '../kls2/kls2.html', unlocked: false },
            3: { path: '../kls3/kls3.html', unlocked: false },
            4: { path: '../kls4/kls4.html', unlocked: false },
            5: { path: '../kls5/kls5.html', unlocked: false },
            6: { path: '../kls6/kls6.html', unlocked: false }
        };
        this.init();
    }

    init() {
        this.checkUnlockedLevels();
        this.addEventListeners();
        this.updateLevelDisplay();
    }

    checkUnlockedLevels() {
        // Check localStorage for unlocked levels
        for (let level = 2; level <= 6; level++) {
            if (localStorage.getItem(`kelas${level}Unlocked`) === 'true') {
                this.levels[level].unlocked = true;
            }
        }
    }

    addEventListeners() {
        // Add click handlers to all level items
        document.querySelectorAll('.level-item').forEach(item => {
            item.addEventListener('click', () => {
                const level = parseInt(item.dataset.level);
                this.handleLevelClick(level);
            });
        });
    }

    handleLevelClick(level) {
        if (this.levels[level].unlocked) {
            window.location.href = this.levels[level].path;
        } else {
            this.showLockedMessage();
        }
    }

    showLockedMessage() {
        const message = document.createElement('div');
        message.className = 'locked-message';
        message.textContent = 'Selesaikan level sebelumnya terlebih dahulu!';
        
        document.body.appendChild(message);
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    updateLevelDisplay() {
        for (let level = 1; level <= 6; level++) {
            const levelElement = document.querySelector(`[data-level="${level}"]`);
            if (levelElement) {
                if (this.levels[level].unlocked) {
                    levelElement.classList.remove('locked');
                    levelElement.classList.add('unlocked');
                    const lock = levelElement.querySelector('.lock');
                    if (lock) {
                        lock.style.display = 'none';
                    }
                }

                // Add hover effect for unlocked levels
                if (this.levels[level].unlocked) {
                    levelElement.addEventListener('mouseenter', () => {
                        levelElement.style.transform = 'scale(1.05)';
                    });
                    levelElement.addEventListener('mouseleave', () => {
                        levelElement.style.transform = 'scale(1)';
                    });
                }
            }
        }
    }

    // Method to unlock next level (call this when a level is completed)
    static unlockNextLevel(currentLevel) {
        const nextLevel = currentLevel + 1;
        if (nextLevel <= 6) {
            localStorage.setItem(`kelas${nextLevel}Unlocked`, 'true');
        }
    }
}

// Initialize the level manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const levelManager = new LevelManager();
});

// Add this to each level's completion handler (in kls1.js, kls2.js, etc.):
// LevelManager.unlockNextLevel(currentLevelNumber);