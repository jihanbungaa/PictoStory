class PuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.stories = [
        "🌳Riko yang sedang bermain ponsel 🎈",
            
         "🐱Riko dengan kucing dan bola benang ✨",
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
                piece.src = `../assets/img/puzzle(2)${num}.png`; // Level 1 assets
            } else {
                piece.src = `../assets/img/puzzle(3)${num}.png`; // Level 2 assets
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
            window.location.href = '../tampilanMenu/tampilanMenu.html';
        });

        // Add score popup button listeners - fix button initialization
        const scoreBackBtn = document.getElementById('scoreBackBtn');
        const promoteBtn = document.getElementById('promoteBtn');

        if (scoreBackBtn) {
            scoreBackBtn.addEventListener('click', () => {
                window.location.href = '../tampilanMenu/tampilanMenu.html';
            });
        }

        if (promoteBtn) {
            promoteBtn.addEventListener('click', () => {
                window.location.href = '../kls4/kls4.html';
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
                    localStorage.setItem('kelas3Unlocked', 'true');
                    this.showScore(); // Show score popup when completed
                } else {
                    this.setupLevel();
                }
            }
        }, 1000);
    }

    showScore() {
        this.scoreOverlay.style.display = 'flex';
        
        // Remove old event listeners if they exist
        const oldPromoteBtn = document.getElementById('promoteBtn');
        const oldScoreBackBtn = document.getElementById('scoreBackBtn');
        if (oldPromoteBtn) {
            oldPromoteBtn.replaceWith(oldPromoteBtn.cloneNode(true));
        }
        if (oldScoreBackBtn) {
            oldScoreBackBtn.replaceWith(oldScoreBackBtn.cloneNode(true));
        }
        
        // Add new event listeners
        const promoteBtn = document.getElementById('promoteBtn');
        const scoreBackBtn = document.getElementById('scoreBackBtn');
        
        if (promoteBtn) {
            promoteBtn.addEventListener('click', () => {
                console.log('Promote button clicked'); // For debugging
                window.location.href = '../kls4/kls4.html';
            });
        }
        
        if (scoreBackBtn) {
            scoreBackBtn.addEventListener('click', () => {
                window.location.href = '../tampilanMenu/tampilanMenu.html';
            });
        }
        
        // Show stars based on correct answers
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
