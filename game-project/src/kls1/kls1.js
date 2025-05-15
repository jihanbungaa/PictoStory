class PuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.stories = [
            "🌳Anak Laki-laki yang sedang memegang piala🎈",
            "🐱 Lina yang sedang marah✨",
            "❓ Apa yang sedang dilakukan anak ini?"  // New story for quiz
        ];
        this.completedPuzzles = 0;
        this.quizAnswers = [
            "bermain bola",
            "berenang",
            "bermain sepeda"
        ];
        this.correctAnswer = "bermain sepeda"; // The correct answer
        
        this.promoteBtn = document.getElementById('promoteBtn');
        
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

        if (this.currentLevel === 3) {
            // Setup quiz interface
            this.sourcePieces.innerHTML = ''; // Clear puzzle pieces
            this.targetBoard.innerHTML = ''; // Clear target board
            
            // Create quiz image
            const quizImage = document.createElement('img');
            quizImage.src = '../assets/img/pict17.png';
            quizImage.classList.add('quiz-image');
            this.sourcePieces.appendChild(quizImage);
            
            // Create answer buttons
            const answerContainer = document.createElement('div');
            answerContainer.classList.add('answer-container');
            
            this.quizAnswers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.classList.add('answer-button');
                button.addEventListener('click', () => this.checkQuizAnswer(answer));
                answerContainer.appendChild(button);
            });
            
            this.targetBoard.appendChild(answerContainer);
            this.checkBtn.style.display = 'none'; // Hide check button for quiz
            return;
        }

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
        this.promoteBtn.addEventListener('click', () => {
            window.location.href = '../kls2/kls2.html';
        });
    }

    checkQuizAnswer(selectedAnswer) {
        if (selectedAnswer === this.correctAnswer) {
            this.completedPuzzles++;
            alert('🎉 HOREE! KAMU BERHASIL! 🎉\n\nJawaban kamu benar!\n\n✨ SELAMAT YA! ✨');
            
            // Only show NAIK KELAS button after completing the quiz (level 3)
            this.nextBtn.style.display = 'inline-block';
            this.nextBtn.textContent = 'NAIK KELAS';
            localStorage.setItem('kelas2Unlocked', 'true');
            this.nextBtn.addEventListener('click', () => {
                window.location.href = '../kls2/kls2.html';
            });
        } else {
            alert('🤔 Ups! Jawaban masih kurang tepat...\nAyo coba lagi! 💪');
        }
    }

    checkSolution() {
        if (this.currentLevel === 3) {
            return; // Skip normal puzzle checking for quiz level
        }

        const dropZones = this.targetBoard.querySelectorAll('.drop-zone');
        let correct = true;

        dropZones.forEach((zone, index) => {
            if (!zone.children[0] || zone.children[0].getAttribute('data-piece') !== (index + 1).toString()) {
                correct = false;
            }
        });

        if (correct) {
            this.completedPuzzles++;
            alert('🎉 HOREE! KAMU BERHASIL! 🎉\n\nWah, kamu hebat sekali! Puzzle-nya sudah tersusun dengan sempurna!\n\n✨ SELAMAT YA! ✨');
            
            // Always show LANJUT button after completing levels 1 and 2
            this.nextBtn.style.display = 'inline-block';
            this.nextBtn.textContent = 'LANJUT';
            
        } else {
            alert('🤔 Ups! Puzzle-nya masih belum pas nih...\nAyo coba lagi! 💪');
            if (this.currentLevel === 2) {
                this.setupLevel(); // Reset puzzle pieces for level 2
            }
        }
    }

    nextLevel() {
        if (this.currentLevel < 3) { // Updated to include level 3
            this.currentLevel++;
            this.nextBtn.style.display = 'none';
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
