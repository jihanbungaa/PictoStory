class PuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.stories = [
            "🌳Anak Laki-laki yang sedang memegang piala🎈",
            "🐱 Lina yang sedang marah✨"
        ];
        this.completedPuzzles = 0;
        this.promoteBtn = document.getElementById('promoteBtn');
        this.feedbackOverlay = document.getElementById('feedbackOverlay');
        this.feedbackImage = document.getElementById('feedbackImage');
        this.scoreOverlay = document.getElementById('scoreOverlay');
        this.star1 = document.getElementById('star1');
        this.star2 = document.getElementById('star2');
        this.correctAnswers = 0;
        
        this.init();
    }

    init() {
        this.storyBoard = document.getElementById('storyBoard');
        this.sourcePieces = document.getElementById('sourcePieces');
        this.targetBoard = document.getElementById('targetBoard');
        this.checkBtn = document.getElementById('checkBtn');     
        this.backBtn = document.getElementById('backBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.setupLevel();
        this.setupEventListeners();
    }

    setupLevel() {
        // Update story text
        const storyText = this.storyBoard.querySelector('.story-text');
        storyText.textContent = this.stories[this.currentLevel - 1];

        // Clear puzzle areas
        this.sourcePieces.innerHTML = '';
        this.targetBoard.innerHTML = '';

        // Create puzzle pieces
        const pieces = [1, 2, 3, 4];
        this.shuffleArray(pieces);

        // Update example image based on current level
        const exampleImage = document.querySelector('.question-images img:nth-child(' + this.currentLevel + ')');
        if (exampleImage) {
            exampleImage.style.display = 'block';
        }
        // Hide other example image
        const otherImage = document.querySelector('.question-images img:nth-child(' + (this.currentLevel === 1 ? 2 : 1) + ')');
        if (otherImage) {
            otherImage.style.display = 'none';
        }

        pieces.forEach(num => {
            const piece = document.createElement('img');
            if (this.currentLevel === 1) {
                piece.src = `../assets/img/gambar(8)${num}.png`; // Level 1 assets
            } else {
                piece.src = `../assets/img/gambar(9)${num}.png`; // Level 2 assets
            }
            piece.classList.add('puzzle-piece');
            piece.setAttribute('data-piece', num);
            piece.draggable = true;
            this.sourcePieces.appendChild(piece);
        });

        // Create drop zones
        for (let i = 1; i <= 4; i++) {
            const dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.setAttribute('data-position', i);
            this.targetBoard.appendChild(dropZone);
        }
    }

    setupEventListeners() {
        // Remove duplicate promoteBtn listener
        this.sourcePieces.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-piece'));
        });

        this.targetBoard.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.targetBoard.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropZone = e.target.closest('.drop-zone');
            if (!dropZone) return;

            const pieceNum = e.dataTransfer.getData('text/plain');
            const piece = document.querySelector(`[data-piece="${pieceNum}"]`);
            
            if (dropZone.children.length === 0) {
                dropZone.appendChild(piece);
            }
        });

        this.checkBtn.addEventListener('click', () => this.checkSolution());
        this.nextBtn.addEventListener('click', () => this.nextLevel());
        this.backBtn.addEventListener('click', () => {
            window.location.href = '../pilihan/pilihan.html';
        });

        // Add score popup button listeners - fix button initialization
        const scoreBackBtn = document.getElementById('scoreBackBtn');
        const promoteBtn = document.getElementById('promoteBtn');

         if (promoteBtn) {
            promoteBtn.addEventListener('click', () => {
                window.location.href = '../kls2/kls2.html';
            });
        }

        if (scoreBackBtn) {
            scoreBackBtn.addEventListener('click', () => {
                window.location.href = '../pilihan/pilihan.html';
            });
        }
    }

    showFeedback(isCorrect) {
        this.feedbackImage.src = isCorrect ? '../assets/img/benar.png' : '../assets/img/salah.png';
        this.feedbackOverlay.style.display = 'flex';
        
        if (isCorrect) {
            this.correctAnswers++;
        }
        
        setTimeout(() => {
            this.feedbackOverlay.style.display = 'none';
            if (this.currentLevel === 1) {
                this.nextLevel();
            } else if (this.currentLevel === 2) {
                if (isCorrect) {
                    localStorage.setItem('kelas2Unlocked', 'true');
                    this.showScore(); // Show score popup when completed
                } else {
                    this.setupLevel();
                }
            }
        }, 1000);
    }

    showScore() {
        this.scoreOverlay.style.display = 'flex';
        
        // Show stars animation first
        setTimeout(() => {
            if (this.correctAnswers >= 1) {
                this.star1.style.opacity = '1';
            }
            if (this.correctAnswers === 2) {
                setTimeout(() => {
                    this.star2.style.opacity = '1';
                }, 300);
            }
        }, 500);

        // Handle navigation buttons
        const promoteBtn = document.getElementById('promoteBtn');
        if (promoteBtn) {
            // Remove existing listeners
            const newPromoteBtn = promoteBtn.cloneNode(true);
            promoteBtn.parentNode.replaceChild(newPromoteBtn, promoteBtn);
            
            // Set button text based on score
            newPromoteBtn.textContent = this.correctAnswers > 0 ? 'NAIK KELAS' : 'ULANG';
            
            // Add new click handler
            newPromoteBtn.onclick = () => {
                if (this.correctAnswers > 0) {
                    // If at least one correct answer, proceed to next class
                    localStorage.setItem('kelas2Unlocked', 'true');
                    // Force navigation to kls2.html
                    document.location.href = '../kls2/kls2.html';
                } else {
                    // If all wrong, reset to level 1
                    this.scoreOverlay.style.display = 'none';
                    this.currentLevel = 1;
                    this.correctAnswers = 0;
                    this.setupLevel();
                }
            };
        }

        // Handle back button
        const scoreBackBtn = document.getElementById('scoreBackBtn');
        if (scoreBackBtn) {
            const newBackBtn = scoreBackBtn.cloneNode(true);
            scoreBackBtn.parentNode.replaceChild(newBackBtn, scoreBackBtn);
            
            newBackBtn.onclick = () => {
                document.location.href = '../tampilanMenu/tampilanMenu.html';
            };
        }
    }

    checkSolution() {
        const dropZones = this.targetBoard.querySelectorAll('.drop-zone');
        let correct = true;

        dropZones.forEach((zone, index) => {
            if (!zone.children[0] || zone.children[0].getAttribute('data-piece') !== (index + 1).toString()) {
                correct = false;
            }
        });

        this.showFeedback(correct);
    }

    nextLevel() {
        if (this.currentLevel < 2) {
            this.currentLevel++;
            this.setupLevel();
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    new PuzzleGame();
});
